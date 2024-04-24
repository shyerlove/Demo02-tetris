import { configureStore } from '@reduxjs/toolkit'
import { gameMsgReducer } from './gameMsgStore'
import { controllerReducer } from './controllerStore'

const store = configureStore({
    reducer: {
        gameMsgReducer,
        controllerReducer
    }
})
export default store; 