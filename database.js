
var mysql = require('mysql');

/*
function DBConnection()
{

  this.updateDB = function(post)
  {
     var objDB = DBConnection();
     // code to check if the article is present in the DB
     // <! ----to be completed ---->

     var query = objDB.query('INSERT INTO NewsDB_Schema.MainNewsTable SET ?', post, function(err, result) {
      if(err){
        console.log(err.message);
      }else{
        console.log('success');
      }
    });
  };

  this.connection = mysql.createConnection(
   {
    user: 'root', 
    //password: 'whatever1!',
    host: 'localhost',
    port: 3306,
    database: 'NewsDB_Schema'
  }
  ); return connection; 
}

exports.ConversationModule = DBConnection;*/


module.exports = 
{
  updateDB = function(post)
  {
     var objDB = connection;
     // code to check if the article is present in the DB
     // <! ----to be completed ---->

     var query = objDB.query('INSERT INTO NewsDB_Schema.MainNewsTable SET ?', post, function(err, result) {
      if(err){
        console.log(err.message);
      }else{
        console.log('success');
      }
    });
  },

  dbConn = function(){
    return connection;
  },
        
  connection = mysql.createConnection(
   {
    user: 'root', 
    //password: 'whatever1!',
    host: 'localhost',
    port: 3306,
    database: 'NewsDB_Schema'
  }
  ); return connection;
};