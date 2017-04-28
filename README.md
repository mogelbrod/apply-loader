# apply loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

The `apply` loader can be used to execute an exported JavaScript function (optionally with arguments) and export the returned value.

It will attempt to call the `default` export if defined, falling back to the basic export (i.e. `module.exports`).

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

## Webpack 2 configuration

``` javascript
use: [{
  loader: 'apply-loader',
  options: {
    // => sourceFn({a: 1}, true)
    args: [ {a: 1}, true ]
    // => sourceFn({a: 1})
    obj: {a: 1}
    // => sourceFn(require('webpack.config').customConfig)
    config: 'customConfig'
  }
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
