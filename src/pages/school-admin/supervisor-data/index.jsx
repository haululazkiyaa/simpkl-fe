import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import SupervisorDataAddDrawerView from "../../../views/SchoolAdmin/SupervisorData/AddDrawerView";
import SupervisorDataTableView from "../../../views/SchoolAdmin/SupervisorData/TableView";
import SupervisorDataUpdateDrawerView from "../../../views/SchoolAdmin/SupervisorData/UpdateDrawerView";
import UploadExcelDrawerView from "../../../views/SchoolAdmin/SupervisorData/UploadExcelDrawerView";
import { getPembimbing } from "../../../services/school-admin/supervisor-data.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminSupervisorDataPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataPembimbing = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getPembimbing(token, (status, data) => {
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
    handleDataPembimbing();
  }, [handleDataPembimbing]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Data Pembimbing</h1>
        <p>
          Anda dapat melihat data Guru Pembimbing yang sudah ada, menambahkan,
          mengubah data dan status aktif, serta menghapus data Guru Pembimbing.
        </p>
        <div className="not-format">
          <div className="mb-5 space-x-3">
            <SupervisorDataAddDrawerView
              handleDataPembimbing={handleDataPembimbing}
              id="0"
            />
            <UploadExcelDrawerView
              handleDataSiswa={handleDataPembimbing}
              id="2"
            />
          </div>
          <SupervisorDataTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleDataPembimbing={handleDataPembimbing}
          />
          <SupervisorDataUpdateDrawerView
            handleDataPembimbing={handleDataPembimbing}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
