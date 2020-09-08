import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { ip } from "../secrets.json";
import * as Animatable from "react-native-animatable";
import { RecipeScreen } from "./RecipeScreen";
import { createStackNavigator } from "@react-navigation/stack";

class Nav {
  static Stack = createStackNavigator();
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      userName: null,
      name: null,
      isLoading: true,
      recipes: [],
    };
  }

  getUserData_Async = async () => {
    let userName;
    let userID;
    let name;
    userName = await AsyncStorage.getItem("userName");
    userID = await AsyncStorage.getItem("userID");
    name = await AsyncStorage.getItem("name");
    this.setState({
      userName,
      userID,
      name,
      isLoading: false,
    });
    this.getRecipeNames(userID);
  };

  getRecipeNames = (id) => {
    fetch(ip + "recipes/database/getRecipes.php?id=" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let myRecipes;
        myRecipes = responseJson.recipes;
        this.setState({
          recipes: myRecipes,
        });
      });
  };

  componentDidMount() {
    this.getUserData_Async();
    this.getRecipeNames(this.state.userID);
  }

  render() {
    return (
      <View style={this.styles.container}>
        {/* HEADER */}
        <Animatable.View
          duration={500}
          animation="slideInDown"
          style={this.styles.header}
        >
          <Text style={this.styles.textHeader}>Home</Text>
        </Animatable.View>

        {/* FOOTER */}
        <View style={this.styles.footer}>
          <Text style={this.styles.titleFooter}>
            Welcome
            <Text style={this.styles.titleFooterColor}> {this.state.name}</Text>
            .
          </Text>

          <Text style={this.styles.subtitleFooter}>My recipes:</Text>

          <ScrollView>
            {this.state.isLoading ? (
              <ActivityIndicator />
            ) : this.state.recipes.length !== 0 ? (
              this.state.recipes.map((r) => {
                return (
                  <TouchableOpacity
                    key={r}
                    style={this.styles.card}
                    onPress={() => {}}
                  >
                    <Text style={this.styles.cardTitle}>{r}</Text>
                    <Ionicons
                      style={this.styles.iconArrow}
                      name="ios-arrow-forward"
                      size={30}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={this.styles.footerText}>You have no recipes...</Text>
            )}
          </ScrollView>

          <TouchableOpacity onPress={() => {}}>
            <Animatable.View animation="bounce" style={this.styles.cardAdd}>
              <Text style={this.styles.cardTitle}>Add new recipe</Text>

              <Ionicons
                style={this.styles.iconArrow}
                name="ios-arrow-forward"
                size={30}
              />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get("screen").width,
      backgroundColor: "#fff",
    },
    header: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 30,
      backgroundColor: "#32324A",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    textHeader: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 40,
      fontFamily: "Roboto",
      alignSelf: "center",
    },
    footer: {
      flex: 15,
      backgroundColor: "#fff",

      padding: 30,

      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    titleFooter: {
      color: "#000000",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Roboto",
    },
    titleFooterColor: {
      color: "#666699",
    },

    subtitleFooter: {
      fontWeight: "900",
      fontSize: 20,
      fontFamily: "Roboto",
      marginBottom: 10,
    },
    footerText: {
      fontSize: 15,
      fontFamily: "Roboto",
      color: "gray",
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "lightgray",
      marginVertical: 5,
      width: Dimensions.get("screen").width * 0.85,
      height: 50,
      borderRadius: 10,
      paddingLeft: 10,
    },
    cardTitle: {
      fontWeight: "bold",
      fontSize: 20,
      fontFamily: "Roboto",
    },
    iconArrow: {
      paddingRight: 15,
      alignSelf: "center",
      position: "absolute",
      right: 0,
    },
    cardAdd: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#0DAC50",
      marginTop: 30,
      width: Dimensions.get("screen").width * 0.85,
      height: 50,
      borderRadius: 10,
      paddingLeft: 10,
    },
  });
}
