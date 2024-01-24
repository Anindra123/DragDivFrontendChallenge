import React, { MutableRefObject } from "react";
import { SMALL_BOX_WIDTH } from "../constants/constants";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";

export const left = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  temp_parent_position: ContainerPosition,
  temp_child_position: ContainerPosition,
  containerPosition: ContainerPosition,
  divInitialPosition: MutableRefObject<{ x: number; y: number }>
) => {
  temp_parent_position.x = Math.min(
    Math.max(event.clientX, 1),
    containerPosition.x
  );
  const newX = parentPostion.x - temp_parent_position.x;
  const newWidth = containerSize.width + newX;
  tempSize.width = Math.max(newWidth, SMALL_BOX_WIDTH);
  console.log(divInitialPosition.current.x);
  temp_child_position.x = Math.max(
    Math.min(
      divInitialPosition.current.x - temp_parent_position.x,
      divInitialPosition.current.x
    ),
    0
  );
  if (temp_child_position.x === 0) {
    divInitialPosition.current.x -=
      divInitialPosition.current.x - temp_parent_position.x;
  }
};
