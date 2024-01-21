import React from "react";
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  WRAPPER_CONTAINER_HEIGHT,
  WRAPPER_CONTAINER_WIDTH,
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

  // temp_child_position.x = event.clientX - temp_child_position.x;
  // console.log(event.clientX - parentSize.width, event.clientX);
  console.log(temp_child_position);
  tempSize.width = Math.min(
    Math.max(newWidth, WRAPPER_CONTAINER_WIDTH - 4),
    WINDOW_WIDTH
  );
};

export const bottom = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  parentSize: ContainerSize
) => {
  const newHeight =
    containerSize.height +
    (event.clientY - (parentPostion.y + parentSize.height));

  tempSize.height = Math.min(
    Math.max(newHeight, WRAPPER_CONTAINER_HEIGHT - 4),
    WINDOW_HEIGHT
  );
};

export const top = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  temp_parent_position: ContainerPosition,
  containerPosition: ContainerPosition
) => {
  temp_parent_position.y = Math.min(
    Math.max(event.clientY, 1),
    containerPosition.y
  );

  const newY = parentPostion.y - temp_parent_position.y;
  const newHeight = containerSize.height + newY;

  tempSize.height = Math.max(newHeight, WRAPPER_CONTAINER_HEIGHT - 4);
};

export const left = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  temp_parent_position: ContainerPosition,
  containerPosition: ContainerPosition
) => {
  temp_parent_position.x = Math.min(
    Math.max(event.clientX, 1),
    containerPosition.x
  );

  const newX = parentPostion.x - temp_parent_position.x;
  const newWidth = containerSize.width + newX;

  tempSize.width = Math.max(newWidth, WRAPPER_CONTAINER_HEIGHT - 4);
};
