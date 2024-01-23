import React from "react";
import {
  SMALL_BOX_WIDTH,
  WINDOW_WIDTH,
  SIDE_BAR_WIDTH,
} from "../constants/constants";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";

export const right = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  parentSize: ContainerSize,
  temp_child_position: ContainerPosition
) => {
  const newWidth =
    containerSize.width +
    (event.clientX - (parentPostion.x + parentSize.width));

  const child_left_position = document
    .getElementById("square")
    ?.getBoundingClientRect().left;

  tempSize.width = Math.min(
    Math.max(newWidth, SMALL_BOX_WIDTH + 4),
    WINDOW_WIDTH - (SIDE_BAR_WIDTH - 4)
  );

  temp_child_position.x = Math.min(
    child_left_position ? child_left_position - parentPostion.x : 0,
    tempSize.width - (SMALL_BOX_WIDTH + 4)
  );
};
