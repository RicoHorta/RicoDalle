
import { useState } from "react"
import Modal from "./components/Modal"

const App = () => {
  //OPÇÕES DE SUPRISE-ME
  const [images, setImages] = useState(null)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const surpriseOptions = [
    'Ostra azul comendo um melão',
    'Tubarão estilo Matisse falando ao telefone',
    'Abacaxi tomando sol na ilha',
  ]

  const surpriseMe = () => {
    setImages(null)
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const getImages = async () => {
    setImages(null)
    if (value === null) {
      setError('Erro! Descreva detalhadamente as imagens')
      return
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch('http://localhost:8000/images', options)
      const data = await response.json()
      // console.log(data)
      setImages(data)
    } catch (error) {
      console.error(error)
    }
  }

  const uploadImage = async (e) => {
    console.log(e.target.files[0])

    const formData = new FormData()
    formData.append('file', e.target.files[0])
    setModalOpen(true)
    setSelectedImage(e.target.files[0])

    try {
      const options = {
        method: "POST",
        body: formData
      }
      const response = await fetch('http://localhost:8000/upload', options)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="app">
      <section className="search-section">
        <p>Forneça uma descrição detalhada
          <span className="surprise" onClick={surpriseMe}>Exemplo...</span>
        </p>
        <div className="input-container">

          <input
            value={value}
            placeholder="Pintura à óleo de um girassol num vaso roxo no estilo impressionista..."
            onChange={e => setValue(e.target.value)}
          />
          <button onClick={getImages}>Gerar Imagens</button>
        </div>
        <p className="extra-info">Se preferir,
          <span>
            <label htmlFor="files"> carregue uma Imagem </label>
            <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          </span>
          para modifica-la...
        </p>
        {error && <p>{error}</p>}
        {modalOpen && <div className="overlay">
          <Modal setModalOpen={setModalOpen} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        </div>}
      </section>
      <section className="image-section">
        {images?.map((image, _index) => (
          <img key={_index} src={image.url} alt={`Gerada por RicoAI baseada em ${value}`} />
        ))}
      </section>
    </div>
  )
}

export default App;
