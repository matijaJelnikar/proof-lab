'use client'

import SaveReceipeDialog from '@/app/components/receipes/save-receipe-dialog';
import InputField from '@/app/components/ui/input-field';
import InputToggleSelector from '@/app/components/ui/input-toggle-selector';
import ResultList from '@/app/components/ui/result-list';
import { computePizzaDough } from '@/app/lib/pizza-dough';
import { DoughInputs, YeastType, yeastTypes } from '@/app/lib/types';
import { useState } from 'react';




export default function PizzaCalculator({ initialInputs, existingReceipeName }: { initialInputs: DoughInputs, existingReceipeName?: string }) {
    const [inputs, setInputs] = useState<DoughInputs>(initialInputs)
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const hasChanges = (Object.keys(inputs) as Array<keyof DoughInputs>).some(
        key => inputs[key] !== initialInputs[key]
    )

    const [results, totalDough] = computePizzaDough({
        balls: inputs.balls,
        ballWeight: inputs.ballWeight,
        hydration: inputs.hydration,
        salt: inputs.salt,
        rtLeavening: inputs.rtLeavening,
        rtTemperature: inputs.rtTemperature,
        ctLeavening: inputs.ctLeavening,
        ctTemperature: inputs.ctTemperature,
        yeastType: inputs.yeastType,
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, valueAsNumber } = e.target
        setInputs(prev => ({ ...prev, [name]: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber }))
    }

    const openSaveDialog = () => {
        setIsDialogOpen(true)

    }

    return (
        <div className='w-full h-full flex flex-col gap-4' >
            <SaveReceipeDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                type='PIZZA'
                configuration={inputs}
                initialName={existingReceipeName}
            />

            <div className='grid grid-cols-2 gap-4'>
                <InputField name="balls" label="Dough Balls" value={inputs.balls} onChange={handleChange} placeholder="2" />
                <InputField name="ballWeight" label="Ball Weight" value={inputs.ballWeight} onChange={handleChange} placeholder="270" step={10} unit="g" />
                <InputField name="hydration" label="Hydration" value={inputs.hydration} onChange={handleChange} placeholder="65" unit="%" />
                <InputField name="salt" label="Salt" value={inputs.salt} onChange={handleChange} placeholder="3" step={0.1} unit="%" />
            </div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-88 h-px my-4 bg-border border-0" />
                <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Leavening</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <InputField name="rtLeavening" label="Room leavening" value={inputs.rtLeavening} onChange={handleChange} placeholder="1" unit="h" />
                <InputField name="rtTemperature" label="Room Temperature" value={inputs.rtTemperature} onChange={handleChange} placeholder="24" unit="°C" />
                <InputField name="ctLeavening" label="Cold Leavening" value={inputs.ctLeavening} onChange={handleChange} placeholder="0" unit="h" />
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
                {hasChanges && (
                    <button
                        type="button"
                        onClick={openSaveDialog}
                        className='absolute right-0 px-3 py-1 rounded-md bg-background text-accent hover:underline cursor-pointer'
                    >
                        Save
                    </button>
                )}
            </div>
            <div className='w-full'>
                <ResultList results={results} />
            </div>
        </div >
    )
}
