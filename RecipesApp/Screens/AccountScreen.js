import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.styles.container}>
        {/* HEADER */}
        <View style={this.styles.header}>
          <Text style={this.styles.textHeader}>Account</Text>
        </View>

        {/* FOOTER */}
        <View style={this.styles.footer}>
          <View style={this.styles.logoutBtnWrap}>
            <TouchableOpacity
              style={this.styles.logoutBtn}
              onPress={this.props.logout}
            >
              <Text style={this.styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
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
    logoutBtnWrap: {
      justifyContent: "center",
      alignItems: "center",
      width: 250,
      height: 50,
      borderRadius: 30,
      backgroundColor: "tomato",
      alignSelf: "center",
      position: "absolute",
      bottom: 20,
    },
    logoutBtn: {
      justifyContent: "center",
      alignItems: "center",
      width: 250,
      height: 50,
    },
    logoutText: {
      fontWeight: "bold",
      fontFamily: "Roboto",
      fontSize: 20,
    },
  });
}
