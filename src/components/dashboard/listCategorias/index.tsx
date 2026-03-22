"use client"

import { urlApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { toast } from "sonner"
import Link from "next/link"
import { Categoria } from "@/interfaces/categoria"

export function ListCategorias(props: { categorias: Categoria[] }) {
    const router = useRouter()
    const [categoriaMenu, setCategoriaMenu] = useState(0)
    const [overlayCreate, setOverlayCreate] = useState(false)
    const [categoria, setCategoria] = useState<Categoria | null>(null)
    useEffect(() => {
        if (categoriaMenu > 0) {
            fetch(`${urlApi}/api/categorias/${categoriaMenu}`)
                .then(res => res.json())
                .then(categoria => setCategoria(categoria))
        }
    }, [categoriaMenu])

    function handleDelete(id: number) {
        async function deleteCategoria() {
            const res = await fetch(`${urlApi}/api/categorias/${id}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                throw new Error("Falha ao deletar categoria")
            }

            router.refresh()
        }

        toast.promise(deleteCategoria(), {
            success: "Categoria deletada com sucesso.",
            error: "Falha ao deletar categoria.",
            loading: "Deletando categoria..."
        })
    }

    function handleUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nameCategoria = formData.get("name")

        async function updateCategoria() {
            const res = await fetch(`${urlApi}/api/categorias`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome_categoria: nameCategoria,
                    id: categoriaMenu
                })
            })
            if (!res.ok) {
                throw new Error("Falha ao atualizar categoria")
            }

            setCategoriaMenu(0)
            router.refresh()
        }

        toast.promise(updateCategoria(), {
            success: "Categoria atualizada com sucesso.",
            error: "Falha ao atualizar categoria.",
            loading: "Atualizando categoria..."
        })
    }

    function handleCreateCategoria(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nameCategoria = formData.get("name")

        async function createCategoria() {
            const res = await fetch(`${urlApi}/api/categorias`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome_categoria: nameCategoria,
                })
            })
            if (!res.ok) {
                throw new Error("Erro ao criar produto")
            }

            setOverlayCreate(false)
            router.refresh()
        }
        toast.promise(createCategoria(), {
            success: "Categoria criada com sucesso.",
            error: "Falha ao criar categoria.",
            loading: "Criando categoria..."
        })
    }

    return (
        <div className="flex flex-col w-full px-5 ">
            <div className="flex gap-5 mx-auto flex-wrap justify-center">
                <button type="button" className="w-36 bg-yellow-300 text-white
          font-bold cursor-pointer rounded-lg text-lg items-center h-14" onClick={() => setOverlayCreate(true)}> criar categoria </button>

                <Link href="/dashboard" className="w-36 py-3 bg-yellow-300 text-white
          font-bold cursor-pointer rounded-lg text-lg flex justify-center items-center h-14"> inicio </Link>

                <Link href="/dashboard/avaliacoes" className="w-36 py-3 bg-yellow-300 text-white
          font-bold cursor-pointer rounded-lg mb-10 text-lg flex justify-center items-center h-14"> avaliações </Link>
            </div>

            {props.categorias.map((categoria, i) => {
                return (
                    <div className={`flex w-full border-x border-black p-3 rounded-lg 
              ${i === 0 ? "border-y" : "border-b"} items-center gap-2`}
                        key={categoria.id_categorias}>

                        <p className="truncate w-28 sm:w-36 min-h-0"> {categoria.nome_categorias} </p>
                        <div className="ml-auto flex gap-6">
                            <button onClick={() => setCategoriaMenu(categoria.id_categorias)} className="cursor-pointer">
                                <MdEdit size={32} color="white" className="bg-black p-1 rounded-lg" />
                            </button>
                            <button onClick={() => handleDelete(categoria.id_categorias)} className="cursor-pointer">
                                <MdDeleteForever size={32} color="white" className="bg-black p-1 rounded-lg" />
                            </button>
                        </div>
                    </div>
                )
            })}
            {categoriaMenu > 0 && (
                <div>
                    <div onClick={() => {
                        setCategoriaMenu(0)
                        setCategoria(null)
                    }} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>

                    <div className="flex flex-col fixed bg-black h-max-100 shadow-2xl rounded-2xl
              p-10 items-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  border border-yellow-300">

                        <form method="post" className="flex flex-col gap-5" onSubmit={handleUpdate}>
                            <input type="text" name="name" placeholder="nome" required
                                className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={categoria?.nome_categorias ?? ""} />
                            <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg"> atualizar categoria </button>
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

                        <form method="post" className="flex flex-col gap-5 items-center" onSubmit={handleCreateCategoria}>
                            <input type="text" name="name" placeholder="nome" required
                                className="bg-white h-10 p-4 rounded-lg w-64" />
                            <button type="submit" className="h-10 w-64 bg-yellow-300 text-white font-bold rounded-lg"> criar categoria </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}