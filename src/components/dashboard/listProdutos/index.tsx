"use client"

import { Categoria } from "@/interfaces/categoria"
import { Produto, ProdutoUnico } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { toast } from "sonner"

export function ListProdutos(props: { produtos: Produto, categorias: Categoria[] }) {
  const router = useRouter()
  const [produtoMenu, setProdutoMenu] = useState(0)
  const [overlayCreate, setOverlayCreate] = useState(false)
  const [modalImage, setModalImage] = useState(0)
  const [produto, setProduto] = useState<ProdutoUnico | null>(null)
  useEffect(() => {
    if (produtoMenu > 0) {
      fetch(`${urlApi}/api/produtos/${produtoMenu}`)
        .then(res => res.json())
        .then(produto => setProduto(produto))
    }
  }, [produtoMenu])

  function handleDelete(id: number) {
    async function deleteProduto() {
      const res = await fetch(`${urlApi}/api/produtos/${id}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        throw new Error("Falha ao deletar produto")
      }

      router.refresh()
    }

    toast.promise(deleteProduto(), {
      success: "Produto deletado com sucesso.",
      error: "Falha ao deletar produto.",
      loading: "Deletando produto..."
    })
  }

  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nameProduto = formData.get("name")
    const descProduto = formData.get("desc")
    const precoProduto = Number(formData.get("price"))
    const categoriaProduto = Number(formData.get("produtoCategoria"))

    async function updateProduto() {
      const res = await fetch(`${urlApi}/api/produtos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome_produto: nameProduto,
          desc_produto: descProduto,
          preco_produto: precoProduto,
          categoria_id: categoriaProduto,
          produto_id: produtoMenu
        })
      })
      if (!res.ok) {
        throw new Error("Falha ao atualizar produto")
      }

      setProdutoMenu(0)
      router.refresh()
    }

    toast.promise(updateProduto(), {
      success: "Produto atualizado com sucesso.",
      error: "Falha ao atualizar produto.",
      loading: "Atualizando produto..."
    })
  }

  function handleCreateProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nameProduto = formData.get("name")
    const descProduto = formData.get("desc")
    const precoProduto = Number(formData.get("price"))
    const categoriaProduto = Number(formData.get("produtoCategoria"))

    async function createProduto() {
      const res = await fetch(`${urlApi}/api/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome_produto: nameProduto,
          desc_produto: descProduto,
          preco_produto: precoProduto,
          categoria_id: categoriaProduto
        })
      })
      if (!res.ok) {
        throw new Error("Erro ao criar produto")
      }
      const produto = await res.json()
      setModalImage(produto.data.id_produtos)
      setOverlayCreate(false)
      router.refresh()
    }
    toast.promise(createProduto(), {
      success: "Produto criado com sucesso.",
      error: "Falha ao criar produto.",
      loading: "Criando produto..."
    })
  }

  function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const principal = formData.get("tipo") === "true" ? true : false  
    async function uploadProduto() {
      const resUpload = await fetch(`${urlApi}/api/upload`, {
        method: "POST",
        body: formData
      })
      
      if (!resUpload.ok) {
        throw new Error("Falha ao fazer upload no cloudinary.")
      }
      const image = await resUpload.json()

      const resImage = await fetch(`${urlApi}/api/produtos/imagens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url_image: image.url,
          principal: principal,
          produto_id: modalImage
        })
      })

      if (!resImage.ok) {
        throw new Error("Falha ao salvar imagem.")
      }
    }
    toast.promise(uploadProduto(), {
      success: "Imagem salva com sucesso.",
      error: "Falha ao salvar imagem.",
      loading: "Salvando imagem..."
    })

  }

  return (
    <div className="flex flex-col w-full px-5 pb-10">
      <div className="flex">
        <button type="button" className="px-10 py-4 bg-yellow-300 text-white
      font-bold cursor-pointer rounded-lg mb-10" onClick={() => setOverlayCreate(true)}> criar produto </button>
      </div>

      {props.produtos.data.map((produto, i) => {
        return (
          <div className={`flex w-full border-x border-black p-3 rounded-lg 
          ${i === 0 ? "border-y" : "border-b"} items-center gap-2`}
            key={produto.id_produtos}>

            <p className="truncate w-28 sm:w-36 min-h-0"> {produto.nome_produtos} </p>
            <p className="text-sm sm:text-base"> {produto.preco_produtos} R$ </p>

            <div className="ml-auto flex gap-6">
              <button onClick={() => setProdutoMenu(produto.id_produtos)} className="cursor-pointer">
                <MdEdit size={32} color="white" className="bg-black p-1 rounded-lg" />
              </button>
              <button onClick={() => handleDelete(produto.id_produtos)} className="cursor-pointer">
                <MdDeleteForever size={32} color="white" className="bg-black p-1 rounded-lg" />
              </button>
            </div>
          </div>
        )
      })}
      {produtoMenu > 0 && (
        <div>
          <div onClick={() => {
            setProdutoMenu(0)
            setProduto(null)
          }} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>

          <div className="flex flex-col fixed bg-black h-100 shadow-2xl rounded-2xl
          p-10 items-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  border border-yellow-300 justify-center">

            <form method="post" className="flex flex-col gap-5" onSubmit={handleUpdate}>
              <input type="text" name="name" placeholder="nome" required
                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.nome_produtos ?? ""} />

              <input type="text" name="desc" placeholder="descrição"
                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.desc_produtos ?? ""} />

              <input type="text" name="price" placeholder="preço" required
                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.preco_produtos ?? ""} />

              <select name="produtoCategoria" id="" className="bg-white h-10 w-64 px-4" value={produto?.id_categoria}>
                {props.categorias.map((categoria) => {
                  return (
                    <option value={categoria.id_categorias} key={categoria.id_categorias}>
                      {categoria.nome_categorias}
                    </option>
                  )
                })}
              </select>
              <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg"> atualizar produto </button>
            </form>
          </div>
        </div>
      )}

      {overlayCreate && (
        <div>
          <div onClick={() => {
            setOverlayCreate(false)
          }} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>

          <div className="flex flex-col fixed bg-black h-100 shadow-2xl rounded-2xl
          p-10 items-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  border border-yellow-300 justify-center">

            <form method="post" className="flex flex-col gap-5 items-center" onSubmit={handleCreateProduto}>
              <input type="text" name="name" placeholder="nome" required
                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.nome_produtos ?? ""} />

              <input type="text" name="desc" placeholder="descrição"
                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.desc_produtos ?? ""} />

              <input type="text" name="price" placeholder="preço" required
                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.preco_produtos ?? ""} />

              <select name="produtoCategoria" id="" className="bg-white h-10 w-64 px-4" value={produto?.id_categoria}>
                {props.categorias.map((categoria) => {
                  return (
                    <option value={categoria.id_categorias} key={categoria.id_categorias}>
                      {categoria.nome_categorias}
                    </option>
                  )
                })}
              </select>
              {/* <input type="file" accept="image/*" className="bg-white text-sm p-3"/> */}
              <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg"> criar produto </button>
            </form>
          </div>
        </div>
      )}

      {modalImage > 0 && (
        <div>
          <div onClick={() => {
            setModalImage(0)
          }} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>
          
          <div className="flex flex-col fixed bg-black h-100 shadow-2xl rounded-2xl
          p-10 items-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  border border-yellow-300">
            <form action="" method="post" onSubmit={handleUpload} className="flex flex-col gap-5 items-center">
              <input type="file" accept="image/*" name="file" className="bg-white p-3"/>
              <select name="tipo" id="" className="bg-white h-10 px-3 w-full">
                <option value="false"> normal </option>
                <option value="true"> principal </option>
              </select>
              <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg"> fazer upload da imagem </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}