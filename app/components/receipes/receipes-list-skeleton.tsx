function SkeletonCard() {
    return (
        <div className='flex flex-col gap-1 bg-accent/5 border border-accent/50 p-2 rounded-md'>
            <span className='flex h-5 items-center'>
                <span className='h-3 w-2/3 rounded bg-accent/20' />
            </span>
            <span className='flex h-5 items-center'>
                <span className='h-3 w-1/3 rounded bg-accent/10' />
            </span>
        </div>
    )
}

function SkeletonColumn() {
    return (
        <section className='flex flex-col gap-2'>
            <span className='flex h-5 items-center'>
                <span className='h-3 w-16 rounded bg-accent/20' />
            </span>
            <SkeletonCard />
            <SkeletonCard />
        </section>
    )
}

export default function ReceipesListSkeleton() {
    return (
        <div className='w-full pt-8 animate-pulse' aria-hidden='true'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <SkeletonColumn />
                <SkeletonColumn />
            </div>
        </div>
    )
}
