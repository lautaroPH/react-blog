import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { preparePosts } from "../helpers/preparePosts";
import { types } from "../types/types";

export const postStartAddNew = (post) => {
    return async (dispatch, getState) => {

        const { uid, name, surname } = getState().auth;

        try {
            const resp = await fetchConToken("posts", post, "POST");
            const body = await resp.json();

            if (body.ok) {
                post.id = body.post.id;
                post.user = {
                    _id: uid,
                    name: name,
                    surname: surname
                }

                dispatch(postAddNew(post))

                Swal.fire("Se ha creado: ", post.title, "success");
            }

        } catch (error) {
            console.log(error);
        }



    }
}

const postAddNew = (post) => ({
    type: types.postAddNew,
    payload: post
})

export const postStartUpdate = (post) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`posts/${post.id}`, post, "PUT");
            const body = await resp.json();

            if (body.ok) {
                dispatch(postUpdated(post))

                Swal.fire("Se ha actualizado correctamente: ", post.title, "info");
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const postUpdated = (post) => ({
    type: types.postUpdated,
    payload: post
})

export const postStartDelete = () => {
    return async (dispatch, getState) => {

        const { id, title } = getState().blog.activePost

        try {
            const resp = await fetchConToken(`posts/${id}`, {}, "DELETE");
            const body = await resp.json();

            if (body.ok) {
                dispatch(postDeleted())
                Swal.fire("Se ha eliminado correctamente", title, "warning")

            } else {
                Swal.fire("Error", body.msg, "error");
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const postDeleted = () => ({
    type: types.postDeletedStore
})

export const uinewPost = () => ({
    type: types.newPost
})


export const postMoreLoading = (page = 0) => {
    return async (dispatch) => {
        try {
            if (page === 0) {
                const resp = await fetchSinToken(`posts`);
                const body = await resp.json();

                if (body.ok) {
                    const posts = preparePosts(body.posts);
                    dispatch(hasNextPage(body.hasNextPage))
                    dispatch(postLoaded(posts))
                } else {
                    dispatch(postFailedLoaded())
                }
            } else {
                const resp = await fetchSinToken(`posts/${page}`);
                const body = await resp.json();

                if (body.ok) {
                    const posts = preparePosts(body.posts);
                    dispatch(hasNextPage(body.hasNextPage))
                    dispatch(postLoadedMore(posts))
                } else {
                    dispatch(postFailedLoaded())
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const postUserMoreLoading = (userId, page = 0) => {
    return async (dispatch) => {
        try {
            if (page === 0) {
                const resp = await fetchSinToken(`posts/user-posts/${userId}`);
                const body = await resp.json();
                if (body.ok) {
                    const posts = preparePosts(body.posts.docs);
                    dispatch(hasNextPage(body.posts.hasNextPage))
                    dispatch(postLoaded(posts))
                } else {
                    dispatch(postFailedLoaded())
                    dispatch(postDetailFailed())

                }
            } else {
                const resp = await fetchSinToken(`posts/user-posts/${userId}/${page}`);
                const body = await resp.json();

                if (body.ok) {
                    const posts = preparePosts(body.posts.docs);
                    dispatch(hasNextPage(body.posts.hasNextPage))
                    dispatch(postLoadedMore(posts))
                } else {
                    dispatch(postFailedLoaded())

                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const postMoreLoadingSearch = (search, page = 0) => {
    return async (dispatch) => {
        try {
            if (page === 0) {
                const resp = await fetchSinToken(`posts/search/${search}`);
                const body = await resp.json();

                if (body.ok) {
                    const posts = preparePosts(body.posts.docs);
                    dispatch(hasNextPage(body.posts.hasNextPage))
                    dispatch(postLoaded(posts))

                } else {
                    dispatch(searchFailedLoaded())
                    Swal.fire("No hay posts encontrados por:", search, "error")
                }
            } else {
                const resp = await fetchSinToken(`posts//search/${search}/${page}`);
                const body = await resp.json();

                if (body.ok) {
                    const posts = preparePosts(body.posts.docs);
                    dispatch(hasNextPage(body.posts.hasNextPage))
                    dispatch(postLoadedMore(posts))
                } else {
                    dispatch(postFailedLoaded())
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const postDetailFailed = () => ({
    type: types.postDetailFailed
})


const hasNextPage = (nextPage) => ({
    type: types.hasNextPage,
    payload: nextPage
})

const postLoaded = (posts) => ({
    type: types.postLoaded,
    payload: posts
})

const searchFailedLoaded = () => ({
    type: types.searchFailedLoaded
})

export const postDeleteStore = () => ({
    type: types.postDeletedStore,
})

const postLoadedMore = (posts) => ({
    type: types.postLoadedMore,
    payload: posts
})

const postFailedLoaded = () => ({
    type: types.postFailedLoaded,
})

export const pageMoreOne = (page) => ({
    type: types.pageMoreOne,
    payload: page + 1
})

export const pageUserMoreOne = (page) => ({
    type: types.pageUserMoreOne,
    payload: page + 1
})

export const postLoadingOne = (postId) => {
    return async (dispatch) => {
        try {
            const resp = await fetchSinToken(`posts/detail/${postId}`);
            const body = await resp.json();

            if (body.ok) {
                dispatch(postLoadOne(body.post))
            } else {
                dispatch(postFailedLoaded())
                dispatch(postDetailFailed())
                Swal.fire("Error", "No existe el post buscado", "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const postLoadOne = (post) => ({
    type: types.postLoadedOne,
    payload: post
})


export const commentStartNew = (comments, postId) => {
    return async (dispatch, getState) => {

        const { uid, name, surname } = getState().auth;

        try {
            const resp = await fetchConToken(`comments/${postId}`, comments, "POST");
            const body = await resp.json();
            if (body.ok) {
                comments.user = {
                    _id: uid,
                    name: name,
                    surname: surname
                }

                dispatch(commentAddNew(body.post))

                Swal.fire("Se ha creado el comentario exitosamente", "", "success");
            }

        } catch (error) {
            console.log(error);
        }



    }
}

const commentAddNew = (comments) => ({
    type: types.commentAddNew,
    payload: comments
})

export const activeComment = (comment) => ({
    type: types.activeComment,
    payload: comment
})

export const desactiveComment = () => ({
    type: types.desactiveComment,
})

export const commentStartUpdate = (comment, commentId) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`comments/${commentId}`, comment, "PUT");
            const body = await resp.json();

            if (body.ok) {
                dispatch(commentUpdated(body.postUpdate))

                Swal.fire("Se ha actualizado correctamente el comentario", "", "info");
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const commentUpdated = (comment) => ({
    type: types.commentUpdated,
    payload: comment
})

export const commentStartDelete = () => {
    return async (dispatch, getState) => {

        const { id } = getState().blog.activePost
        const { _id } = getState().blog.activeComment

        try {
            const resp = await fetchConToken(`comments/${id}/${_id}`, {}, "DELETE");
            const body = await resp.json();

            if (body.ok) {
                dispatch(commentDeleted(body.post))
                Swal.fire("El comentario se ha eliminado correctamente", "", "warning")

            } else {
                Swal.fire("Error", body.msg, "error");
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const commentDeleted = (comment) => ({
    type: types.commentDeleted,
    payload: comment
})

export const blogLogout = () => ({
    type: types.blogLogoutCleaning
})