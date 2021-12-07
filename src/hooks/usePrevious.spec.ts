import { renderHook } from "@testing-library/react-hooks";
import usePrevious from "./usePrevious";

describe("usePrevious hook", () => {
  it("keeps previous value", () => {
    const { result, rerender } = renderHook(() => usePrevious(1));

    expect(result.current).toBe(undefined);

    rerender();

    expect(result.current).toBe(1);
  });
});
