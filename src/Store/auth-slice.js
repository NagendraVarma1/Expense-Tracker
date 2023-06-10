import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
    isPremium: false
}



const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
        isPremium(state, action) {
            if(action.payload > 10000) {
                state.isPremium = true;
            }
            else {
                state.isPremium = false;
            }
        }
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;