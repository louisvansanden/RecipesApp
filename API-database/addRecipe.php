<?php
	
	require_once("config.php");

	$userID = $_REQUEST["id"];
	$recipe_name = $_REQUEST["name"];

	$errors = [];

	if (empty($recipe_name)) {

		array_push($errors, "No name given");			

	}

	$q = "SELECT recipe_name FROM Recipes";
	$result = $conn->query($q);
	if ($result->num_rows > 0) {
  
  		while($row = $result->fetch_assoc()) {

    			if ($recipe_name === $row["recipe_name"]) {

				array_push($errors, "Recipe already exists");

			}
	
  		}

	} 


	if (empty($errors)) {

		$sql = "INSERT INTO Recipes (recipe_name, userID) VALUES (?, ?)";

		if( $stmt = $conn->prepare($sql)) {

	        	$stmt->bind_param("ss", $recipe_name, $userID);

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