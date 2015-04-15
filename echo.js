var http = require("http");
var mysql = require('mysql');
var cheerio = require("cheerio");

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

var checkIDExists = function(urlToCheck){

    var res = urlToCheck.toString().split("/");
    for(var i in res){
      if(res[i].indexOf(".cms") > 1) return true;
      }
      return false;
};

var url = "http://timesofindia.indiatimes.com/";
download(url, function(data) {

var dataToBeupdated = [];
  //var objDB = require('./database.js');
  //var dbConnection = objDB.dbConn();
  
  if (data) {
    
    var $ = cheerio.load(data);
    $('div.featured').each(function(i, e) 
    {      
      var parsed_headlines = $(e).find("h1>a");
      var parsed_followLink = $(e).find("h1>a").attr("href");
      var parsed_headlineImage = $(e).find("img").attr("src");
      var parsed_description = $(e).find("span.txt");

      if(checkIDExists(parsed_followLink)) {
        var news = new updateNews(parsed_headlines.text(),parsed_followLink,'featured',parsed_description.text(),parsed_headlineImage);
        dataToBeupdated.push(news);
      }
    });

    $('div.top-story li').each(function(i, e) {
      var parsed_topstory = $(this).text();
      var parsed_storyfollowLink = $(e).find("a").attr("href");
      if(checkIDExists(parsed_storyfollowLink)) {
        var news = new updateNews(parsed_topstory,parsed_storyfollowLink,'top-story','none', 'none');
        dataToBeupdated.push(news);
      }
    });

    $('div.main-content ul.list9 li').each(function(i, e) {
      var parsed_newstory = $(this).text();
      var parsed_newstoryfollowLink = $(e).find("a").attr("href");
      if(checkIDExists(parsed_newstoryfollowLink)) {
        var news = new updateNews(parsed_newstory,parsed_newstoryfollowLink,'main-content','none', 'none');
        dataToBeupdated.push(news);
      }
    });

    $('div.main-content ul.list8 li').each(function(i, e) {
      var parsed_newstory = $(this).text();
      var parsed_newstoryfollowLink = $(e).find("a").attr("href");
      if(checkIDExists(parsed_newstoryfollowLink)) {
        var news = new updateNews(parsed_newstory,parsed_newstoryfollowLink,'across_toi','none', 'none');
        dataToBeupdated.push(news);
      }
    });
      
    for (var i = 0; i < dataToBeupdated.length; i++)
    {
      updateDB(dataToBeupdated[i].formDBQuery);
    }
  }
  //process.exit(1);
});

function updateNews(headlines,redirect_url,category,description,image){
  this.headlines = headlines;
  this.redirect_url = redirect_url;
  this.category = category;
  this.description = description;
  this.timestamp = function () { 
    var newDate = new Date();
    return new Date().toString();
  };
  this.image = image;

  this.parseID = function(){
    var res = this.redirect_url.toString().split("/");
    for(var i in res){
      if(res[i].indexOf(".cms") > 1){
        var id = res[i].split(".cms");      
          //parsed_articleId = id[0];
          return id[0];
        }
      }
      return '';
  };
  

  this.formDBQuery = {
      headlines: headlines, 
      redirect_url: redirect_url, 
      category: category, 
      description: description,
      time: this.timestamp(),
      imageurl: image,
      article_id:this.parseID()
    };
};


var updateDB = function(post)
{
   var objDB = DBConnection();
   var query = objDB.query('INSERT INTO NewsDB_Schema.MainNewsTable SET ?', post, function(err, result) {
    if(err){
      console.log(err.message);
    }else{
      console.log('success');
    }
  });
};


function DBConnection()
{
  var connection = mysql.createConnection(
   {
    user: 'root', 
    //password: 'whatever1!',
    host: 'localhost',
    port: 3306,
    database: 'NewsDB_Schema'
  }
  ); return connection; 
}




