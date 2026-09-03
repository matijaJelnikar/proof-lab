

export interface DoughCalculatorResult {
    label: string;
    value: string;
    unit?: string;
}

export default function ResultList({ results }: { results: DoughCalculatorResult[] }) {
    return (
        <div className='w-full mt-6'>
            <div className='grid grid-cols-2 gap-4'>
                {results.map((result) => (
                    <div key={result.label} className='flex flex-col gap-1 bg-accent/5 p-2 rounded-md'>
                        <label className='text-sm text-muted'>{result.label}</label>
                        <span className='text-sm'>{result.value}{result.unit && ` ${result.unit}`}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}