const URL = require('url');

function redirectWithQuery(req, res, path: string) {
  let query = URL.parse(req.url, false).query;
  if (query) {
      path += '?' + query;
  }
  res.redirect(path);
}

export { redirectWithQuery }