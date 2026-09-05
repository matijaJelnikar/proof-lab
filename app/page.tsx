import ReceipesList from '@/app/components/ui/receipes-list';
import ReceipesListSkeleton from '@/app/components/ui/receipes-list-skeleton';
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
      '-._________.-'
      `;

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center px-6 py-12 sm:px-16 sm:py-32">

        <h2 className='text-3xl font-bold whitespace-pre pb-4'>What are you baking?</h2>
        <div className='flex flex-col sm:flex-row items-center '>

          <div className='flex flex-1 flex-col items-center'>
            <Link href={'/pizza'}>
              <pre className='text-sm text-muted whitespace-pre hover:font-bold hover:cursor-pointer hover:text-accent hover:scale-105 transition-all duration-300 hover:rotate-1'>{DOUGH}</pre>
            </Link>
          </div>

          <div className='flex flex-1 flex-col items-center'>
            <Link href={'/bread'}>
              <pre className='text-sm text-muted whitespace-pre hover:font-bold hover:cursor-pointer hover:text-accent hover:scale-105 transition-all duration-300 hover:-rotate-1'>{BREAD}</pre>
            </Link>
          </div>
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
