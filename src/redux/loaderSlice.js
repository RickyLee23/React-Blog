import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleOpen: state => {
            if (!state.isOpen) { state.isOpen = true}
        },
        toggleOff: state => {
            if (state.isOpen) { state.isOpen = false}
        }
    }
})

export const { toggleOpen, toggleOff } = loaderSlice.actions

export default loaderSlice.reducer

export const selectLoader = state => state.loader.isOpen