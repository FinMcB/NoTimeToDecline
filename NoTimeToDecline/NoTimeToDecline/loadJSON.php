<?php
# your database credentials
$db = new mysqli('localhost' ,'f2mcbrid_fin', 'phpeeps', 'f2mcbrid_testDatabase');
# check our connection to the database and return error if broken
if($db->connect_errno > 0){
  die('Unable to connect to database [' . $db->connect_error . ']');
}

# select all the data from the table top_albums
$sql = "SELECT * FROM questions";

# check our query will actually run
if(!$result = $db->query($sql)){
  die('There was an error running the query [' . $db->error . ']');
}
 $resultArray = array();
while (($row = fgetcsv($fh, 0, ",")) !== FALSE) {
    $resultArray[] = $row;
}
# return the array as a JSON
echo json_encode($resultArray,JSON_NUMERIC_CHECK);


# close the connection to your database
$db->close()
?>
