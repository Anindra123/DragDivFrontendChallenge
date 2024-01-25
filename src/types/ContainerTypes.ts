export interface ContainerSize {
  width: number;
  height: number;
}

export interface ContainerPosition {
  x: number;
  y: number;
}

export interface ContainerContextType {
  divPosition: ContainerPosition;
  setDivPosition:
    | React.Dispatch<React.SetStateAction<ContainerPosition>>
    | (() => void);
  currentToolTipPosition: string;
  parentSize: ContainerSize;
}
