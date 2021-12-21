import { readFileSync } from 'fs';

describe("Submarine", () => {
    it("Example", () => {
        const instructions = [
            "forward 5",
            "down 5",
            "forward 8",
            "up 3",
            "down 8",
            "forward 2"
        ];

        const sut = new Submarine();
        sut.process(instructions);

        expect(sut.horizontal).toBe(15);
        expect(sut.depth).toBe(10);
        expect(sut.output).toBe(150);
    });

    it("Test", () => {
        const contents = readFileSync("./src/day2.txt").toString().split("\n");

        const sut = new Submarine();
        sut.process(contents);

        expect(sut.output).toBe(1690020);
    });

});

class Submarine {

    public horizontal: number;
    public depth: number;
    public get output() {
        return this.horizontal * this.depth;
    };

    constructor() {
        this.horizontal = 0;
        this.depth = 0;
    }

    public process(instructions: string[]) {
        for (const instruction of instructions) {
            this.processSingle(instruction);
        }
    }

    private processSingle(instruction: string) {
        const [direction, value] = instruction.split(" ");

        switch (direction) {
            case "forward": this.horizontal += parseInt(value); break;
            case "down": this.depth += parseInt(value); break;
            case "up": this.depth -= parseInt(value); break;
            default: break;
        }

        this.depth = this.depth < 0 ? 0 : this.depth;
    }
}
