const fetch = require('node-fetch');
const btoa = require('btoa');

let solicitation_number = "HC10689";
// this can be grabbed from a field in a form. e.g.: let solicitation_number = document.querySelector("#user_input_field_name").value


//Use this to find the inherit row identifier when given a project number. Ignore this function if a user defined row identifier is setup
let findRow = (solicitation_number) => {
  let urlquery = `https://gregor.demo.socrata.com/resource/wwpk-7ish.json?$query=SELECT :id WHERE project_number = "${solicitation_number}"`;

  fetch(urlquery)
  	.then(response => response.json())
    .then(response => {
      return response[0][":id"];
	   }).then((x)=>{
  	  console.log("Row ID",x)
    	updateRow(x);
   });
}
  
// now that the row identifer is known, update the relevant row with the given information
let updateRow = (id) => {
  let url = "https://gregor.demo.socrata.com/resource/wwpk-7ish";
  let data = {
  "procurement_title" : "Repair Fenders and Bollards at Pier 38 GREGOR info",
  "remove":true,
  ":id": id // e.g.: 4
 };
  
  fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + btoa(process.env.SODA_USERNAME + ':' + process.env.SODA_PASSWORD)
      },
      method: 'POST', 
      mode: 'cors', 

      referrer: 'no-referrer',
    }).then(response => response.json())
      .then( (data)=> {
        console.log("here's the updated record",data);
    }).catch(e => console.log("Update error:",e));
}

// run the actual function
findRow(solicitation_number);