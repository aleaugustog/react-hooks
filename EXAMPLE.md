```javascript
function MyComponent() {
  const [value, setValue] = useLocalStorage("key", {
    message: "initial value",
  });

  return <button>{value.message}</button>;
}

function MyComponent() {
  const cb = useCallback(() => {
    console.log("Doing something awesome");
  }, []);

  const ref = useOutsideClick(cb);

  return <div ref={ref} />;
}
```
