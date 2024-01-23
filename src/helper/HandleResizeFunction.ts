import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";
import { bottom } from "./HandleBottomResize";
import { left } from "./HandleLeftResize";
import { right } from "./HandleRightResize";
import { top } from "./HandleTopResize";
// import { bottom, left, right, top } from "./ResizeFunctions";

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
}: handleResizeParams) {
  const temp_size = { ...containerSize };
  const temp_parent_position = { ...parentPosition };
  const temp_child_position = { ...divPosition };
  if (resizePosition === "right") {
    right(
      containerSize,
      event,
      temp_size,
      parentPosition,
      parentSize,
      temp_child_position
    );
  }

  if (resizePosition === "bottom") {
    bottom(
      containerSize,
      event,
      temp_size,
      parentPosition,
      parentSize,
      temp_child_position
    );
  }

  if (resizePosition === "top") {
    top(
      containerSize,
      event,
      temp_size,
      parentPosition,
      temp_parent_position,
      temp_child_position,
      containerPosition
    );
  }

  if (resizePosition === "left") {
    left(
      containerSize,
      event,
      temp_size,
      parentPosition,
      temp_parent_position,
      temp_child_position,
      containerPosition
    );
  }

  if (resizePosition === "bottom-right") {
    right(
      containerSize,
      event,
      temp_size,
      parentPosition,
      parentSize,
      temp_child_position
    );
    bottom(
      containerSize,
      event,
      temp_size,
      parentPosition,
      parentSize,
      temp_child_position
    );
  }
  if (resizePosition === "top-left") {
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
  }
  if (resizePosition === "top-right") {
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
      temp_child_position
    );
  }

  if (resizePosition === "bottom-left") {
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
  }

  setParentPosition(temp_parent_position);
  setParentSize(temp_size);
  setDivPosition(temp_child_position);
}
