//works backup



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

                let newPair = {
                    [parent.id]: v,
                  }

                // let parentName = parent;
                // {[parentName]}.value = v;

                // let newPair = {parent:v};
                pairedResults.push(newPair);
              }
            })
          }
        }).then(more => console.log("all done.",pairedResults,pairedResults.length))
      })
      
     }).catch(e=> console.log("error happened:",e));

}

// run the actual function
buildParentList()

/// older


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
            console.log("all child views in the response", res.childViews)
            for(let x=0;x<childIDs.length;x++) {
              // get indexOf for entire childID array
              for(let y=0;y<res.childViews.length;y++){
                // if present, add into an object containing children & parents 
                console.log("current child view", res.childViews[y])
                if (res.childViews[y].indexOf(childIDs[y] != -1)) {
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
