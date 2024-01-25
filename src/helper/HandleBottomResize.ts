import React from "react";
import { SMALL_BOX_HEIGHT, WINDOW_HEIGHT } from "../constants/constants";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";

export const bottom = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  parentSize: ContainerSize,
  temp_child_position: ContainerPosition
) => {
  const newHeight =
    containerSize.height +
    (event.clientY - (parentPostion.y + parentSize.height));

  const child_top_position = document
    .getElementById("square")
    ?.getBoundingClientRect().top;

  tempSize.height = Math.min(
    Math.max(newHeight, SMALL_BOX_HEIGHT),
    WINDOW_HEIGHT
  );

  temp_child_position.y = Math.min(
    tempSize.height - SMALL_BOX_HEIGHT,
    child_top_position ? child_top_position - parentPostion.y : 0
  );
};
