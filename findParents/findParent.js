const fetch = require('node-fetch');
const btoa = require('btoa');
const childIDs = require('./childIDs.json'); // name of child array



let buildParentList = (childIDs) => {
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
      console.log("length of childIDs",childIDs.length)
      // console.log("length of childIDs",childIDs[0])
      
      parentIDs.forEach((parent,i,a)=>{
        fetch(`https://data.calgary.ca/api/views/${parent.id}`).then(response => response.json()).then(res =>{
          // console.log("this is what I see in api views loop", res.childViews)
          if (res.childViews) {
            
            console.log("all child views in the response", res.childViews, res.childViews.length)
            for(let x=0;x<res.childViews.length;x++) {
              // get indexOf for entire childID array
              for(let y=0;y<childIDs.length;y++){
                // if present, add into an object containing children & parents 
                console.log("current child view", res.childViews[x])
                if (res.childViews[x].indexOf(childIDs[y] != -1)) {
                  pairedResults.push({parentID:parent,child:childIDs[y]})
                }
              }
            }
          }
        }).then(final => {console.log("all done.",pairedResults)})
      })
      
     })

}

// run the actual function
buildParentList(childIDs)