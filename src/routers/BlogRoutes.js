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

                <Route exact path="/" component={BlogScreen} />
                <Route exact path="/post/:id" component={BlogDetail} />
                <Route exact path="/perfil/:id" component={BlogUser} />
                <Route exact path="/buscar" component={BlogSearch} />

                <Redirect to="/" />

            </Switch>
            <Footer />
        </>
    )
}

export default BlogRoutes

