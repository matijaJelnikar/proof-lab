import BreadCalculator from '@/app/bread/components/calculator';
import Link from 'next/link';

export default function BreadPage() {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-col self-center max-w-3xl justify-center h-full gap-6">
                <BreadCalculator />
            </div>
        </div>
    )
}