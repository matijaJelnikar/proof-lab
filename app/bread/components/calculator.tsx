'use client'

import SaveReceipeDialog from '@/app/components/receipes/save-receipe-dialog';
import InputField from '@/app/components/ui/input-field';
import InputToggleSelector from '@/app/components/ui/input-toggle-selector';
import ResultList from '@/app/components/ui/result-list';
import { computeBreadDough } from '@/lib/dough';
import { BreadInputs, YeastType, yeastTypes } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';




export default function BreadCalculator({ initialInputs, existingReceipeName, canSave = false }: { initialInputs: BreadInputs, existingReceipeName?: string, canSave?: boolean }) {
    const [inputs, setInputs] = useState<BreadInputs>(initialInputs)
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const hasChanges = (Object.keys(inputs) as Array<keyof BreadInputs>).some(
        key => inputs[key] !== initialInputs[key]
    )

    const [results, totalDough] = computeBreadDough({
        loaves: inputs.loaves,
        loafWeight: inputs.loafWeight,
        hydration: inputs.hydration,
        salt: inputs.salt,
        rtLeavening: inputs.rtLeavening,
        rtTemperature: inputs.rtTemperature,
        ctLeavening: inputs.ctLeavening,
        ctTemperature: inputs.ctTemperature,
        yeastType: inputs.yeastType,
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputs(prev => ({ ...prev, [name]: Number(value.replace(',', '.')) || 0 }))
    }

    const openSaveDialog = () => {
        setIsDialogOpen(true)

    }

    return (
        <div className='w-full h-full flex flex-col gap-4 pb-4' >
            <SaveReceipeDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                type='BREAD'
                configuration={inputs}
                initialName={existingReceipeName}
                namePlaceholder='Country Loaf - Overnight Cold Proof'
            />

            <div className='grid grid-cols-2 gap-4'>
                <InputField name="loaves" label="Loaves" value={inputs.loaves} onChange={handleChange} placeholder="1" />
                <InputField name="loafWeight" label="Loaf Weight" value={inputs.loafWeight} onChange={handleChange} placeholder="900" unit="g" />
                <InputField name="hydration" label="Hydration" value={inputs.hydration} onChange={handleChange} placeholder="72" unit="%" />
                <InputField name="salt" label="Salt" value={inputs.salt} onChange={handleChange} placeholder="2" unit="%" />
            </div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-88 h-px my-4 bg-border border-0" />
                <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Leavening</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <InputField name="rtLeavening" label="Room leavening" value={inputs.rtLeavening} onChange={handleChange} placeholder="4" unit="h" />
                <InputField name="rtTemperature" label="Room Temperature" value={inputs.rtTemperature} onChange={handleChange} placeholder="24" unit="°C" />
                <InputField name="ctLeavening" label="Cold Leavening" value={inputs.ctLeavening} onChange={handleChange} placeholder="12" unit="h" />
                <InputField name="ctTemperature" label="Fridge Temperature" value={inputs.ctTemperature} onChange={handleChange} placeholder="4" unit="°C" />
            </div>
            <div className='w-full flex justify-end'>
                <InputToggleSelector<YeastType> options={yeastTypes} selectedOption={inputs.yeastType} onChange={(option) => setInputs(prev => ({ ...prev, yeastType: option }))} />
            </div>

            <div className="relative inline-flex items-center justify-center w-full">
                <hr className="w-88 h-px my-4 bg-border border-0" />
                <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Total dough:
                    <span className={`ml-1 font-bold ${totalDough > 0 ? 'text-accent' : 'text-muted'}`}>
                        {totalDough} g
                    </span>
                </span>
                {hasChanges && (canSave ? (
                    <button
                        type="button"
                        onClick={openSaveDialog}
                        className='absolute right-0 px-3 py-1 rounded-md bg-background text-accent hover:underline cursor-pointer'
                    >
                        Save
                    </button>
                ) : (
                    <Link
                        href='/login?from=/bread'
                        className='absolute right-0 px-3 py-1 rounded-md bg-background text-muted hover:text-accent hover:underline'
                    >
                        Sign in to save
                    </Link>
                ))}
            </div>
            <div className='w-full'>
                <ResultList results={results} />
            </div>
        </div >
    )
}
