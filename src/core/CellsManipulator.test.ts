import {
  checkItemInField,
  getNeigboursItems,
  incrementNeighbours,
} from "./CellsManipulator";
import { generateFieldWithDefaultState, CellState, fieldGenerator, Field } from "./Field";
import { openCell } from "./openCell";

const { empty, bomb, hidden } = CellState;

describe("Check neighbour selectors", () => {
  it("With [0, 0] coords", () => {
    expect(getNeigboursItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    });
  });
  it("With [3, 3] coords", () => {
    expect(getNeigboursItems([3, 3])).toStrictEqual({
      top: [2, 3],
      topRight: [2, 4],
      right: [3, 4],
      rightBottom: [4, 4],
      bottom: [4, 3],
      bottomLeft: [4, 2],
      left: [3, 2],
      leftTop: [2, 2],
    });
  });
});

describe("checkItemInField tests", () => {
  describe("Simple cases", () => {
    const field: Field = [[empty]];

    it("Out of y range", () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });
    it("Out of x range", () => {
      expect(checkItemInField([0, -1], field)).toBe(false);
    });
    it("In x and y range", () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });
  describe("Big field", () => {
    const field: Field = [
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
    ];

    it("Out of x range", () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });
    it("Out of x range", () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });
    it("Out of y range", () => {
      expect(checkItemInField([0, 5], field)).toBe(false);
    });
    it("In x and y range", () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });
});

describe("Check Increment Neighbours", () => {
  describe("Simple cases", () => {
    it("Field with only one item", () => {
      expect(incrementNeighbours([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
    });
    it("Field 2x2 with one mine", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [bomb, empty],
            [empty, empty],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, 1],
      ]);
    });
    it("Field 2x2 with two mines", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [bomb, empty],
            [empty, bomb],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, bomb],
      ]);
    });
  });
  describe("3x3 cases", () => {
    it("Field 3x3 with one centered mine", () => {
      expect(
        incrementNeighbours(
          [1, 1],
          [
            [empty, empty, empty],
            [empty, bomb, empty],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, bomb, 1],
        [1, 1, 1],
      ]);
    });
    it("Field 3x3 with two mines", () => {
      expect(
        incrementNeighbours(
          [1, 1],
          [
            [empty, 1, bomb],
            [empty, bomb, 1],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 2, bomb],
        [1, bomb, 2],
        [1, 1, 1],
      ]);
    });
    it("Field 3x3 as syntetic case with neighbors cells is reached max possible bombs", () => {
      expect(
        incrementNeighbours(
          [1, 1],
          [
            [0, 1, bomb],
            [8, bomb, 1],
            [8, 8, 8],
          ]
        )
      ).toStrictEqual([
        [1, 2, bomb],
        [8, bomb, 2],
        [8, 8, 8],
      ]);
    });
  });
  describe("9x9 cases", () => {
    it("Field 9x9 with 7 mines", () => {
      expect(
        incrementNeighbours(
          [4, 5],
          [
            [9, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 0, 0, 0],
            [0, 1, 1, 2, 9, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [9, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 2, 1, 2, 9, 1],
        [0, 1, 1, 1, 2, 9, 2, 1, 1],
        [0, 1, 9, 2, 2, 2, 1, 0, 0],
        [0, 1, 1, 2, 9, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });
    it("Field 9x9 with 11 mines", () => {
      expect(
        incrementNeighbours(
          [5, 4],
          [
            [9, 2, 9, 1, 0, 0, 1, 1, 1],
            [1, 2, 2, 2, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 9, 1, 0, 0, 0],
            [0, 2, 2, 3, 9, 1, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 1, 9, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 1],
          ]
        )
      ).toStrictEqual([
        [9, 2, 9, 1, 0, 0, 1, 1, 1],
        [1, 2, 2, 2, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 1, 0, 1, 9, 1],
        [0, 1, 1, 2, 2, 9, 1, 1, 1],
        [0, 1, 9, 3, 9, 2, 0, 0, 0],
        [0, 2, 2, 4, 9, 2, 1, 1, 1],
        [0, 1, 9, 2, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1],
      ]);
    });
  });
});

describe("Open cell with the bomb", () => {
  describe("Simple cases with loose", () => {
    it("Open cell with the bomb", () => {
      expect(() =>
        openCell(
          [1, 1],
          [
            [hidden, hidden],
            [hidden, hidden],
          ],
          [
            [1, 1],
            [1, bomb],
          ]
        )
      ).toThrow("Game Over");
    });
  });
  describe("Open cell with number", () => {
    it("Open cell with state == 1", () => {
      const [playerField] = openCell(
        [1, 1],
        [
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
        ],
        [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, 1, hidden],
        [hidden, hidden, hidden],
      ]);
    });
    it("Open cell with state == 3", () => {
      const [playerField] = openCell(
        [1, 1],
        [
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
        ],
        [
          [9, 2, 0],
          [9, 3, 0],
          [9, 2, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, 3, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });
  describe("Open empty cell", () => {
    it("Open empty cell 3*3 case", () => {
      const [playerField] = openCell(
        [1, 2],
        [
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
        ],
        [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [hidden, 1, 0],
        [hidden, 1, 0],
        [hidden, 1, 0],
      ]);
    });
    it("Open empty cell 5*5 case", () => {
      const [playerField] = openCell(
        [2, 2],
        [
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
        ],
        [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [hidden, hidden, 1, 1, 2],
        [hidden, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, hidden],
        [2, 1, 0, 1, hidden],
      ]);
    });
  });
});
