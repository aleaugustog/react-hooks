import { renderHook } from "@testing-library/react-hooks";
import useMounted from "./useMounted";

describe("useMounted hook", () => {
  it("indicates when the component is mounted", () => {
    const { result, unmount } = renderHook(() => useMounted());
    expect(result.current.current).toBe(true);
    unmount();
    expect(result.current.current).toBe(false);
  });
});
