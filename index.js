var loaderUtils = require('loader-utils');

module.exports = function applyLoader(source) {
  var query = loaderUtils.parseQuery(this.query);
  var args = [];

  this.cacheable && this.cacheable();

  // apply?config=key => sourceFn(require('webpack.config').key)
  if (typeof query.config === 'string') {
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

  var json = JSON.stringify(args);
  source += "\n\nmodule.exports = module.exports.apply(module, " + json + ")";
  return source;
};
