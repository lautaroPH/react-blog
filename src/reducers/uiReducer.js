import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalDeleteOpen: false,
    modalCommentOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiOpenDeleteModal:
            return {
                ...state,
                modalDeleteOpen: true
            }

        case types.uiCloseDeleteModal:
            return {
                ...state,
                modalDeleteOpen: false
            }

        case types.uiOpenCommentModal:
            return {
                ...state,
                modalCommentOpen: true
            }

        case types.uiCloseCommentModal:
            return {
                ...state,
                modalCommentOpen: false
            }

        default:
            return state;
    }
}