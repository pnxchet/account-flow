import axios from 'axios';
import { RouteConstant } from '../../data/constant/RouteConstant'

export const callLogin = async (data) => {
    try {
        const response = await axios.post(RouteConstant.LOGIN, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error calling access token API:', error);
        throw error;
    }
}

export const callSignUp = async (data) => {
    try {
        const response = await axios.post(RouteConstant.SIGN_UP, data);
        return response.data;
    } catch (error) {
        console.error('Error calling access token API:', error);
        throw error;
    }
}

export const callLogout = async () => {
    try {
        const response = await axios.post(RouteConstant.LOGOUT, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error calling access token API:', error);
        throw error;
    }
}