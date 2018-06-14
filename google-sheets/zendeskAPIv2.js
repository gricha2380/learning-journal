/* ========================================================================
   Create menu item on page load. (optional) fetch new data on page load
======================================================================== */

function onOpen() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
    name : "Fetch Ticket Metrics",
    functionName : "findView"
    },
     {name: "Instructions",
     functionName : "instructions"
     }];
    sheet.addMenu("Zendesk", entries);
    // run automatically if spreadsheet is opened. 
    //findView()
  };
  
  function instructions(){
    showURL("URL")
  }
  
  function showURL(href){
    var app = UiApp.createApplication().setHeight(50).setWidth(200);
    app.setTitle("Open Link");
    var link = app.createAnchor('Zendesk Stats Instructions', href).setId("link");
    app.add(link);  
    var doc = SpreadsheetApp.getActive();
    doc.show(app);
   }
  
  // This function GETs data from the Zendesk API using the parameters specified
  function getAPIdata(URL, apiAuth, notFirst) {
    Logger.log("URL is..");
    Logger.log(URL);
   
    // Grab our view data from the API via GET using the basic auth header from above
    var response = UrlFetchApp.fetch(URL, 
    {
    method: "get",
    headers: {"Authorization": apiAuth}
    });
    
    // Logger.log("Response=" + response);
    if (notFirst) {
        Logger.log("Response Code = " + response.getResponseCode());
    }
    
    // Get our view data
    var apiData = response.getContentText();
    if (notFirst) {
      // Logger.log("apiData=" + apiData);
    }
    
    
    // Convert that view data to a JSON object
    
    var apiObject = JSON.parse(apiData);
    
    
    
    return apiObject;
  }
  
  
  
  // Zendesk ID for the desired ticket view
  function findView() {
    getMetrics("000");
  }
  
  
  /* ========================================================================
     Send cridentials to getAPIdata function & process additional ticket data
  ======================================================================== */
  
  function callApiAndParseData(url, auth) {
    var new_rows = []
    var new_orgs = {}
    var new_users = {}
    var response = getAPIdata(url, auth);
    var nextFlag = false;
    if (response.next_page) {
      nextFlag = true;
    }
    Logger.log("First call succeeded");
    Logger.log("nextFlag=" + nextFlag);
    new_rows = new_rows.concat(response.rows);
    for (var i = 0; i < response.organizations.length; i++) {
      new_orgs[response.organizations[i].id] = response.organizations[i].name
    }
    for (var j = 0; j < response.users.length; j++) {
      new_users[response.users[j].id] = response.users[j].name
    }
    // nextFlag = response.next_page ? true : false;
    while (nextFlag) {
      response = getAPIdata(response.next_page, auth, true);
      Logger.log("In while loop - call succeeded");
      if (!response.next_page) {
        nextFlag = false;
      }
      Logger.log("nextFlag=" + nextFlag);
      new_rows = new_rows.concat(response.rows);
      for (var i = 0; i<response.organizations.length; i++) {
     
        new_orgs[response.organizations[i].id] = response.organizations[i].name
      }
      for (var j = 0; j < response.users.length; j++) {
        Logger.log(response.users[i]);
        Logger.log(i);
        new_users[response.users[j].id] = response.users[j].name
      }
    }
    return {'rows': new_rows, 'organizations': new_orgs, 'users': new_users}
  }
  
  function getMetrics(viewID) {
    
    // Grab the active spreadsheet so we can write some data to it later
    var satisfaction_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Select the "Template" sheet and make it active
    var template_sheet = satisfaction_spreadsheet.getSheetByName("Tickets");
    satisfaction_spreadsheet.setActiveSheet(template_sheet);
    
      
    // Setup basic authentication so we can get data via API. We'll pass this data to our API function
    var credentials = null; // email@domain.com/token:000;
    var digest = Utilities.base64Encode(credentials);
    var digestfull = "Basic "+digest;
    var zendeskURL = null; // Your Zendesk URL goes here
    
    // Grab our data via the API
    // var viewObject = getAPIdata(zendeskURL+"/api/v2/views/" + viewID + "/execute.json", digestfull);
    var viewObject = callApiAndParseData(zendeskURL+"/api/v2/views/" + viewID + "/execute.json", digestfull);
    
    // Isolate the users object so we can map assignee ID to assignee name
    // var viewUsersObject = viewObject.users;
    //Logger.log("User object contents");
    //Logger.log(viewUsersObject);
   
    
    // Isolate the rows object
    var viewTicketObject = viewObject.rows;
    
    
    
    
    // Let's create an array which will contain all the data we're going to dump into the spreadsheet
    var dataTable = new Array();
    
    // Iterate through each record in the API object and output select data to the logs
    for (var i in viewTicketObject) {
      var ticketID = viewTicketObject[i].ticket.id
      //Logger.log("ticket data");
      //Logger.log(viewTicketObject[i])
      
      // Get each of our properties for this ticket
      var satisfaction = viewTicketObject[i].satisfaction_score;
      var requested=viewTicketObject[i].created;
      var reasonCode=viewTicketObject[i].priority;
      dataTable.push([
        viewTicketObject[i].solved.replace("T", " ").replace("Z", ""), // solved
        '=hyperlink("URL/' + ticketID + '", ' + ticketID + ")", // ticket id
        viewObject.users[viewTicketObject[i].assignee_id], // asignee name
        viewTicketObject[i].ticket.subject, // ticket subject
        viewTicketObject[i].custom_fields[2] ? viewTicketObject[i].custom_fields[2].name : "", //reason code                   
        viewTicketObject[i].custom_fields[3] ? viewTicketObject[i].custom_fields[3].name : "", //product area
        viewObject.organizations[viewTicketObject[i].organization_id], // organization name
        viewTicketObject[i].custom_fields[0] ? viewTicketObject[i].custom_fields[0].value : "", // type
        viewTicketObject[i].custom_fields[1] ? viewTicketObject[i].custom_fields[1].value : "" // trello card
     ]);
    }
     
    /* ========================================================================
       Display data in spreadsheet
    ======================================================================== */
  
    // delete existing rows
    var rowCount = template_sheet.getMaxRows();
    Logger.log("row count");
    Logger.log(rowCount);
    //template_sheet.deleteRows(2, rowCount);
  //  template_sheet.getRange(2, 1, rowCount).clearContent();
    template_sheet.getRange('A2:Z9999').clearContent();
    
    // Count the number of records in the table of data so we know how many rows to add
    var number_of_records = dataTable.length;
  
    // Append new rows to the data sheet for each record
    Logger.log(number_of_records);
    template_sheet.insertRowsAfter(2, number_of_records - 1);
    //template_sheet.insertRowsAfter(2, number_of_records - 1);
    
      
    // Set the values for range A1:D2 to the values in an array.
    template_sheet.getRange(2, 1, number_of_records, 9).setValues(dataTable);
    template_sheet.getRange("A1").setNumberFormat('MM/dd/yyyy');
  
  }