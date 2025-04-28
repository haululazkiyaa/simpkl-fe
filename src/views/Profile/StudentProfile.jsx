import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/Elements/Input";
import Logout from "../../components/Elements/Logout";
import { getStudentProfile } from "../../services/auth/profile.service";
import { refreshToken } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
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
        getStudentProfile(token, (success, data) => {
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
  const pembimbingData = profileData.guru_pembimbing;
  const perusahaanData = profileData.perusahaan;

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
              label="Nama"
              type="text"
              name="nama"
              id="nama"
              placeholder="Nama"
              value={siswaData?.nama || ""}
              readOnly
            />
            <Input
              label="NIS"
              type="text"
              name="nis"
              id="nis"
              placeholder="NIS"
              value={siswaData?.nis || ""}
              readOnly
            />
            <Input
              label="NISN"
              type="text"
              name="nisn"
              id="nisn"
              placeholder="NISN"
              value={siswaData?.nisn || ""}
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
              label="Tempat Lahir"
              type="text"
              name="tempat_lahir"
              id="tempat_lahir"
              placeholder="Tempat Lahir"
              value={siswaData?.tempat_lahir || ""}
              readOnly
            />
            <Input
              label="Tanggal Lahir"
              type="text"
              name="tanggal_lahir"
              id="tanggal_lahir"
              placeholder="Tanggal Lahir"
              value={siswaData?.tanggal_lahir}
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

        {activeTab === "pembimbing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pembimbingData ? (
              <>
                <Input
                  label="Nama"
                  type="text"
                  name="pembimbing_nama"
                  id="pembimbing_nama"
                  placeholder="Nama"
                  value={pembimbingData.nama || ""}
                  readOnly
                />
                <Input
                  label="NIP"
                  type="text"
                  name="pembimbing_nip"
                  id="pembimbing_nip"
                  placeholder="NIP"
                  value={pembimbingData.nip || ""}
                  readOnly
                />
                <Input
                  label="Nomor HP"
                  type="text"
                  name="pembimbing_no_hp"
                  id="pembimbing_no_hp"
                  placeholder="Nomor HP"
                  value={pembimbingData.no_hp || ""}
                  readOnly
                />
                <Input
                  label="Alamat"
                  type="text"
                  name="pembimbing_alamat"
                  id="pembimbing_alamat"
                  placeholder="Alamat"
                  value={pembimbingData.alamat || ""}
                  readOnly
                />
              </>
            ) : (
              <div className="col-span-2">
                <p className="text-gray-500">Data pembimbing belum tersedia.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "perusahaan" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perusahaanData ? (
              <>
                <Input
                  label="Nama Perusahaan"
                  type="text"
                  name="perusahaan_nama"
                  id="perusahaan_nama"
                  placeholder="Nama Perusahaan"
                  value={perusahaanData.nama_perusahaan || ""}
                  readOnly
                />
                <Input
                  label="Pimpinan"
                  type="text"
                  name="perusahaan_pimpinan"
                  id="perusahaan_pimpinan"
                  placeholder="Pimpinan"
                  value={perusahaanData.pimpinan || ""}
                  readOnly
                />
                <Input
                  label="Email"
                  type="email"
                  name="perusahaan_email"
                  id="perusahaan_email"
                  placeholder="Email"
                  value={perusahaanData.email || ""}
                  readOnly
                />
                <Input
                  label="Nomor HP"
                  type="text"
                  name="perusahaan_no_hp"
                  id="perusahaan_no_hp"
                  placeholder="Nomor HP"
                  value={perusahaanData.no_hp || ""}
                  readOnly
                />
                <Input
                  label="Website"
                  type="text"
                  name="perusahaan_website"
                  id="perusahaan_website"
                  placeholder="Website"
                  value={perusahaanData.website || ""}
                  readOnly
                />
                <Input
                  label="Alamat"
                  type="text"
                  name="perusahaan_alamat"
                  id="perusahaan_alamat"
                  placeholder="Alamat"
                  value={perusahaanData.alamat || ""}
                  readOnly
                />
              </>
            ) : (
              <div className="col-span-2">
                <p className="text-gray-500">Data perusahaan belum tersedia.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
