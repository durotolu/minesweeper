import React, { FC, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useGame } from "./useGame";

import { GameLevels, LevelNames } from "@/modules/GameSettings";

import { Grid } from "@/components/Grid";
import { Top } from "@/components/Top";
import { Scoreboard } from "@/components/Scoreboard";
import { GameArea, Wrapper, GameOver } from "@/components/Game";

export const GameWithHooks: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlLevelParam = (searchParams.get("level") || undefined) as LevelNames;

  const {
    level,
    time,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    flagCounter,
    onClick,
    onChangeLevel,
    onContextMenu,
    onReset,
  } = useGame(urlLevelParam);

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level })
      onChangeLevel(level as LevelNames);
    },
    []
  );

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="right click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time={String(time)}
          bombs={String(bombs - flagCounter)}
          levels={GameLevels as unknown as LevelNames[]}
          defaultLevel={level}
          onReset={onReset}
          onChangeLevel={onChangeLevelHandler}
        />
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
