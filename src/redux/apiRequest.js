import axios from "axios";
import { loginFailed, loginResetError, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";


export const loginUser  = async(user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
    const res = await axios.post("https://auth-server-fmp.vercel.app/auth/login", user, {
        withCredentials: true
    });
   
    dispatch(loginSuccess(res.data)); 
    localStorage.setItem('jwt', JSON.stringify(res.data.data)
    )
    navigate("/");
    return null;
} catch (error) {
    dispatch(loginFailed(error.response.data.message));
    return error.response.data.message;
}
}

export const resetLoginError = () => {
    return (dispatch) => {
        dispatch(loginResetError());
    };
};

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("https://auth-server-fmp.vercel.app/auth/register", user, {
            withCredentials: true
        })
        dispatch(registerSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const logOut = async(dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart())
    try {
        await axiosJWT.post("https://auth-server-fmp.vercel.app/auth/logout",{}, {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
            },
            withCredential: true

        })
        localStorage.removeItem('jwt')
        dispatch(logoutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed())
    }
} 