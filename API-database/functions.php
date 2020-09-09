<?php

	function validate_password (string $given_password, string $hashed_password){

		$given_password = hash("sha512", $given_password);

		return ($given_password == $hashed_password);

	}


	function generate_password (string $data){

		return hash("sha512", $data);

	}


?>
