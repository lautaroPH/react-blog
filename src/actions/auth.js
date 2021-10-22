import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";
import { blogLogout } from "./post";

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken("auth", { email, password }, "POST");
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                surname: body.surname
            }))
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    }
}

export const startRegister = (email, password, name, surname) => {
    return async (dispatch) => {

        const resp = await fetchSinToken("auth/register", { email, password, name, surname }, "POST");
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                surname: body.surname
            }))
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {


        const isCurrentToken = !!(localStorage.getItem('token') || '');

        if (!isCurrentToken) {
            dispatch(checkingFinish());
            return;
        }

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                surname: body.surname
            }))
        } else {
            dispatch(checkingFinish());
        }
    }

}

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout())
        dispatch(blogLogout())
    }
}

const logout = () => ({ type: types.authLogout })

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

