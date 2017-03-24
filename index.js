var loaderUtils = require("loader-utils");

module.exports = function() {}
module.exports.pitch = function applyLoader(remainingRequest) {
  var opts = this.resourceQuery ? loaderUtils.parseQuery(this.resourceQuery) : loaderUtils.getOptions(this) || {};

  var args = [];

  this.cacheable && this.cacheable();

  // apply?args[]=1&args[]=2 => sourceFn(1, 2)
  if (Array.isArray(opts.args)) {
    args.push.apply(args, opts.args);
  } else if (opts.obj) {
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
