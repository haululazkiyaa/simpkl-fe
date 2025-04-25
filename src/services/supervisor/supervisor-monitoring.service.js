import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getJurnalPembimbing = async (filterDate, token, callback) => {
  await axiosReq
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/jurnal-harian/bimbingan/get?tanggal=${filterDate}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};

export const addCatatanPembimbing = async (data, token, callback) => {
  await axiosReq
    .post(
      `${import.meta.env.VITE_API_URL}/jurnal-harian/bimbingan/postCatatan`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};

export const setStatusJurnal = async (data, token, callback) => {
  console.log(data);
  await axiosReq
    .post(
      `${import.meta.env.VITE_API_URL}/jurnal-harian/approval-guru`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
};
