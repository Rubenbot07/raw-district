export default function Loading() {
    return (
      <section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 md:py-8 gap-8 lg:gap-16 animate-pulse">
          {/* Imagen principal */}
          <div className="aspect-[4/5] bg-gray-200 rounded-xl w-full" />

          <div className="flex flex-col gap-4 py-4">
            <div className="w-full flex flex-col gap-8 aspect-[4/5] bg--200 rounded-xl">
              <div className="h-8 w-full bg-gray-200 rounded-xl" />
              <div className="flex gap-4">
                <span className="w-1/2 h-12 bg-gray-200 rounded-xl"/>
                <span className="w-1/2 h-12 bg-gray-200 rounded-xl"/>
              </div>
              <div className="flex flex-col gap-4">
                <span className="bg-gray-200 w-2/3 h-3 rounded-xl"/>
                <span className="bg-gray-200 w-2/3 h-3 rounded-xl"/>
                <span className="bg-gray-200 w-2/3 h-3 rounded-xl"/>
              </div>
              <div className="flex flex-col gap-4">
                <span className="bg-gray-200 w-2/3 h-4 rounded-xl" />
                <span className="bg-gray-200 w-2/3 h-16 rounded-xl"/>
                <span className="bg-gray-200 w-2/3 h-4 rounded-xl" />
              </div>
              <div className="flex flex-col gap-4">
                <span className="h-3 bg-gray-200 w-2/3 rounded-xl"/>
                <span className="h-3 bg-gray-200 w-2/3 rounded-xl"/>
                <span className="h-3 bg-gray-200 w-2/3 rounded-xl"/>
                <span className="h-3 bg-gray-200 w-2/3 rounded-xl"/>
              </div>
            </div>
          </div>
        </div>

      </section>
    )
  }