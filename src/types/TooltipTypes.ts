import { ContainerPosition } from "./ContainerTypes";

export interface ToolTipParamType {
  squareRect: DOMRect | undefined;
  divPosition: ContainerPosition;
  toolTipRect: DOMRect | undefined;
}

export interface TooltipPositionType {
  x: number | undefined;
  y: number | undefined;
}

export type ToolTipReturnType = [
  number,
  number,
  TooltipPositionType,
  () => void,
  () => void,
  () => void,
  () => void
];
