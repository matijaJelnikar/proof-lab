
import ReceipeCard from '@/app/components/receipes/receipe-card';
import { getAllReceipes } from '@/app/lib/queries/receipes';
import { ReceipeType } from '@/app/lib/types';

type Receipe = Awaited<ReturnType<typeof getAllReceipes>>[number];

// Fixed locale + timezone so the server and the browser always agree on the string.
const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });

function ReceipeColumn({ title, receipes }: { title: string, receipes: Receipe[] }) {
    return (
        <section className='flex flex-col gap-2'>
            <h3 className='text-sm font-medium text-heading'>{title}</h3>

            {receipes.length === 0 ? (
                <p className='text-sm text-muted'>Nothing saved yet</p>
            ) : (
                receipes.map((receipe) => (
                    <ReceipeCard
                        key={receipe.id}
                        id={receipe.id}
                        name={receipe.name}
                        type={receipe.type}
                        createdAt={dateFormatter.format(receipe.createdAt)}
                    />
                ))
            )}
        </section>
    )
}

export default async function ReceipesList() {
    const receipes = await getAllReceipes();

    const byType = (type: ReceipeType) => receipes.filter((receipe) => receipe.type === type);

    return (
        <div className='w-full pt-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <ReceipeColumn title='Pizza' receipes={byType('PIZZA')} />
                <ReceipeColumn title='Bread' receipes={byType('BREAD')} />
            </div>
        </div>
    )
}
