import { Redirect, Route, Switch } from "react-router-dom"
import LoginScreen from "../components/auth/LoginScreen"
import RegisterScreen from "../components/auth/RegisterScreen"

const AuthRoutes = () => {
    return (

        <Switch >
            <Route exact path="/auth/login" component={LoginScreen} />
            <Route exact path="/auth/register" component={RegisterScreen} />

            <Redirect to="/auth/login" />

        </Switch>
    )
}

export default AuthRoutes
