import Link from 'next/link';

export default function BreadPage() {
    return (
        <div>
            <Link href={'/'} className='text-accent hover:underline flex items-start p-4'>Go back</Link>
            <div className="flex flex-col items-center justify-center w-full h-full gap-6">

            </div>
        </div>
    )
}