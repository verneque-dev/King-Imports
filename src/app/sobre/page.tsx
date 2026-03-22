import Link from "next/link";

export const metadata = {
  title: "Sobre Nós",
  description: "Conheça a história da King Imports e nossa curadoria exclusiva de produtos premium de primeira linha.",
}

export default function Sobre() {
  return (
    <main className="min-h-screen bg-white">

      <section className="relative h-[60vh] flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 z-0 opacity-60">
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-5">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase">
            King <span className="text-yellow-300">Imports</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Conectando você às melhores marcas do mundo com exclusividade e confiança.
          </p>
        </div>
      </section>

      <section className="py-20 px-5 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossa História</h2>
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Na <strong> King Imports </strong> , nosso objetivo é claro: oferecer a experiência 
            do alto padrão por um preço justo. Sabemos que, muitas vezes, o mercado de luxo oficial é 
            inacessível, e é aí que entramos.
            Trabalhamos exclusivamente com produtos de Primeira Linha Selecionada. Isso significa que 
            cada item em nosso catálogo passa por uma curadoria rigorosa para garantir que o acabamento, 
            o material e a estética sejam fiéis aos modelos mais icônicos das grandes marcas 
            internacionais.
          </p>
          <p>
            <strong> Por que escolher a King? </strong>
            Não entregamos apenas um produto, entregamos o melhor custo-benefício do mercado de importados.
            Nossa transparência é o que nos mantém crescendo: selecionamos fornecedores que entregam a 
            máxima qualidade possível, permitindo que você tenha o estilo que deseja sem precisar pagar 
            fortunas por uma etiqueta de grife.
            Qualidade premium, transparência total e o seu estilo em primeiro lugar.
          </p>
        </div>
      </section>


      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-5">
          <h3 className="text-2xl md:text-4xl font-bold mb-6">
            Pronto para elevar seu estilo?
          </h3>
          <p className="text-gray-600 mb-10">
            Explore nossa coleção completa e descubra por que somos a escolha número 1
            em produtos importados.
          </p>
          <Link
            href="/produtos"
            className="inline-block bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Ver Produtos Agora
          </Link>
        </div>
      </section>
    </main>
  )
}