
import { useState } from "react"

const App = () => {
  //OPÇÕES DE SUPRISE ME
  const [images, setImages] = useState(null)
  const [value, setValue] = useState(null)
  const surpriseOptions = [
    'Ostra azul comendo um melão',
    'Tubarão colorido falando ao telefone',
    'Abacaxi tomando sol na ilha',
  ]

  const SurpriseMe = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.lenght)]
    setValue(randomValue)
  }

  const getImages = async () => {
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

  console.log(value)

  return (
    <div className="app">
      <section className="search-section">
        <p>Forneça uma descrição detalhada
          <span className="surprise" onClick={SurpriseMe}>Surpreenda-me</span>
        </p>
        <div className="input-container">

          <input
            value={value}
            placeholder="Pintura à óleo de um girassol num vaso roxo no estilo impressionista..."
            onChange={e => setValue(e.target.value)}
          />
          <button onClick={getImages}>Gerar Imagem</button>
        </div>
      </section>
      <section className="image-section">
        {images?.map((image, _index) => (
          <img key={_index} src="imgage.url" alt={`Imagem gerada em ${value}`} />
        ))}
      </section>
    </div>
  )
}

export default App;
