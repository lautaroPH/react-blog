import { Redirect, Route, Switch } from "react-router-dom"
import LoginScreen from "../components/auth/LoginScreen"
import RegisterScreen from "../components/auth/RegisterScreen"

const AuthRoutes = () => {
    return (

        <Switch >
            <Route exact path="/react-blog/auth/login" component={LoginScreen} />
            <Route exact path="/react-blog/auth/register" component={RegisterScreen} />

            <Redirect to="/react-blog/auth/login" />

        </Switch>
    )
}

export default AuthRoutes
