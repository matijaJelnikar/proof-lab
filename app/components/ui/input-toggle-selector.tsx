
export default function InputToggleSelector<T extends string>({ options, selectedOption, onChange }: { options: Record<T, String>, selectedOption: T, onChange: (option: T) => void }) {
    return (
        <div className='flex flex-col gap-1'>

            <div className='flex gap-2'>
                {Object.entries(options).map(([key, value]) => (
                    <button
                        key={String(key)}
                        onClick={() => onChange(key as T)}
                        className={`px-4 py-2 cursor-pointer rounded-md border ${selectedOption === key ? 'bg-accent text-background' : 'bg-surface text-foreground'}`}
                    >
                        {String(key)}
                    </button>
                ))}
            </div>
            {selectedOption && (
                <p className='flex self-end text-sm text-muted'> {options[selectedOption]}</p>
            )}
        </div>
    )
}
