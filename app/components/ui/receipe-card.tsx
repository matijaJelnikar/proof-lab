'use client'

import Dialog from '@/app/components/ui/dialog'
import { deleteReceipe } from '@/app/lib/actions/receipes'
import Link from 'next/link'
import { useState, useTransition } from 'react'

interface ReceipeCardProps {
    id: number
    name: string
    type: string
    /** Pre-formatted on the server — formatting here would break hydration. */
    createdAt: string
}

export default function ReceipeCard({ id, name, type, createdAt }: ReceipeCardProps) {
    const [confirming, setConfirming] = useState(false)
    const [isPending, startTransition] = useTransition()

    const remove = () => {
        startTransition(async () => {
            await deleteReceipe(id)
            setConfirming(false)
        })
    }

    return (
        <div className='relative'>
            <Link
                href={`/${type.toLowerCase()}?receipe=${id}`}
                className='flex flex-col gap-1 bg-accent/5 border border-accent/50 pl-2 pr-12 py-2 rounded-md hover:border-accent hover:bg-accent/10 transition-colors'
            >
                <span className='text-sm'>{name}</span>
                <span className='text-sm text-muted'>{createdAt}</span>
            </Link>

            <button
                type='button'
                aria-label={`Delete ${name}`}
                onClick={() => setConfirming(true)}
                className='absolute right-0 top-0 h-full w-11 flex items-center justify-center rounded-r-md text-muted hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer'
            >
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' className='h-4 w-4'>
                    <path d='M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3' />
                </svg>
            </button>

            <Dialog open={confirming} onClose={() => setConfirming(false)}>
                <p className='text-sm'>
                    Delete <span className='font-medium text-heading'>{name}</span>? This cannot be undone.
                </p>
                <div className='mt-4 flex justify-end gap-2'>
                    <button type='button' onClick={() => setConfirming(false)} className='px-3 py-1 text-muted cursor-pointer hover:underline'>Cancel</button>
                    <button type='button' disabled={isPending} onClick={remove} className='rounded-md bg-red-600 px-3 py-1 text-white disabled:opacity-50 cursor-pointer hover:bg-red-700 transition-colors'>
                        {isPending ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            </Dialog>
        </div>
    )
}
