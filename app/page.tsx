import ReceipesList from '@/app/components/receipes/receipes-list';
import ReceipesListSkeleton from '@/app/components/receipes/receipes-list-skeleton';
import Link from 'next/link';
import { Suspense } from 'react';

const DOUGH = String.raw`        .-~~~~~~~-.
      .'  o  .  o  '.
     /  .  o   .  o  \
    |  o   .   o   .  |
    |  .   Pizza  o   |
     \  o  .   o  .  /
      '.  o  .  o  .'
       '-._______.-'`;

const BREAD = String.raw`        .-~~~~~~~-.
      .'  /  /  /  '.
     /    '  '  '    \
    |  o   .   o   .  |
    |  .   Bread  o   |
     \_______________/
      '-._________.-'`;

const CHOICES = [
  { href: '/pizza', label: 'Pizza', art: DOUGH, tilt: 'sm:hover:rotate-1' },
  { href: '/bread', label: 'Bread', art: BREAD, tilt: 'sm:hover:-rotate-1' },
];

type BakeChoiceProps = (typeof CHOICES)[number];

function BakeChoice({ href, label, art, tilt }: BakeChoiceProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`flex w-full items-center gap-4 rounded-md border border-accent/50 bg-accent/5 px-4 py-3 text-muted duration-200 active:scale-[0.98] active:bg-accent/10 sm:block sm:w-auto sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:duration-300 sm:hover:scale-105 sm:hover:font-bold sm:hover:text-accent ${tilt}`}
    >
      <pre aria-hidden className='whitespace-pre text-[0.5rem] leading-[0.65rem] sm:text-sm sm:leading-normal'>{art}</pre>
      <span className='text-base text-foreground sm:hidden'>{label}</span>
      <span aria-hidden className='ml-auto sm:hidden'>&rarr;</span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans pb-4">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center px-6 py-12 sm:px-16 sm:py-32">
        <h2 className='text-2xl sm:text-3xl font-bold pb-8'>What are you baking?</h2>
        <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-8'>
          {CHOICES.map((choice) => (
            <BakeChoice key={choice.href} {...choice} />
          ))}
        </div>

        <div className='relative w-full inline-flex items-center justify-center mt-8'>
          <hr className="w-full h-px my-8 bg-border border-0" />
          <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Presets</span>
        </div>


        <Suspense fallback={<ReceipesListSkeleton />}>
          <ReceipesList />
        </Suspense>
      </main>
    </div>
  );
}
