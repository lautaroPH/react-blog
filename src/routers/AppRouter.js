import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import AuthRoutes from "./AuthRoutes";
import BlogRoutes from "./BlogRoutes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

const AppRouter = () => {

    const dispatch = useDispatch()
    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <Switch>
                <PublicRouter
                    path="/auth"
                    component={AuthRoutes}
                    isAuthenticated={!!uid}
                />

                <PrivateRouter
                    path="/"
                    component={BlogRoutes}
                    isAuthenticated={!!uid}
                />

                <Redirect to="/auth/login" />
               
            </Switch>

        </Router>
    )
}

export default AppRouter
