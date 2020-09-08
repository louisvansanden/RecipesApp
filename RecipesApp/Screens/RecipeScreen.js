import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

export default class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: "Recipe",
      // recipeName: this.props.route.params.recipeName,
    };
  }

  render() {
    return (
      <View style={this.styles.container}>
        {/* HEADER */}
        <View style={this.styles.header}>
          <Text style={this.styles.textHeader}>{this.state.recipeName}</Text>
        </View>

        {/* FOOTER */}
        <View style={this.styles.footer}></View>
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
  });
}
