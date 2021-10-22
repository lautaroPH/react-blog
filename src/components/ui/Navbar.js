import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string";
import { Link } from "react-router-dom"
import { startLogout } from "../../actions/auth"
import { postDeleteStore } from "../../actions/post"
import { useForm } from "../../hooks/useForm"
import { useHistory, useLocation } from "react-router"

const Navbar = () => {

    const { name, surname, uid } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const history = useHistory()

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    // const herosFiltered = useMemo(() => getHeroesByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`/react-blog/buscar?q=${searchText}`)
    }

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <Link className="navbar-brand" to="/react-blog/" onClick={() => dispatch(postDeleteStore())}>Blog-react</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse " id="navbarNavDropdown">
                <ul className="navbar-nav ">
                </ul>
                <div className="m-auto"></div>
                <form className="form-inline mr-5" onSubmit={handleSearch}>
                    <input
                        className="form-control mr-sm-2"
                        type="text"
                        placeholder="Busca un post"
                        autoComplete="off"
                        name="searchText"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                </form>


                <ul className="navbar-nav mr-5">
                    <li className="nav-item dropdown active">
                        <span className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {name} {surname}
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to={`/react-blog/perfil/${uid}`}>Mis posts</Link>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item btn text-danger" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span> Salir</span>
                            </span>
                        </div>
                    </li>
                </ul>


            </div>
        </nav>
    )
}

export default Navbar
