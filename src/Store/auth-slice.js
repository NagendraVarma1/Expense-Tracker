import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = {
    isAuthenticated: false,
    isPremium: false,
    themeToggle: false,
    expenses: [],
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
        },
        themeToggle(state) {
            state.themeToggle = !state.themeToggle
        },
        allExpenses(state, action) {
            state.expenses.push(action.payload)
        }
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;