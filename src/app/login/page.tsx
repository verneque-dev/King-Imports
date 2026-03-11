import { urlApi } from "@/lib/api"
import { redirect } from "next/navigation"

export default function Login() {
  async function handleLogin(formData: FormData) {
    "use server"
    const email = formData.get("email")
    const password = formData.get("senha")

    const res = await fetch(`${urlApi}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    if (res.ok) {
      redirect("/dashboard")
    }
  }
  return (
    <form action={handleLogin} className="flex flex-col gap-5 bg-white w-100 h-100 m-20 mx-auto shadow-2xl rounded-lg">
      <input type="text" name="email" placeholder="email" required className=""/>
      <input type="text" name="senha" placeholder="senha" required/>

      <button type="submit"> logar </button>
    </form>
  )
}