import moment from "moment"

export const preparePosts = (posts = []) => {

    return posts.map((e) => ({
        ...e,
        created_at: moment(e.created_at).toDate(),
        updated_at: moment(e.updated_at).toDate()
    }))

}