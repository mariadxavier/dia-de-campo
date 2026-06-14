export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[--color-yellow] rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Carregando conteúdo...</p>
      </div>
    </div>
  );
}
