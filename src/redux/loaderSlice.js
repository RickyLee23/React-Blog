import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isOpen: false
    },
    reducers: {
        open: state => {
            state.isOpen = true
        },
        close: state => {
            state.isOpen = false
        }
    }
})

export const { open, close } = loaderSlice.actions

export default loaderSlice.reducer