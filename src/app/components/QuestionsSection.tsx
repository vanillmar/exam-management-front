// app/questions/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Label, TextInput, Textarea, Select, TableHead, TableHeadCell, TableRow, TableBody, TableCell, DrawerHeader, DrawerItems } from 'flowbite-react';
import axiosInstance from '@/lib/axios';
import { Question, QuestionBank, QuestionsResponse } from '@/types/questions';
import { Subject, SubjectsResponse } from '@/types/subject';

const QuestionsSection: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionBank[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    options: '',
    answerIndex: 0,
    subjectId: 0,
  });

  useEffect(() => {
    fetchQuestions();
    fetchSubjects();
  }, []);

  const fetchQuestions = async () => {
    const { data: {data} } = await axiosInstance.get<QuestionsResponse>('/questions');
    setQuestions(data);
  };

  const fetchSubjects = async () => {
    const { data } = await axiosInstance.get<SubjectsResponse>('/subjects');
    setSubjects(data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'options') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'subjectId') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (name: string, value: number | null) => {
    setFormData((prev) => ({ ...prev, [name]: value || 0 }));
  };

  const handleCreateOrUpdate = async () => {
    const optionsArray = formData.options.split(',').map(opt => opt.trim()).filter(opt => opt);
    const requestData = {
      ...formData,
      options: optionsArray,
      subjectId: formData.subjectId,
    };
    const url = isEdit ? `/questions/${currentQuestion?.id}` : '/questions';
    let response;
    if (isEdit) {
      response = await axiosInstance.put(url, requestData);
    } else {
      response = await axiosInstance.post(url, requestData);
    }
    if (response.status >= 200 && response.status < 300) {
      fetchQuestions();
      setOpenDrawer(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      const response = await axiosInstance.delete(`/api/questions/${id}`);
      if (response.status >= 200 && response.status < 300) {
        fetchQuestions();
      }
    }
  };

  const openCreateDrawer = () => {
    setIsEdit(false);
    resetForm();
    setOpenDrawer(true);
  };

  const openEditDrawer = (question: Question) => {
    setIsEdit(true);
    setCurrentQuestion(question);
    setFormData({
      question: question.question,
      options: question.options.join(', '),
      answerIndex: question.answerIndex,
      subjectId: 0, // Will need to set based on question's subject if available; assuming questions fetch includes subjectId
    });
    setOpenDrawer(true);
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: '',
      answerIndex: 0,
      subjectId: 0,
    });
    setCurrentQuestion(null);
  };

  const getOptionsDisplay = (options: string[]) => options.join(', ');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questions Management</h1>
      <Button onClick={openCreateDrawer} className="mb-4">Add Question</Button>
      <Table hoverable>
        <TableHead>
            <TableRow>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Question</TableHeadCell>
                <TableHeadCell>Options</TableHeadCell>
                <TableHeadCell>Answer Index</TableHeadCell>
                <TableHeadCell>Subject ID</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.id}</TableCell>
              <TableCell className="max-w-xs truncate">{question.question}</TableCell>
              <TableCell className="max-w-xs truncate">{getOptionsDisplay(question.options)}</TableCell>
              <TableCell>{question.answerIndex}</TableCell>
              <TableCell>{question.subjectId || 'N/A'}</TableCell> {/* Assuming subjectId is fetched or added to interface */}
              <TableCell className='flex align-middle'>
                <Button size="xs" onClick={() => openEditDrawer(question)} className="mr-2">Edit</Button>
                <Button size="xs" color="red" onClick={() => handleDelete(question.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} position="right">
        <DrawerHeader title={isEdit ? 'Edit Question' : 'Create Question'} />
        <DrawerItems>
          <div className="space-y-6 p-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea id="question" name="question" value={formData.question} onChange={handleInputChange} rows={3} required />
            </div>
            <div>
              <Label htmlFor="options">Options (comma-separated)</Label>
              <Textarea
                id="options"
                name="options"
                value={formData.options}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g., Option A, Option B, Option C, Option D"
                required
              />
            </div>
            <div>
              <Label htmlFor="answerIndex">Answer Index (0-based)</Label>
              <TextInput
                id="answerIndex"
                name="answerIndex"
                value={formData.answerIndex}
                onChange={(value) => handleNumberChange('answerIndex', value)}
                min={0}
                required
              />
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

export default QuestionsSection;