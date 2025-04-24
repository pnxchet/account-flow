import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getAllUsers, getUserById, callDeleteUser, callUpdateUser, callCreateUser } from '../apis/usersApi'
import useCommonStore from './commonStore'

const initial = {
    users: [],
    user: {},
}

const store = (set, get) => ({
    ...initial,
    getUsers: () => getUsers(set),
    getUserDetail: (params) => getUserDetail(params, set),
    deleteUser: (params) => deleteUser(params),
    updateUser: (params) => updateUser(params, set),
    createUser: (params) => createUser(params, set),
})

const createUser = async (params, set) => {
    useCommonStore.getState().setLoading(true)
    const newUser = {
        username: params.username,
        email: params.email,
        name: params.name,
        isActive: params.status,
    }
    try {
        const response = await callCreateUser(newUser)
    } catch (error) {
        console.error('Error fetching user:', error)
        useCommonStore.getState().setError(validDateError(error))
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const updateUser = async (params, set) => {
    useCommonStore.getState().setLoading(true)
    const user = useUserStore.getState().user
    console.log("aa",params)
    const updatedUser = {
        email: params.email,
        name: params.name,
        isActive: params.status === "active",
    }
    try {
        const response = await callUpdateUser(user.id, updatedUser)
        window.location.reload()
    } catch (error) {
        console.error('Error fetching user:', error)
        useCommonStore.getState().setError(validDateError(error))
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const deleteUser = async (params) => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await callDeleteUser(params)
        if (response.code === "200") {
            useUserStore.getState().getUsers()
            window.location.href = '/'
        }
    } catch (error) {
        console.error('Error deleting user:', error)
        useCommonStore.getState().setError(validDateError(error))
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const getUserDetail = async (params, set) => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await getUserById(params)
        const user = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            name: response.data.name,
            createdAt: response.data.createdAt,
            status: response.data.active ? "active" : "inactive",
            role: "User",
          };
        set({ user: user })
    } catch (error) {
        console.error('Error fetching user:', error)
        useCommonStore.getState().setError(validDateError(error))
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const getUsers = async (set) => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await getAllUsers()
        set({ users: response.data })
    } catch (error) {
        console.error('Error fetching users:', error)
        useCommonStore.getState().setError(validDateError(error))
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const validDateError = (error) => {
    if (error?.status === 401) {
        return error?.message
    } else {
        return error?.response?.data?.message
    }
}

const useUserStore = create(devtools(store))

export default useUserStore
