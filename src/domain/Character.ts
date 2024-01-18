import {Seed} from "./Seed";
import {Character} from "../components";

// Total of files in sprites/{part}
export const BODY_OPTIONS: number = 8;
export const BOTTOM_OPTIONS: number = 80;
export const CARRYING_STUFF_OPTIONS: number = 25;
export const HAIR_OPTIONS: number = 88;
export const HAT_OPTIONS: number = 23;
export const TOP_OPTIONS: number = 101;

export const characterPropToOption: Record<keyof Character, number> = {
    body: BODY_OPTIONS,
    bottom: BOTTOM_OPTIONS,
    carryingStuff: CARRYING_STUFF_OPTIONS,
    hair: HAIR_OPTIONS,
    hat: HAT_OPTIONS,
    top: TOP_OPTIONS
}

export type Character = {
    body: number,
    bottom: number,
    carryingStuff: number,
    hair: number,
    hat: number,
    top: number
}

export type CharacterView = 'front' | 'back' | 'left' | 'right';
export function characterFromSeed(seed: Seed): Character
{
    return {
        body: Math.floor(seed.bodyValue % BODY_OPTIONS),
        bottom: Math.floor(seed.bottomValue % BOTTOM_OPTIONS),
        carryingStuff: Math.floor(seed.carryingStuffValue % CARRYING_STUFF_OPTIONS),
        hair: Math.floor(seed.hairValue % HAIR_OPTIONS),
        hat: Math.floor(seed.hatValue % HAT_OPTIONS),
        top: Math.floor(seed.topValue % TOP_OPTIONS),
    }
}