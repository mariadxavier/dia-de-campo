"use client";
import { useEffect } from "react";
import Chip from "./Chip";
import EmailContactCard from "./EmailContactCard";
import WhatsappContactCard from "./WhatsappContactCard";
import { useSearchParams, useRouter } from "next/navigation";
import { ClassifiedListItem } from "@/src/types";
import Image from "./Image";

export default function ClassifiedModal({ classifiedData }: { classifiedData: ClassifiedListItem | null }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isOpened = searchParams.get('anuncio');
    const phoneNumber = process.env.NEXT_PUBLIC_COMERCIAL_PHONE_NUMBER;

    const onClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("anuncio");
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    useEffect(() => {
        if (!isOpened) return;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpened]);

    if (!isOpened) {
        return null;
    }

    return (
        <div onClick={onClose} className="cursor-pointer fixed top-0 left-0 p-5 flex items-center justify-center z-999 w-screen h-dvh bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className={`cursor-default flex flex-col gap-2 md:gap-6 w-full lg:w-3/4 xl:w-1/2 max-w-[800px] bg-(--color-white) p-4 md:p-6 lg:p-8 rounded-xl`}>
                <div className="w-full flex justify-between">
                    <Chip text="classificados" textColor="--color-dark-green" />
                    <button className="text-(--color-dark-green) bg-(--color-light-gray) rounded-full w-7 h-7 cursor-pointer" onClick={onClose}>X</button>
                </div>
                <div className="flex flex-col gap-2 md:gap-6">
                    <h1 className="font-bold text-2xl lg:text-3xl border-b border-b-(--color-light-gray)">Contato do anunciante</h1>
                    <div>

                        <h1 className="font-bold text-lg lg:text-xl">{classifiedData?.title}</h1>
                        <p className="text-(--color-gray) text-sm lg:text-base">{classifiedData?.description}</p>
                    </div>
                    <Image src={classifiedData?.coverImage} alt={classifiedData?.title || 'Imagem do anúncio'} width={1000} height={1000} className="rounded-lg w-full h-[200px] lg:h-[300px] object-cover" />
                    <div className="flex flex-col gap-3 md:gap-6  w-full md:flex-row">
                        {classifiedData?.contactPhone &&
                            <WhatsappContactCard contact={classifiedData?.contactPhone || ''} contactName={classifiedData?.contactName || ''} />
                        }
                        {classifiedData?.contactEmail &&
                            <EmailContactCard contact={classifiedData?.contactEmail || ''} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}