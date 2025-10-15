// app/questions/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "flowbite-react";
import axiosInstance from "@/lib/axios";
import { Question, QuestionResponse } from "@/types/questions";
import { Subject, SubjectsResponse } from "@/types/subject";
import QuestionsTable from "./QuestionTable";

export const fetchQuestions = async ({
  page = 1,
  pageSize = 10,
  sortBy = "id",
  sortOrder = "asc",
  search = "",
}) => {
  const { data } = await axiosInstance.get<QuestionResponse>("/questions", {
    params: { page, pageSize, sortBy, sortOrder, search },
  });
  return data;
};

const QuestionsSection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    options: [] as string[],
    answerIndex: 0,
    subjectId: 0,
  });

  useEffect(() => {
    fetch();
    fetchSubjects();
  }, []);
  const fetch = async () => {
    const data = await fetchQuestions({});
    setQuestions(data);
  };
  const fetchSubjects = async () => {
    const {
      data: { data },
    } = await axiosInstance.get<SubjectsResponse>("/subjects");
    setSubjects(data);
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, question: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setFormData((prev) => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeOption = (index: number) => {
    let newAnswerIndex = formData.answerIndex;
    const newOptions = formData.options.filter((_, i) => i !== index);
    if (formData.answerIndex === index) {
      newAnswerIndex = 0;
    } else if (formData.answerIndex > index) {
      newAnswerIndex = formData.answerIndex - 1;
    }
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
      answerIndex: newAnswerIndex,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, subjectId: parseInt(e.target.value) }));
  };

  const handleAnswerIndexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, answerIndex: parseInt(e.target.value) }));
  };

  const handleCreateOrUpdate = async () => {
    const requestData = {
      question: formData.question,
      options: formData.options,
      answerIndex: formData.answerIndex,
      subjectId: formData.subjectId,
    };
    const url = isEdit ? `/questions/${currentQuestion?.id}` : "/questions";
    let response;
    if (isEdit) {
      response = await axiosInstance.put(url, requestData);
    } else {
      response = await axiosInstance.post(url, requestData);
    }
    if (response.status >= 200 && response.status < 300) {
      fetchQuestions({});
      setOpenModal(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const response = await axiosInstance.delete(`/api/questions/${id}`);
      if (response.status >= 200 && response.status < 300) {
        fetchQuestions({});
      }
    }
  };

  const openCreateModal = () => {
    setIsEdit(false);
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (question: Question) => {
    setIsEdit(true);
    setCurrentQuestion(question);
    setFormData({
      question: question.question || "",
      options: question.options || [],
      answerIndex: question.answerIndex || 0,
      subjectId: question.subjectId || 0,
    });
    setOpenModal(true);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      options: [] as string[],
      answerIndex: 0,
      subjectId: 0,
    });
    setCurrentQuestion(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={openCreateModal} className="mb-4">
        Add Question
      </Button>
      <QuestionsTable
        openEditModal={openEditModal}
        handleDelete={handleDelete}
      />
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="xl"
        className="w-full"
      >
        <ModalHeader>
          {isEdit ? "Edit Question" : "Create Question"}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div>
              <Label htmlFor="question" className="block mb-2">
                Question
              </Label>
              <Textarea
                value={formData.question}
                onChange={handleQuestionChange}
                rows={4}
                required
              />
            </div>
            <div>
              <Label className="block mb-2">Options</Label>
              {formData.options.map((option, index) => (
                <div key={index} className="flex space-x-2 mb-2 items-end">
                  <TextInput
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => removeOption(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={addOption} color="gray">
                Add Option
              </Button>
            </div>
            <div>
              <Label htmlFor="answerIndex" className="block mb-2">
                Correct Answer Index
              </Label>
              <Select
                id="answerIndex"
                value={formData.answerIndex.toString()}
                onChange={handleAnswerIndexChange}
                required
                disabled={formData.options.length === 0}
              >
                {formData.options.map((_, index) => (
                  <option key={index} value={index.toString()}>
                    Option {index + 1}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="subjectId" className="block mb-2">
                Subject
              </Label>
              <Select
                id="subjectId"
                value={formData.subjectId.toString()}
                onChange={handleSubjectChange}
                required
              >
                <option value="0">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id.toString()}>
                    {subject.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCreateOrUpdate}>
            {isEdit ? "Update" : "Create"}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default QuestionsSection;
