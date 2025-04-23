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
        const response = await axios.post("http://localhost:8080/api/auth/signup", data);
        return response.data;
    } catch (error) {
        console.error('Error calling access token API:', error);
        throw error;
    }
}