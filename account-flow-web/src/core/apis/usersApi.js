import axios from 'axios';
import { RouteConstant } from '../../data/constant/RouteConstant';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(RouteConstant.USERS, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${RouteConstant.USERS}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
}

export const createUser = async (userData) => {
    try {
        const response = await axios.post(RouteConstant.USERS, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${RouteConstant.USERS}/${id}`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${RouteConstant.USERS}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
}