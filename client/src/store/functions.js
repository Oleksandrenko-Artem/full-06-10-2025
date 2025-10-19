export const pendingCase = (state) => {
    state.isLoading = true;
    state.error = null;
};
export const rejectedCase = (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
};