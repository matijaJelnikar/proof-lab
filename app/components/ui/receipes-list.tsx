import { getAllReceipes } from '@/app/lib/queries/receipes';
import { ReceipeType } from '@/app/lib/types';
import Link from 'next/link';

type Receipe = Awaited<ReturnType<typeof getAllReceipes>>[number];

function ReceipeColumn({ title, receipes }: { title: string, receipes: Receipe[] }) {
    return (
        <section className='flex flex-col gap-2'>
            <h3 className='text-sm font-medium text-heading'>{title}</h3>

            {receipes.length === 0 ? (
                <p className='text-sm text-muted'>Nothing saved yet</p>
            ) : (
                receipes.map((receipe) => (
                    <Link
                        key={receipe.id}
                        href={`/${receipe.type.toLowerCase()}?receipe=${receipe.id}`}
                        className='flex flex-col gap-1 bg-accent/5 border border-accent/50 p-2 rounded-md hover:border-accent hover:bg-accent/10 transition-colors'
                    >
                        <span className='text-sm'>{receipe.name}</span>
                        <span className='text-sm text-muted'>
                            {new Date(receipe.createdAt).toLocaleDateString()}
                        </span>
                    </Link>
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
