var page = require('webpage').create();
page.open('http://nesteddata.com', function () {
  page.render('example.png');
  phantom.exit();
})