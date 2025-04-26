import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function FinalGradeTableView(props) {
  const { data } = props;

  return (
    <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            No.
          </th>
          <th scope="col" className="px-6 py-3">
            Aspek Penilaian
          </th>
          <th scope="col" className="w-28 px-3 truncate">
            Skor (1-100)
          </th>
          <th scope="col" className="w-72 px-3 truncate">
            Deskripsi Penilaian
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length != 0 ? (
          data
            .reduce((acc, item) => {
              const kelompokIndex = acc.findIndex(
                (group) =>
                  group.kelompok_penilaian ===
                  item.aspek_penilaian?.kelompok_penilaian
              );
              if (kelompokIndex === -1) {
                acc.push({
                  kelompok_penilaian: item.aspek_penilaian?.kelompok_penilaian,
                  items: [item],
                });
              } else {
                acc[kelompokIndex].items.push(item);
              }
              return acc;
            }, [])
            .map((group, groupIndex) => (
              <>
                <tr className="bg-gray-200 dark:bg-gray-700" key={groupIndex}>
                  <td colSpan={5} className="px-6 py-4 text-left font-bold">
                    {group.kelompok_penilaian}
                  </td>
                </tr>
                {group.items.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-left">
                      {item.aspek_penilaian?.judul}
                    </td>
                    <td className="w-28 px-3">{item.nilai || "0"}</td>
                    <td className=" w-72 p-3 text-left">{item.keterangan}</td>
                  </tr>
                ))}
              </>
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
  );
}

FinalGradeTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  setData: PropTypes.any,
  handlePresensi: PropTypes.func,
  setBulan: PropTypes.any,
  bulan: PropTypes.any,
  setTahun: PropTypes.any,
  tahun: PropTypes.any,
};
