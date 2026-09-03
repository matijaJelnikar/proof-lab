import PizzaCalculator from '@/app/pizza/components/calculator';
import Link from 'next/link';

export default function PizzaPage() {
    return (
        <div className='flex flex-col w-full'>
            <Link href={'/'} className='text-accent hover:underline flex items-start p-4'>Go back</Link>
            <div className="flex flex-col self-center max-w-4/5 sm:max-w-3xl justify-center h-full gap-6">
                <PizzaCalculator />
            </div>
        </div>

    )
}