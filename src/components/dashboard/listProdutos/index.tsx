"use client"

import { Categoria } from "@/interfaces/categoria"
import { Produto, ProdutoUnico } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"

export function ListProdutos(props: { produtos: Produto, categorias: Categoria[] }) {
  const router = useRouter()
  const [produtoMenu, setProdutoMenu] = useState(0)
  const [overlayCreate, setOverlayCreate] = useState(false)
  const [modalImage, setModalImage] = useState(0)
  const [produto, setProduto] = useState<ProdutoUnico | null>(null)
  const [triggerProduto, setTriggerProduto] = useState(0)

  useEffect(() => {
    if (produtoMenu > 0) {
      fetch(`${urlApi}/api/produtos/${produtoMenu}`)
        .then(res => res.json())
        .then(produto => setProduto(produto))
    }
  }, [produtoMenu, triggerProduto])

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
    const formEvent = event.currentTarget
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
          public_id: image.public_id,
          principal: principal,
          produto_id: modalImage
        })
      })

      if (!resImage.ok) {
        throw new Error("Falha ao salvar imagem.")
      }
      setTriggerProduto(prev => prev + 1)
      formEvent.reset()
    }
    toast.promise(uploadProduto(), {
      success: "Imagem salva com sucesso.",
      error: "Falha ao salvar imagem.",
      loading: "Salvando imagem..."
    })
  }

  function handleDeleteImage(public_id: string, id: number) {
    async function deleteImage() {
      const resDeleteCloud = await fetch(`${urlApi}/api/upload`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          public_id
        })
      })

      if (!resDeleteCloud.ok) {
        throw new Error("Falha ao deletar imagem do cloudinary")
      }

      const resDeleteImage = await fetch(`${urlApi}/api/produtos/imagens/${id}`, {
        method: "DELETE"
      })
      
      if (!resDeleteImage.ok) {
        throw new Error("Falha ao deletar imagem")
      }
      setTriggerProduto(prev => prev + 1)
    }
    toast.promise(deleteImage(), {
      success: "Imagem deletada com sucesso.",
      error: "Falha ao deletar imagem.",
      loading: "Deletando imagem..."
    })
  }

  return (
    <div className="flex flex-col w-full px-5 pb-10">
      <div className="flex gap-5 mx-auto justify-center">
        <button type="button" className="w-36 bg-yellow-300 text-white
      font-bold cursor-pointer rounded-lg mb-10 text-lg" onClick={() => setOverlayCreate(true)}> criar produto </button>

        <Link href="/dashboard/categorias" className="w-36 py-3 bg-yellow-300 text-white
      font-bold cursor-pointer rounded-lg mb-10 text-lg flex justify-center"> categorias </Link>
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

          <div className="flex flex-col fixed bg-black h-max-100 shadow-2xl rounded-2xl
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
              <button type="button" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg cursor-pointer"
                onClick={() => setModalImage(produtoMenu)}>
                editar imagens
              </button>
              <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg cursor-pointer"> atualizar produto </button>
            </form>
          </div>
        </div>
      )}

      {overlayCreate && (
        <div>
          <div onClick={() => {
            setOverlayCreate(false)
          }} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>

          <div className="flex flex-col fixed bg-black h-max-100 shadow-2xl rounded-2xl
          p-10 items-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  border border-yellow-300 justify-center">

            <form method="post" className="flex flex-col gap-5 items-center" onSubmit={handleCreateProduto}>
              <input type="text" name="name" placeholder="nome" required
                className="bg-white h-10 p-4 rounded-lg w-64" />

              <input type="text" name="desc" placeholder="descrição"
                className="bg-white h-10 p-4 rounded-lg w-64" />

              <input type="text" name="price" placeholder="preço" required
                className="bg-white h-10 p-4 rounded-lg w-64" />

              <select name="produtoCategoria" id="" className="bg-white h-10 w-64 px-4" value={produto?.id_categoria}>
                {props.categorias.map((categoria) => {
                  return (
                    <option value={categoria.id_categorias} key={categoria.id_categorias}>
                      {categoria.nome_categorias}
                    </option>
                  )
                })}
              </select>
              <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg cursor-pointer"> criar produto </button>
            </form>
          </div>
        </div>
      )}

      {modalImage > 0 && (
        <div>
          <div onClick={() => {
            setModalImage(0)
          }} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>

          <div className="flex flex-col fixed bg-black min-h-110 shadow-2xl rounded-2xl
          p-10 items-center justify-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  border border-yellow-300">
            <form action="" method="post" onSubmit={handleUpload} className="flex flex-col gap-5 items-center">
              <input type="file" accept="image/*" name="file" className="bg-white p-3" required/>
              <select name="tipo" id="" className="bg-white h-10 px-3 w-full">
                <option value="false"> normal </option>
                <option value="true"> principal </option>
              </select>
              <button type="submit" className="h-10 w-full bg-yellow-300 text-white font-bold rounded-lg cursor-pointer"> fazer upload da imagem </button>
              {produto?.produtos_images.map((image) => {
                return (
                  <div key={image.id_images} className="w-full flex gap-5 items-center border border-white rounded-lg pr-3">
                    <div className="h-14 w-14 relative">
                      <Image
                        src={image.images_url}
                        alt={produto.nome_produtos}
                        fill
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-white"> {image.principal ? "principal" : ""} </p>
                    <button type="button" onClick={() => handleDeleteImage(image.public_id, image.id_images)} className="cursor-pointer ml-auto">
                      <MdDeleteForever size={32} color="black" className="bg-white p-1 rounded-lg" />
                    </button>
                  </div>
                )
              })}
            </form>
          </div>
        </div>
      )}

    </div>
  )
}