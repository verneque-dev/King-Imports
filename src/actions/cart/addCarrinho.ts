import { urlApi } from "@/lib/api"

export async function addCarrinho(form: FormData) {
  "use server"
  const produtoId = Number(form.get("produtoId"))
  const quantidade = Number(form.get("quantidade"))

  await fetch(`${urlApi}/api/carrinho`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      quantidade_itens: quantidade,
      id_produto: produtoId
    })
  })
}