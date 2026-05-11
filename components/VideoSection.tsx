'use client'

export default function VideoSection() {
  return (
    <div className="mb-16 sm:mb-24">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Veja Como Funciona na Prática</h3>
        <p className="text-gray-400 text-base sm:text-lg px-2">Assista um tutorial rápido mostrando como usar os templates do projeto</p>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-2xl p-4 sm:p-6 overflow-hidden shadow-lg shadow-[#ffd700]/10">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/P9JLinGi46E"
            title="Como Usar os Templates do Mega Pack 2500x"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-gray-400 text-sm sm:text-base">
          <span className="text-[#25D366] font-bold">⏱️ Tempo de vídeo:</span> Menos de 5 minutos para entender tudo
        </p>
      </div>
    </div>
  )
}
