import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Company = { name: string };
type User = {
    id: number;
    name: string;
    email: string;
    company?: Company;
};

type UsersState = {
    users: User[];
};

const initialState: UsersState = {
    users: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },

        addUser: (state, action: PayloadAction<User>) => {
            state.users.unshift(action.payload);
        },

        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },

        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((u) => u.id !== action.payload);
        },
    },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
