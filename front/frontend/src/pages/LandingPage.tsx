import bg from '../assets/bg.png'


export function LandingPage() {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      { /* Hero section */}
      <div className="pt-4 pl-4 relative overflow-hidden h-32 bg-gradient-to-r flex flex-col from-blue-800 to-purple-600 items-start">
        
        <h1 className="text-4xl font-bold text-left text-white ">Controle de Solicitações</h1>
        <p className="h-200 text-lg text-left mt-4 text-white">Ferramenta para facilitar o gerenciamento de solicitações</p>
      </div>
      { /* Content section */}
      <div className="flex-1 pl-16 sticky bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
        <h2 className="text-8xl pt-8 font-mono text-left mt-4 text-white">Comece agora!</h2>
        <div>
          <p className="text-lg text-left mt-4 text-white font-mono">A facilidade de gerenciar suas solicitações nunca foi tão simples!</p>
        </div>
        <button 
          onClick={() => window.location.href = '/api/requests'}
        
          className="mt-32 px-6 py-3 bg-violet-800 text-white text-xl font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  )
} 