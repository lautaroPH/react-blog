import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router";
import { activeComment, postDeleteStore, postLoadingOne } from "../../actions/post";
import { uiOpenCommentModal, uiOpenDeleteModal, uiOpenModal } from "../../actions/ui";
import CreatePost from "./CreatePost";
import ModalComment from "./ModalComment";
import ModalPostDelete from "./ModalPostDelete";

const BlogDetail = () => {


    const { uid } = useSelector(state => state.auth)
    const { activePost, activePostloading } = useSelector(state => state.blog)

    const dispatch = useDispatch()

    const location = useLocation()

    const localStoragePostId = location.pathname.split("/")[2]
    if (localStoragePostId) {
        localStorage.setItem("postId", location.pathname.split("/")[2])
    }

    const history = useHistory()

    useEffect(() => {
        dispatch(postDeleteStore)
    }, [dispatch])

    const postId = localStorage.getItem("postId") || ""

    useEffect(() => {
        if (activePost === null) {
            if (postId !== "") {
                dispatch(postLoadingOne(postId))
            }
        }
    }, [dispatch, postId, activePost])


    if (!activePostloading) {
        history.push("/react-blog/");
    }

    const postDate = moment(activePost?.created_at);

    const openEditModal = () => {
        dispatch(uiOpenModal())
    }

    const handleDelete = () => {
        dispatch(uiOpenDeleteModal())
    }

    const handleComment = () => {
        dispatch(uiOpenCommentModal())
    }

    const handleUser = () => {
        history.push(`/react-blog/perfil/${activePost.user._id}`)
    }

    // const handleOpenModalComment = () => {
    //     dispatch(activeComment())
    //     dispatch(uiOpenCommentModal())
    // }

    const comments = activePost?.comments

    const commentDate = moment(comments?.created_at);


    return (
        <div >
            {activePost === null ? <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
                : <div className="container overflow-hidden">
                    <div className="animate__animated animate__backInDown">
                        <h2 className="mt-3">{activePost?.title}</h2>
                        <hr />
                        <div className="row align-items-start r-responsive">
                            <p className="p-post-one col">
                                <span className="badge badge-primary">{activePost?.user?.name} {activePost?.user?.surname}</span>
                                <span className="badge badge-light ml-2 date">{postDate.format("Do MMMM YYYY")}</span>
                            </p>
                                <button className="btn btn-sm btn-success mr-3 mt-1 col-2 buton-left-margin" onClick={handleUser}>Ver perfil</button>
                                {activePost?.user?._id === uid &&
                                    <>
                                        <button className="btn btn-sm btn-warning mr-3 mt-1 col-2" onClick={openEditModal}><i className="fas fa-edit"></i> Editar</button>
                                        <button className="btn btn-sm btn-danger mr-3 mt-1 col-2" onClick={handleDelete}><i className="fas fa-trash"></i> Eliminar</button>
                                    </>
                                }
                        </div>
                        <hr />
                    </div>
                    <img className="img-post animate__animated animate__backInRight" src={activePost?.url} alt={activePost?.title} />
                    <p className="description lead animate__animated animate__backInLeft">{activePost?.description}</p>
                    <div className="clearfix"></div>
                </div>
            }
            <CreatePost />
            <ModalPostDelete />
            <div className="container">

                {activePost &&
                    <div className="animate__animated animate__backInUp">
                        <hr />
                        <h2>Comentarios</h2>
                        <button className="btn btn-outline-primary mt-2" onClick={handleComment}>Comentar</button>
                    </div>
                }

                {comments?.length === 0 && activePost ? <h5 className="mt-3 mb-4 animate__animated animate__backInUp">No hay comentario en este post, prueba comentar uno</h5> :
                    comments?.map(comment => {
                        return (
                            <ul className="list-group list-comments mt-4 animate__animated animate__fadeIn animate__delay-1s" key={comment._id}>

                                <li className="list-group-item comment-item overflow-hidden" >
                                    <span className="badge badge-primary">
                                        {comment?.user?.name + ' ' + comment?.user?.surname}
                                    </span>
                                    <span className="badge badge-light ml-2">
                                        {commentDate.format("Do MMMM YYYY")}
                                    </span>
                                    <span className="d-block">
                                        {comment?.content}
                                    </span>
                                    {comment?.user?._id === uid &&
                                        <>
                                            <button className="btn btn-sm btn-danger float-right" onClick={() => (dispatch(activeComment(comment), dispatch(uiOpenDeleteModal())))}>Borrar</button>
                                            <button className="btn btn-sm btn-warning mr-2 float-right" onClick={() => (dispatch(activeComment(comment), dispatch(uiOpenCommentModal())))}>Editar</button>
                                        </>
                                    }
                                </li>
                            </ul>
                        )
                    })}
            </div >
            <ModalComment />
        </div >
    )
}

export default BlogDetail
