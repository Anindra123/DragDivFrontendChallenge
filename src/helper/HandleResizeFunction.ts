import { resizeOptions } from "../constants/constants";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";
import { bottom } from "./HandleBottomResize";
import { left } from "./HandleLeftResize";
import { right } from "./HandleRightResize";
import { top } from "./HandleTopResize";

interface handleResizeParams {
  containerSize: ContainerSize;
  event: PointerEvent;
  parentPosition: ContainerPosition;
  parentSize: ContainerSize;
  setParentPosition: React.Dispatch<React.SetStateAction<ContainerPosition>>;
  setParentSize: React.Dispatch<React.SetStateAction<ContainerSize>>;
  resizePosition: string;
  divPosition: ContainerPosition;
  setDivPosition: React.Dispatch<React.SetStateAction<ContainerPosition>>;
  containerPosition: ContainerPosition;
  maxWidth: number;
}

export function handleResize({
  containerSize,
  event,
  parentPosition,
  parentSize,
  setParentPosition,
  setParentSize,
  resizePosition,
  divPosition,
  setDivPosition,
  containerPosition,
  maxWidth,
}: handleResizeParams) {
  const temp_size = { ...containerSize };
  const temp_parent_position = { ...parentPosition };
  const temp_child_position = { ...divPosition };

  switch (resizePosition) {
    case resizeOptions.RIGHT:
      right(
        containerSize,
        event,
        temp_size,
        parentPosition,
        parentSize,
        temp_child_position,
        maxWidth
      );
      break;
    case resizeOptions.BOTTOM:
      bottom(
        containerSize,
        event,
        temp_size,
        parentPosition,
        parentSize,
        temp_child_position
      );
      break;
    case resizeOptions.TOP:
      top(
        containerSize,
        event,
        temp_size,
        parentPosition,
        temp_parent_position,
        temp_child_position,
        containerPosition
      );
      break;
    case resizeOptions.LEFT:
      left(
        containerSize,
        event,
        temp_size,
        parentPosition,
        temp_parent_position,
        temp_child_position,
        containerPosition
      );
      break;
    case resizeOptions.BOTTOM_RIGHT:
      right(
        containerSize,
        event,
        temp_size,
        parentPosition,
        parentSize,
        temp_child_position,
        maxWidth
      );
      bottom(
        containerSize,
        event,
        temp_size,
        parentPosition,
        parentSize,
        temp_child_position
      );
      break;
    case resizeOptions.TOP_LEFT:
      top(
        containerSize,
        event,
        temp_size,
        parentPosition,
        temp_parent_position,
        temp_child_position,
        containerPosition
      );
      left(
        containerSize,
        event,
        temp_size,
        parentPosition,
        temp_parent_position,
        temp_child_position,
        containerPosition
      );
      break;
    case resizeOptions.TOP_RIGHT:
      top(
        containerSize,
        event,
        temp_size,
        parentPosition,
        temp_parent_position,
        temp_child_position,
        containerPosition
      );
      right(
        containerSize,
        event,
        temp_size,
        parentPosition,
        parentSize,
        temp_child_position,
        maxWidth
      );
      break;
    case resizeOptions.BOTTOM_LEFT:
      bottom(
        containerSize,
        event,
        temp_size,
        parentPosition,
        parentSize,
        temp_child_position
      );
      left(
        containerSize,
        event,
        temp_size,
        parentPosition,
        temp_parent_position,
        temp_child_position,
        containerPosition
      );
      break;
  }

  setParentPosition(temp_parent_position);
  setParentSize(temp_size);
  setDivPosition(temp_child_position);
}
