<?php

	require_once("config.php");

	$given_email = $_REQUEST["email"];
	$given_password = $_REQUEST["password"];

	$main_array = [];

	$sql = "SELECT * FROM UserData";
    	$result = $conn->query($sql);

    	if ($result->num_rows > 0) {
    	while($row = $result->fetch_assoc()) {

		$id = $row["id"];
		$email = $row["email"];
		$name = $row["name"];
		$password = $row["password"];
		
		if ($given_email === $email && $given_password === $password) {

		$info = [
			
			"id" => $id,
			"email" => $email,
			"name" => $name,

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