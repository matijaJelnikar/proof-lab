import type { DoughCalculatorResult } from '@/app/components/ui/result-list';
import type { DoughInputs, YeastType } from '@/app/lib/types';
import { yeastTypes } from '@/app/lib/types';

const REFERENCE_TEMP_C = 25

/** ~0.3% instant dry yeast ferments a dough in ~8h at 25°C, so 0.3 * 8 = 2.4. */
const YEAST_HOURS_AT_REFERENCE = 2.4

interface YeastProfile {
    strengthFactor: number
    starterHydration?: number
    minPercent: number
    maxPercent: number
    decimals: number
}

const YEAST_PROFILES: Record<YeastType, YeastProfile> = {
    CY: { strengthFactor: 3, minPercent: 0.05, maxPercent: 5, decimals: 2 },
    ADY: { strengthFactor: 1.25, minPercent: 0.02, maxPercent: 2, decimals: 2 },
    IDY: { strengthFactor: 1, minPercent: 0.02, maxPercent: 2, decimals: 2 },
    SSD: { strengthFactor: 50, starterHydration: 0.5, minPercent: 3, maxPercent: 40, decimals: 0 },
    LSD: { strengthFactor: 80, starterHydration: 1, minPercent: 4, maxPercent: 50, decimals: 0 },
}

function equivalentHours(hours: number, tempC: number): number {
    if (!Number.isFinite(hours) || !Number.isFinite(tempC) || hours <= 0) return 0
    return hours * Math.pow(2, (tempC - REFERENCE_TEMP_C) / 10)
}

function clamp(n: number, min: number, max: number): number {
    return Math.min(Math.max(n, min), max)
}

export function computePizzaDough({
    balls,
    ballWeight,
    hydration,
    salt,
    rtLeavening,
    rtTemperature,
    ctLeavening = 0,
    ctTemperature = 4,
    yeastType
}: DoughInputs): [DoughCalculatorResult[], number] {


    const totalWeight = balls * ballWeight
    const profile = YEAST_PROFILES[yeastType] ?? YEAST_PROFILES.IDY

    const fermentHours =
        equivalentHours(rtLeavening, rtTemperature) +
        equivalentHours(ctLeavening, ctTemperature)

    const yeastPercent = fermentHours > 0
        ? clamp(
            (YEAST_HOURS_AT_REFERENCE * profile.strengthFactor) / fermentHours,
            profile.minPercent,
            profile.maxPercent
        )
        : 0

    // A starter is part flour, part water; commercial yeast is neither.
    const starterFlourShare = profile.starterHydration !== undefined
        ? 1 / (1 + profile.starterHydration)
        : 0
    const starterWaterShare = profile.starterHydration !== undefined
        ? profile.starterHydration / (1 + profile.starterHydration)
        : 0
    const dryShare = 1 - starterFlourShare - starterWaterShare

    const yeast = yeastPercent / 100
    const totalFlour = totalWeight / (1 + hydration / 100 + salt / 100 + yeast * dryShare)
    const totalWater = totalFlour * (hydration / 100)
    const saltWeight = totalFlour * (salt / 100)
    const yeastWeight = totalFlour * yeast

    // Subtract what the starter already contributes so hydration stays on target.
    const flourWeight = totalFlour - yeastWeight * starterFlourShare
    const waterWeight = totalWater - yeastWeight * starterWaterShare

    const roundNumber = (n: number, decimals = 0) =>
        Number.isFinite(n) && n > 0 ? n.toFixed(decimals) : '0'

    return [[
        { label: 'Flour', value: roundNumber(flourWeight), unit: 'g' },
        { label: 'Water', value: roundNumber(waterWeight), unit: 'ml' },
        { label: 'Salt', value: roundNumber(saltWeight, 1), unit: 'g' },
        { label: yeastTypes[yeastType] ?? 'Yeast', value: roundNumber(yeastWeight, profile.decimals), unit: 'g' },
    ], totalWeight]
}
