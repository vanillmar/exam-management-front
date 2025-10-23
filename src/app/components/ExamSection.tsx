// app/exams/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";

import { Exam, ExamStatus } from "@/types/exam";
import { Subject } from "@/types/subject";
import api from "@/lib/axios";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const ExamSection: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [examStatuses, setExamStatuses] = useState<ExamStatus[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    result: "",
    timeLimit: 0,
    passMark: 0,
    subjectId: 0,
    examStatusId: 0,
  });

  useEffect(() => {
    fetchExams();
    fetchSubjects();
    fetchExamStatuses();
  }, []);

  const fetchExams = async () => {
    const { data } = await api.get("/exams");
    setExams(data.data);
  };

  const fetchSubjects = async () => {
    const { data } = await api.get("/subjects");
    setSubjects(data.data);
  };

  const fetchExamStatuses = async () => {
    const { data } = await api.get("/exam-statuses");
    setExamStatuses(data.data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "timeLimit" ||
        name === "passMark" ||
        name === "subjectId" ||
        name === "examStatusId"
          ? parseInt(value)
          : value,
    }));
  };

  const handleNumberChange = (name: string, value: number | null) => {
    setFormData((prev) => ({ ...prev, [name]: value || 0 }));
  };

  const handleCreateOrUpdate = async () => {
    const url = isEdit ? `/exams/${currentExam?.id}` : "/exams";
    const requestData = {
      ...formData,
      subjectId: formData.subjectId,
      examStatusId: formData.examStatusId,
    };
    let response;
    if (isEdit) {
      response = await api.put(url, requestData);
    } else {
      response = await api.post(url, requestData);
    }
    if (response.status >= 200 && response.status < 300) {
      fetchExams();
      setOpenDrawer(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      const response = await api.delete(`/exams/${id}`);
      if (response.status >= 200 && response.status < 300) {
        fetchExams();
      }
    }
  };

  const openCreateDrawer = () => {
    setIsEdit(false);
    resetForm();
    setOpenDrawer(true);
  };

  const openEditDrawer = (exam: Exam) => {
    setIsEdit(true);
    setCurrentExam(exam);
    setFormData({
      title: exam.title,
      result: exam.result,
      timeLimit: exam.timeLimit,
      passMark: exam.passMark,
      subjectId: exam.subject.id,
      examStatusId: exam.examStatus.id,
    });
    setOpenDrawer(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      result: "",
      timeLimit: 0,
      passMark: 0,
      subjectId: 0,
      examStatusId: 0,
    });
    setCurrentExam(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={openCreateDrawer} className="mb-4">
        Add Exam
      </Button>
      <Table>
        <TableCaption>A list of exams.</TableCaption>
        <TableHead>
          <TableRow>
            <TableHead>Actions</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Time Limit</TableHead>
            <TableHead>Pass Mark(Percentage)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell className="flex">
                <Button
                  size="sm"
                  onClick={() => openEditDrawer(exam)}
                  className="mr-2"
                >
                  {" "}
                  <HiOutlinePencil />
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() => handleDelete(exam.id)}
                >
                  <HiOutlineTrash />
                </Button>
              </TableCell>
              <TableCell>{exam.id}</TableCell>
              <TableCell>{exam.title}</TableCell>
              <TableCell>{exam.subject.name}</TableCell>
              <TableCell>{exam.result}</TableCell>
              <TableCell>{exam.timeLimit}</TableCell>
              <TableCell>{exam.passMark} %</TableCell>
              <TableCell>{exam.examStatus.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <DrawerHeader title={isEdit ? "Edit Exam" : "Create Exam"} />
        <DrawerContent>
          <div className="space-y-6 p-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="result">Result</Label>
              <Input
                id="result"
                name="result"
                value={formData.result}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={(value) => handleNumberChange("timeLimit", value)}
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="passMark">Pass Mark</Label>
              <Input
                id="passMark"
                name="passMark"
                value={formData.passMark}
                onChange={(value) => handleNumberChange("passMark", value)}
                min={0}
                max={100}
                required
              />
            </div>
            <div>
              <Label htmlFor="subjectId">Subject</Label>
              <Select
                id="subjectId"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleInputChange}
                required
              >
                <option value={0}>Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="examStatusId">Exam Status</Label>
              <Select
                name="examStatusId"
                value={formData.examStatusId.toString()}
                onChange={handleInputChange}
                required
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue>Select Status</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {examStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={handleCreateOrUpdate}>
                {isEdit ? "Update" : "Create"}
              </Button>
              <Button color="gray" onClick={() => setOpenDrawer(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ExamSection;
