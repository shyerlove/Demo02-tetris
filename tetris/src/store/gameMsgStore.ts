import { createSlice } from '@reduxjs/toolkit'
import { getType } from '../components/Tetriswin/df'
const GameDataStore = createSlice({
    name: 'GameData',
    initialState: {
        // nextDir: [],// 下一个形状
        grade: 0,// 游戏等级
        score: 0, //游戏分数
        lines: 0 // 游戏行数
    },

    reducers: {
        /* 更新下一个形状 */
        // changeNextDir(state, { payload }) {
        //     state.nextDir = payload;
        // },
        /* 升级 ,2000分升一级*/
        addGrade(state) {
            state.grade += 1;
        },
        /* 加分，一行加100分*/
        addScore(state, { payload }) {
            state.score += payload;
        },
        /* 行数增加 */
        addLines(state, { payload }) {
            state.lines += payload;
        }
    }
})

export const { addGrade, addScore, addLines } = GameDataStore.actions;
export const gameMsgReducer = GameDataStore.reducer;