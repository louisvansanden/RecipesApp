<?php
	
	require_once("config.php");

	$ingredient_name = $_REQUEST["ingredient_name"];
	$recipe_name = $_REQUEST["recipe_name"];
	$userID = $_REQUEST["id"];

	$errors = [];

	if (empty($ingredient_name)) {

		array_push($errors, "Enter an ingredient");

	}

	$q = "SELECT * FROM Ingredients";
	$result = $conn->query($q);
	if ($result->num_rows > 0) {
  
  		while($row = $result->fetch_assoc()) {

    			if ($recipe_name === $row["recipe_name"] && $userID === $row["userID"] && $ingredient_name === $row["ingredient_name"]) {

				array_push($errors, "Ingredient already exists");

			}
	
  		}

	} 


	if (empty($errors)) {

		$sql = "INSERT INTO Ingredients (recipe_name, userID, ingredient_name) VALUES (?, ?, ?)";

		if( $stmt = $conn->prepare($sql)) {

	        	$stmt->bind_param("sss", $recipe_name, $userID, $ingredient_name);

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