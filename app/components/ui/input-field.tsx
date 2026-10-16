'use client'

import { useState } from 'react';

interface InputFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    unit?: string;
    value?: number;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function InputField({
    name,
    label,
    placeholder,
    unit,
    value,
    required = true,
    onChange
}: InputFieldProps) {
    // Local text lets the field be empty or hold partial input like "1." while the parent keeps a number
    const [text, setText] = useState(value === undefined ? '' : String(value))
    const [prevValue, setPrevValue] = useState(value)

    if (value !== prevValue) {
        setPrevValue(value)
        if ((Number(text) || 0) !== value) setText(value === undefined ? '' : String(value))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value.replace(',', '.')
        if (!/^\d*\.?\d*$/.test(next)) return
        setText(next)
        onChange?.(e)
    }

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name}>{label}</label>
            <div className='relative'>
                <input
                    id={name}
                    type='text'
                    inputMode='decimal'
                    name={name}
                    placeholder={placeholder}
                    value={text}
                    required={required}
                    onChange={handleChange}
                    className={`min-h-11 w-full rounded-md border  pl-3 border-border bg-surface ${unit ? 'pr-9' : 'pr-3'}`}
                />
                {unit && (
                    <span
                        aria-hidden="true"
                        className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-foreground'
                    >
                        {unit}
                    </span>
                )}
            </div>
        </div>
    )
}
