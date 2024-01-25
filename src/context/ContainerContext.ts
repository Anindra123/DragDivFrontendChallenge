import { createContext } from "react";
import { ContainerContextType } from "../types/ContainerTypes";

export const ContainerContext = createContext<ContainerContextType>({
  currentToolTipPosition: "top",
  divPosition: { x: 0, y: 0 },
  setDivPosition: () => {},
  parentSize: { width: 0, height: 0 },
});
