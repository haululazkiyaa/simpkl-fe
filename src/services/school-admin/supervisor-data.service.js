import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getPembimbing = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/guru-pembimbing/all`, {
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

export const addPembimbing = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/guru-pembimbing/create`, data, {
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

export const updatePembimbing = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/guru-pembimbing/update`, data, {
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

export const setPembimbing = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/guru-pembimbing/status`, data, {
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

export const deletePembimbing = async (data, token, callback) => {
  await axiosReq
    .delete(`${import.meta.env.VITE_API_URL}/guru-pembimbing/delete`, {
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

export const importExcelGuru = async (formData, token, callback) => {
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
