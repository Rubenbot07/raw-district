export default function Loading() {
    return (
    <section className="flex flex-col gap-8 mx-auto lg:max-w-4xl p-4 h-screen animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span >
        </span>
        <div className="h-6 bg-gray-200 rounded w-24" />
      </div>

      {/* Info card */}
      <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-[8px] text-sm">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-300 rounded w-20 mb-1" />
            <div className="h-4 bg-gray-200 rounded w-40" />
          </div>
        ))}
      </div>

      {/* Botón Edit */}
      <div className="bg-gray-200 text-white py-2 text-center rounded-[8px] self-start w-32 h-10" />
    </section>
    );
}