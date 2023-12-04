import { Field, CellState } from "./Field";

/**
 * Detect solved puzzle based on the player and game fields coorelation
 * @param {Field} playerField
 * @param {Field} gameField
 * @param {[boolean, number]}
 */

export const detectSolvedPuzzzle = (
  playerField: Field,
  gameField: Field
): [boolean, number] => {
  const { empty, bomb, hidden, flag, weakFlag } = CellState;

  let bombCounter = 0;
  let flagCounter = 0;
  let detectedBombsCounter = 0;
  let isFieldHaveHiddenCells = false;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x];
      const playerCell = playerField[y][x];
      const isPlayerCellFlag = [flag, weakFlag].includes(playerCell);

      if (playerCell === hidden) {
        isFieldHaveHiddenCells = true;
      }

      if (isPlayerCellFlag) {
        flagCounter++;
      }

      if (gameCell === bomb) {
        bombCounter++;

        if (isPlayerCellFlag) {
          detectedBombsCounter++;
        }
      }
    }
  }

  const isPuzzleSolved =
    bombCounter === detectedBombsCounter &&
    flagCounter === bombCounter &&
    !isFieldHaveHiddenCells;

  return [isPuzzleSolved, flagCounter];
};
