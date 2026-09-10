import { getReceipeById } from '@/app/lib/queries/receipes';
import { DoughInputs } from '@/app/lib/types';
import PizzaCalculator from '@/app/pizza/components/calculator';

const INITIAL_INPUTS: DoughInputs = {
    balls: 2,
    ballWeight: 270,
    hydration: 65,
    salt: 3,
    rtLeavening: 1,
    rtTemperature: 24,
    ctLeavening: 1,
    ctTemperature: 6,
    yeastType: 'IDY',
} as const;

export default async function PizzaPage({ searchParams }: { searchParams: Promise<{ receipe?: string }> }) {

    const receipeId = (await searchParams).receipe
    let receipe: { name: string, configuration: DoughInputs } | null = { name: '', configuration: INITIAL_INPUTS }
    if (receipeId) {
        const recFromDb = await getReceipeById(Number(receipeId))
        if (recFromDb) {
            receipe.configuration = recFromDb.configuration
            receipe.name = recFromDb.name
        }
    }

    return (
        <div className='flex flex-col w-full pt-4'>
            <div className="flex flex-col self-center mx-6  sm:max-w-3xl justify-center h-full gap-6">
                <PizzaCalculator key={receipeId ?? 'new'} initialInputs={receipe?.configuration} existingReceipeName={receipe?.name} />
            </div>
        </div>

    )
}