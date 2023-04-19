import axios from "axios";

const serverUrl = "https://quickpick.onrender.com/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/user/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

export const addProduct = (productID) => async (dispatch) => {
  try {
    dispatch({ type: "addProductRequest" });

    const { data } = await axios.post(`${serverUrl}/user/cart/${productID}`);
    dispatch({ type: "addProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "addProductFailure", payload: error.response.data.message });
  }
};

export const updateCart = (productID) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductRequest" });

    const { data } = await axios.put(`${serverUrl}/user/cart/${productID}`);
    dispatch({ type: "updateProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProductFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest" });

    const { data } = await axios.delete(`${serverUrl}/api/v1/user/delete`);
    dispatch({ type: "deleteUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateAddress = (formData, addressID) => async (dispatch) => {
  try {
    dispatch({ type: "updateAddressRequest" });

    const { data } = await axios.put(`${serverUrl}/user/address/${addressID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "updateAddressSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateAddressFailure",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/user/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${serverUrl}/user/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        `${serverUrl}/user/updatePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${serverUrl}/user/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "verificationSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/user/forgotPassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.put(
      `${serverUrl}/user/resetPassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};