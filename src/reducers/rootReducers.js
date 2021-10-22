import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { blogReducer } from "./blogReducer"
import { uiReducer } from "./uiReducer"

export const rootReducer = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    ui: uiReducer,
})