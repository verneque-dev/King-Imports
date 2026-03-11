export default function LoadingProduto() {
  return (
    <div className="w-[90%] mx-auto p-1 md:p-8 rounded-lg my-8 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-15 p-8">
        <div className="aspect-square bg-gray-300 animate-pulse rounded-lg">

        </div>
        <div className="rounded-lg bg-gray-300 flex flex-col animate-pulse p-32">

        </div>

      </div>
      <div className="p-8">
        <div className="flex flex-col h-44 w-full mb-15 bg-gray-300 animate-pulse rounded-lg">

        </div>

        <div className="w-full bg-gray-300 rounded-lg mx-auto p-3 animate-pulse h-14">
          
        </div>
      </div>
    </div>
  )
}