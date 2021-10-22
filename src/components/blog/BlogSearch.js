import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pageMoreOne, postDeleteStore, postMoreLoadingSearch } from "../../actions/post"
import "./blog.css"
import BlogCard from "./BlogCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useLocation } from "react-router"
import queryString from "query-string";

const BlogSearch = () => {

    const { posts, hasNextPage, postPage, search } = useSelector(state => state.blog);

    const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    const { q } = queryString.parse(location.search)

    useEffect(() => {

        if (posts.length === 0) {
            dispatch(postMoreLoadingSearch(q))
        }

    }, [dispatch, posts, q]);

    useEffect(() => {

        if (postPage >= 2) {
            dispatch(postMoreLoadingSearch(q, postPage))
        }
    }, [dispatch, postPage, q]);

    useEffect(() => {

        dispatch(postDeleteStore())

    }, [dispatch])

    useEffect(() => {
        if (!search) {
            history.push("/")
        }
    }, [search, history])




    const isEmpty = posts.length === 0;

    return (
        <div className="container">
            <div className="box-container">
                <h1 className="titulo">
                    Posts encontrados por la busqueda: {q}
                </h1>
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
        </div >
    )
}

export default BlogSearch
