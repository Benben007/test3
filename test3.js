//budget
var mysql = require('mysql');
var express = require('express');
var mustacheExpress = require('mustache-express');

function openConnection(){
	return mysql.createConnection({
	  host     : 'sql7.freemysqlhosting.net',
	  user     : 'sql7136648',
	  password : 'fRRju4rl7X',
	  database : 'sql7136648',
	});
}

function getData4(connection, keywork, callback){
	query1='delete from ' + mont + ' where ' + mont + '.Date_reg like "' + numberdate + '" and ' + mont + '.Info like "' + inf + '" and ' + mont + '.A=' + number1 + ' and ' + mont + '.B=' + number2 + ' and ' + mont + '.L=' + number12 + '  and ' + mont + '.C=' + number3 + ' and ' + mont + '.D=' + number4 + ' and ' + mont + '.E=' + number5 + ' and ' + mont + '.F=' + number6 + ' and ' + mont + '.G=' + number7 + ' and ' + mont + '.H=' + number8 + ' and ' + mont + '.I=' + number9 + ' and ' + mont + '.J=' + number10 + ' and ' + mont + '.K=' + number11 + ''
	console.log(query1)
	connection.query(query1, callback);
}


function getData3(connection, keywork, callback){
	query1='insert into ' + mont + '(Date_reg, Info, A, B, L, C, D, E, F, G, H, I, J, K) values ("' + numberdate + '", "' + inf + '", ' + number1 + ', ' + number2 + ', ' + number12 + ', ' + number3 + ', ' + number4 + ', ' + number5 + ', ' + number6 + ', ' + number7 + ', ' + number8 + ', ' + number9 + ', ' + number10 + ', ' + number11 + ')'
	console.log(query1)
	connection.query(query1, callback);
}


function getData1(connection, keywork, callback){
	query1='SELECT Date_reg as Date_reg, Info as Info, A as A, B as B, L as L, C as C, D as D, E as E, F as F, G as G, H as H, I as I, J as J, K as K FROM ' + mont + ''
	console.log(1)
	connection.query(query1, callback);
}


function getData2(connection, keywork, callback){
	query='select SUM(A) as Total_A, SUM(B) as Total_B, SUM(L) as Total_L, SUM(C) as Total_C, SUM(D) as Total_D, SUM(E) as Total_E, SUM(F) as Total_F, SUM(G) as Total_G, SUM(H) as Total_H, SUM(I) as Total_I, SUM(J) as Total_J, SUM(K) as Total_K from ' + Mont + ''
	console.log(2)
	connection.query(query, callback);
}





var app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
 
app.get('/', function (req, res) {

	var connection = openConnection();
	keywork = req.query['keywork']
	mont = req.query['mont']
	number1 = req.query['number1']
	number2 = req.query['number2']
	number3 = req.query['number3']
	number4 = req.query['number4']
	number5 = req.query['number5']
	number6 = req.query['number6']
	number7 = req.query['number7']
	number8 = req.query['number8']
	number9 = req.query['number9']
	number10 = req.query['number10']
	number11 = req.query['number11']
	number12 = req.query['number12']

	numberdate = req.query['numberdate']
	inf= req.query['inf']
	date = req.query['date']



	var fonctionRetour4 = function(err, results, fields){
		  getData1(connection, keywork, fonctionRetour1);	

	};

	var fonctionRetour3 = function(err, results, fields){
		  getData1(connection, keywork, fonctionRetour1);	

	};
	
	var fonctionRetour1 = function(err, results, fields){
		  if(err){
		  	console.log(err);
		  }
		 	
		 else {

//	 		console.log(results)
				
	 			var data1 = []
	 			for (var i in results) {
	 			data1.push([results[i].Date_reg, results[i].Info, results[i].A, results[i].B, results[i].L, results[i].C, results[i].D, results[i].E, results[i].F, results[i].G, results[i].H, results[i].I, results[i].J, results[i].K])

	 		}
				dataAsString1 = JSON.stringify(data1)

//				console.log(dataAsString1);

				
			};

			getData2(connection, keywork, fonctionRetour2);	

	};
		
		var fonctionRetour2 = function(err, results, fields){
		  if(err){
		  	console.log(err);
		  }
		 	
		 else {

//	 		console.log(results)

	 			var data2 = []
	 			var grandtotal = 0

	 			for (var i in results) {
	 				data2.push(['Insurance car', results[i].Total_A],['Rent', results[i].Total_B],['El', results[i].Total_L],['Food', results[i].Total_C], ['Leisure', results[i].Total_D], ['Phone', results[i].Total_E], ['Gas', results[i].Total_F], ['Transport', results[i].Total_G], ['Sport', results[i].Total_H], ['Insurance', results[i].Total_I], ['CSN', results[i].Total_J], ['Others', results[i].Total_K])
	 				grandtotal = results[i].Total_A+results[i].Total_B+results[i].Total_L+results[i].Total_C+results[i].Total_D+results[i].Total_E+results[i].Total_F+results[i].Total_G+results[i].Total_H+results[i].Total_I+results[i].Total_J+results[i].Total_K
		   		 }
//				data=([results[i].Total_A, results[i].Total_B, results[i].Total_C])
				dataAsString2 = JSON.stringify(data2)

				console.log(dataAsString2);

				res.render('test3.html', {
						data1: dataAsString1,
						data2: dataAsString2,
						grandtotal: grandtotal.toFixed(2)

				});
				connection.end();

			};

	};
	
 if (req.query['del']){
 	getData4(connection, keywork, fonctionRetour4);		
 }
 else {
 	if (req.query['initiate']){
			getData3(connection, keywork, fonctionRetour3);		
	}
	else {

		getData1(connection, keywork, fonctionRetour1);	
		
	}
	
 }




});




app.use(express.static('public'));

//var server= app.listen(3000, '0.0.0.0', function () {
//  console.log('Example app listening on port 3000!' + server.address().port);
app.set('port', ( process.env.PORT || 3000 ));
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
 
//app.listen(3000, '0.0.0.0');

//console.log('running port 3000')
