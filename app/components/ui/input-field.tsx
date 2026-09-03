interface InputFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: HTMLInputElement['type'];
    unit?: string;
    step?: number;
    value?: string | number;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function InputField({
    name,
    label,
    placeholder,
    unit,
    type = 'number',
    step = 1,
    value,
    required = true,
    onChange
}: InputFieldProps) {
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name}>{label}</label>
            <div className='relative'>
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    step={step}
                    value={value}
                    required={required}
                    onChange={onChange}
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