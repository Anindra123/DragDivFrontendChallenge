import React from "react";
import {
  SIDE_BAR_WIDTH,
  SMALL_BOX_HEIGHT,
  SMALL_BOX_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
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
    Math.max(newHeight, SMALL_BOX_HEIGHT + 4),
    WINDOW_HEIGHT
  );

  temp_child_position.y = Math.min(
    tempSize.height - (SMALL_BOX_HEIGHT + 4),
    child_top_position ? child_top_position - parentPostion.y : 0
  );
};

export const top = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  temp_parent_position: ContainerPosition,
  temp_child_position: ContainerPosition,
  containerPosition: ContainerPosition
) => {
  temp_parent_position.y = Math.min(
    Math.max(event.clientY, 1),
    containerPosition.y
  );

  const newY = parentPostion.y - temp_parent_position.y;
  const newHeight = containerSize.height + newY;

  tempSize.height = Math.max(newHeight, SMALL_BOX_HEIGHT);

  const child_top_position = document
    .getElementById("square")
    ?.getBoundingClientRect().top;
  temp_child_position.y = Math.max(
    Math.min(
      child_top_position ? child_top_position - temp_parent_position.y : 0,
      child_top_position ? child_top_position : 0
    ),
    0
  );
};

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
