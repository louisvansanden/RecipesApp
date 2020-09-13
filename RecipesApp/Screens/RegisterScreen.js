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
import { ScrollView } from "react-native-gesture-handler";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: {
        titleHeader: "Register!",
        titleFooter: "Create an account.",
        textUsername: "Username",
        placeholderUsername: "Enter your username",
        textPassword: "Password",
        placeholderPassword: "Enter your password",
        textRepeatPassword: "Repeat password",
        placeholderRepeatPassword: "Repeat your password",
        textFname: "First name",
        placeholderFname: "Enter your first name",
      },
      username: "",
      password: "",
      repeatPassword: "",
      name: "",
    };
  }

  updateUsername = (val) => {
    this.setState({
      username: val,
    });
  };
  updatePassword = (val) => {
    this.setState({
      password: val,
    });
  };

  updateRepeatPassword = (val) => {
    this.setState({
      repeatPassword: val,
    });
  };

  updateFname = (val) => {
    this.setState({
      name: val,
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
          <ScrollView>
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

            {/* REPEAT PASSWORD */}
            <Text style={[this.styles.textFooter, { marginTop: 15 }]}>
              {this.state.text.textRepeatPassword}
            </Text>
            <TextInput
              style={this.styles.input}
              placeholder={this.state.text.placeholderRepeatPassword}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(val) => {
                this.updateRepeatPassword(val);
              }}
            />

            {/* NAME */}
            <Text style={[this.styles.textFooter, { marginTop: 15 }]}>
              {this.state.text.textFname}
            </Text>
            <TextInput
              style={this.styles.input}
              placeholder={this.state.text.placeholderFname}
              onChangeText={(val) => {
                this.updateFname(val);
              }}
            />

            <View style={this.styles.buttonWrapper}>
              {/* BUTTON: Log in */}
              <TouchableOpacity
                style={[this.styles.btn, this.styles.btnLogIn]}
                onPress={() => {
                  this.props.navigation.navigate("Splash");
                }}
              >
                <Text style={this.styles.btnLoginText}>Log in</Text>
              </TouchableOpacity>

              {/* BUTTON: Sign in */}
              <TouchableOpacity
                style={[this.styles.btn, this.styles.btnSignIn]}
                onPress={() => {
                  this.props.route.params.register(
                    this.state.username,
                    this.state.password,
                    this.state.repeatPassword,
                    this.state.name
                  );
                }}
              >
                <Text style={this.styles.btnSigninText}>Make account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
      flex: 15,
      backgroundColor: "#fff",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 20,
      paddingHorizontal: 30,
    },
    titleFooter: {
      color: "#000000",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 10,
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
      paddingVertical: 10,
      paddingLeft: 10,
      marginVertical: 3,
    },
    buttonWrapper: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginVertical: 20,
    },
    btn: {
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    btnSignIn: {
      borderWidth: 1,
      backgroundColor: "#218B82",
      marginLeft: 30,
    },
    btnLogIn: {
      borderWidth: 2,
      borderColor: "#218B82",
    },
    btnLoginText: {
      fontSize: 15,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
    btnSigninText: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
  });
}

export default RegisterScreen;
