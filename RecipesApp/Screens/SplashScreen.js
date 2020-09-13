import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
          <ScrollView style={this.styles.footer}>
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

            <View style={this.styles.buttonWrapper}>
              {/* BUTTON: Sign in */}
              <TouchableOpacity
                style={[this.styles.btn, this.styles.btnSignIn]}
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text style={this.styles.btnText}>Register</Text>
              </TouchableOpacity>
              {/* BUTTON: Log in */}
              <TouchableOpacity
                style={[this.styles.btn, this.styles.btnLogIn]}
                onPress={() => {
                  this.props.route.params.login(
                    this.state.userName,
                    this.state.password
                  );
                }}
              >
                <Text style={this.styles.btnText}>Log in</Text>
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
      flex: 4,
      backgroundColor: "#fff",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    titleFooter: {
      color: "#000000",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 10,
    },
    textFooter: {
      color: "grey",
    },
    input: {
      fontSize: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "lightgray",
      paddingVertical: 10,
      paddingLeft: 10,
      marginVertical: 5,
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
    btnLogIn: {
      borderWidth: 1,
      backgroundColor: "#218B82",
      marginLeft: 30,
    },
    btnSignIn: {
      borderWidth: 2,
      borderColor: "#218B82",
    },
    btnText: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
  });
}

export default SplashScreen;
