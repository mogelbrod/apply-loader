# apply loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

The `apply` loader can be used to execute a JavaScript function exported, optionally with arguments, and export the returned value.

``` javascript
// Call with multiple arguments
// => sourceFn(1, 2)
require("apply?args[]=1&args[]=2!functionReturningLoader");

// Call with an object/array
// => sourceFn({a: 1, b:2})
require("apply?{obj: {a: 1, b: 2}}!functionReturningLoader");

// Call with an object/array declared in the webpack.config
// => sourceFn(require('webpack.config').customConfig)
require("apply?config=customConfig!functionReturningLoader");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
