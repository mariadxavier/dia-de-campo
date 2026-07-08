export default function NewsReferences({ references }: { references: string }) {
    return (
        <div className="flex flex-col h-fit gap-4 p-4 mx-4 bg-(--color-light-green) border-(--color-light-gray) border-1 rounded-lg max-w-[330px]">
            <h2 className="text-(--color-dark-blue) font-bold">Fontes</h2>
            <p className="text-(#3F414D) text-sm">{references}</p>
        </div>
    )
}