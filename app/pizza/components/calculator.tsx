'use client'
import InputField from '@/app/components/ui/input-field';
import { computePizzaDough } from '@/app/lib/pizza-dough';
import ResultList from '@/app/components/ui/result-list';
import { useState } from 'react';
import { DoughInputs, YeastType, yeastTypes } from '@/app/lib/types';
import InputToggleSelector from '@/app/components/ui/input-toggle-selector';

export default function PizzaCalculator() {
    const [inputs, setInputs] = useState<DoughInputs>({
        balls: 2,
        ballWeight: 270,
        hydration: 65,
        salt: 3,
        rtLeavening: 1,
        rtTemperature: 24,
        ctLeavening: 1,
        ctTemperature: 6,
        yeastType: 'IDY'
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e?.target
        setInputs(prev => ({ ...prev, [name]: value }))
    }

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

    return (
        <div className='w-full h-full flex flex-col gap-4'>
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
                <InputField name="rtLeavening" label="Room leaven" value={inputs.rtLeavening} onChange={handleChange} placeholder="1" unit="h" />
                <InputField name="rtTemperature" label="Room Temperature" value={inputs.rtTemperature} onChange={handleChange} placeholder="24" unit="°C" />
                <InputField name="ctLeavening" label="Cold Leavening" value={inputs.ctLeavening} onChange={handleChange} placeholder="0" unit="h" />
                <InputField name="ctTemperature" label="Fridge Temperature" value={inputs.ctTemperature} onChange={handleChange} placeholder="4" unit="°C" />
            </div>
            <div className='w-full flex justify-end'>
                <InputToggleSelector<YeastType> options={yeastTypes} selectedOption={inputs.yeastType} onChange={(option) => setInputs(prev => ({ ...prev, yeastType: option }))} />
            </div>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-88 h-px my-4 bg-border border-0" />
                <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Total dough:
                    <span className={`ml-1 font-bold ${totalDough > 0 ? 'text-accent' : 'text-muted'}`}>
                        {totalDough} g
                    </span>
                </span>
            </div>
            <div className='w-full'>
                <ResultList results={results.filter(r => r.label !== 'Total dough')} />
            </div>
        </div>
    )
}
