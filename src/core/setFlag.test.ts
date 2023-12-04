import { CellState, Field } from "./Field";
import { setFlag } from "./setFlag";

const { empty: e, bomb: b, hidden: h, flag: f, weakFlag: w } = CellState;

describe("Set flag action", () => {
  describe("Set flag to the cell check", () => {
    it("Set flag to the non hidden cell should be ignored", () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ];

      const [newPlayerField] = setFlag([0, 0], playerField, gameField, 0, 3);

      expect(newPlayerField).toStrictEqual([
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
    it("Set flag action, simple 3x3 case", () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];
      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];

      const result = setFlag(
        [0, 0],
        playerField,
        gameField,
        0,
        3
      );

      expect(result[0]).toStrictEqual([
        [f, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      const result2 = setFlag(
        [0, 0],
        result[0],
        gameField,
        0,
        3
      );

      expect(result2[0]).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      const result3 = setFlag(
        [0, 0],
        result2[0],
        gameField,
        0,
        3
      );

      expect(result3[0]).toStrictEqual([
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
  });
  describe("Detect win state", () => {
    it("5x5 solved case", () => {
      const gameField: Field = [
        [9, 9, 1, 1, 2],
        [9, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, 9],
        [2, 1, 0, 1, 0],
      ];
      const playerFieldGame: Field = [
        [f, f, 1, 1, 2],
        [h, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, f],
        [2, 1, 0, 1, 0],
      ];

      const [playerField, isSolved, flagCounter] = setFlag(
        [1, 0],
        playerFieldGame,
        gameField,
        3,
        5
      );

      expect(flagCounter).toBe(4);

      expect(isSolved).toBe(true);

      expect(playerField).toStrictEqual([
        [f, f, 1, 1, 2],
        [f, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, f],
        [2, 1, 0, 1, 0],
      ]);
    });
  });
  describe("Restrict flagCounter by the number of bombs on the field", () => {
    it("Restriction on 3*3 field", () => {
      const gameField: Field = [
        [1, 2, 1],
        [b, 2, b],
        [1, 2, 1],
      ];
      const playerField: Field = [
        [f, h, h],
        [h, h, h],
        [f, h, h],
      ];

      const [newPlayerField] = setFlag([1, 1], playerField, gameField, 2, 2);

      expect(newPlayerField).toStrictEqual([
        [f, h, h],
        [h, h, h],
        [f, h, h],
      ]);
    });
    it("Still can swith flag from hard to weak", () => {
      const gameField: Field = [
        [1, 2, 1],
        [b, 2, b],
        [1, 2, 1],
      ];
      const playerField: Field = [
        [f, h, h],
        [h, h, h],
        [f, h, h],
      ];

      const [newPlayerField] = setFlag([0, 0], playerField, gameField, 2, 2);

      expect(newPlayerField).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [f, h, h],
      ]);
    });
    it("Can't add new flag even if flags are weak", () => {
      const gameField: Field = [
        [1, 2, 1],
        [b, 2, b],
        [1, 2, 1],
      ];
      const playerField: Field = [
        [w, h, h],
        [h, h, h],
        [w, h, h],
      ];

      const [newPlayerField] = setFlag([1, 1], playerField, gameField, 2, 2);

      expect(newPlayerField).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [w, h, h],
      ]);
    });
    it("Can set the new flag after drop prev", () => {
      const gameField: Field = [
        [1, 2, 1],
        [b, 2, b],
        [1, 2, 1],
      ];
      const playerField: Field = [
        [f, h, h],
        [h, h, h],
        [f, h, h],
      ];

      const result = setFlag([0, 0], playerField, gameField, 2, 2);

      const result1 = setFlag([0, 0], result[0], gameField, 2, 2);

      expect(result1).toStrictEqual([
        [
          [h, h, h],
          [h, h, h],
          [f, h, h],
        ],
        false,
        1,
      ]);

      const result2 = setFlag([0, 0], result1[0], gameField, 1, 2);

      expect(result2).toStrictEqual([
        [
          [f, h, h],
          [h, h, h],
          [f, h, h],
        ],
        false,
        2,
      ]);
    });
  });
});
