import { axiosReq } from "../axios.service";

// Add the new function for student profile
export const getStudentProfile = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/auth/profile-siswa`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getAdminProfile = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/auth/profile-admin`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getSupervisorProfile = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/auth/profile-guru`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const changePassword = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/auth/update-password`, data, {
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
