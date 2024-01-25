import { ContainerPosition } from "./ContainerTypes";

export interface ToolTipParamType {
  squareRect: DOMRect | undefined;
  isVisible: boolean;
  divPosition: ContainerPosition;
  toolTipRect: DOMRect | undefined;
}
