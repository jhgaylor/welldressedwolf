# order all the dresses!!!!!

# the general idea is:
# 1. the user will login to WDW before starting
# 2. the user will go to an express app and submit a form which kicks this off
# 3. the user will be redirected to WDW
_ = require 'underscore'
Q = require 'q'
phantom = require 'node-phantom'

phantom.create (err, ph) ->
  console.log 1, err, ph.createPage.toString()
  ph.createPage (err, page) ->
    console.log 2
    page.open "http://www.welldressedwolf.com/", (err, status) ->
      console.log 3
      if status is "fail"
        console.log "failed to load welldressedwolf. exiting."
        ph.exit()
      console.log "Ready to begin\n=============="
      # page.evaluate () ->
      #   console.log document.title
      #   document.title
      # getAllProductUrls page
      ph.exit()
#, { dnodeOpts: { weak: false } }



# login()
# addProductsToCart()

# grab the urls from the cart page 
getAllProductUrls = (page) ->
  console.log 1
  # page is a phantomjs page
  # http://www.welldressedwolf.com/cart
  _getUrls = () ->
    console.log 2
    def = Q.defer()
    console.log "2.1"
    page.evaluate () ->
      console.log "==", document.title
      return document.title
    , (result) ->
      console.log "--", document.title
      def.resolve result
    console.log 3
    def.promise

  console.log 4
  _getUrls().then (title) ->
    console.log 5
    console.log "got the title, #{title}"
  console.log 6
  return
  urls = $('.product a').map ->
    return $(this).attr('href')

  urls = urls.toArray()
  # remove duplicates
  unique_urls = []
  urls.forEach (url) ->
    unless _.contains(unique_urls, url)
      unique_urls.push(url)
  unique_urls



# $iframe = $('<iframe id="magic-window">')
# $('body').append($iframe)

# $iframe.attr('src', 'http:#www.welldressedwolf.com/cart')

# $iframe.load ->
#   urls = get_all_product_urls()
#   # now that we have the urls, lets go to one of the pages
  
#   console.log("--", urls)

