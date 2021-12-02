import { readFileSync } from 'fs';

describe("Day 1", () => {
    const example = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

    it("Example 1", async () => {
        const result = countNumberOfIncreases(example);
        expect(result).toBe(7);
    });

    it("Example 2 - measurement windows of 3", async () => {
        const result = countNumberOfIncreases(example, 3);
        expect(result).toBe(5);
    });

    it("puzzle", async () => {
        const contents = readFileSync("./src/day1.txt").toString().split("\n").map(Number);
        const result1 = countNumberOfIncreases(contents);
        const result2 = countNumberOfIncreases(contents, 3);
        console.log(result1, result2);
    });
});

function countNumberOfIncreases(input: number[], length: number = 1): number {
    let count = 0;

    for (let i = 0; i < input.length - 1; i++) {

        const slidingWindow = sumWindowAt(input, i, length);
        const nextWindow = sumWindowAt(input, i + 1, length);

        if (!slidingWindow) {
            return count;
        }

        if (slidingWindow < nextWindow) {
            count++;
        }
    }
    return count;
}

function sumWindowAt(input: number[], offset: number, windowSize: number = 1): number | boolean {
    const slice = input.slice(offset, offset + windowSize);
    const sum = slice.reduce((prev, curr) => { return prev + curr }, 0);

    if (slice.length < windowSize) {
        return false;
    }

    return sum;
}