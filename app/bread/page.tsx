import { getCurrentUser } from '@/lib/dal';
import { getReceipeById } from '@/lib/queries/receipes';
import { BreadInputs } from '@/lib/types';
import BreadCalculator from '@/app/bread/components/calculator';

const INITIAL_INPUTS: BreadInputs = {
    loaves: 1,
    loafWeight: 900,
    hydration: 72,
    salt: 2,
    rtLeavening: 4,
    rtTemperature: 24,
    ctLeavening: 12,
    ctTemperature: 4,
    yeastType: 'SSD',
} as const;

export default async function BreadPage({ searchParams }: { searchParams: Promise<{ receipe?: string }> }) {

    const receipeId = (await searchParams).receipe
    const user = await getCurrentUser()
    const receipe: { name: string, configuration: BreadInputs } = { name: '', configuration: INITIAL_INPUTS }
    if (receipeId) {
        const recFromDb = await getReceipeById(Number(receipeId))
        if (recFromDb?.type === 'BREAD') {
            receipe.configuration = recFromDb.configuration as BreadInputs
            receipe.name = recFromDb.name
        }
    }

    return (
        <div className='flex flex-col w-full pt-4'>
            <div className="flex flex-col self-center mx-6  sm:max-w-3xl justify-center h-full gap-6">
                <BreadCalculator
                    key={receipeId ?? 'new'}
                    initialInputs={receipe.configuration}
                    existingReceipeName={receipe.name}
                    canSave={user !== null}
                />
            </div>
        </div>

    )
}
