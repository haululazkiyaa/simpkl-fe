import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import { Flip, ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthContextProvider from "./context/AuthContext.jsx";
import CompanyAdminGuidanceGroupPage from "./pages/company-admin/guidance-group/index.jsx";
import CompanyAdminInstructorDataPage from "./pages/company-admin/instructor-data/index.jsx";
import CompanyAdminInstructorStudentDataPage from "./pages/company-admin/instructor-data/students/index.jsx";
import CompanyAdminPage from "./pages/company-admin/index.jsx";
import CompanyAdminProfilePage from "./pages/company-admin/profile.jsx/index.jsx";
import DashboardPage from "./pages/dashboard/index.jsx";
import ErrorPage from "./pages/error.jsx";
import InstructorDailyMonitoringPage from "./pages/instructor/daily-monitoring/index.jsx";
import InstructorMonthlyMonitoringPage from "./pages/instructor/monthly-monitoring/index.jsx";
import InstructorPage from "./pages/instructor/index.jsx";
import LoginPage from "./pages/auth/login.jsx";
import ProfilePage from "./pages/auth/profile.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterPage from "./pages/auth/regsiter.jsx";
import SchoolAdminAssesmentPage from "./pages/school-admin/assesment/index.jsx";
import SchoolAdminCompanyDataPage from "./pages/school-admin/company-data/index.jsx";
import SchoolAdminGuidanceGroupPage from "./pages/school-admin/guidance-group/index.jsx";
import SchoolAdminMajorManagementPage from "./pages/school-admin/major-management/index.jsx";
import SchoolAdminPage from "./pages/school-admin/index.jsx";
import SchoolAdminSettingsPage from "./pages/school-admin/settings/index.jsx";
import SchoolAdminStudentDataPage from "./pages/school-admin/student-data/index.jsx";
import SchoolAdminSupervisorDataPage from "./pages/school-admin/supervisor-data/index.jsx";
import StudentDailyJournalPage from "./pages/student/daily-journal/index.jsx";
import StudentFinalGradePage from "./pages/student/final-grade/index.jsx";
import StudentMonthlyGradePage from "./pages/student/monthly-grade/index.jsx";
import StudentMonthlyJournalPage from "./pages/student/monthly-journal/index.jsx";
import StudentPage from "./pages/student/index.jsx";
import StudentPresencePage from "./pages/student/presence/index.jsx";
import SupervisorFinalAssesmentPage from "./pages/supervisor/final-assesment/index.jsx";
import SupervisorMonthlyAssesmentPage from "./pages/supervisor/monthly-assesment/index.jsx";
import SupervisorPage from "./pages/supervisor/index.jsx";
import SupervisorPresencePage from "./pages/supervisor/presence/index.jsx";
import SupervisorDailyMonitoringPage from "./pages/supervisor/daily-monitoring/index.jsx"
import SchoolAdminAnnouncementDataPage from "./pages/school-admin/announcement/index.jsx"
import SupervisorMonthlyMonitoringPage from "./pages/instructor/monthly-monitoring/index.jsx";

const router = createBrowserRouter([
  { path: "/", element: <DashboardPage />, errorElement: <ErrorPage /> },
  { path: "profile", element: <ProfilePage /> },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    element: <SchoolAdminPage />,
    children: [
      {
        path: "school-admin/settings",
        element: <SchoolAdminSettingsPage />,
      },
      {
        path: "school-admin/announcements",
        element: <SchoolAdminAnnouncementDataPage />,
      },
      {
        path: "school-admin/major-management",
        element: <SchoolAdminMajorManagementPage />,
      },
      {
        path: "school-admin/company-data",
        element: <SchoolAdminCompanyDataPage />,
      },
      {
        path: "school-admin/supervisor-data",
        element: <SchoolAdminSupervisorDataPage />,
      },
      {
        path: "school-admin/student-data",
        element: <SchoolAdminStudentDataPage />,
      },
      {
        path: "school-admin/guidance-group",
        element: <SchoolAdminGuidanceGroupPage />,
      },
      {
        path: "school-admin/assesment",
        element: <SchoolAdminAssesmentPage />,
      },
    ],
  },
  {
    element: <CompanyAdminPage />,
    children: [
      {
        path: "company-admin/profile",
        element: <CompanyAdminProfilePage />,
      },
      {
        path: "company-admin/instructor-data",
        element: <CompanyAdminInstructorDataPage />,
      },
      {
        path: "company-admin/instructor-data/:InstructorId",
        element: <CompanyAdminInstructorStudentDataPage />,
      },
      {
        path: "company-admin/guidance-group",
        element: <CompanyAdminGuidanceGroupPage />,
      },
    ],
  },
  {
    element: <InstructorPage />,
    children: [
      {
        path: "instructor/daily-monitoring",
        element: <InstructorDailyMonitoringPage />,
      },
      {
        path: "instructor/monthly-monitoring",
        element: <InstructorMonthlyMonitoringPage />,
      },
    ],
  },
  {
    element: <SupervisorPage />,
    children: [
      {
        path: "supervisor/final-assesment",
        element: <SupervisorFinalAssesmentPage />,
      },
      {
        path: "supervisor/monthly-assesment",
        element: <SupervisorMonthlyAssesmentPage />,
      },
      {
        path: "supervisor/presence",
        element: <SupervisorPresencePage />,
      },
      {
        path: "supervisor/daily-monitoring",
        element: <SupervisorDailyMonitoringPage />,
      },
      {
        path: "supervisor/monthly-monitoring",
        element: <SupervisorMonthlyMonitoringPage />,
      },
    ],
  },
  {
    element: <StudentPage />,
    children: [
      {
        path: "student/daily-journal",
        element: <StudentDailyJournalPage />,
      },
      {
        path: "student/monthly-journal",
        element: <StudentMonthlyJournalPage />,
      },
      {
        path: "student/presence",
        element: <StudentPresencePage />,
      },
      {
        path: "student/monthly-grade",
        element: <StudentMonthlyGradePage />,
      },
      {
        path: "student/final-grade",
        element: <StudentFinalGradePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer transition={Flip} position="top-left" theme="colored" />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
