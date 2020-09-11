# RecipesApp
Save recipes and share with friends.
-------

## Account
To use this app an account is required which can be made in-app. This requires:
- username
- password
- first name

The input is checked server-side for among other things username uniqueness, password length and password matching with repeated password. If valid, the username and firstname are saved in the database along with a salted and hashed password and its salt. 
To login again the provided username and password are checked using the salt and if all match, the user is logged in.

## Recipes
Recipes can be added by providing a name. To add ingredients, one can navigate to the specific recipe and add items there. 

## Friends
*work in progress*

## TODO
- [ ] Setup database to be able to store:
  - [X] Users (__userID__, username, password, salt, Fname)
  - [X] Recipes (__userID__, recipe_name)
  - [X] Ingredients (__userID__, __recipe_name__, ingredient_name)
  - [ ] Friends (__userID__, friend_userID)
- [ ] Verify registration with email
- [ ] Hash passwords
