import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getJurnalHarian = async (filterDate, token, callback) => {
  await axiosReq
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/jurnal-harian/siswa/get-new?tanggal=${filterDate}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.log(res.data.data)
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};

export const updateJurnalHarian = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/jurnal-harian/update`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};

export const addJurnalHarian = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/jurnal-harian/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};

export const deleteJurnalHarian = async (data, token, callback) => {
  console.log(data)
  await axiosReq
    .delete(`${import.meta.env.VITE_API_URL}/jurnal-harian/delete`, {
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};
