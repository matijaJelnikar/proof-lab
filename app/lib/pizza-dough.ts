import type { DoughCalculatorResult } from '@/app/components/ui/result-list';
import type { DoughInputs } from '@/app/lib/types';

const REFERENCE_TEMP_C = 25

/** ~0.3% instant dry yeast ferments a dough in ~8h at 25°C, so 0.3 * 8 = 2.4. */
const YEAST_HOURS_AT_REFERENCE = 2.4

function equivalentHours(hours: number, tempC: number): number {
    if (!Number.isFinite(hours) || !Number.isFinite(tempC) || hours <= 0) return 0
    return hours * Math.pow(2, (tempC - REFERENCE_TEMP_C) / 10)
}

/**
 *   total = flour + water + salt + yeast
 *         = flour * (1 + hydration% + salt% + yeast%)
 */
export function computePizzaDough({
    balls,
    ballWeight,
    hydration,
    salt,
    rtLeavening,
    rtTemperature,
    ctLeavening = 0,
    ctTemperature = 4,
}: DoughInputs): DoughCalculatorResult[] {
    const totalWeight = balls * ballWeight

    const fermentHours =
        equivalentHours(rtLeavening, rtTemperature) +
        equivalentHours(ctLeavening, ctTemperature)

    const yeast = fermentHours > 0 ? YEAST_HOURS_AT_REFERENCE / fermentHours : 0

    const flourWeight = totalWeight / (1 + hydration / 100 + salt / 100 + yeast / 100)
    const waterWeight = flourWeight * (hydration / 100)
    const saltWeight = flourWeight * (salt / 100)
    const yeastWeight = flourWeight * (yeast / 100)

    const roundNumber = (n: number, decimals = 0) =>
        Number.isFinite(n) && n > 0 ? n.toFixed(decimals) : '0'

    return [
        { label: 'Flour', value: roundNumber(flourWeight), unit: 'g' },
        { label: 'Water', value: roundNumber(waterWeight), unit: 'ml' },
        { label: 'Salt', value: roundNumber(saltWeight, 1), unit: 'g' },
        { label: 'Yeast', value: roundNumber(yeastWeight, 2), unit: 'g' },
        { label: 'Total dough', value: roundNumber(totalWeight), unit: 'g' },
    ]
}
