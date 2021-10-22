import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { commentStartDelete, postStartDelete } from "../../actions/post"
import { uiCloseDeleteModal } from "../../actions/ui";
import "./blog.css"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-2%, -160%)',
    },
};


const ModalPostDelete = () => {

    const { modalDeleteOpen } = useSelector(state => state.ui)
    const { activeComment } = useSelector(state => state.blog)

    const dispatch = useDispatch()

    const history = useHistory()

    const closeModal = () => {
        dispatch(uiCloseDeleteModal())
    }

    const handleDelete = () => {
        if (activeComment) {
            dispatch(commentStartDelete())
        } else {
            dispatch(postStartDelete())
            history.push("/react-blog/");
        }
        dispatch(uiCloseDeleteModal())
    }

    return (
        <Modal
            isOpen={modalDeleteOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal-delete"
            overlayClassName="modal-fondo"
        >
            <h2 className="mb-3">{activeComment ? "¿Estás Seguro que deseas eliminar este comentario?" : "¿Estás Seguro que deseas eliminar este post?"}</h2>

            <button className="btn btn-danger mr-4" onClick={handleDelete}>
                Sí
            </button>
            <button
                className="btn btn-secondary"
                onClick={closeModal}
            >
                No
            </button>
        </Modal>
    )
}

export default ModalPostDelete
