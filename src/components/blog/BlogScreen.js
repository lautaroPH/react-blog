import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pageMoreOne, postDeleteStore, postMoreLoading, uinewPost } from "../../actions/post"
import "./blog.css"
import BlogCard from "./BlogCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import CreatePost from "./CreatePost"
import { uiOpenModal } from "../../actions/ui"


const BlogScreen = () => {

    const { posts, postPage, postNew, hasNextPage } = useSelector(state => state.blog);

    const dispatch = useDispatch();

    useEffect(() => {

        if (posts.length === 0) {
            dispatch(postMoreLoading())
        }

    }, [dispatch, posts]);

    useEffect(() => {

        if (postPage >= 2) {
            dispatch(postMoreLoading(postPage))
        }
    }, [dispatch, postPage]);

    useEffect(() => {
        dispatch(postDeleteStore())

    }, [dispatch])

    useEffect(() => {
        if (postNew) {
            dispatch(postDeleteStore())
            dispatch(uinewPost())
        }
    }, [dispatch, postNew])

    const openModal = () => {
        dispatch(uiOpenModal())
    }

    const isEmpty = posts.length === 0;

    return (
        <div className="container">
            <div className="box-container">
                <h1 className="titulo">
                    Blog-react
                </h1>
                <p className="subtitulo">Mira los post mas recientes o <span className="subtitulo newPost" onClick={openModal}>crea un post</span></p>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => dispatch(pageMoreOne(postPage))}
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

            <CreatePost />
        </div >
    )
}

export default BlogScreen
