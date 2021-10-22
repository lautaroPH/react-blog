import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { commentStartNew, commentStartUpdate, desactiveComment } from '../../actions/post';
import { uiCloseCommentModal } from '../../actions/ui';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const initEvent = {
    content: ""
}


const ModalComment = () => {

    const { modalCommentOpen } = useSelector(state => state.ui)
    const { activePost, activeComment } = useSelector(state => state.blog)

    const dispatch = useDispatch()

    const [contentValid, setContentValid] = useState(true)

    const [formValues, setFormValues] = useState(initEvent)
    const { content } = formValues;


    useEffect(() => {
        if (activeComment) {
            setFormValues(activeComment);
        } else {
            setFormValues(initEvent);
        }
    }, [activeComment])


    const closeModal = () => {
        dispatch(uiCloseCommentModal())
        setFormValues(initEvent)
        if (activeComment) {
            dispatch(desactiveComment())
        }
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (content.trim().length < 2) {
            return setContentValid(false)
        }

        if (activeComment) {
            dispatch(commentStartUpdate(formValues, activeComment?._id))
        } else {
        dispatch(commentStartNew(formValues, activePost.id))
        }
        closeModal();
        setContentValid(true);

    }

    return (
        <Modal
            isOpen={modalCommentOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1 className="mt-4">{(activeComment) ? "Editar comentario" : "Nuevo comentario"}</h1>
            <hr />
            <form onSubmit={handleSubmitForm} className="container">
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea
                        className={`form-control textarea  ${!contentValid && "is-invalid"}`}
                        placeholder="Contenido del comentario"
                        name="content"
                        value={content}
                        rows="20"
                        onChange={handleInputChange}
                        required
                    />
                    {!contentValid &&
                        <small id="emailHelp" className="form-text text-danger">EL contenido debe ser mas largo</small>
                    }
                </div>

                <button
                    type="submit"
                    className="btn btn-success mt-3"
                >
                    <i className="far fa-save"></i>
                    <span className="ml-2">Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default ModalComment
