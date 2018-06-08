var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'primal'
});

connection.connect();

function sendQuery(query, callback) {
    connection.query(query, function (error, results, fields) {
        if(error){
            callback(error)
        }else {
            callback(null, results)
        }
    })
}

module.exports = ({sendQuery: sendQuery});

