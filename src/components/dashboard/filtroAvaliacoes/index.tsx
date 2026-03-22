"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function FiltroAvaliacoes() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    const val = event.target.value

    if (val) {
      params.set("aprovado", val)
    } else {
      params.delete("aprovado")
    }
    router.push(`/dashboard/avaliacoes/?${params.toString()}`)
  }

  return (
    <div className="relative w-full">
      <select
        onChange={handleSelect}
        className="w-full appearance-none bg-white border border-slate-200 
        rounded-b-xl px-4 py-3 pr-10 text-sm font-medium text-slate-700 shadow-sm 
        transition-all hover:border-slate-400 focus:outline-none focus:ring-2
         focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
      >
        <option value=""> Todas as avaliacoes </option>
        <option value="true"> Aprovadas </option>
        <option value="false"> Pendentes </option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
        <svg xmlns="http://www.w3.org" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}