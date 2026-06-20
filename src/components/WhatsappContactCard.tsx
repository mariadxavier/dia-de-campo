export default function WhatsAppContactCard() {
  return (
    <section className="rounded-xl border border-green-100 bg-(--color-light-green) p-4">
      <div className="flex gap-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-green)">
          <span className="text-xs font-bold text-white">WA</span>
        </div>

        <div>
          <h2 className="text-sm font-bold text-(--color-dark-blue)">
            WhatsApp comercial
          </h2>

          <p className="mt-1 text-xs leading-5 text-(--color-gray)">
            Atendimento para anúncios, mídia e destaque editorial.
          </p>
        </div>
      </div>

      <a
        href={`https://wa.me/${process.env.COMERCIAL_PHONE_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-(--color-dark-green) text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
      >
        Chamar no WhatsApp
      </a>
    </section>
  );
}