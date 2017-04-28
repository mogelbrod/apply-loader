var loaderUtils = require("loader-utils");

module.exports = function() {}
module.exports.pitch = function applyLoader(remainingRequest) {
  var opts = loaderUtils.getOptions(this) || {};
  var args = [];

  this.cacheable && this.cacheable();

  if (typeof opts.config === "string") {
    // apply?config=key => sourceFn(require('webpack.config').key)
    if (!(opts.config in this.options)) {
      throw new Error("apply-loader: '"+opts.config+"' property not present in webpack config");
    }
    args.push(this.options[opts.config]);
  } else if (Array.isArray(opts.args)) {
    // apply?args[]=1&args[]=2 => sourceFn(1, 2)
    args.push.apply(args, opts.args);
  } else if (opts.obj) {
    // apply?{obj: {a: 1, b: 2}} => sourceFn({a: 1, b:2})
    args.push(opts.obj);
  }

  return [
    "var req = require(",
    JSON.stringify("!!" + remainingRequest),
    ");\n",
    "module.exports = (req['default'] || req).apply(req, ",
    JSON.stringify(args),
    ")"
  ].join("")
};
