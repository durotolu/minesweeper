import React, { FC, useState, useEffect, useCallback } from "react";

import {
  CellState,
  Coords,
  Field,
  generateFieldWithDefaultState,
  fieldGenerator,
} from "@/core/Field";

import { LevelNames, GameSettings } from "@/modules/GameSettings";
import { openCell } from "@/core/openCell";
import { setFlag } from "@/core/setFlag";

import { useStatus } from "./useStatus";
import { useTime } from "./useTime";
import { useSettings } from "./useSettings";

interface ReturnType {
  level: LevelNames;
  time: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  flagCounter: number;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
}

export const useGame = (
  defaultLevel = "beginner" as LevelNames
): ReturnType => {
  const {
    settings: [size, bombs],
    level,
    setLevel,
  } = useSettings(defaultLevel);

  const {
    isGameStarted,
    isGameOver,
    isWin,
    setNewGame,
    setInProgress,
    setGameWin,
    setGameLoose,
  } = useStatus();

  const [time, resetTime] = useTime(isGameStarted, isGameOver);
  const [flagCounter, setFlagCounter] = useState(0);

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  );

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  );

  const onClick = useCallback(
    (coords: Coords) => {
      !isGameStarted && setInProgress();
      try {
        const [newPlayerField, isSolved] = openCell(
          coords,
          playerField,
          gameField
        );
        if (isSolved) {
          setGameWin();
        }
        setPlayerField([...newPlayerField]);
      } catch (e) {
        setPlayerField([...gameField]);
        setGameLoose();
      }
    },
    [
      isGameStarted,
      isGameOver,
      isWin,
      level,
      flagCounter,
      playerField,
      gameField,
    ]
  );

  const onChangeLevel = useCallback((level: LevelNames) => {
    const newSettings = setLevel(level);
    resetHandler(newSettings);
  }, []);

  const onContextMenu = useCallback(
    (coords: Coords) => {
      !isGameStarted && setInProgress();
      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        coords,
        playerField,
        gameField,
        flagCounter,
        bombs
      );
      setFlagCounter(newFlagCounter);
      if (isSolved) {
        setGameWin();
      }
      setPlayerField([...newPlayerField]);
    },
    [
      isGameStarted,
      isGameOver,
      isWin,
      level,
      flagCounter,
      playerField,
      gameField,
    ]
  );

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = generateFieldWithDefaultState(
      size,
      CellState.hidden
    );
    setGameField([...newGameField]);
    setPlayerField([...newPlayerField]);
    setNewGame();
    resetTime();
    setFlagCounter(0);
  };

  const onReset = useCallback(() => resetHandler([size, bombs]), [size, bombs]);

  return {
    level,
    time,
    isGameOver,
    isGameStarted,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    flagCounter,
    onClick,
    onChangeLevel,
    onContextMenu,
    onReset,
  };
};
