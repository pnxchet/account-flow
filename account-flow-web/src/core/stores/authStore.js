import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { callLogin, callSignUp, callLogout } from '../apis/commonApi'
import useCommonStore from './commonStore'

const initial = {}

const store = (set, get) => ({
    ...initial,
    login: (params) => login(params),
    signup: (params) => signup(params),
    logout: () => logout(),
})

const logout = async () => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await callLogout()
        if (response.code === "200") { window.location.href = '/login' }
    } catch (error) {
        console.error('Error logging out:', error)
        useCommonStore.getState().setError(error?.response?.data?.message)
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const login = async (params) => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await callLogin(params)
        if (response.code === "200") { window.location.href = '/' }
    } catch (error) {
        console.error('Error logging in:', error)
        useCommonStore.getState().setError(error?.response?.data?.message)
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const signup = async (params) => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await callSignUp(params)
        window.location.href = '/login'
    } catch (error) {
        console.error('Error signing up:', error)
        useCommonStore.getState().setError(error?.response?.data?.message)
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const useAuthStore = create(devtools(store))

export default useAuthStore
