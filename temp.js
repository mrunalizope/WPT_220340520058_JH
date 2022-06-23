
const express = require('express');
const app = express();
const mysql = require('mysql2');
app.use(express.static("abc"));

let dbobject={
	host:'localhost',
	user:'mrunali',
	password:'welcome123',
	database:'mru',
	port:3306
}
const con=mysql.createConnection(dbobject);
console.log("Database connection Established");


app.get('/adddetails',(req, res)=> {
    console.log("adddetails function is working");
	
       
		let input=req.query.x;
		console.log("reading input " + req.query.input);
		
    	let output ={ status:false,bookDetails:{bookid:0,bookname:" ",price:0}};
		con.query("select * from Book where bookid = ?", [input], (err, res) => {
			if (err) {
				
				console.log("trouble " );
			} else {
				if(res.length>0){

					output.status=true;
					output.bookDetails=res[0];
				}
				console.log("success" + result)
			}
			
		});
			res.send(output);
		});



		app.get('/addbook',(req, res1)=> {
			console.log("addbook function is working");
			
			   
				let input={id:req.query.x,name:req.query.y,price:req.query.z};
				console.log(input);

				
				
				let output ={ status:false};
				con.query('insert into Book (bookid,bookname,price) values(?,?,?)', [input.id,input.name,input.price], (err, res1) => {
					
						if (err) {
						
						console.log("Error  " );
					} else {
						if(res1.affected>0){
							output.status=true;
						}
						console.log("success" + result)
					}
				
					
				
					res1.send(output);
			});

			app.get('/ShowAllBooks', (req, resp) => {
				console.log("inside /ShowAllBooks");
				console.log(req.query);
			
				let output = { status: false };
			
				con.query('select * from book', [],  
					(err, rows) => {
						console.log(rows);
						if (err) {
							console.log("Error in fetching rows form database");
						} else {
							if (rows.affectedRows > 0) {
								output.status = true;
							}
						}
						resp.send(rows);
					});
			});
		
		})
	app.listen(8082, function () {
    console.log("server listening at port 8082...")
	})
