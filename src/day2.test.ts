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

        const sut = new Submarine().process(contents);
        const sut2 = new Submarine(true).process(contents);

        expect(sut.output).toBe(1690020);
        expect(sut2.output).toBe(1408487760);
    });

});

class Submarine {

    public horizontal: number;
    public depth: number;
    public aim: number;

    private _useAim: boolean;

    public get output() {
        return this.horizontal * this.depth;
    };

    constructor(useAim: boolean = false) {
        this._useAim = useAim;
        this.horizontal = 0;
        this.depth = 0;
        this.aim = 0;
    }

    public process(instructions: string[]) {
        for (const instruction of instructions) {
            this.processSingle(instruction);
        }
        return this;
    }

    private processSingle(instruction: string) {
        const [direction, value] = instruction.split(" ");
        const valueNumber = parseInt(value);

        switch (direction) {
            case "forward": {
                this.horizontal += valueNumber;

                if (this._useAim) {
                    this.depth += (this.aim * valueNumber);
                }

                break;
            }

            case "down": {
                if (this._useAim) {
                    this.aim += valueNumber;
                } else {
                    this.depth += valueNumber;
                }
                break;
            }

            case "up": {
                if (this._useAim) {
                    this.aim -= valueNumber;
                } else {
                    this.depth -= valueNumber;
                }
                break;
            }

            default: break;
        }

        this.depth = this.depth < 0 ? 0 : this.depth;
    }
}
