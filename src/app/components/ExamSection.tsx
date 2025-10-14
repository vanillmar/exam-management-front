// app/exams/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Label, TextInput, Select, TableHeadCell, TableRow, TableHead, TableBody, TableCell, DrawerItems, DrawerHeader } from 'flowbite-react';
import { Exam, ExamStatus } from '@/types/exam';
import { Subject } from '@/types/subject';
import axiosInstance from '@/lib/axios';

const ExamSection: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [examStatuses, setExamStatuses] = useState<ExamStatus[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    result: '',
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
    const { data } = await axiosInstance.get('/exams');
    setExams(data.data);
  };

  const fetchSubjects = async () => {
    const { data } = await axiosInstance.get('/subjects');
    setSubjects(data.data);
  };

  const fetchExamStatuses = async () => {
    const { data } = await axiosInstance.get('/exam-statuses');
    setExamStatuses(data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'timeLimit' || name === 'passMark' || name === 'subjectId' || name === 'examStatusId' ? parseInt(value) : value,
    }));
  };

  const handleNumberChange = (name: string, value: number | null) => {
    setFormData((prev) => ({ ...prev, [name]: value || 0 }));
  };

  const handleCreateOrUpdate = async () => {
    const url = isEdit ? `/exams/${currentExam?.id}` : '/exams';
    const requestData = {
      ...formData,
      subjectId: formData.subjectId,
      examStatusId: formData.examStatusId,
    };
    let response;
    if (isEdit) {
      response = await axiosInstance.put(url, requestData);
    } else {
      response = await axiosInstance.post(url, requestData);
    }
    if (response.status >= 200 && response.status < 300) {
      fetchExams();
      setOpenDrawer(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      const response = await axiosInstance.delete(`/exams/${id}`);
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
      title: '',
      result: '',
      timeLimit: 0,
      passMark: 0,
      subjectId: 0,
      examStatusId: 0,
    });
    setCurrentExam(null);
  };

  return (
    <div className="container">
      <Button onClick={openCreateDrawer} className="mb-4">Add Exam</Button>
      <Table hoverable>
        <TableHead>
            <TableRow>      
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Subject</TableHeadCell>
                <TableHeadCell>Result</TableHeadCell>
                <TableHeadCell>Time Limit</TableHeadCell>
                <TableHeadCell>Pass Mark(Percentage)</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>{exam.id}</TableCell>
              <TableCell>{exam.title}</TableCell>
              <TableCell>{exam.subject.name}</TableCell>
              <TableCell>{exam.result}</TableCell>
              <TableCell>{exam.timeLimit}</TableCell>
              <TableCell>{exam.passMark} %</TableCell>
              <TableCell>{exam.examStatus.name}</TableCell>
              <TableCell className='flex'>
                <Button size="xs" onClick={() => openEditDrawer(exam)} className="mr-2">Edit</Button>
                <Button size="xs" color="red" onClick={() => handleDelete(exam.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} position="right">
        <DrawerHeader title={isEdit ? 'Edit Exam' : 'Create Exam'} />
        <DrawerItems>
          <div className="space-y-6 p-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <TextInput id="title" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="result">Result</Label> 
              <TextInput id="result" name="result" value={formData.result} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <TextInput id="timeLimit" name="timeLimit" value={formData.timeLimit} onChange={(value) => handleNumberChange('timeLimit', value)} min={1} required />
            </div>
            <div>
              <Label htmlFor="passMark">Pass Mark</Label>
              <TextInput id="passMark" name="passMark" value={formData.passMark} onChange={(value) => handleNumberChange('passMark', value)} min={0} max={100} required />
            </div>
            <div>
              <Label htmlFor="subjectId">Subject</Label>
              <Select id="subjectId" name="subjectId" value={formData.subjectId} onChange={handleInputChange} required>
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
              <Select id="examStatusId" name="examStatusId" value={formData.examStatusId} onChange={handleInputChange} required>
                <option value={0}>Select Status</option>
                {examStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={handleCreateOrUpdate}>{isEdit ? 'Update' : 'Create'}</Button>
              <Button color="gray" onClick={() => setOpenDrawer(false)}>Cancel</Button>
            </div>
          </div>
        </DrawerItems>
      </Drawer>
    </div>
  );
};

export default ExamSection;