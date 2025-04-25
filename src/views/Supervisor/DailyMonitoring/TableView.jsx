import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Input from "../../../components/Elements/Input/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { setStatusJurnal } from "../../../services/supervisor/supervisor-monitoring.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function SupervisorDailyMonitoringTableView(props) {
  const { data, selected, handleDataHarian, setSelected, tanggal, setTanggal } =
    props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();
  const [note, setNote] = useState("");

  const handleStatusJurnal = (option) => {
    setProgress(30);

    console.log(selected);
    const data = {
      id: selected.id,
      status: option,
      catatan_pembimbing: note,
    };

    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        setStatusJurnal(data, token, (status, message) => {
          if (status) {
            toast.success(message, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleDataHarian();
            setNote("");
          } else {
            toast.error(message, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
  };

  const initStaticModal = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal").click();
  };

  const initModal1 = (item) => {
    setSelected(item);
    setNote(item.catatan_pembimbing || "");
    console.log(selected);
    document.getElementById("init-modal1").click();
  };

  const initModal2 = (item) => {
    setSelected(item);
    setNote(item.catatan_pembimbing || "");
    document.getElementById("init-modal2").click();
  };

  // const initStaticModal1 = (item) => {
  //   setSelected(item);
  //   document.getElementById("init-static-modal1").click();
  // };

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className={`md:flex justify-between`}>
        <div className="space-x-2 flex items-center justify-center mb-5">
          <label className="text-black font-bold dark:text-white">
            Pilih Tanggal:
          </label>
          <Input
            type="date"
            name="tanggal"
            id="tanggal"
            placeholder="Masukan tanggal jurnal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required={true}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Siswa
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="w-32 px-3">
                Jurnal Harian
              </th>
              <th scope="col" className="w-32 px-3">
                Catatan Anda
              </th>
              <th scope="col" className="w-32 px-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="w-16 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.siswa?.nama}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.perusahaan?.nama_perusahaan}
                  </td>
                  <td className="w-32 px-3">
                    <div className="flex items-center justify-center">
                      <Button
                        outline={true}
                        onClick={() => initStaticModal(item)}
                      >
                        <i className="fa-solid fa-eye mr-2"></i>Lihat
                      </Button>
                    </div>
                  </td>
                  <td className="w-32 px-3">
                    <div className="flex items-center justify-center">
                      {item.catatan_pembimbing
                        ? item.catatan_pembimbing
                        : "Tidak ada catatan"}
                    </div>
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.status.toUpperCase() === "MENUNGGU" ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="green"
                          onClick={() => initModal1(item)}
                        >
                          <i className="fa-solid fa-check"></i>
                        </Button>
                        <Button variant="red" onClick={() => initModal2(item)}>
                          <i className="fa-solid fa-xmark"></i>
                        </Button>
                      </div>
                    ) : (
                      item.status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <NotFound />
                  <h3 className="text-xl text-black font-bold mb-5 dark:text-white">
                    Opps! Belum ada data apapun!
                  </h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        desc={`Apakah anda yakin menyetujui jurnal ini?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusJurnal("Diterima")}
        id="1"
        showTextArea={true}
        onNoteChange={(e)=>setNote(e.target.value)}
        initialNote={note}
        noteLabel="Catatan Pembimbing"
      />
      <ConfirmModal
        desc={`Apakah anda yakin menolak jurnal ini?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusJurnal("Ditolak")}
        id="2"
        showTextArea={true}
        onNoteChange={(e)=>setNote(e.target.value)}
        initialNote={note}
        noteLabel="Catatan Pembimbing"
      />
    </>
  );
}

SupervisorDailyMonitoringTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
  tanggal: PropTypes.any,
  setTanggal: PropTypes.any,
  handleDataHarian: PropTypes.func,
  selected: PropTypes.any,
};
