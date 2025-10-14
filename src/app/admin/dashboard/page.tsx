"use client";
import { useState } from "react";
import {
  Button,
  TabItem,
  Card,
  Table,
  Tabs,
  Checkbox,
  Select,
  TextInput,
  Label,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
} from "flowbite-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { HiUser } from "react-icons/hi";
import { FaBuilding, FaGraduationCap, FaQuestion } from "react-icons/fa";
import SubjectsSection from "@/components/SubjectsSection";
import ExamSection from "@/components/ExamSection";
import QuestionsSection from "@/components/QuestionsSection";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activePersonnelTab, setActivePersonnelTab] = useState("pilots");
  const [activeCompanyTab, setActiveCompanyTab] = useState("airlines");

  const handleMenuClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard flex">
      <Sidebar activeMenu={activeSection} onMenuClick={handleMenuClick} />
      <div className="main-content flex-1 p-5">
        <Header />
        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div className="content-section active" id="dashboard-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-5 pb-3 border-b-2 border-light">
              Dashboard Overview
            </h2>
            <div className="dashboard-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <Card className="card hover:-translate-y-1 transition-transform p-2">
                <div className="card-header flex justify-between items-center mb-2">
                  <h3 className="card-title text-lg font-semibold text-dark">
                    Total Personnel
                  </h3>
                  <div className="card-icon w-12 h-12 bg-light rounded-lg flex items-center justify-center text-primary text-2xl">
                    <HiUser />
                  </div>
                </div>
                <div className="card-value text-3xl font-bold text-primary">
                  187
                </div>
                <p className="card-text text-sm text-gray-600">
                  Registered aviation professionals
                </p>
              </Card>
              {/* Add other cards similarly */}
              <Card className="card hover:-translate-y-1 transition-transform">
                <div className="card-header flex justify-between items-center mb-2">
                  <h3 className="card-title text-lg font-semibold text-dark">
                    Companies
                  </h3>
                  <div className="card-icon w-12 h-12 bg-light rounded-lg flex items-center justify-center text-primary text-2xl">
                    <FaBuilding />
                  </div>
                </div>
                <div className="card-value text-3xl font-bold text-primary">
                  24
                </div>
                <p className="card-text text-sm text-gray-600">
                  Registered aviation companies
                </p>
              </Card>
              <Card className="card hover:-translate-y-1 transition-transform">
                <div className="card-header flex justify-between items-center mb-2">
                  <h3 className="card-title text-lg font-semibold text-dark">
                    Exam Categories
                  </h3>
                  <div className="card-icon w-12 h-12 bg-light rounded-lg flex items-center justify-center text-primary text-2xl">
                    <FaGraduationCap />
                  </div>
                </div>
                <div className="card-value text-3xl font-bold text-primary">
                  12
                </div>
                <p className="card-text text-sm text-gray-600">
                  Different certification types
                </p>
              </Card>
              <Card className="card hover:-translate-y-1 transition-transform">
                <div className="card-header flex justify-between items-center mb-">
                  <h3 className="card-title text-lg font-semibold text-dark">
                    Questions
                  </h3>
                  <div className="card-icon w-12 h-12 bg-light rounded-lg flex items-center justify-center text-primary text-2xl">
                    <FaQuestion />
                  </div>
                </div>
                <div className="card-value text-3xl font-bold text-primary">
                  1,579
                </div>
                <p className="card-text text-sm text-gray-600">
                  Questions in the database
                </p>
              </Card>
            </div>
            <div className="recent-activity">
              <h3 className="section-title text-xl font-semibold text-primary mb-5 pb-3 border-b-2 border-light">
                Recent Activity
              </h3>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Date</TableHeadCell>
                    <TableHeadCell>Activity</TableHeadCell>
                    <TableHeadCell>User</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>15 Oct 2023</TableCell>
                    <TableCell>Added new ATC controller</TableCell>
                    <TableCell>Admin User</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                  {/* Add other rows */}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Personnel Management Section */}
        {activeSection === "personnel" && (
          <div className="content-section active" id="personnel-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-5 pb-3 border-b-2 border-light">
              Personnel Management
            </h2>
            <Tabs
              aria-label="Personnel tabs"
              onActiveTabChange={(tab) =>
                setActivePersonnelTab(
                  [
                    "pilots",
                    "mechanics",
                    "attendants",
                    "marshals",
                    "instructors",
                    "atc",
                  ][tab],
                )
              }
            >
              <TabItem title="Pilots" active={activePersonnelTab === "pilots"}>
                <h3 className="text-xl mb-4">Pilot Profiles</h3>
                <div className="form-row flex gap-5 mb-5">
                  <div className="form-group flex-1">
                    <Label htmlFor="pilot-name">Full Name</Label>
                    <TextInput id="pilot-name" placeholder="Enter full name" />
                  </div>
                  <div className="form-group flex-1">
                    <Label htmlFor="pilot-license">License Number</Label>
                    <TextInput
                      id="pilot-license"
                      placeholder="Enter license number"
                    />
                  </div>
                </div>
                <div className="form-row flex gap-5 mb-5">
                  <div className="form-group flex-1">
                    <Label htmlFor="pilot-type">Aircraft Type</Label>
                    <Select id="pilot-type">
                      <option value="">Select Aircraft Type</option>
                      <option value="fixed-wing">Fixed Wing</option>
                      {/* Add options */}
                    </Select>
                  </div>
                  <div className="form-group flex-1">
                    <Label htmlFor="license-type">License Type</Label>
                    <Select id="license-type">
                      <option value="">Select License Type</option>
                      <option value="spl">SPL (Student Pilot License)</option>
                      {/* Add options */}
                    </Select>
                  </div>
                </div>
                <div className="form-group mb-5">
                  <Label>Ratings</Label>
                  <div className="checkbox-group grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    <div className="checkbox-item flex items-center">
                      <Checkbox id="rating-instrument" />
                      <Label htmlFor="rating-instrument" className="ml-2">
                        Instrument Rating
                      </Label>
                    </div>
                    {/* Add other checkboxes */}
                  </div>
                </div>
                <div className="form-group mb-5">
                  <Label htmlFor="type-rating">
                    Type Rating (if applicable)
                  </Label>
                  <TextInput
                    id="type-rating"
                    placeholder="e.g., Boeing 737, Airbus A320"
                  />
                </div>
                <Button className="btn-primary bg-primary hover:bg-[#0e3a5a]">
                  Create Pilot Profile
                </Button>
                <Table className="mt-5">
                  <TableHead>
                    <TableRow>
                      <TableHeadCell>Name</TableHeadCell>
                      <TableHeadCell>License No.</TableHeadCell>
                      <TableHeadCell>Aircraft Type</TableHeadCell>
                      <TableHeadCell>License Type</TableHeadCell>
                      <TableHeadCell>Ratings</TableHeadCell>
                      <TableHeadCell>Actions</TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Smith</TableCell>
                      <TableCell>PPL-234567</TableCell>
                      <TableCell>Fixed Wing</TableCell>
                      <TableCell>PPL</TableCell>
                      <TableCell>Night, Seaplane</TableCell>
                      <TableCell>
                        <Button size="xs" className="btn-edit bg-info mr-2">
                          Edit
                        </Button>
                        <Button size="xs" className="btn-delete bg-accent">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                    {/* Add other rows */}
                  </TableBody>
                </Table>
              </TabItem>
              {/* Add other tabs for mechanics, attendants, etc., similarly */}
            </Tabs>
          </div>
        )}

        {/* Company Management Section */}
        {activeSection === "company" && (
          <div className="content-section active" id="company-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-5 pb-3 border-b-2 border-light">
              Company Management
            </h2>
            <Tabs
              aria-label="Company tabs"
              // style="underline"
              onActiveTabChange={(tab) =>
                setActiveCompanyTab(
                  ["airlines", "schools", "maintenance", "other"][tab],
                )
              }
            >
              <TabItem
                title="Airlines"
                active={activeCompanyTab === "airlines"}
              >
                <h3 className="text-xl mb-4">Airline Companies</h3>
                <div className="form-row flex gap-5 mb-5">
                  <div className="form-group flex-1">
                    <Label htmlFor="airline-name">Company Name</Label>
                    <TextInput
                      id="airline-name"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="form-group flex-1">
                    <Label htmlFor="airline-code">ICAO/IATA Code</Label>
                    <TextInput
                      id="airline-code"
                      placeholder="Enter ICAO/IATA code"
                    />
                  </div>
                </div>
                {/* Add other form fields similarly */}
                <Button className="btn-primary bg-primary hover:bg-[#0e3a5a]">
                  Create Airline Profile
                </Button>
              </TabItem>
              {/* Add other company tabs */}
            </Tabs>
          </div>
        )}

        {/* Subject Management Section */}
        {activeSection === "subjects" && (
          <div className="content-section active" id="subjects-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-2 pb-3 border-b-2 border-light">
              Subject Management
            </h2>
            <SubjectsSection/>
          </div>
        )}

        {/* Exams & Certifications Section */}
        {activeSection === "exams" && (
          <div className="content-section active" id="exams-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-2 pb-3 border-b-2 border-light">
              Exams & Certifications
            </h2>
            <ExamSection/>
          </div>
        )}


        {/* Subject Management Section */}
        {activeSection === "questions" && (
          <div className="content-section active" id="questions-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-2 pb-3 border-b-2 border-light">
              Question Management
            </h2>
            <QuestionsSection/>
          </div>
        )}

        {/* Reports Section */}
        {activeSection === "reports" && (
          <div className="content-section active" id="reports-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-2 pb-3 border-b-2 border-light">
              Reports
            </h2>
            <p>
              Generate and view various reports related to personnel, exams, and
              training progress.
            </p>
            {/* Add report content */}
          </div>
        )}

        {/* Settings Section */}
        {activeSection === "settings" && (
          <div className="content-section active" id="settings-section">
            <h2 className="section-title text-2xl font-semibold text-primary mb-5 pb-3 border-b-2 border-light">
              Settings
            </h2>
            <p>System configuration and user management settings.</p>
            {/* Add settings content */}
          </div>
        )}
      </div>
    </div>
  );
}
