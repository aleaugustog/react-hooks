import { act, renderHook } from "@testing-library/react-hooks";
import { forwardRef } from "react";
import { render } from "react-dom";
import useOutsideClick from "./useOutsideClick";

const cb = jest.fn();

beforeEach(() => {
  cb.mockReset();
});

const MyComponent = forwardRef<HTMLDivElement>((props, ref) => (
  <div>
    <p id="outside">Outside Component</p>
    <div ref={ref}>
      <p id="inside">Inside Component</p>
    </div>
  </div>
));

const createContainer = () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  return container;
};

const fireClick = (element: Element | null) => {
  element?.dispatchEvent(
    new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    })
  );
};

describe("useOutsideClick", () => {
  it("executes callback on outside click", () => {
    const container = createContainer();
    const { result } = renderHook(() => useOutsideClick<HTMLDivElement>(cb));

    render(<MyComponent ref={result.current} />, container);

    act(() => {
      fireClick(container.querySelector("#outside"));
    });

    expect(cb).toHaveBeenCalled();
  });

  it("does not execute callback on inside click", () => {
    const container = createContainer();
    const { result } = renderHook(() => useOutsideClick<HTMLDivElement>(cb));

    render(<MyComponent ref={result.current} />, container);

    act(() => {
      fireClick(container.querySelector("#inside"));
    });

    expect(cb).not.toHaveBeenCalled();
  });
});
