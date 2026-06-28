export default function CollapseMenuPartnerCard() {
  const comercialEmail = process.env.NEXT_PUBLIC_COMERCIAL_EMAIL_ADDRESS;
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl bg-(--color-dark-blue) p-5">
        <p className="text-xs font-bold uppercase text-(--color-yellow)">
          Para parceiros
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold leading-7 text-white">
              Anuncie ou destaque sua marca
            </h2>

            <p className="mt-2 text-xs leading-5 text-(--color-gray)">
              Fale com o comercial sobre anúncio, publieditorial ou campanha.
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full bg-(--color-yellow) p-3 text-sm font-semibold text-(--color-dark-green)"
          >
            WhatsApp
          </button>
        </div>
      </section>

      <section className="flex items-center justify-between rounded-2xl text-xs border border-(--color-faded-white) bg-white p-4">
        <div>
          <h3 className="font-semibold text-(--color-dark-blue)">
            E-mail comercial
          </h3>

          <a
            href={`mailto:${comercialEmail}`}
            className="mt-1 block text-(--color-green)"
          >
            {comercialEmail}
          </a>
        </div>

        <button
          type="button"
          className="rounded-full bg-(--color-light-green) px-5 py-2.5 text-sm font-semibold text-(--color-green)"
        >
          Enviar
        </button>
      </section>
    </div>
  );
}