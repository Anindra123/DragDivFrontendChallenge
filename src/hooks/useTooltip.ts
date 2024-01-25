import { useState } from "react";
import { ToolTipParamType } from "../types/TooltipTypes";

export function useToolTip({
  squareRect,
  isVisible,
  divPosition,
  toolTipRect,
}: ToolTipParamType) {
  const [isTooltipVisible, setToolTipVisible] = useState(isVisible);
  const offset_x = divPosition.x - (toolTipRect ? toolTipRect.width : 0);
  const offset_y = divPosition.y - (toolTipRect ? toolTipRect.height : 0);
  const tooltip_position = {
    x: squareRect && squareRect.left,
    y: squareRect && squareRect.top,
  };
  function setTop() {
    tooltip_position.y = squareRect?.top;
    if (tooltip_position.y) tooltip_position.y -= 35;
    if (tooltip_position.x) tooltip_position.x = squareRect?.left;
  }
  function setBottom() {
    tooltip_position.y = squareRect?.top;
    if (tooltip_position.y)
      tooltip_position.y += squareRect ? squareRect.height + 10 : 0;
    if (tooltip_position.x) tooltip_position.x = squareRect?.left;
  }
  function setLeft() {
    tooltip_position.x = squareRect?.left;
    if (tooltip_position.x)
      tooltip_position.x -= squareRect ? squareRect.width + 10 : 0;
    if (tooltip_position.y)
      tooltip_position.y = squareRect?.top && squareRect?.top + 30;
  }
  function setRight() {
    tooltip_position.x = squareRect?.left;
    if (tooltip_position.x)
      tooltip_position.x += squareRect ? squareRect.width + 10 : 0;
    if (tooltip_position.y)
      tooltip_position.y = squareRect?.top && squareRect?.top + 30;
  }

  return [
    setTop,
    setBottom,
    setLeft,
    setRight,
    isTooltipVisible,
    setToolTipVisible,
    offset_x,
    offset_y,
  ];
}
