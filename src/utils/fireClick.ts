export function fireClick(element: Element | null): void {
  element?.dispatchEvent(
    new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    })
  );
}
