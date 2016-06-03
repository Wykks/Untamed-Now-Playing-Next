const { atob, btoa } = require('resource://gre/modules/Services.jsm');

exports.atob = a => atob(a);
exports.btoa = b => btoa(b);
