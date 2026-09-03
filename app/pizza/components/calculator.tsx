'use client'
import InputField from '@/app/components/ui/input-field';
import { computePizzaDough } from '@/app/lib/pizza-dough';
import ResultList from '@/app/components/ui/result-list';
import { useState } from 'react';

export default function PizzaCalculator() {
    const [balls, setBalls] = useState(2)
    const [ballWeight, setBallWeight] = useState(270)
    const [hydration, setHydration] = useState(65)
    const [salt, setSalt] = useState(3)
    const [rtLeavening, setRtLeavening] = useState(1)
    const [rtTemperature, setRtTemperature] = useState(24)
    const [ctLeavening, setCtLeavening] = useState(1)
    const [ctTemperature, setCtTemperature] = useState(24)

    const results = computePizzaDough({
        balls, ballWeight, hydration, salt,
        rtLeavening, rtTemperature, ctLeavening, ctTemperature,
    })

    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-4 '>
                <InputField name="balls" label="Dough Balls" value={balls} onChange={(e) => setBalls(Number(e.target.value))} placeholder="2" />
                <InputField name="ballWeight" label="Ball Weight" value={ballWeight} onChange={(e) => setBallWeight(Number(e.target.value))} placeholder="270" step={10} unit="g" />
                <InputField name="hydration" label="Hydration" value={hydration} onChange={(e) => setHydration(Number(e.target.value))} placeholder="65" unit="%" />
                <InputField name="salt" label="Salt" value={salt} onChange={(e) => setSalt(Number(e.target.value))} placeholder="3" step={0.1} unit="%" />
            </div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-88 h-px my-8 bg-border border-0" />
                <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Fermentation</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <InputField name="rtLeavening" label="Room Temp Leavening" value={rtLeavening} onChange={(e) => setRtLeavening(Number(e.target.value))} placeholder="1" unit="h" />
                <InputField name="rtTemperature" label="Room Temperature" value={rtTemperature} onChange={(e) => setRtTemperature(Number(e.target.value))} placeholder="24" unit="°C" />
                <InputField name="ctLeavening" label="Cold Leavening" value={ctLeavening} onChange={(e) => setCtLeavening(Number(e.target.value))} placeholder="0" unit="h" />
                <InputField name="ctTemperature" label="Fridge Temperature" value={ctTemperature} onChange={(e) => setCtTemperature(Number(e.target.value))} placeholder="4" unit="°C" />
            </div>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-88 h-px my-8 bg-border border-0" />
                <span className="absolute px-3 font-medium text-heading -translate-x-1/2 bg-background left-1/2">Results</span>
            </div>
            <div className='w-full flex flex-col gap-4'>
                <ResultList results={results} />
            </div>
        </div>
    )
}
