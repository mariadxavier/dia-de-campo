'use client';
import { useState } from 'react';

export default function NewsNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="flex flex-col gap-5 bg-(--color-white) rounded-2xl p-6 border border-(--color-gray)/15">
      <div className="flex items-center gap-2 bg-(--color-light-yellow) text-(--color-dark-blue) text-xs font-bold px-3 py-1.5 rounded-full w-fit">
        <span>📧</span>
        <span>NEWSLETTER DIÁRIA</span>
      </div>

      <h2 className="text-xl font-bold text-(--color-dark-blue) leading-snug">
        Receba as notícias do dia no seu e-mail
      </h2>
      <p className="text-sm text-(--color-gray) leading-relaxed">
        Resumo editorial gratuito • Preços CEASA e oportunidades comerciais • Cancele quando quiser
      </p>

      {submitted ? (
        <div className="flex flex-col items-center gap-2 py-4">
          <div className="w-10 h-10 rounded-full bg-(--color-light-green) flex items-center justify-center text-lg">
            ✓
          </div>
          <p className="text-sm font-medium text-(--color-green)">Inscrição realizada com sucesso!</p>
          <p className="text-xs text-(--color-gray)">Verifique seu e-mail para confirmar.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            id="newsletter-email-input"
            type="email"
            placeholder="Seu melhor e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-(--color-gray)/20 text-sm text-(--color-dark-gray) placeholder:text-(--color-gray) outline-none focus:border-(--color-green) transition-colors bg-(--color-white-shell)"
          />
          <button
            id="newsletter-submit-button"
            type="submit"
            className="w-full py-3.5 rounded-xl bg-(--color-green) text-(--color-white) text-sm font-bold hover:bg-(--color-dark-green) transition-colors cursor-pointer"
          >
            Assinar grátis
          </button>
        </form>
      )}
    </section>
  );
}
