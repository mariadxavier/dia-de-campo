import Link from "next/link"

export default function NewsAuthorInfo({ author, biography, href }: { author: string, biography: string, href: string }) {
    return (
        <div className="flex flex-col gap-6 p-4 mx-4 border-(--color-light-gray) border-1 rounded-lg max-w-[330px] h-fit">
            <div className="flex flex-row gap-4">
                <div className="rounded-full bg-(--color-yellow) w-11 h-11 sm:w-13 sm:h-13 shrink-0" />
                <div className="flex flex-col gap-2">
                    <h2 className="text-(--color-dark-blue) font-bold">{author}</h2>
                    <p className="text-(--color-gray) text-sm">{biography}</p>
                </div>

            </div>
            <Link href={href} className="flex justify-center items-center text-(--color-white) bg-(--color-green) rounded-md py-2 px-6 w-full">
                Ver mais
            </Link>
        </div>
    );
}