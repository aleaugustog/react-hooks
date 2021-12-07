import { act, renderHook } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

beforeEach(() => {
  window.localStorage.clear();
});

const STORAGE_KEY = "test";
const STORAGE_INITIAL_VALUE = "1";
const STORAGE_NEW_VALUE = "2";

describe("useLocalStorage hook", () => {
  it("retrieves initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, STORAGE_INITIAL_VALUE)
    );

    const [storedValue] = result.current;
    expect(storedValue).toBe(STORAGE_INITIAL_VALUE);
  });

  it("saves a new value", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, STORAGE_INITIAL_VALUE)
    );
    const [, setValue] = result.current;

    act(() => {
      setValue(STORAGE_NEW_VALUE);
    });

    const [storedValue] = result.current;
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify(STORAGE_NEW_VALUE)
    );
    expect(storedValue).toBe(STORAGE_NEW_VALUE);
  });

  it("saves a new value with callback", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, STORAGE_INITIAL_VALUE)
    );
    const [, setValue] = result.current;

    act(() => {
      setValue(() => STORAGE_NEW_VALUE);
    });

    const [storedValue] = result.current;
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify(STORAGE_NEW_VALUE)
    );
    expect(storedValue).toBe(STORAGE_NEW_VALUE);
  });

  it("handles fetching errors gracefully", () => {
    // put an invalid json in storage
    window.localStorage.setItem(STORAGE_KEY, "{invalid");

    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, STORAGE_INITIAL_VALUE)
    );
    const [storageValue, , error] = result.current;

    expect(error).not.toBeNull();
    expect(storageValue).toBe(STORAGE_INITIAL_VALUE);
  });

  it("handles saving errors gracefully", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, STORAGE_INITIAL_VALUE)
    );
    const [storageValue, setValue] = result.current;

    act(() => {
      setValue(() => {
        throw new Error("test error");
      });
    });

    const [, , error] = result.current;

    expect(error).not.toBeNull();
    expect(storageValue).toBe(STORAGE_INITIAL_VALUE);
  });
});
