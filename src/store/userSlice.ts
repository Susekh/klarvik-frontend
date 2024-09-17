import { createSlice } from "@reduxjs/toolkit";


type UserType = {
    id: number;
    createdAt: Date;
    username: string;
    img: string;
    email: string;
};


const initialState: {
    status: boolean;
    userData: UserType;
} = {
    status: false,
    userData: {
        id: 0,
        createdAt: new Date(0),
        username: "",
        img: "",
        email: "",
    },
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) =>{
            state.status = false;
            state.userData = initialState.userData;
        }
    }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;