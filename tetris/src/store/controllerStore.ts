import { createSlice } from '@reduxjs/toolkit'

const controllerStore = createSlice({
    name: 'controllerData',
    initialState: {
        isPlay: true, // 是否 开启/暂停 游戏
        left: false, // 是否左移
        right: false, // 是否右移
        rotate: false // 是否旋转
    },
    reducers: {
        changeIsPlay(state) {
            state.isPlay = !state.isPlay;
        },
        changeLeft(state) {
            state.left = !state.left;
        },
        changeRight(state) {
            state.right = !state.right;
        },
        changeRotate(state) {
            state.rotate = !state.rotate;
        }
    }
})

export const { changeIsPlay, changeLeft, changeRight, changeRotate } = controllerStore.actions;
export const controllerReducer = controllerStore.reducer;