<?php
	
	include "functions.php";
	require_once("config.php");

	$given_username = $_REQUEST["username"];
	$given_password = $_REQUEST["password"];
	$given_repeat = $_REQUEST["repeatPassword"];
	$given_fname = $_REQUEST["Fname"];

	$errors = [];

	if (empty($given_username)) {

		array_push($errors, "Username empty");	

	}

	if (empty($given_password)) {

		array_push($errors, "Password empty");

	} elseif (strlen($given_password) < 8) {

		array_push($errors, "Password is not at least 8 characters");		
	
	}

	if (empty($given_repeat)) {

		array_push($errors, "Repeat password empty");

	}

	if (empty($given_fname)) {

		array_push($errors, "Name empty");

	}

	if ($given_password !== $given_repeat) {

		array_push($errors, "Passwords do not match");

	}

	if (strpos($given_password, " ")) {

		array_push($errors, " Space in password");

	}

	if (strpos($given_username, " ")) {

		array_push($errors, " Space in username");

	}


	$q = "SELECT username FROM Users";
	$result = $conn->query($q);
	if ($result->num_rows > 0) {
  
  		while($row = $result->fetch_assoc()) {

    			if ($given_username === $row["username"]) {

				array_push($errors, "Username already exists");

			}
	
  		}

	} 


	if (empty($errors)) {

		$sql = "INSERT INTO Users (username, password, Fname) VALUES (?, ?, ?)";

		if( $stmt = $conn->prepare($sql)) {

		        $given_password = generate_password($given_password);

	        	$stmt->bind_param("sss", $given_username, $given_password, $given_fname);

		        if($stmt->execute()) {

	        		$mObj->errors = $errors;
				echo json_encode($mObj);

	        	} else {

				array_push($errors, "Unknown error");
	          	  	$mObj->errors = $errors;
				echo json_encode($mObj);
	        	}

	          	$stmt->close();

	    	} else {

			array_push($errors, "Preparation failed");
	          	$mObj->errors = $errors;
			echo json_encode($mObj);

		}

	} else {

		$mObj->errors = $errors;
		echo json_encode($mObj);

	}

    	$conn->close(); 


?>