import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/auth.types";



interface AdminState {
    admin : AuthUser | null;
    accessToken : string,
    isAdminLogin : boolean,
}


const initialState : AdminState ={
    admin : null,
    accessToken : "",
    isAdminLogin : false
}


export const adminSlice = createSlice({
    name : "admin",
    initialState,
    reducers : {
        setAdminUser : (state , action : PayloadAction<AuthUser | null>) => {
            state.admin = action.payload;
        },
        setAdminToken : (state , action : PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setAdminLogin : (state , action : PayloadAction<boolean>) => {
            state.isAdminLogin = action.payload;
        }
    }
    })


    export const { setAdminUser , setAdminToken , setAdminLogin} = adminSlice.actions;
    export default adminSlice.reducer;