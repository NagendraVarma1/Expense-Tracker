import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
    isAuthenticated: false,
    token: '',
    email: '',
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.idToken;
            state.email = action.payload.email;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
        },
        
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;