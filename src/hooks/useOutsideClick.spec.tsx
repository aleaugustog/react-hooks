import { act, renderHook } from "@testing-library/react-hooks";
import { forwardRef } from "react";
import { fireClick, render } from "../utils";
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

describe("useOutsideClick", () => {
  it("executes callback on outside click", () => {
    const { result } = renderHook(() => useOutsideClick<HTMLDivElement>(cb));

    const { container } = render(<MyComponent ref={result.current} />);

    act(() => {
      fireClick(container.querySelector("#outside"));
    });

    expect(cb).toHaveBeenCalled();
  });

  it("does not execute callback on inside click", () => {
    const { result } = renderHook(() => useOutsideClick<HTMLDivElement>(cb));

    const { container } = render(<MyComponent ref={result.current} />);

    act(() => {
      fireClick(container.querySelector("#inside"));
    });

    expect(cb).not.toHaveBeenCalled();
  });
});
