var loaderUtils = require("loader-utils");

module.exports = function() {}
module.exports.pitch = function applyLoader(remainingRequest) {
  var query = loaderUtils.parseQuery(this.query);
  var args = [];

  this.cacheable && this.cacheable();

  // apply?config=key => sourceFn(require('webpack.config').key)
  if (typeof query.config === "string") {
    if (!(query.config in this.options))
      throw new Error("apply-loader: '"+query.config+"' property not present in webpack config");
    args.push(this.options[query.config]);
  }

  // apply?{obj: {a: 1, b: 2}} => sourceFn({a: 1, b:2})
  if (query.obj) {
    args.push(query.obj);
  }

  // apply?args[]=1&args[]=2 => sourceFn(1, 2)
  if (Array.isArray(query.args)) {
    args.push.apply(args, query.args);
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
