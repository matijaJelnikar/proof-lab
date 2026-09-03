export interface DoughInputs {
    balls: number
    ballWeight: number
    hydration: number
    salt: number
    rtLeavening: number
    rtTemperature: number
    ctLeavening?: number
    ctTemperature?: number
    yeastType: YeastType
}

export type DoughInputKeys = keyof DoughInputs

export const yeastTypes = {
    'CY': 'Compressed Yeast',
    'ADY': 'Active Dry Yeast',
    'IDY': 'Instant Dry Yeast',
    'SSD': 'Sourdough Starter',
    'LSD': 'Liquid Sourdough'
} as const;

export type YeastType = keyof typeof yeastTypes;