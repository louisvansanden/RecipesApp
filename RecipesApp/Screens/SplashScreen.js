import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: {
        titleHeader: "Welcome!",
        titleFooter: "Log in to your account.",
        textUsername: "Username",
        placeholderUsername: "Enter your username",
        textPassword: "Password",
        placeholderPassword: "Enter your password",
      },
      userName: "",
      password: "",
    };
  }

  updateUsername = (val) => {
    this.setState({
      userName: val,
    });
  };
  updatePassword = (val) => {
    this.setState({
      password: val,
    });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.header}>
          <Text style={this.styles.textHeader}>
            {this.state.text.titleHeader}
          </Text>
        </View>
        <Animatable.View
          duration={900}
          animation="slideInUp"
          style={this.styles.footer}
        >
          <Text style={this.styles.titleFooter}>
            {this.state.text.titleFooter}
          </Text>

          {/* USERNAME */}
          <Text style={this.styles.textFooter}>
            {this.state.text.textUsername}
          </Text>
          <TextInput
            style={this.styles.input}
            placeholder={this.state.text.placeholderUsername}
            autoCapitalize="none"
            onChangeText={(val) => {
              this.updateUsername(val);
            }}
          />

          {/* PASSWORD */}
          <Text style={[this.styles.textFooter, { marginTop: 15 }]}>
            {this.state.text.textPassword}
          </Text>
          <TextInput
            style={this.styles.input}
            placeholder={this.state.text.placeholderPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(val) => {
              this.updatePassword(val);
            }}
          />

          {/* BUTTON: Log in */}
          <TouchableOpacity
            style={this.styles.btnLogIn}
            onPress={() => {
              this.props.route.params.login(
                this.state.userName,
                this.state.password
              );
            }}
          >
            <Text style={this.styles.btnText}>Log in</Text>
          </TouchableOpacity>

          {/* BUTTON: Sign in */}
          <TouchableOpacity
            style={this.styles.btnSignIn}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <Text style={this.styles.btnText}>Register</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get("screen").width,
      backgroundColor: "#32324A",
    },
    header: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 30,
    },
    textHeader: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 40,
      fontFamily: "Roboto",
    },
    footer: {
      flex: 4,
      backgroundColor: "#fff",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
    titleFooter: {
      color: "#000000",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 20,
    },
    textFooter: {
      color: "grey",
      marginTop: 5,
    },
    input: {
      fontSize: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "lightgray",
      paddingVertical: 15,
      paddingLeft: 10,
      marginVertical: 5,
    },
    btnLogIn: {
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
    btnSignIn: {
      alignSelf: "flex-end",
      width: 150,
      height: 50,

      borderWidth: 3,
      borderColor: "#218B82",
      borderRadius: 15,

      justifyContent: "center",
      alignItems: "center",

      marginVertical: 25,
    },
    btnText: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
  });
}

export default SplashScreen;
