import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import SplashScreen from "./Screens/SplashScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./Screens/HomeScreen";
import AccountScreen from "./Screens/AccountScreen";
import { ip } from "./secrets.json";
import FriendsScreen from "./Screens/FriendsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./Screens/RegisterScreen";

class Nav {
  static Tab = createBottomTabNavigator();
  static Stack = createStackNavigator();
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      userName: null,
      name: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      try {
        let userID = await AsyncStorage.getItem("userID");
        let userName = await AsyncStorage.getItem("userName");
        let name = await AsyncStorage.getItem("name");
        this.setState({
          userID,
          userName,
          name,
          isLoading: false,
        });
      } catch (e) {
        console.log(e);
      }
    }, 500);
  }

  addAsync = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, val);
    } catch (e) {
      console.log(e);
    }
  };

  removeAsync = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  login = (username, password) => {
    fetch(
      ip +
        "recipes/database/verifyUser.php?username=" +
        username +
        "&password=" +
        password,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const user = responseJson.user;
        let userID;
        userID = null;
        if (user.length > 0) {
          console.log(user[0]);
          userID = user[0].id;
          let userName = user[0].username;
          let name = user[0].name;
          this.addAsync("userName", userName);
          this.addAsync("userID", userID);
          this.addAsync("name", name);
          this.setState({
            userID,
            userName,
            name,
            isLoading: false,
          });
        } else {
          alert("No match");
        }
      });
  };

  register = (username, password, repeatPassword, Fname) => {
    fetch(
      ip +
        "recipes/database/register.php?username=" +
        username +
        "&password=" +
        password +
        "&repeatPassword=" +
        repeatPassword +
        "&Fname=" +
        Fname,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const errors = responseJson.errors;
        if (errors.length > 0) {
          alert(
            errors.map((e) => {
              return e;
            })
          );
        } else {
          this.login(username, password);
        }
      });
  };

  logout = () => {
    this.removeAsync("userID");
    this.removeAsync("userName");
    this.removeAsync("name");
    this.setState({
      userID: null,
      userName: null,
      name: null,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={this.styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (this.state.userID === null) {
        return (
          <NavigationContainer>
            <Nav.Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Nav.Stack.Screen
                name="Splash"
                component={SplashScreen}
                initialParams={{ login: this.login }}
              />
              <Nav.Stack.Screen
                name="Register"
                component={RegisterScreen}
                initialParams={{ register: this.register }}
              />
            </Nav.Stack.Navigator>
          </NavigationContainer>
        );
      } else {
        return (
          <NavigationContainer>
            <Nav.Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = "ios-home";
                  } else if (route.name === "Account") {
                    iconName = "ios-person";
                  } else if (route.name === "Friends") {
                    iconName = "ios-people";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: "#218B82",
                inactiveTintColor: "gray",
              }}
            >
              <Nav.Tab.Screen name="Home" component={HomeScreen} />
              <Nav.Tab.Screen
                name="Account"
                children={() => <AccountScreen logout={this.logout} />}
              />
              <Nav.Tab.Screen name="Friends" component={FriendsScreen} />
            </Nav.Tab.Navigator>
          </NavigationContainer>
        );
      }
    }
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
}

export default App;
