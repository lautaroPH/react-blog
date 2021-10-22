import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pageUserMoreOne, postDeleteStore, postUserMoreLoading } from "../../actions/post"
import "./blog.css"
import BlogCard from "./BlogCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useLocation } from "react-router"
import Swal from "sweetalert2"

const BlogUser = () => {

    const { posts, userPage, activePostloading, hasNextPage } = useSelector(state => state.blog);

    const dispatch = useDispatch();

    const location = useLocation();

    const history = useHistory();

    const localStorageUserId = location.pathname.split("/")[2]
    if (localStorageUserId) {
        localStorage.setItem("userId", location.pathname.split("/")[2])
    }

    const userId = localStorage.getItem("userId") || ""

    useEffect(() => {

        if (posts.length === 0 && userId !== "") {
            dispatch(postUserMoreLoading(userId))
        }

    }, [dispatch, posts, userId]);

    useEffect(() => {

        if (hasNextPage && userPage >= 2) {
            dispatch(postUserMoreLoading(userId, userPage))
        }
    }, [dispatch, userPage, userId, hasNextPage]);

    useEffect(() => {

        dispatch(postDeleteStore())

    }, [dispatch])

    if (!activePostloading) {
        history.push("/react-blog/");
        Swal.fire("Error", "No existe el usuario buscado", "error");
    }


    const isEmpty = posts.length === 0;

    return (
        <div className="container">
            <div className="box-container">
                <h1 className="titulo">
                    Posts creados por el usuario
                </h1>
                <p className="subtitulo">Mira todos los posts creados por este usuario</p>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => dispatch(pageUserMoreOne(userPage))}
                    hasMore={true}
                    loader={hasNextPage && !isEmpty &&
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border mt-3" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                >

                    {isEmpty ?
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border mt-3" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        posts.map(post => {
                            return (<BlogCard key={post.id} {...post} />)
                        })}

                </InfiniteScroll>

                {!hasNextPage && !isEmpty &&
                    <p style={{ textAlign: 'center', marginTop: "10px" }}>
                        <b>No hay mas posts para mostrar</b>
                    </p>
                }
            </div>
        </div >
    )
}

export default BlogUser