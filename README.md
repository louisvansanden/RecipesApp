# RecipesApp
Save recipes and share with friends.
-------

## Account
To use this app an account is required which can be made in-app. This requires:
- username
- password
- first name

The input is checked server-side for, among other things, username uniqueness, password length and password matching with repeated password. If valid, the username and firstname are saved in the database along with a salted and hashed password and its salt. 
To login again the provided username and password are checked using the salt and if all match, the user is logged in.

## Recipes
Recipes can be added by providing a name. To add ingredients, one can navigate to the specific recipe and add items there. 

## Friends
*work in progress*

## TODO
- [ ] Setup database to be able to store:
  - [X] Users (__userID__, username, password, salt, Fname)
  - [X] Recipes (__userID__, __recipe_name__)
  - [X] Ingredients (__userID__, __recipe_name__, __ingredient_name__)
  - [ ] Friends (__userID__, __friend_userID__)
- [ ] App screens:
  - [X] Splash screen: shown when user enters app and no user is logged in.
  - [X] Register screen: screen to make a new account, accessed from splash screen.
    - Login button: returns to the splash screen.
    - Register button: takes given input and sends it to database API for validation and, if validated, add it to database. Then logs in.
  - [X] Home screen: contains all recipes, can switch between three modes:
    - Home mode: shows recipe names and a button to add new recipes.
    - Recipe mode: shows corresponding ingredients of the current recipe.
    - Add mode: shows a text input and a button the given new recipe.
  - [ ] Account screen: contains user info, can switch between modes:
    - General mode: shows all possible settings and a logout button.
    - Specific mode: shows buttons to change a specific setting.
  - [ ] Friends screen: contains friends, can show a screen similar to the home screen but with recipes for friends.
- [ ] Verify registration with email
- [X] Hash and salt passwords
