import LinkButton from './LinkButton';

export default function Copyright() {
  return (
    <div className="flex flex-col md:flex-row md:justify-around lg:justify-between p-5 gap-2 bg-(--color-dark-blue) w-full text-xs text-(--color-gray) ">
      <p className="">© 2026 Portal Dia de Campo  — Todos os direitos reservados</p>
      <div className='flex gap-0.5'>
        <LinkButton href={''} className='font-normal'>
          <p>Política de Privacidade</p>
        </LinkButton>
        <p>•</p>
        <LinkButton href={''} className='font-normal'>
          <p>Termos de Uso</p>
        </LinkButton>
      </div>
    </div>
  );
}
