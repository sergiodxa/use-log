# useLog ![CI](https://github.com/sergiodxa/use-log/workflows/CI/badge.svg) ![Publish](https://github.com/sergiodxa/use-log/workflows/Publish/badge.svg)

> Log a state or prop every time it changes

## Usage

Install it:

```sh
$ yarn add use-log
```

Import it:

```ts
import useLog from 'use-log';
```

Use it:

```ts
function MyComponent() {
  const [value, setValue]= React.useState("")
  useLog(`The value is ${value}`);
  return <input value={value} onChange={event => setValue(event.target.value)}>
}
```

Now you will get a log with `The value is ${value}` everytime the message change, this will happen everytime the value change.

### Log objects or arrays

When using it with an object or array as value to log you may want to memoize it to avoid the log running on every render:

```ts
function MyComponent() {
  const [value, setValue]= React.useState("")
  useLog(React.useMemo(() => ({ value }), [value]));
  return <input value={value} onChange={event => setValue(event.target.value)}>
}
```

### Configuration

useLog receives an optional configuration object as second argument with the following interface:

```js
interface Config {
  level?: 'log' | 'info' | 'warn' | 'error' | 'debug' | 'dir' | 'table';
  shouldLogInProduction?: boolean;
}
```

### Changing the log level

You can change the log level this way:

```ts
function MyComponent() {
  const [value, setValue]= React.useState("")
  useLog(`The value is ${value}`, { level: "debug" });
  return <input value={value} onChange={event => setValue(event.target.value)}>
}
```

This will basically change the `console` method useLog is calling.

### Production-safe

You can keep the hook in your code and the code will do nothing in production by default, if you want to enable it in production environments you can set `shouldLogInProduction` to `true`.

```ts
function MyComponent() {
  const [value, setValue]= React.useState("")
  useLog(`The value is ${value}`, { shouldLogInProduction: true });
  return <input value={value} onChange={event => setValue(event.target.value)}>
}
```

This way the log will continue working in production.

## Author

- [Sergio Xalambrí](https://sergiodxa.com) - [Able](https://able.co)

## License

The MIT License.
