import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useMemo, useState } from "react";

import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import { deleteJurusan } from "../../../services/school-admin/major-management.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MajorManagementTableView(props) {
  const { data, handleJurusan, selected, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleDeleteJurusan = () => {
    setProgress(30);
    const requestData = {
      id: selected.id,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        deleteJurusan(requestData, token, (status, message) => {
          if (status) {
            toast.success(message, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleJurusan();
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

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  const initModal = (item) => {
    setSelected(item);
    document.getElementById("init-modal").click();
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((_, index) => index + 1, {
        id: "no",
        header: "No.",
        cell: (info) => (
          <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {info.getValue()}
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("bidang_keahlian", {
        header: "Bidang Keahlian",
        cell: (info) => (
          <div className="text-left truncate max-w-xs">
            {info.getValue() ?? "-"}
          </div>
        ),
      }),
      columnHelper.accessor("program_keahlian", {
        header: "Program Keahlian",
        cell: (info) => (
          <div className="text-left truncate max-w-xs">
            {info.getValue() ?? "-"}
          </div>
        ),
      }),
      columnHelper.accessor("kompetensi_keahlian", {
        header: "Kompetensi Keahlian (INTI)",
        cell: (info) => (
          <div className="text-left truncate max-w-xs">
            {info.getValue() ?? "-"}
          </div>
        ),
      }),
      columnHelper.accessor("id", {
        id: "edit",
        header: "Edit",
        cell: (info) => (
          <div className="flex items-center justify-center">
            <Button
              variant="yellow"
              onClick={() => updateDrawer(info.row.original)}
            >
              <i className="fa-solid fa-pen"></i>
            </Button>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("id", {
        id: "delete",
        header: "Hapus",
        cell: (info) => (
          <div className="flex items-center justify-center">
            <Button variant="red" onClick={() => initModal(info.row.original)}>
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [columnHelper]
  );

  const tableData = useMemo(() => data || [], [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter: searchTerm,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (!data) return null;

  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="relative w-full md:w-96 mb-4 md:mb-0">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari data jurusan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="rows-per-page">Jumlah data:</label>
          <select
            id="rows-per-page"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-3 ${
                      header.id === "no" ? "w-16 px-3" : ""
                    } ${
                      ["edit", "delete"].includes(header.id) ? "w-16 px-3" : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span>
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] || ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 ${
                        cell.column.id === "no" ? "w-16 px-3" : ""
                      } ${
                        ["edit", "delete"].includes(cell.column.id)
                          ? "w-16 px-3"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
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

      {tableData.length > 0 && (
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block md:inline">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                tableData.length
              )}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {tableData.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${
                  !table.getCanPreviousPage()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Sebelumnya
              </button>
            </li>
            {table.getPageCount() <= 7 ? (
              // Show all pages if there are 7 or fewer
              [...Array(table.getPageCount())].map((_, pageIdx) => (
                <li key={pageIdx}>
                  <button
                    onClick={() => table.setPageIndex(pageIdx)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      table.getState().pagination.pageIndex === pageIdx
                        ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {pageIdx + 1}
                  </button>
                </li>
              ))
            ) : (
              // Show limited pages for larger page counts
              <>
                {table.getState().pagination.pageIndex > 1 && (
                  <li>
                    <button
                      onClick={() => table.setPageIndex(0)}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </button>
                  </li>
                )}
                {table.getState().pagination.pageIndex > 2 && (
                  <li>
                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                      ...
                    </span>
                  </li>
                )}
                {table.getState().pagination.pageIndex > 0 && (
                  <li>
                    <button
                      onClick={() =>
                        table.setPageIndex(
                          table.getState().pagination.pageIndex - 1
                        )
                      }
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {table.getState().pagination.pageIndex}
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() =>
                      table.setPageIndex(table.getState().pagination.pageIndex)
                    }
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    {table.getState().pagination.pageIndex + 1}
                  </button>
                </li>
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 1 && (
                  <li>
                    <button
                      onClick={() =>
                        table.setPageIndex(
                          table.getState().pagination.pageIndex + 1
                        )
                      }
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {table.getState().pagination.pageIndex + 2}
                    </button>
                  </li>
                )}
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 3 && (
                  <li>
                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                      ...
                    </span>
                  </li>
                )}
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 2 && (
                  <li>
                    <button
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {table.getPageCount()}
                    </button>
                  </li>
                )}
              </>
            )}
            <li>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
                  !table.getCanNextPage()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Selanjutnya
              </button>
            </li>
          </ul>
        </nav>
      )}

      <ConfirmModal
        desc={`Apakah anda yakin ingin hapus jurusan ${selected?.kompetensi_keahlian}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleDeleteJurusan()}
      />
    </>
  );
}

MajorManagementTableView.propTypes = {
  data: PropTypes.array,
  handleJurusan: PropTypes.func,
  selected: PropTypes.object,
  setSelected: PropTypes.func,
  id: PropTypes.string,
};
