import { useEffect, useState } from "react";

import Modal from "../../../components/Elements/Modal/index.jsx";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function SupervisorDailyMonitoringJournalView(props) {
  const { data, selected } = props;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    setDetail(data?.find(({ id }) => id === selected?.id));
  }, [data, selected]);

  return (
    <Modal title="Detail Jurnal Harian Siswa">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {detail != null ? (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Hari/Tanggal
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.hari},{" "}
                    {new Date(detail.tanggal).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Jenis Pekerjaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.jenis_pekerjaan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Deskripsi Pekerjaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.deskripsi_pekerjaan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Bentuk Kegiatan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.bentuk_kegiatan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Jam Mulai
                  </th>
                  <td className="px-6 py-4 text-left">
                    :{
                        " " + selected.jam_mulai + " "
                    }
                    WIB
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Jam Selesai
                  </th>
                  <td className="px-6 py-4 text-left">
                    :{
                        " " + selected.jam_selesai + " "
                    }
                    WIB
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Staff Yang Menugaskan
                  </th>
                  <td className="px-6 py-4 text-left">: {detail.staf}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Foto Kegiatan
                  </th>
                  <td className="px-6 py-4 text-left">
                    <img src={detail.foto} alt="Foto Kegiatan" />
                  </td>
                </tr>
              </>
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
    </Modal>
  );
}

SupervisorDailyMonitoringJournalView.propTypes = {
  data: PropTypes.any,
  selected: PropTypes.any,
};
