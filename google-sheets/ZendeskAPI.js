/* ========================================================================
   Create menu item on page load. (optional) fetch new data on page load
======================================================================== */

function onOpen() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
    name : "Fetch Ticket Metrics",
    functionName : "findView"
    }];
    sheet.addMenu("Zendesk", entries);
    //findView() //run automatically
  };
  
  // This function GETs data from the Zendesk API using the parameters specified
  function getAPIdata(URL, apiAuth) {
    Logger.log("URL is..");
    Logger.log(URL);
   
    // Grab our view data from the API via GET using the basic auth header from above
    var response = UrlFetchApp.fetch(URL, 
    {
    method: "get",
    headers: {"Authorization": apiAuth}
    });
    
    // Get our view data
    var apiData = response.getContentText();
    
    // Convert that view data to a JSON object
    var apiObject = Utilities.jsonParse(apiData);
    
    return apiObject;
  }
  
  // Zendesk ID for the desired ticket view
  function findView() {
    getMetrics("360030826634");
  }
  
  /* ========================================================================
     Send cridentials to getAPIdata function & process additional ticket data
  ======================================================================== */
  
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
    var viewObject = getAPIdata(zendeskURL+"/api/v2/views/" + viewID + "/execute.json", digestfull);
    
    // Isolate the users object so we can map assignee ID to assignee name
    var viewUsersObject = viewObject.users;
    //Logger.log("User object contents");
    //Logger.log(viewUsersObject);
    
    // Iterate through each record in the users object and build a lookup object so we can map assignee ID to name
    var userLookup = {};
    for (var j in viewUsersObject) {
      userLookup[viewUsersObject[j].id] = viewUsersObject[j].name;
    }
    
    // Isolate the rows object
    var viewTicketObject = viewObject.rows;
    
    // Let's create an array which will contain all the data we're going to dump into the spreadsheet
    var dataTable = new Array();
    
    // Iterate through each record in the API object and output select data to the logs
    for (var i in viewTicketObject) {
      //Logger.log("ticket data");
      //Logger.log(viewTicketObject[i])
      
      // Get each of our properties for this ticket
      var satisfaction = viewTicketObject[i].satisfaction_score;
      var requested=viewTicketObject[i].created;
      if (viewTicketObject[i].custom_fields[1])   {var productArea=viewTicketObject[i].custom_fields[1].name;}
      if (viewTicketObject[i].custom_fields[0])   {var trelloCard=viewTicketObject[i].custom_fields[0].value;}
      var priority=viewTicketObject[i].priority;
      var organization=viewTicketObject[i].organization_id;
      if (viewTicketObject[i].solved)
      {
       var solved=viewTicketObject[i].solved.replace("T", " ").replace("Z", "");
  //      var solved = viewTicketObject[i].solved;
    //    var solved = Utilities.formatDate(new Date(),"GMT","yyyy-MM-dd'T'HH:mm:ss'Z'")
        
      }
      var type=viewTicketObject[i].type;
      
      var ticketID = viewTicketObject[i].ticket.id;
    var ticketRequesterUpdate = viewTicketObject[i].created.replace("T", " ").replace("Z", "");
  //    var ticketRequesterUpdate = viewTicketObject[i].created;
    //  var ticketRequesterUpdate = Utilities.formatDate(new Date(),"UTC","yyyy-MM-dd'T'HH:mm:ss'Z'")
      var ticketAssigneeID = viewTicketObject[i].assignee_id;
      var ticketAssigneeName = userLookup[ticketAssigneeID];
      
      // Get the ticket data for each record via another API request
      var ticketDetails = getAPIdata(zendeskURL+"/api/v2/tickets/" + ticketID + ".json", digestfull);
      
      // Grab the satisfaction comment for this ticket
      var ticketSatisfactionComment = ticketDetails.ticket.satisfaction_rating.comment;
      var ticketSubject = ticketDetails.ticket.subject;
      
      // Find org name from ID
      for (var x = 0;x<viewObject.organizations.length;x++){
        if (viewObject.organizations[x].id === organization){
          var orgName = viewObject.organizations[x].name;
        }
      }
      // Construct the current row of data for this ticket as an array and then push to our parent array
      var currentRow = [solved, '=hyperlink("URL' + ticketID + '", ' + ticketID + ")", ticketAssigneeName, ticketSubject, productArea, orgName, type, trelloCard];
      dataTable.push(currentRow);
    }
    
    // Check for pagination and pull all available pages
    if (viewObject.next_page) {
      Logger.log("next page found");
      Logger.log(viewObject.next_page);    
      //var newObj = getAPIdata(viewObject.next_page, digestfull); 
      //Logger.log("New object");
      //Logger.log(newObj);
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
    template_sheet.getRange('A2:Z999').clearContent();
    
    // Count the number of records in the table of data so we know how many rows to add
    var number_of_records = dataTable.length;
  
    // Append new rows to the data sheet for each record
    Logger.log(number_of_records);
    template_sheet.insertRowsAfter(2, number_of_records - 1);
    //template_sheet.insertRowsAfter(2, number_of_records - 1);
    
      
    // Set the values for range A1:D2 to the values in an array.
    template_sheet.getRange(2, 1, number_of_records, currentRow.length).setValues(dataTable);
    template_sheet.getRange("A1").setNumberFormat('MM/dd/yyyy');
  
  }