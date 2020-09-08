<?php

	require_once("config.php");

	$given_username = $_REQUEST["username"];
	$given_password = $_REQUEST["password"];

	$main_array = [];

	$sql = "SELECT * FROM Users";
    	$result = $conn->query($sql);

    	if ($result->num_rows > 0) {
    	while($row = $result->fetch_assoc()) {
		
		if ($given_username === $row["username"] && $given_password === $row["password"]) {

		$info = [
			
			"id" => $row["userID"],
			"username" => $row["username"],
			"name" => $row["Fname"]

		];        				

		array_push($main_array, $info);
		
		}
        
    	}

	$mObj->user = $main_array;

	echo json_encode($mObj);

    	} else {

    	echo "";

    	}
    	$conn->close(); 


?>