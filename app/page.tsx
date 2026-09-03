import Link from 'next/link';

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

        <h2 className='text-3xl font-bold whitespace-pre pb-4'>      What are you making?</h2>
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
      </main>
    </div>
  );
}
