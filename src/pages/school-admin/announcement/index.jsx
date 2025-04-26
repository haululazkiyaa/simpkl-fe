import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import AnnouncementDataAddDrawerView from "../../../views/SchoolAdmin/Announcement/AddDrawerView";
import AnnouncementDataTableView from "../../../views/SchoolAdmin/Announcement/TableView";
import AnnouncementDataUpdateDrawerView from "../../../views/SchoolAdmin/Announcement/UpdateDrawerView";
import { getAnnouncement } from "../../../services/school-admin/announcement-data.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminAnnouncementDataPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataPengumuman = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getAnnouncement(token, (status, data) => {
          if (status) {
            setData(data);
          }
        });
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  }, [setProgress, navigate]);

  useEffect(() => {
    handleDataPengumuman();
  }, [handleDataPengumuman]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Data Pengumuman</h1>
        <p>
          Anda dapat melihat data Pengumuman yang sudah ada, menambahkan,
          mengubah data dan status aktif, serta menghapus data Pengumuman.
        </p>
        <div className="not-format">
          <div className="mb-5">
            <AnnouncementDataAddDrawerView
              handleDataPengumuman={handleDataPengumuman}
              id="0"
            />
          </div>
          <AnnouncementDataTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleDataPengumuman={handleDataPengumuman}
          />
          <AnnouncementDataUpdateDrawerView
            handleDataPengumuman={handleDataPengumuman}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
