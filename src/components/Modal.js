import { useState } from "react"


const Modal = ({ setModalOpen, setSelectedImage, selectedImage }) => {
    const [error, setError] = useState(null)

    console.log('selectedImage', selectedImage)

    const closeModal = () => {
        setModalOpen(false)
        setSelectedImage(null)
    }
    return (
        <div className="modal">
            <div onClick={closeModal}>X</div>
            <div className="image-container">
                {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Imagem carregada pelo usuário" />}
            </div>
            <button>Gerar Imagens</button>
        </div>
    )
}

export default Modal