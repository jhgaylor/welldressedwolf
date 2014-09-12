if(! localStorage.getItem('wdw-quantity')) {
  localStorage.setItem('wdw-quantity', 2)
}

if(! localStorage.getItem('wdw-size')) {
  localStorage.setItem('wdw-size', "12M")
}

if(! localStorage.getItem('wdw-refresh-time')) {
  localStorage.setItem('wdw-refresh-time', "3")
}

var REFRESH_TIME = null;
var QUANTITY = null;
var SIZE = null;

$(document).ready(function () {
  updateInputs();
  loadDresses()
  $(document).on("click", ".open-wdw", function () {
    window.open("http://www.welldressedwolf.com");
  });
  // var refresh_time = localStorage.getItem('wdw-refresh-time');
  // var loader = setInterval(loadDresses, refresh_time*1000);

  // var number_of_refreshes = 30;
  // setTimeout(function () {
  //   clearInterval(loader);
  // }, refresh_time*1000*number_of_refreshes);
  $(document).on("change", "#wdw-default-quantity", function () {
    var new_val = $('#wdw-default-quantity').val();
    localStorage.setItem('wdw-quantity', new_val)
  });

  $(document).on("change", "#wdw-default-size", function () {
    var new_val = $('#wdw-default-size').val();
    localStorage.setItem('wdw-size', new_val)
  });

  $(document).on("change", "#wdw-default-refresh", function () {
    var new_val = $('#wdw-default-refresh').val();
    localStorage.setItem('wdw-refresh-time', new_val)
  });

});

function updateInputs () {
  REFRESH_TIME = localStorage.getItem('wdw-refresh-time');
  QUANTITY = localStorage.getItem('wdw-quantity');
  SIZE = localStorage.getItem('wdw-size');
  $('#wdw-default-quantity').val(QUANTITY);
  $('#wdw-default-size').val(SIZE);
  $('#wdw-default-refresh').val(REFRESH_TIME);
}

var $product_forms = {};

function loadDresses () {
  console.log("loading dresses");
  $('<div>').load('http://www.welldressedwolf.com/collections/all', function () {
    console.log("loaded", this, $(this));
    var $dress;
    var $dress_thumbs = $('#dress-thumbs');
    var $dresses = $('#dresses');
    var product_urls = $(this).find('.product .details').map(function () {
      return {
        href: "http://www.welldressedwolf.com" + $(this).find('a').attr('href'),
        image: "http:" + $(this).prev().find('img').attr('src'),
        title: $(this).find('.title').text()
      }
    }).toArray();

    $dress_thumbs.empty();
    $dresses.empty();
    for(index in product_urls) {
      url = product_urls[index]
      $dress = $('<li class="dress">')
      $dress_image = $('<img src='+url.image+' alt="'+url.title+'" data-href="'+url.href+'">')
      $dress_image.on('click', function () {
        var href = $(this).attr('data-href');
        $product_forms[href] = $('<div>').load(href, function () {
          var $this = $(this);
          var $form = $this.find('#add-item-form');
          var action = "http://www.welldressedwolf.com"+$form.attr('action')
          $form.attr('action', action);
          console.log($form.attr('action'));
          // return;
          var $size_select_real = $this.find('#product-select')
          var $quantity = $this.find('#quantity');
          // set the quantity
          $quantity.val(QUANTITY);
          // return true for the correct elements and then apply the attr to the elements that match
          $size_select_real.find('option').filter(function() {
            var txt = $(this).text();
            console.log(txt, txt.search(SIZE));
            return (txt.search(SIZE) > -1);
          }).attr('selected', true);
          $form.submit();
        });
        // window.open(href)
      })
      $dress_image.appendTo($dress)
      $dress2 = $dress.clone()

      $dress.appendTo($dress_thumbs)
      $dress2.appendTo($dresses)
    }
  });
}