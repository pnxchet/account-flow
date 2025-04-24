import useCommonStore from '../commonStore';

describe('useCommonStore', () => {
    beforeEach(() => {
        useCommonStore.setState({
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
        });
    });

    test('should initialize with correct default values', () => {
        const state = useCommonStore.getState();
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
        expect(state.openDialog).toBe(false);
        expect(state.dialogContent).toEqual({
            title: "",
            message: "",
            width: 470,
            labelSubmit: "Submit",
            labelCancel: "Cancel",
        });
        expect(state.dialogSubmit).toBe(null);
        expect(state.dialogCancel).toBe(null);
    });

    test('setLoading should update loading state', () => {
        const { setLoading } = useCommonStore.getState();
        
        setLoading(true);
        expect(useCommonStore.getState().loading).toBe(true);
        
        setLoading(false);
        expect(useCommonStore.getState().loading).toBe(false);
    });

    test('setError should update error state', () => {
        const { setError } = useCommonStore.getState();
        
        const errorMessage = 'An error occurred';
        setError(errorMessage);
        expect(useCommonStore.getState().error).toBe(errorMessage);
        
        setError(null);
        expect(useCommonStore.getState().error).toBe(null);
    });

    test('fetchDialog should open dialog with provided content', async () => {
        const { fetchDialog } = useCommonStore.getState();
        
        const mockContent = {
            title: "Test Title",
            message: "Test Message",
            width: 600,
            labelSubmit: "OK",
            labelCancel: "No",
        };
        
        const mockSubmit = jest.fn();
        const mockCancel = jest.fn();
        
        await fetchDialog(true, mockContent, mockSubmit, mockCancel);
        
        const state = useCommonStore.getState();
        expect(state.openDialog).toBe(true);
        expect(state.dialogContent).toEqual(mockContent);
        expect(state.dialogSubmit).toBe(mockSubmit);
        expect(state.dialogCancel).toBe(mockCancel);
    });

    test('resetDialog should reset dialog to initial state', async () => {
        const { fetchDialog, resetDialog } = useCommonStore.getState();
    
        const mockContent = {
            title: "Test Title",
            message: "Test Message",
        };
        const mockSubmit = jest.fn();
        
        await fetchDialog(true, mockContent, mockSubmit, null);
        
        await resetDialog();
        
        const state = useCommonStore.getState();
        expect(state.openDialog).toBe(false);
        expect(state.dialogContent).toEqual({
            title: "",
            message: "",
            width: 470,
            labelSubmit: "Submit",
            labelCancel: "Cancel",
        });
        expect(state.dialogSubmit).toBe(null);
        expect(state.dialogCancel).toBe(null);
    });
});