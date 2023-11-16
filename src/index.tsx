import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";

import { Top } from "./components/Top";
import { Scoreboard } from "./components/Scoreboard";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Top feature="Flag" firstAction="ctrl" secondAction="click">
      Minesweeper
    </Top>
    <Scoreboard
      time="000"
      levels={["beginner", "intermediate", "expert"]}
      bombs="010"
      onReset={() => null}
      onChangeLevel={() => null}
    />
  </>
);
