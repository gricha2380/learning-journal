function processEntry() {
  // create columnData object 
  // create inspectionFactorRows object
  // save all column headers into columData
  // for each row of data, run the following:
  // conditionally view each column, based on header value
  // if column header is Timestamp ... Area, save raw values into columnData object
  // if column header contains ': ', split value into temporary array
  // if the second array position does not equal 'Inspection Category', perform the following:
  // Use value of zero index position as name for a new key inside inspectionFactorRows object (eg: 'Tennis')
  // for each instance of the previously defined zero index position value (eg: 'Tennis'), look at cell values
  // if value is 'Good', set value to 4. If  value is 'Exellent' set value to 5. Same for 'Poor' and 'Fair'
  // Itterate through each cell value and add total to a temporary variable. 
  // Divide variable total by number of entries that went into it.
  // save this value into inspectionFactorRows as InspectionScore
  // add InspectionScore and InspectionCategory to columnData
  // print column data as row on destination Sheet
}
