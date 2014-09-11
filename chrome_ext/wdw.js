$(document).ready(function () {
  $(document).on("click", ".open-wdw", function () {
    window.open("http://www.welldressedwolf.com");
  });

  var loader = setInterval(loadDresses, 3000)

  setTimeout(function () {
    clearInterval(loader);
  }, 30000)
  loadDresses()
});

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
        var href = $(this).attr('data-href')
        window.open(href)
      })
      $dress_image.appendTo($dress)
      $dress2 = $dress.clone()

      $dress.appendTo($dress_thumbs)
      $dress2.appendTo($dresses)
    }
  });
}