import {Character, characterPropToOption, TOP_OPTIONS} from "./Character";

export type Seed = {
    value: BigInt,
    bodyValue: number,
    bottomValue: number,
    carryingStuffValue: number,
    hairValue: number,
    hatValue: number,
    topValue: number
}

const seedPropertyToChunk: { [K in Exclude<keyof Seed, 'value'>]: number }  = {
    bodyValue: 0,
    bottomValue: 1,
    carryingStuffValue: 2,
    hairValue: 3,
    hatValue: 4,
    topValue: 5
}

const seedPropertyToCharacterProperty: {[K in Exclude<keyof Seed, 'value'>]: keyof Character} = {
    bodyValue: "body",
    bottomValue: "bottom",
    carryingStuffValue: "carryingStuff",
    hairValue: "hair",
    hatValue: "hat",
    topValue: "top"
}
export function generateRandomSeed(): Seed {
    const bigInt = generateRandomBigInt();
    return seedFromBigInt(bigInt);
}

function generateRandomBigInt(): BigInt {
    const randomNumber = BigInt(Math.floor(Math.random() * (Math.pow(2, 64) - 1) + 1));
    return randomNumber < 0 ? randomNumber * BigInt(-1) : randomNumber;
}

export function splitBigNumberInChunks(bigIntNumber: BigInt, chunkSizeInBits: number): number[] {
    const chunks: number[] = [];

    const binaryBigInt: string = bigIntNumber.toString(2);
    const zerosPadding: number = binaryBigInt.length % chunkSizeInBits === 0
        ? binaryBigInt.length
        : binaryBigInt.length + (chunkSizeInBits - binaryBigInt.length % chunkSizeInBits);
    const binaryWithPadding = binaryBigInt.padStart(zerosPadding, '0');

    for (let i: number = 0; i < binaryWithPadding.length; i += chunkSizeInBits) {
        const binaryChunk = binaryWithPadding.slice(i, i + chunkSizeInBits);
        chunks.push(parseInt(binaryChunk, 2));
    }

    return chunks;
}

function seedFromBigInt(bigInt: BigInt ): Seed {
    const chunks = splitBigNumberInChunks(bigInt, 8);
    return {
        value: bigInt,
        bodyValue: isNaN(chunks[seedPropertyToChunk['bodyValue']]) ? 0 : chunks[seedPropertyToChunk['bodyValue']],
        bottomValue: isNaN(chunks[seedPropertyToChunk['bottomValue']]) ? 0 : chunks[seedPropertyToChunk['bottomValue']],
        carryingStuffValue: isNaN(chunks[seedPropertyToChunk['carryingStuffValue']]) ? 0 : chunks[seedPropertyToChunk['carryingStuffValue']],
        hairValue: isNaN(chunks[seedPropertyToChunk['hairValue']]) ? 0 : chunks[seedPropertyToChunk['hairValue']],
        hatValue: isNaN(chunks[seedPropertyToChunk['hatValue']]) ? 0 : chunks[seedPropertyToChunk['hatValue']],
        topValue: isNaN(chunks[seedPropertyToChunk['topValue']]) ? 0 : chunks[seedPropertyToChunk['topValue']]
    };
}

export function seedFromBigIntString(bigIntString: string): Seed {
    if (!bigIntString) {
        throw new Error();
    }
    const bigInt = BigInt(bigIntString);
    if (bigInt >= Math.pow(2, 64)) {
        throw new Error();
    }
    return seedFromBigInt(bigInt);
}

export function replaceChunk(seed: Seed, chunkSizeInBits: number, numberOfChunks: number, chunkToReplace: number, value: number): Seed {
    const bigInt = seed.value;
    const chunks = splitBigNumberInChunks(bigInt, chunkSizeInBits);
    chunks[chunkToReplace] = value;
    const newBigInt = bigNumberFromChunks(chunks, chunkSizeInBits, numberOfChunks);

    return seedFromBigInt(newBigInt);
}

export function seedFromCharacter(character: Character, chunkSizeInBits: number, numberOfChunks: number)
{
    const chunks: number[] = [];
    for (const key in character) {
        chunks.push(character[key as keyof Character])
    }

    const bigInt = bigNumberFromChunks(chunks, chunkSizeInBits, numberOfChunks);
    return seedFromBigInt(bigInt);
}

export function bigNumberFromChunks(chunks: number[], chunkSizeInBits: number, numberOfChunks: number) {
    const binaryChunks: string[] = [];
    chunks.forEach((chunk: number) => {
        const binaryChunk = chunk.toString(2);
        const zeroPaddingBinaryChunk = binaryChunk.padStart(chunkSizeInBits, '0');
        binaryChunks.push(zeroPaddingBinaryChunk);
    });

    const binaryBigInt = binaryChunks.join('');
    const paddingBinaryBigInt = binaryBigInt.padStart(chunkSizeInBits * numberOfChunks, '0');
    return BigInt('0b'+paddingBinaryBigInt);
}


