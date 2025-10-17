"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableBody, TableCell, TableRow }  from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from "@/components/Header";
import { HiUser } from "react-icons/hi";
import { FaBuilding, FaGraduationCap, FaQuestion } from "react-icons/fa";
import SubjectsSection from "@/components/SubjectsSection";
import ExamSection from "@/components/ExamSection";
import QuestionsSection from "@/components/QuestionsSection";
import AppSidebar from "@/components/App-Sidebar";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activePersonnelTab, setActivePersonnelTab] = useState("pilots");
  const [activeCompanyTab, setActiveCompanyTab] = useState("airlines");

  const handleMenuClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard flex">
      <AppSidebar />
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
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
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
      </div>
    </div>
  );
}
