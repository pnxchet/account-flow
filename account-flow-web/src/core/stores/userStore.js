import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getAllUsers } from '../apis/usersApi'
import useCommonStore from './commonStore'

const initial = {
    users: [],
    user: {},
}

const store = (set, get) => ({
    ...initial,
    getUsers: () => getUsers(set),
})

const getUsers = async (set) => {
    useCommonStore.getState().setLoading(true)
    try {
        const response = await getAllUsers()
        set({ users: response.data })
    } catch (error) {
        console.error('Error fetching users:', error)
    } finally {
        useCommonStore.getState().setLoading(false)
    }
}

const useUserStore = create(devtools(store))

export default useUserStore
