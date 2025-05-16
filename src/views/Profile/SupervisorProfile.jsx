import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/Elements/Input";
import Logout from "../../components/Elements/Logout";
import { getSupervisorProfile } from "../../services/auth/profile.service";
import { refreshToken } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SupervisorProfile() {
  const [activeTab, setActiveTab] = useState("tentangku");
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProfileData = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getSupervisorProfile(token, (success, data) => {
          if (success) {
            setProfileData(data);
          } else {
            console.error("Failed to fetch profile data");
          }
          setLoading(false);
          setProgress(100);
        });
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
        setProgress(100);
      }
    });
  }, [setProgress, navigate]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const tabClass = (tab) =>
    `inline-block p-4 border-b-2 rounded-t-lg ${
      activeTab === tab
        ? "text-blue-600 border-blue-600"
        : "border-transparent hover:text-gray-600 hover:border-gray-300"
    }`;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Gagal memuat data profil. Silahkan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  const siswaData = profileData.profile[0];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Profile Pengguna</h1>
      <p className="text-gray-500 mb-6">
        Anda dapat melihat data diri anda dengan jelas dan detail di halaman
        ini.
      </p>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src={
              siswaData?.foto ||
              "https://randomuser.me/api/portraits/women/44.jpg"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {siswaData?.nama || "Tidak ada nama"}
            </h2>
            <p className="text-sm text-gray-500">
              Bergabung {siswaData?.createdAt}
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
      </ul>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "tentangku" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nama"
              type="text"
              name="nama"
              id="nama"
              placeholder="Nama"
              value={siswaData?.nama || ""}
              readOnly
            />
            <Input
              label="NIP"
              type="text"
              name="nip"
              id="nip"
              placeholder="NIP"
              value={siswaData?.nip || ""}
              readOnly
            />
            <Input
              label="Nomor HP"
              type="text"
              name="no_hp"
              id="no_hp"
              placeholder="Nomor HP"
              value={siswaData?.no_hp || ""}
              readOnly
            />
            <Input
              label="Alamat"
              type="text"
              name="alamat"
              id="alamat"
              placeholder="Alamat"
              value={siswaData?.alamat || ""}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}
