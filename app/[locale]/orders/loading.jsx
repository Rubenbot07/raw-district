export default function Loading() {
    return (
    <section className="bg-white h-auto min-h-96 w-auto flex flex-col gap-7 p-4 animate-pulse">
      <ul className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li className="text-sm" key={index}>
            <div className="relative flex gap-3 flex-wrap justify-between border-[1px] items-center border-black p-4 rounded-[8px]">
              <div className="flex flex-col gap-2">
                <div className="h-3 bg-gray-400 w-32 rounded" />
                <div className="h-4 bg-gray-300 w-24 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-4 bg-gray-300 w-36 rounded" />
              </div>
              <div className="absolute top-[-6px] right-2 w-16 h-4 rounded-[4px] bg-gray-300" />
            </div>
          </li>
        ))}
      </ul>
    </section>
    )
}