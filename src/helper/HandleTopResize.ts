import React, { MutableRefObject } from "react";
import { SMALL_BOX_HEIGHT } from "../constants/constants";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";

export const top = (
  containerSize: ContainerSize,
  event: React.PointerEvent<HTMLDivElement> | PointerEvent,
  tempSize: ContainerSize,
  parentPostion: ContainerPosition,
  temp_parent_position: ContainerPosition,
  temp_child_position: ContainerPosition,
  containerPosition: ContainerPosition,
  divInitialPosition: MutableRefObject<{ x: number; y: number }>
) => {
  temp_parent_position.y = Math.min(
    Math.max(event.clientY, 1),
    containerPosition.y
  );

  const newY = parentPostion.y - temp_parent_position.y;
  const newHeight = containerSize.height + newY;

  tempSize.height = Math.max(newHeight, SMALL_BOX_HEIGHT);

  // const child_top_position = document
  //   .getElementById("square")
  //   ?.getBoundingClientRect().top;
  temp_child_position.y = Math.max(
    Math.min(
      divInitialPosition.current.y - temp_parent_position.y,
      divInitialPosition.current.y
    ),
    0
  );

  if (temp_child_position.y === 0) {
    divInitialPosition.current.y -=
      divInitialPosition.current.y - temp_parent_position.y;
  }
};
