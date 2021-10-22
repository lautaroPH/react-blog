import { useForm } from '../../hooks/useForm';
import { useDispatch } from "react-redux"
import './auth.css';
import { startLogin } from '../../actions/auth';
import { Link } from 'react-router-dom';

const LoginScreen = () => {

    const dispatch = useDispatch()


    const [formValues, handleInputChange] = useForm({
        email: "",
        password: ""
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLogin(email, password))
    }

    return (
        <div className="login-body-div">
            <div className="login-div">
                <div className="logo"></div>
                <div className="titulo">Ingreso</div>
                <div className="subtitulo">Incia sesion para entrar al blog</div>

                <div className="campos">
                    <form onSubmit={handleLogin}>
                        <div className="usuario">
                            <input
                                type="email"
                                className="input-usuario input-login"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                pattern="[a-z0-9._%+-]+@[a-z09.-]+\.[a-z]{2,4}$"
                                required
                            />
                        </div>

                        <div className="contraseña">
                            <input
                                type="password"
                                className="input-pass input-login"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <input
                            type="submit"
                            className="boton"
                            value="Login"
                        />
                    </form>


                    <div className="link">
                        <Link to="/auth/register">Registrar</Link>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default LoginScreen