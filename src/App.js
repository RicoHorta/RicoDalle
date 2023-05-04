
const App = () => {
  //OPÇÕES DE SUPRISE ME
  const surpriseOptions = [
    'Ostra azul comendo um melão',
    'Tubarão colorido falando ao telefone',
    'Abacaxi tomando sol na ilha',
  ]

  return (
    <div className="app">
      <section className="search-section">
        <p>Forneça uma descrição detalhada
          <span className="surprise">Surpreenda-me</span>
        </p>
        <div className="input-container">
          <input placeholder="Pintura à óleo de um girassol num vaso roxo no estilo impressionista..." />
          <button>Gerar Imagem</button>
        </div>
      </section>
      <section className="image-section"></section>
    </div>
  )
}

export default App;
