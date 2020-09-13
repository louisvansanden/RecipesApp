<?php

	function validate_password (string $given_password, string $hashed_password, $salt){

		$given_password .= $salt;

		$given_password = hash("sha512", $given_password);

		return ($given_password == $hashed_password);

	}


	function generateRandomString($length = 8) {

    		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    		$charactersLength = strlen($characters);
    		$randomString = '';

    		for ($i = 0; $i < $length; $i++) {
        		$randomString .= $characters[rand(0, $charactersLength - 1)];
    		}

    		return $randomString;

	}


	function generate_password (string $data){

		$salt = generateRandomString(8);

		$data .= $salt;

		return array(hash("sha512", $data), $salt);

	}


?>
