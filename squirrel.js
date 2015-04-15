var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");

var url = "http://timesofindia.indiatimes.com/";

download(url, function(data) {
  if (data) {
    console.log(data);

    var $ = cheerio.load(data);
    $("div.data-vr-zone > img.data-vr-contentbox").each(function(i, e) {

      //console.log(e);
      var link = $(e).find("h1>a");
        console.log(link);
      });
      
    console.log("done");
  }
  else console.log("error");  
});


