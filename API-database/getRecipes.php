<?php
	
	require_once("config.php");

	$userID = $_REQUEST["id"];
	
	$sql = "SELECT * FROM Recipes R, Users U WHERE U.userID = ? AND U.userID = R.userID";

	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s", $userID);
	$stmt->execute();
	
    	$result = $stmt->get_result();

	$main_array = [];

    	if ($result->num_rows > 0) {

    		while($row = $result->fetch_assoc()) {
			array_push($main_array, $row["recipe_name"]);
    		}
	
	}
	
	$mObj->recipes = $main_array;
	echo json_encode($mObj);
    	
	
	$conn->close(); 

?>