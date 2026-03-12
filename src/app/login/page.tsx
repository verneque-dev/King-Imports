"use client"

import { urlApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"

export default function Login() {
  const router = useRouter()
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("senha")

    async function login() {
      const res = await fetch(`${urlApi}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      if (!res.ok) {
        throw new Error("login inválido")
      }
      router.push("../dashboard")
    }
    toast.promise(login(), {
      success: "Login feito com sucesso.",
      error: "Login inválido.",
      loading: "Logando..."
    })
  }
  return (
    <form method="post" onSubmit={handleLogin} className="flex flex-col bg-black gap-5 h-100 m-15 mx-auto shadow-2xl rounded-2xl
    p-10 items-center md:w-100">
      <div className="h-28 w-28">
        <Image
          src="/logo.jpeg"
          alt="King Imports"
          width={500}
          height={500}
          className="h-full w-full"
        />
      </div>
      <input type="text" name="email" placeholder="email" required className="bg-white h-10 p-4 rounded-lg w-64"/>
      <input type="text" name="senha" placeholder="senha" required className="bg-white h-10 p-4 rounded-lg w-64"/>

      <button type="submit" className="bg-yellow-300 text-white font-bold h-10 w-44 rounded-lg mt-auto"> logar </button>
    </form>
  )
}