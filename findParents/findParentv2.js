/// new

const fetch = require('node-fetch');
const btoa = require('btoa');
const childIDs = require('./childIDs.json'); // name of child array

let newIDs = childIDs.values;

let buildParentList = () => {
  let columnName = `id`
  let url = `https://data.calgary.ca/resource/bjth-sc8w.json?$query=SELECT ${columnName}`;
  let pairedResults = [];

  fetch(url,{
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + btoa(process.env.SODA_USERNAME + ':' + process.env.SODA_PASSWORD)
      }
  })
  	.then(response => response.json())
    .then(parentIDs => {
      console.log("length of parentIDs",parentIDs.length)
      console.log("length of childIDs",childIDs.values.length)
      // console.log("length of childIDs",childIDs[0])
      console.log("child iDs", childIDs.values)

      parentIDs.forEach((parent,i,a)=>{
        fetch(`https://data.calgary.ca/api/views/${parent.id}`).then(response => response.json()).then(res =>{
          if (res.childViews) {
            // console.log("full content of childViews", res.childViews)
            return res.childViews.forEach(v => {
            //   console.log("current value",v)
              if (newIDs.indexOf(v) != -1) {
                console.log("match");

                let newPair = 
                `parent: ${[parent.id]}     child: ${v}`;

                // let parentName = parent;
                // {[parentName]}.value = v;

                // let newPair = {parent:v};
                pairedResults.push(newPair);
              }
            })
          }
        }).then(more => {console.log("all done.")
            console.log(pairedResults,"total",pairedResults.length)
        })
      })
      
     }).catch(e=> console.log("error happened:",e));

}

// run the actual function
buildParentList()