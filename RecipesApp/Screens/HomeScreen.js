import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { ip } from "../secrets.json";
import * as Animatable from "react-native-animatable";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastRefresh: null,
      userID: null,
      userName: null,
      name: null,
      isLoading: true,
      recipes: [],
      showing: null,
      currentRecipe: {
        recipeName: null,
        ingredients: null,
      },
      newRecipeName: "",
      newIngredientName: "",
    };
  }

  updateNewRecipeName = (val) => {
    this.setState({
      newRecipeName: val,
    });
  };

  updateNewIngredientName = (val) => {
    this.setState({
      newIngredientName: val,
    });
  };

  addRecipe = () => {
    fetch(
      ip +
        "recipes/database/addRecipe.php?id=" +
        this.state.userID +
        "&name=" +
        this.state.newRecipeName,
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
        let errors = responseJson.errors;
        if (errors.length > 0) {
          alert(
            errors.map((e) => {
              return e;
            })
          );
        } else {
          this.setState({
            showing: "main",
          });
        }
      })
      .then(this.getUserData_Async());
  };

  addIngredientTo = (ingredientName, recipeName) => {
    fetch(
      ip +
        "recipes/database/addIngredient.php?ingredient_name=" +
        ingredientName +
        "&recipe_name=" +
        recipeName +
        "&id=" +
        this.state.userID,
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
        let errors = responseJson.errors;
        if (errors.length > 0) {
          alert(
            errors.map((e) => {
              return e;
            })
          );
        } else {
          this.getUserData_Async();
        }
      })
      .then(this.setState({ newIngredientName: "" }));
  };

  async showRecipe(recipeName, ingredients) {
    await this.setState({
      showing: "recipe",
      currentRecipe: {
        recipeName,
        ingredients,
      },
    });
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
        let recipes;
        recipes = responseJson.recipes;
        this.setState({
          recipes,
        });
      });
  };

  componentDidMount() {
    this.getUserData_Async();
    this.getRecipeNames(this.state.userID);
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.showing !== "main" && this.state.showing !== null) {
        this.setState({
          showing: "main",
        });
        return true;
      }
    });
  }

  render() {
    if (this.state.showing === "recipe") {
      return (
        <View style={this.styles.container}>
          <View style={this.styles.header}>
            <View style={this.styles.headerIcon}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    showing: "main",
                  });
                }}
              >
                <Ionicons name="ios-arrow-back" color="#fff" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={this.styles.textHeader}>Recipe</Text>
          </View>
          <View style={this.styles.footer}>
            <Text style={this.styles.titleFooter}>
              {this.state.currentRecipe.recipeName}
            </Text>
            <Text style={this.styles.footerText}>New ingredient</Text>
            <TextInput
              style={[this.styles.input, { height: 40, paddingVertical: 5 }]}
              placeholder="Name"
              onChangeText={(val) => {
                this.updateNewIngredientName(val);
              }}
              value={this.state.newIngredientName}
            />
            <TouchableOpacity
              style={[this.styles.btnAdd, { marginTop: 5 }]}
              onPress={() => {
                this.addIngredientTo(
                  this.state.newIngredientName,
                  this.state.currentRecipe.recipeName
                );
              }}
            >
              <Text style={this.styles.btnText}>Add item</Text>
            </TouchableOpacity>

            <Text style={[this.styles.titleFooter, { marginTop: 20 }]}>
              Ingredients
            </Text>

            {this.state.currentRecipe.ingredients.map((i) => {
              return (
                <Text style={this.styles.footerText} key={i}>
                  {i}
                </Text>
              );
            })}
          </View>
        </View>
      );
    } else if (this.state.showing === "main" || this.state.showing === null) {
      return (
        <View style={this.styles.container}>
          {/* HEADER */}
          {this.state.currentRecipe.isShowing === null ? (
            <Animatable.View
              duration={500}
              animation="slideInDown"
              style={this.styles.header}
            >
              <Text style={this.styles.textHeader}>Home</Text>
            </Animatable.View>
          ) : (
            <View style={this.styles.header}>
              <Text style={this.styles.textHeader}>Home</Text>
            </View>
          )}

          {/* FOOTER */}
          <View style={this.styles.footer}>
            <Text style={this.styles.titleFooter}>
              Welcome
              <Text style={this.styles.titleFooterColor}>
                {" "}
                {this.state.name}
              </Text>
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
                      key={r.name}
                      style={this.styles.card}
                      onPress={() => {
                        this.getUserData_Async();
                        this.showRecipe(r.name, r.ingredients);
                        console.log(r);
                      }}
                    >
                      <Text style={this.styles.cardTitle}>{r.name}</Text>
                      <Ionicons
                        style={this.styles.iconArrow}
                        name="ios-arrow-forward"
                        size={30}
                      />
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={this.styles.footerText}>
                  You have no recipes...
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showing: "add",
                });
              }}
            >
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
    } else if (this.state.showing === "add") {
      return (
        <View style={this.styles.container}>
          <View style={this.styles.header}>
            <View style={this.styles.headerIcon}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    showing: "main",
                  });
                }}
              >
                <Ionicons name="ios-arrow-back" color="#fff" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={this.styles.textHeader}>Add</Text>
          </View>
          <View style={this.styles.footer}>
            <Text style={this.styles.titleFooter}>Add a new recipe:</Text>
            <Text style={this.styles.footerText}>Recipe name</Text>
            <TextInput
              style={this.styles.input}
              placeholder="Name"
              onChangeText={(val) => {
                this.updateNewRecipeName(val);
              }}
            />
            <TouchableOpacity
              style={this.styles.btnAdd}
              onPress={() => {
                this.addRecipe(this.state.newRecipeName);
              }}
            >
              <Text style={this.styles.btnText}>Add recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get("screen").width,
      backgroundColor: "#fff",
    },
    header: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 30,
      backgroundColor: "#32324A",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    headerIcon: {
      position: "absolute",
      left: 40,
      top: 25,
      height: 50,
      width: 50,
      justifyContent: "center",
      alignItems: "center",
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
    refreshBtn: {
      position: "absolute",
      right: 50,
      top: 200,
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
    input: {
      fontSize: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "lightgray",
      paddingVertical: 15,
      paddingLeft: 10,
      marginVertical: 5,
      width: Dimensions.get("screen").width * 0.8,
    },
    btnAdd: {
      alignSelf: "flex-end",
      width: 150,
      height: 50,

      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: "#218B82",

      justifyContent: "center",
      alignItems: "center",

      marginTop: 25,
    },
    btnText: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
  });
}
