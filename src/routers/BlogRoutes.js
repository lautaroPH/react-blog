import { Redirect, Route, Switch } from "react-router-dom"
import BlogDetail from "../components/blog/BlogDetail"
import BlogScreen from "../components/blog/BlogScreen"
import BlogSearch from "../components/blog/BlogSearch"
import BlogUser from "../components/blog/BlogUser"
import Footer from "../components/ui/Footer"
import Navbar from "../components/ui/Navbar"

const BlogRoutes = () => {
    return (
        <>
            <Navbar />
            <Switch >

                <Route exact path="/react-blog/" component={BlogScreen} />
                <Route exact path="/react-blog/post/:id" component={BlogDetail} />
                <Route exact path="/react-blog/perfil/:id" component={BlogUser} />
                <Route exact path="/react-blog/buscar" component={BlogSearch} />

                <Redirect to="/react-blog/" />

            </Switch>
            <Footer />
        </>
    )
}

export default BlogRoutes

