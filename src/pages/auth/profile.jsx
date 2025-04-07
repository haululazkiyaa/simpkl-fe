import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Input from "../../components/Elements/Input";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("tentangku");

  const tabClass = (tab) =>
    `inline-block p-4 border-b-2 rounded-t-lg ${
      activeTab === tab
        ? "text-blue-600 border-blue-600"
        : "border-transparent hover:text-gray-600 hover:border-gray-300"
    }`;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Profile Pengguna</h1>
        <p className="text-gray-500 mb-6">
          Anda dapat melihat data diri anda dengan jelas dan detail di halaman
          ini.
        </p>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">
                Muhammad Ghaziveda Belvanaufal
              </h2>
              <p className="text-sm text-gray-500">
                Bergabung Kamis, 28 April 2025, 02:23 AM
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul
          className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200"
          role="tablist"
        >
          <li className="me-2">
            <button
              className={tabClass("tentangku")}
              onClick={() => setActiveTab("tentangku")}
            >
              Tentangku
            </button>
          </li>
          <li className="me-2">
            <button
              className={tabClass("pembimbing")}
              onClick={() => setActiveTab("pembimbing")}
            >
              Pembimbing
            </button>
          </li>
          <li>
            <button
              className={tabClass("perusahaan")}
              onClick={() => setActiveTab("perusahaan")}
            >
              Perusahaan
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "tentangku" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value="Muhammad"
                readOnly
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value="Ghaziveda Belvanaufal"
                readOnly
              />
              <Input
                label="NIP/NIS"
                type="text"
                name="nip"
                id="nip"
                placeholder="NIP/NIS"
                value="1302220011"
                readOnly
              />
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value="belvanaufal@student.telkomuniversity.ac.id"
                readOnly
              />
              <Input
                label="Departement"
                type="text"
                name="department"
                id="department"
                placeholder="Department"
                value="Software Engineering"
                readOnly
              />
              <Input
                label="Phone Number"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                value="082295903760"
                readOnly
              />
              <Input
                label="Address"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value="Pesona Bali Blok12 No.17, Bojongsoang, Bandung, Indonesia"
                readOnly
              />
            </div>
          )}

          {activeTab === "pembimbing" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value="Justin"
                readOnly
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value="Ole Romeny Bahar"
                readOnly
              />
              <Input
                label="NIP/NIS"
                type="text"
                name="nip"
                id="nip"
                placeholder="NIP/NIS"
                value="1302220011"
                readOnly
              />
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value="justinole@telkomuniversity.ac.id"
                readOnly
              />
              <Input
                label="Address"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value="Amsterdam, BlokZ No.21, Netherland"
                readOnly
              />
            </div>
          )}

          {activeTab === "perusahaan" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Company Name"
                value="PT. Teknologi Nusantara"
                readOnly
              />
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value="contact@teknologi-nusantara.com"
                readOnly
              />
              <Input
                label="Phone"
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                value="+62 812 3456 7890"
                readOnly
              />
              <Input
                label="Address"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value="Jl. Teknologi No.99, Jakarta Selatan, Indonesia"
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
