"use client";
import { useEffect } from "react";
import Chip from "./Chip";
import EmailContactCard from "./EmailContactCard";
import WhatsappContactCard from "./WhatsappContactCard";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ContactModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpened = searchParams.get('contato') === 'true';

  const onClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("contato");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 p-5 flex items-center justify-center z-999 w-screen h-screen bg-black/50">
      <div className={`flex flex-col gap-2 w-full bg-(--color-white) p-4 rounded-xl`}>
        <div className="w-full flex justify-between">
          <Chip text="comercial" textColor="--color-dark-green" />
          <button className="text-(--color-dark-green) bg-(--color-light-gray) rounded-full w-7 h-7" onClick={onClose}>X</button>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">Contato para anúncios e publicidade editorial</h1>
          <p className="text-(--color-gray) text-sm">Escolha o canal para anunciar, destacar sua marca ou conversar com o time comercial do Dia de Campo</p>
          <div className="flex flex-col gap-3 md:flex-row">
            <WhatsappContactCard />
            <EmailContactCard />
          </div>
          <section className="flex flex-col rounded-2xl bg-(--color-dark-blue) p-4 gap-2">
            <p className="text-[11px] font-bold uppercase text-(--color-yellow)">
              Publicidade editorial
            </p>

            <div>
              <h2 className="text-lg font-semibold leading-7 text-white">
                Destaque sua marca dentro de conteúdos estratégicos
              </h2>

              <p className="mt-2 text-xs leading-5 text-(--color-gray)">
                Formatos para anúncio, publieditorial e ações com contexto técnico para produtores e compradores.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-full bg-(--color-yellow) px-4 py-2 text-sm font-semibold text-(--color-dark-green) w-full mt-2"
            >
              Falar no WhatsApp
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}