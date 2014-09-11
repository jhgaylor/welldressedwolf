// Some values to configure
var QUANTITY = 2;
var SIZE = "12M";

// needs to be called on a product page
// http://www.welldressedwolf.com/products/copy
function order_dresses(quantity, size, url) {
  // grab the form from the website
  var $form = $('#add-item-form');
  var $size_select_real = $('#product-select')

  // set the quantity
  $('#quantity').val(QUANTITY);
  // return true for the correct elements and then apply the attr to the elements that match
  $size_select_real.find('option').filter(function() {
    var txt = $(this).text();
    console.log(txt, txt.search(SIZE));
    return (txt.search(SIZE) > -1);
  }).attr('selected', true);
  $form.submit();
}

$body = $('body');
$document = $(document);

$HTML = $([
  "<div class='wdw-order-dresses'>",
    "<h1>Order Now</h1>",
  "</div>"
].join(""));

if(location.href.search("products/") >= 0){
  
  $HTML.appendTo($body);

  $document.on('click', '.wdw-order-dresses', function () {
    // actuually order the stuff.
    console.log("clicked");
    order_dresses(QUANTITY, SIZE, null);
  });
}