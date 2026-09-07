'use client'

import Dialog from '@/app/components/ui/dialog'
import { saveReceipe } from '@/app/lib/actions/receipes'
import { DoughInputs, ReceipeType } from '@/app/lib/types'
import { useState, useTransition } from 'react'

interface SaveReceipeDialogProps {
    open: boolean
    onClose: () => void
    type: ReceipeType
    configuration: DoughInputs
    initialName?: string
    onSaved?: (id: number) => void
}

export default function SaveReceipeDialog({ open, onClose, type, configuration, initialName = '', onSaved }: SaveReceipeDialogProps) {
    const [name, setName] = useState(initialName)
    const [conflict, setConflict] = useState(false)
    const [isPending, startTransition] = useTransition()

    const close = () => {
        setConflict(false)
        onClose()
    }

    const save = (overwrite: boolean) => {
        startTransition(async () => {
            const res = await saveReceipe({ name: name.trim(), type, configuration, overwrite })
            if (res.status === 'conflict') {
                setConflict(true)
                return
            }
            onSaved?.(res.id)
            close()
        })
    }

    return (
        <Dialog open={open} onClose={close}>
            {conflict ? (
                <>
                    <p className='text-sm'>
                        A recipe named <span className='font-medium text-heading'>{name}</span> already exists. Overwrite it?
                    </p>
                    <div className='mt-4 flex justify-end gap-2'>
                        <button type='button' onClick={() => setConflict(false)} className='px-3 py-1 text-muted cursor-pointer hover:underline'>Rename</button>
                        <button type='button' disabled={isPending} onClick={() => save(true)} className='rounded-md bg-accent px-3 py-1 text-accent-foreground disabled:opacity-50 cursor-pointer hover:border-accent hover:bg-accent/90 transition-colors'>
                            {isPending ? 'Saving…' : 'Overwrite'}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <label htmlFor='receipeName' className='text-sm text-muted'>Name your recipe</label>
                    <input
                        id='receipeName'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Napoli Style - 24h Cold Fermentation'
                        className='mt-1 w-full rounded-md border border-border bg-surface px-3 py-1'
                    />
                    <div className='mt-4 flex justify-end gap-2'>
                        <button type='button' onClick={close} className='px-3 py-1 text-muted cursor-pointer hover:underline'>Cancel</button>
                        <button type='button' disabled={isPending || name.trim() === ''} onClick={() => save(false)} className='rounded-md bg-accent px-3 py-1 text-accent-foreground disabled:opacity-50 cursor-pointer hover:border-accent hover:bg-accent/90 transition-colors'>
                            {isPending ? 'Saving…' : 'Save'}
                        </button>
                    </div>
                </>
            )}
        </Dialog>
    )
}
