import ReactDOM from "react-dom";
import { ReactElement } from "react";
import { createContainer } from "./createContainer";

interface RenderResult {
  container: Element;
}

export function render(element: ReactElement): RenderResult {
  const container = createContainer();
  ReactDOM.render(element, container);
  return { container };
}
