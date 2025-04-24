export const BASE_URL = import.meta.env.VITE_BASE_URL

const AUTH_PATH = "api/auth";

export const RouteConstant = {
    LOGIN: `${BASE_URL}/${AUTH_PATH}/login`,
    SIGN_UP: `${BASE_URL}/${AUTH_PATH}/signup`,
    LOGOUT: `${BASE_URL}/${AUTH_PATH}/logout`,
    USERS: `${BASE_URL}/users`,
}