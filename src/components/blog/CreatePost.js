import Modal from 'react-modal';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postStartAddNew, postStartUpdate } from '../../actions/post';
import Swal from 'sweetalert2';
import { fileUpload } from '../../helpers/fileUpload';
import { uiCloseModal } from '../../actions/ui';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const initEvent = {
    title: "",
    description: "",
    url: ""
}

const CreatePost = () => {

    // const { activePost } = useSelector(state => state.blog)
    const { modalOpen } = useSelector(state => state.ui)
    const { activePost } = useSelector(state => state.blog)

    const dispatch = useDispatch()

    const [titleValid, settitleValid] = useState(true)
    const [descriptionValid, setdescriptionValid] = useState(true)
    const [urlValid, seturlValid] = useState(true)

    const [formValues, setFormValues] = useState(initEvent)
    const { title, description, url } = formValues;

    useEffect(() => {
        if (activePost) {
            setFormValues(activePost);
        } else {
            setFormValues(initEvent);
        }
    }, [activePost])

    const closeModal = () => {
        dispatch(uiCloseModal())
        if (!activePost) {
            setFormValues(initEvent)
        }
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const file_extension = file?.name?.split(".").pop();
        if (!file_extension) {
            return null
        }
        if (file_extension === "png" || file_extension === "jpg" || file_extension === "jpge" || file_extension === "gif" || file_extension === "webp") {
            Swal.fire({
                title: 'Cargando...',
                text: 'Porfavor espere...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            const fileUrl = await fileUpload(file);
            setFormValues({
                ...formValues,
                url: fileUrl
            })
            Swal.close();
        } else {
            Swal.fire("Error", "Porfavor sube una imagen", "error")
        }
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (title.trim().length < 2) {
            return settitleValid(false)
        }

        if (description.trim().length < 30) {
            return setdescriptionValid(false)
        }

        if (url.trim().length < 5) {
            return seturlValid(false)
        }

        if (activePost) {
            dispatch(postStartUpdate(formValues))
        } else {
            dispatch(postStartAddNew(formValues))
        }
        closeModal();
        settitleValid(true);
        setdescriptionValid(true);
        seturlValid(true)

    }

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1 className="mt-4">{(activePost) ? "Editar post" : "Nuevo post"}</h1>
                <hr />
                <form onSubmit={handleSubmitForm} className="container">
                    <div className="form-group">
                        <label>Titulo</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && "is-invalid"}`}
                            placeholder="Título del post"
                            name="title"
                            value={title}
                            autoComplete="off"
                            onChange={handleInputChange}
                            required
                        />
                        {!titleValid &&
                            <small id="emailHelp" className="form-text text-danger">El titulo debe ser mas largo</small>
                        }
                    </div>

                    <div className="form-group">
                        <label>Descripcion</label>
                        <textarea
                            className={`form-control textarea ${!descriptionValid && "is-invalid"}`}
                            placeholder="Descripcion del evento"
                            name="description"
                            value={description}
                            rows="9"
                            onChange={handleInputChange}
                            required
                        />
                        {!descriptionValid &&
                            <small id="emailHelp" className="form-text text-danger">La descripcion debe ser mas largo</small>

                        }
                    </div>

                    <div className="div_file form-group">
                        <p id="texto">Subir imagen</p>

                        <input
                            id="fileSelector"
                            type="file"
                            className="file_btn form-control"
                            name="url"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        {!urlValid &&
                            <small id="emailHelp" className="form-text text-danger">La imagen es obligatoria</small>
                        }
                    </div>
                    {url.length > 0 &&
                        <>
                            < img src={url} alt={title} className="img-new-post" />
                            <br />
                        </>
                    }

                    <button
                        type="submit"
                        className="btn btn-success mt-3"
                    >
                        <i className="far fa-save"></i>
                        <span className="ml-2">Guardar</span>
                    </button>

                </form>
            </Modal>
        </>
    )
}

export default CreatePost
