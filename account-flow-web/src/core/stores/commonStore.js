import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const initial = {
  loading: false,
  error: null,
  openDialog: false,
  dialogContent: {
    title: "",
    message: "",
    width: 470,
    labelSubmit: "Submit",
    labelCancel: "Cancel",
  },
  dialogSubmit: null,
  dialogCancel: null,
}

const store = (set, get) => ({
  ...initial,
  setLoading: (params) => setLoading(params, set),
  setError: (params) => setError(params, set),
  fetchDialog: async (open, content, submit, cancel) => fetchDialog(open, content, submit, cancel, set),
  resetDialog: async () => resetDialog(set),
})

const fetchDialog = (open, content, submit, cancel, set) => {
  set({
    openDialog: open,
    dialogContent: { ...content },
    dialogSubmit: submit,
    dialogCancel: cancel,
  })
}
const resetDialog = (set) => {
  set({ 
    openDialog: false,
    dialogContent: {
      title: "",
      message: "",
      width: 470,
      labelSubmit: "Submit",
      labelCancel: "Cancel",
    },
    dialogSubmit: null,
    dialogCancel: null,
   })
}

const setLoading = (params, set) => {
  set({ loading: params })
}

const setError = (params, set) => {
  set({ error: params })
}

const useCommonStore = create(devtools(store))

export default useCommonStore
