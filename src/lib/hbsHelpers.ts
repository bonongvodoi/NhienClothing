const helpers = {
  section(name, options) {
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
  staticBase() {
    return process.env.CDN_BASE_URL || '';
  },
  isProduction() {
    return process.env.NODE_ENV == 'production';
  },
  intercomAppId() {
    return process.env.NODE_ENV === 'production' ? 'vvoaryvw' : 'ip5kpw3p';
  },
  if_eq(a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
  }
};

export default function registerHBSHelpers(hbs) {
  Object.keys(helpers).forEach(function(name) {
    hbs.registerHelper(name, helpers[name]);
  });
}