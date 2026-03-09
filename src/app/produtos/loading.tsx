export default function LoadingProdutos() {
  return (
    <div className="flex flex-col min-h-[85vh]">
      <div
        className="w-full bg-gray-300 border border-slate-200 
      rounded-b-xl px-4 py-3 animate-pulse"
      > &nbsp; </div>
      <div className="w-[95%] mx-auto px-4 py-8 my-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <div className="flex flex-col rounded-lg overflow-hidden shadow-lg animate-pulse"
                key={i}>
                <div className="aspect-8/5 relative bg-gray-300 animate-pulse">
                  <div
                    className="w-full h-full object-cover animate-pulse"
                  />
                </div>

                <div className="flex flex-col flex-1 p-14 bg-white animate-pulse w-full">

                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex w-full justify-center mt-auto p-5">
        <div className="flex justify-center items-center gap-6 border border-gray-300 rounded-lg p-1 top-20 animate-pulse">
          <div>
            <div className="w-24 h-12 text-white rounded-lg
        text-base bg-gray-300 animate-pulse"> </div>
          </div>

          <span className="text-xl"> &nbsp; </span>

          <div>
            <div className="w-24 h-12 text-white rounded-lg
        text-base bg-gray-300 animate-pulse"> </div>
          </div>
        </div>
      </div>
    </div>
  )
}