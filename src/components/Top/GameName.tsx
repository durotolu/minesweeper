import styled from "@emotion/styled";

export interface GameNameProps {
  /**
   * Text inside the header
   */
  // @todo not sure what type should be
  children: string | string[];
}

export const GameName = styled.h1<GameNameProps>`
  font-size: 2em;
`;
