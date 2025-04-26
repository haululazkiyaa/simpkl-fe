import Button from "../../../components/Elements/Button/index.jsx";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function SupervisorMonthlyAssesmentTableView(props) {
  const { data, setSelected } = props;

  const initStaticModal = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                NIS / NISN
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Siswa
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Instruktur
              </th>
              <th scope="col" className="w-32 px-3">
                Nilai Siswa
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 truncate text-left">
                    {item.siswa?.nis} / {item.siswa?.nisn}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.siswa?.nama}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.perusahaan?.nama_perusahaan}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.instruktur?.nama}
                  </td>
                  <td className="w-32 px-3">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="primary"
                        onClick={() => initStaticModal(item)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
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
    </>
  );
}

SupervisorMonthlyAssesmentTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};
