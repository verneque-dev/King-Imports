import Image from "next/image"

export default function Home() {
  return (
 
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* card  */}
          <div className="flex flex-col rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[8/5] relative bg-gray-100">
              <Image
                src="/logo.jpeg"
                alt=""
                fill
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-1">
              <h3 className="font-semibold text-lg mx-auto"> Nome Produto </h3>
              <p className="text-gray-600 text-sm mb-4 mx-auto"> Descricaooo </p>

              <div className="mt-auto flex flex-col">
                <span className="text-lg font-bold text-green-600 mx-auto"> R$ 199,90 </span>
                <button className="w-full mt-2c bg-amber-300 text-white py-2 rounded-md hover:bg-black transition-colors"> Adicionar ao Carrinho </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}