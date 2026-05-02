"use client";
import { Button } from "@/src/components";

export default function NewsLetterForm() {
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col gap-4 p-6 bg-(--color-dark-green) w-full">
      <h3 className="text-(--color-white) text-sm font-bold">
        ASSINE NOSSA NEWSLETTER
      </h3>
      <form
        onSubmit={handleNewsletterSubmit}
        className="flex gap-2 bg-(--color-dark-green)"
      >
        <input
          className="bg-(--color-leaf-green) outline-none py-3 px-4 text-(--color-white) text-sm w-full"
          type="email"
          name="newsletter-email"
          placeholder="Seu melhor e-mail"
        />
        <Button
          type={"submit"}
          title={"Inscrever-se"}
          className="bg-(--color-white) text-(--color-leaf-green) text-nowrap"
        />
      </form>
    </div>
  );
}
