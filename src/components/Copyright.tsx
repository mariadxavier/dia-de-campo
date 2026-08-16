import LinkButton from './LinkButton';
import PageDefinitions from '../helpers/PageDefinitions';

export default function Copyright() {
  const legalPages = PageDefinitions.getinstitutionalPages().filter(
    (page) => page.href === '/politica-privacidade' || page.href === '/termos-uso',
  );

  return (
    <div className="flex flex-col md:flex-row md:justify-around lg:justify-between p-5 gap-2 bg-(--color-dark-blue) w-full text-xs text-(--color-gray) ">
      <p className="">© 2026 Portal Dia de Campo <span className='hidden md:inline'>— Todos os direitos reservados</span></p>
      <div className='flex gap-0.5'>
        {legalPages.map((page, index) => (
          <span key={page.href} className="flex items-center gap-0.5">
            {index > 0 && <p>•</p>}
            <LinkButton href={page.href} className='font-normal'>
              <p>{page.name}</p>
            </LinkButton>
          </span>
        ))}
      </div>
    </div>
  );
}
