import Dialog from '@/app/components/ui/dialog'
import { useState } from 'react'

interface PizzaRecipeDialogProps {
    isDialogOpen: boolean
    setIsDialogOpen: (open: boolean) => void
    onConfirm: ({ receipeName }: { receipeName: string }) => void
}

export default function PizzaRecipeDialog({ isDialogOpen, setIsDialogOpen, onConfirm }: PizzaRecipeDialogProps) {
    const [localRecipeName, setLocalRecipeName] = useState('')
    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <label htmlFor='recipeName' className='text-sm text-muted'>Name your recipe</label>
            <input
                id='recipeName'
                type='text'
                value={localRecipeName}
                onChange={(e) => setLocalRecipeName(e.target.value)}
                placeholder='Napoli Style - 24h Cold Fermentation'
                className='mt-1 w-full rounded-md border border-border bg-surface px-3 py-1'
            />
            <div className='mt-4 flex justify-end gap-2'>
                <button type='button' onClick={() => setIsDialogOpen(false)} className='px-3 py-1 text-muted'>Cancel</button>
                <button type='button' onClick={() => { onConfirm({ receipeName: localRecipeName }); setIsDialogOpen(false) }} className='rounded-md bg-accent px-3 py-1 text-accent-foreground'>Save</button>
            </div>
        </Dialog>
    )
}
