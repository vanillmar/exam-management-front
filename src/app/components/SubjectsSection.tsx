// app/subjects/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Drawer, 
  Label, 
  TextInput, 
  TableHead, 
  TableHeadCell, 
  TableBody, 
  TableRow, 
  TableCell, 
  DrawerHeader, 
  DrawerItems 
} from 'flowbite-react';
import axiosInstance from '@/lib/axios';
import { Subject } from '@/types/subject';
import { fetchSubjects } from '@/lib/api';
import { useSession } from 'next-auth/react';

const SubjectsSection: React.FC = () => {
  const { data: session } = useSession();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
  });

  useEffect(() => {
    const loadData = async () => {
        const data = await fetchSubjects();
        setSubjects(data);
    }
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async () => {
    const url = isEdit ? `/subjects/${currentSubject?.id}` : '/subjects';
    let response;
    if (isEdit) {
      response = await axiosInstance.put(url, formData, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
      });
    } else {
      response = await axiosInstance.post(url, formData, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
      });
    }
    if (response.status >= 200 && response.status < 300) {
      fetchSubjects();
      setOpenDrawer(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this subject?')) {
     const response = await axiosInstance.delete(`/subjects/${id}`, { 
        headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        }
     });
      if (response.status >= 200 && response.status < 300) {
        fetchSubjects();
      }
    }
  };

  const openCreateDrawer = () => {
    setIsEdit(false);
    resetForm();
    setOpenDrawer(true);
  };

  const openEditDrawer = (subject: Subject) => {
    setIsEdit(true);
    setCurrentSubject(subject);
    setFormData({
      name: subject.name,
      description: subject.description,
      code: subject.code,
    });
    setOpenDrawer(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      code: '',
    });
    setCurrentSubject(null);
  };

  return (
    <div className="container">
      <Button onClick={openCreateDrawer} className="mb-4">Add Subject</Button>
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Code</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.id}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.description}</TableCell>
              <TableCell>{subject.code}</TableCell>
              <TableCell className='flex'>
                <Button size="xs" onClick={() => openEditDrawer(subject)} className="mr-2">Edit</Button>
                <Button size="xs" color="red" onClick={() => handleDelete(subject.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} position="right">
        <DrawerHeader title={isEdit ? 'Edit Subject' : 'Create Subject'} />
        <DrawerItems>
          <div className="space-y-6 p-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description </Label>
              <TextInput id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <TextInput id="code" name="code" value={formData.code} onChange={handleInputChange} />
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

export default SubjectsSection;