import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const initial = {
  loading: false,
  error: null,
}

const store = (set, get) => ({
  ...initial,
  setLoading: (params) => setLoading(params, set),
  setError: (params) => setError(params, set),
})

const setLoading = (params, set) => {
  set({ loading: params })
}

const setError = (params, set) => {
  set({ error: params })
}

const useCommonStore = create(devtools(store))

export default useCommonStore
