export function createContainer(element: string = "div") {
  const container = document.createElement(element);
  document.body.appendChild(container);
  return container;
}
