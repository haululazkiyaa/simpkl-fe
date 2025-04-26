import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getSiswa = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/siswa/all`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};

export const addSiswa = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/siswa/create`, data, {
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

export const updateSiswa = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/siswa/update`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};

export const setSiswa = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/siswa/status`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
};

export const deleteSiswa = async (data, token, callback) => {
  await axiosReq
    .delete(`${import.meta.env.VITE_API_URL}/siswa/delete`, {
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.message);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};

export const importExcelSiswa = async (formData, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/siswa/import-excel`, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      callback(true, res.data.message);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};
