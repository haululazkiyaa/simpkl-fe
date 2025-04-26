import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext.jsx";
import CompanyDataAddDrawerView from "../../../views/SchoolAdmin/CompanyData/AddDrawerView.jsx";
import CompanyDataTableView from "../../../views/SchoolAdmin/CompanyData/TableView.jsx";
import CompanyDataUpdateDrawerView from "../../../views/SchoolAdmin/CompanyData/UpdateDrawerView.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import { getPerusahaan } from "../../../services/company-admin/company-data.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { useNavigate } from "react-router-dom";
import CompanyDetailView from "../../../views/SchoolAdmin/CompanyData/DetailView.jsx";

export default function SchoolAdminCompanyDataPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataPerusahaan = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getPerusahaan(token, (status, data) => {
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
    handleDataPerusahaan();
  }, [handleDataPerusahaan]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Data Perusahaan</h1>
        <p>
          Anda dapat melihat data perusahaan, menambahkan, mengubah data dan
          status aktif, serta mengkonfirmasi status pendaftaran perusahaan.
        </p>
        <div className="not-format">
          <div className="mb-5">
            <CompanyDataAddDrawerView
              handleDataPerusahaan={handleDataPerusahaan}
              id="0"
            />
          </div>
          <CompanyDataTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleDataPerusahaan={handleDataPerusahaan}
          />
          <CompanyDetailView data={data} selected={selected} />
            
          <CompanyDataUpdateDrawerView
            handleDataPerusahaan={handleDataPerusahaan}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
