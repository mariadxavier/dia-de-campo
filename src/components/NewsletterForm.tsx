'use client';
import { Button } from '@/src/components';

export default function NewsLetterForm() {
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col gap-3 w-full text-(--color-gray)">
      <h3 className="text-(--color-white) text-sm font-bold">Newsletter do setor</h3>
      <p>Receba notícias e preços direto no e-mail</p>
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
        <input
          className="bg-(--color-midnight) outline-none py-3 px-4 text-(--color-white) text-sm w-full rounded-lg"
          type="email"
          name="newsletter-email"
          placeholder="Seu e-mail"
        />
        <Button
          type={'submit'}
          title={'Assinar'}
          className="bg-(--color-green) text-(--color-white) rounded-lg"
        />
      </form>
    </div>
  );
}
