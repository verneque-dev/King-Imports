import { CarroselProdutos } from "@/components/carroselProdutos"
import { ProdutoAvaliacoes, ProdutoUnico } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { StarsBar } from "@/components/starsMedia";
import { MdAccountCircle } from "react-icons/md";
import { FormAddCarrinho } from "@/components/formAddCarrinho"
import { FormAvaliacao } from "@/components/formAvaliacao"


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const res = await fetch(`${urlApi}/api/produtos/${id}`)
  const produto = await res.json()

  if (!produto || !produto.nome_produtos) {
    return { title: "Produto não encontrado" }
  }

  return {
    title: produto.nome_produtos,
    description: `Compre ${produto.nome_produtos} com o melhor preço na King Imports. Qualidade premium de primeira linha.`,
    openGraph: {
      title: `${produto.nome_produtos} | King Imports`,
      description: produto.desc_produtos || "Confira os detalhes deste produto exclusivo.",
      images: [
        {
          url: produto.produtos_images?.[0]?.images_url || '/og-image.jpg',
          width: 800,
          height: 600,
          alt: produto.nome_produtos,
        },
      ],
      type: 'article',
    },
  }
}

export default async function ProdutoDetails(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const res = await fetch(`${urlApi}/api/produtos/${id}`, {
    cache: "no-store"
  })
  const produto: ProdutoUnico = await res.json()

  const resAvaliacoes = await fetch(`${urlApi}/api/produtos/avaliacoes/${id}`, {
    cache: "no-store"
  })
  const avaliacoes: ProdutoAvaliacoes[] = await resAvaliacoes.json()

  return (
    <div className="w-[90%] mx-auto p-1 md:p-8 rounded-lg my-8 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-15 p-8">
        <div className="aspect-square">
          <CarroselProdutos produto={produto} />
        </div>

        <div className="rounded-lg border border-gray-300 p-5 flex flex-col gap-3">
          <p className="text-2xl font-medium"> {produto.nome_produtos} </p>
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium mt-0.5 text-gray-500"> {produto.media} </p>
            <StarsBar media={produto.media} />
            <p className="text-sm font-medium mt-0.5 text-gray-500"> ({produto.quantidade}) </p>
          </div>
          <p className="text-2xl"> R$ {produto.preco_produtos} </p>
          <p className="text-lg"> {produto.desc_produtos} </p>
          <FormAddCarrinho produtoId={Number(id)} />
        </div>
      </div>
      <div className="flex flex-col w-full p-8">
        <FormAvaliacao produtoId={Number(id)}/>
        
        {avaliacoes.map((avaliacao) => {
          const dataObj = new Date(avaliacao.created_at);

          const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
          });
          return (
            <div className="flex flex-col w-full justify-center mb-8" key={avaliacao.id_avaliacao}>
              <div className="flex items-center gap-2">
                <MdAccountCircle size={40} />
                <p className="text-xl font-semibold"> {avaliacao.nome_user} </p>
              </div>
              <div className="flex gap-2">
                <StarsBar media={avaliacao.nota_avaliacao} />
                <p> {dataFormatada} </p>
              </div>
              <div className="flex items-center mt-2 pl-1">
                <p className="text-lg"> {avaliacao.comentario_avaliacao} </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}