import React from "react";
import { SMALL_BOX_WIDTH } from "../constants/constants";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";

export const left = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  temp_parent_position: ContainerPosition,
  temp_child_position: ContainerPosition,
  containerPosition: ContainerPosition
) => {
  const child_left_position = document
    .getElementById("square")
    ?.getBoundingClientRect().left;
  temp_parent_position.x = Math.min(
    Math.max(event.clientX, 1),
    containerPosition.x
  );
  const newX = parentPostion.x - temp_parent_position.x;
  const newWidth = containerSize.width + newX;
  tempSize.width = Math.max(newWidth, SMALL_BOX_WIDTH);

  temp_child_position.x = Math.max(
    Math.min(
      child_left_position ? child_left_position - temp_parent_position.x : 0,
      child_left_position ? child_left_position : 0
    ),
    0
  );
};
