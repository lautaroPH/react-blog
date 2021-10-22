import moment from "moment"
import 'moment/locale/es';
import { Link } from "react-router-dom"

const BlogCard = ({
    id,
    title,
    description,
    created_at,
    user
}) => {

    const postDate = moment(created_at);

    return (
        <div className="posts-box animate__animated animate__fadeInUp">
            <h2 >{title}</h2>
            <p className="post-user-date">{user.name} {user.surname} - {postDate.format("Do MMMM YYYY")}</p>
            <p className="post-description">{description}</p>
            <Link to={`/post/${id}`} className="post-link btn" >Leer más</Link>
        </div>
    )
}

export default BlogCard
