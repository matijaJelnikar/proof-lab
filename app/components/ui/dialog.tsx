'use client'

import { useEffect, useRef } from 'react'

export default function Dialog({ open, onClose, children }: { children: React.ReactNode, open: boolean, onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (open) {
            el.showModal()
        } else {
            el.close()
        }
    }, [open])

    return (
        <dialog ref={ref} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose() }}
            className='m-auto w-full max-w-sm rounded-md border border-border bg-surface p-0 text-foreground backdrop:bg-black/50'>
            <div className='bg-background rounded-md p-4 w-full'>
                {children}
            </div>
        </dialog>
    )
}