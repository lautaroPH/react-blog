import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './auth.css';

const RegisterScreen = () => {

    const dispatch = useDispatch()

    const [formValues, handleInputChange] = useForm({
        name: "",
        surname: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, surname, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== password2) {
            return Swal.fire("Error", "Las contraseñas deben de ser iguales", "error");
        }

        dispatch(startRegister(email, password, name, surname))
    }

    return (
        <div className="login-body-div">
            <div className="register-div">
                <div className="logo"></div>
                <div className="titulo">Registro</div>
                <div className="subtitulo">Registrate para entrar al blog</div>

                <div className="campos">
                    <form onSubmit={handleRegister}>
                        <div className="usuario">
                            <input
                                type="text"
                                className="input-usuario input-login"
                                placeholder="Nombre"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                pattern="[a-zA-Z]+"
                                required

                            />
                        </div>
                        <div className="usuario">
                            <input
                                type="text"
                                className="input-usuario input-login"
                                placeholder="Apellidos"
                                name="surname"
                                value={surname}
                                onChange={handleInputChange}
                                pattern="[a-zA-Z]+"
                                required

                            />
                        </div>
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
                        <div className="contraseña">
                            <input
                                type="password"
                                className="input-pass input-login"
                                placeholder="Repita la contraseña"
                                name="password2"
                                value={password2}
                                onChange={handleInputChange}
                                required

                            />
                        </div>

                        <input
                            type="submit"
                            className="boton"
                            value="Registrarse"
                        />
                    </form>


                    <div className="link">
                        <Link to="/react-blog/auth/login">Logueate</Link>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default RegisterScreen
