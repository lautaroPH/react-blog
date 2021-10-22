import { types } from "../types/types";


const initialState = {
    posts: [],
    postPage: 1,
    userPage: 1,
    activePost: null,
    activeComment: null,
    isLoading: false,
    activePostloading: true,
    postNew: false,
    search: true,
    hasNextPage: false
}

export const blogReducer = (state = initialState, action) => {


    switch (action.type) {
        case types.postAddNew:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ],
                postNew: true
            };

        case types.postLoaded:
            return {
                ...state,
                posts: action.payload,
                isLoading: true,
                activePostloading: true,
                search: true
            };

        case types.postLoadedMore:
            const newPostsList = action.payload;
            const { posts } = state;

            return {
                ...state,
                posts: [...posts, ...newPostsList],
                isLoading: true,
                activePostloading: true,
                search: true
            };

        case types.postFailedLoaded:
            return {
                ...state,
                isLoading: false,
            };

        case types.postDetailFailed:
            return {
                ...state,
                activePostloading: false,
            };

        case types.searchFailedLoaded:
            return {
                ...state,
                search: false
            };

        case types.postDeletedStore:
            return {
                ...state,
                posts: [],
                postPage: 1,
                activePost: null,
                isLoading: false,
                userPage: 1,
            };

        case types.postLoadedOne:
            return {
                ...state,
                activePost: action.payload,
                isLoading: true
            };

        case types.pageMoreOne:
            return {
                ...state,
                postPage: action.payload
            }

        case types.pageUserMoreOne:
            return {
                ...state,
                userPage: action.payload
            }

        case types.newPost:
            return {
                ...state,
                postNew: false
            }

        case types.postUpdated:
            return {
                ...state,
                activePost: action.payload
            }

        case types.postDeleted:
            return {
                ...state,
                activePost: null
            }

        case types.commentAddNew:
            return {
                ...state,
                activePost: action.payload
            }

        case types.activeComment:
            return {
                ...state,
                activeComment: action.payload
            }

        case types.desactiveComment:
            return {
                ...state,
                activeComment: null
            }

        case types.commentUpdated:
            return {
                ...state,
                activePost: action.payload
            }

        case types.commentDeleted:
            return {
                ...state,
                activePost: action.payload,
                activeComment: null
            }

        case types.hasNextPage:
            return {
                ...state,
                hasNextPage: action.payload
            }

        case types.blogLogoutCleaning:
            return {
                ...state,
                posts: [],
                postPage: 1,
                userPage: 1,
                activePost: null,
                activeComment: null,
                isLoading: false,
                activePostloading: true,
                postNew: false,
                search: true,
                hasNextPage: false
            }


        default:
            return state;
    }
}