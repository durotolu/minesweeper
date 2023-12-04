import { checkItemInField, getNeigboursItems } from "./CellsManipulator";
import { CellState, Coords, Field } from "./Field";
import { copyField } from "./copyField";
import { detectSolvedPuzzzle } from "./detectSolvedPuzzle";

/**
 * Check item in the field
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] =>
  openCellRecursively(coords, copyField(playerField), gameField);

export const openCellRecursively = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] => {
  const { bomb, empty, hidden, flag, weakFlag } = CellState;

  const [y, x] = coords;
  const gameCell = gameField[y][x];
  const playerCell = playerField[y][x];

  if (gameCell === bomb) {
    throw new Error("Game Over");
  }

  if (flag === playerCell) {
    return [playerField, false];
  }

  playerField[y][x] = gameCell;

  if (gameCell === empty && [hidden, weakFlag].includes(playerCell)) {
    const items = getNeigboursItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        [playerField] = openCellRecursively([y, x], playerField, gameField);
      }
    }
  }

  const [isSolved] = detectSolvedPuzzzle(playerField, gameField);

  return [playerField, isSolved];
};
