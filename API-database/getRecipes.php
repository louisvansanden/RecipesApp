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

			$sql_sub = "SELECT * FROM Ingredients I WHERE I.userID = ? AND I.recipe_name = ?";
			$stmt_sub = $conn->prepare($sql_sub);
			$stmt_sub->bind_param("ss", $row["userID"], $row["recipe_name"]);
			$stmt_sub->execute();
			$result_sub = $stmt_sub->get_result();
			
			$ingredient_array = [];
			if ($result_sub->num_rows > 0) {

				while($row_sub = $result_sub->fetch_assoc()) {
					
					array_push($ingredient_array, $row_sub["ingredient_name"]);

				}
			}
	
			$info = [
			
					"name" => $row["recipe_name"],
					"ingredients" => $ingredient_array

				];        				

			array_push($main_array, $info);
    		}
	
	}
	
	$mObj->recipes = $main_array;
	echo json_encode($mObj);
    	
	
	$conn->close(); 

?>