export default function EmailContactCard() {
    return (
        <section className="rounded-xl border border-gray-200 bg-(--color-white-shell) p-4">
            <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-yellow)">
                    <span className="text-lg font-bold text-(--color-green)">
                        @
                    </span>
                </div>

                <div>
                    <h2 className="text-sm font-bold text-(--color-dark-blue)">
                        E-mail comercial
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-(--color-gray)">
                        Envie briefing, proposta ou dúvidas para o time comercial.
                    </p>
                </div>
            </div>

            <a
                href="mailto:comercial@diadecampo.com.br"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-(--color-dark-green) bg-white text-[13px] font-semibold text-(--color-dark-green) transition-colors hover:bg-(--color-light-green)"
            >
                Enviar e-mail
            </a>
        </section>
    );
}