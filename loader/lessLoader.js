var less = require('less');
function LessLoader(source) {
  var cb = this.async();
  let css;
  less.render(source, function (err, r) { // r.css
    css = r.css;
    cb(err, css);
  });
}

module.exports = LessLoader;