/**
 * React Native App
 * By Ashimi Blessing.
 * If you are reading this, congratz: you are one of the privileged many,
 * who have been blessed with reading my code. I wish you good luck.
 * Tip: watch out for ocassional minefields! and treasures too. They could make or break you,
 * just ask "Mr ...." //Fill in the blanks, I leave that as an homework :)
 *
 *Initializing flow below
 *
 * @flow
 */

//import React, { Component } from "react";
//import { AppRegistry, StyleSheet, Text, View } from "react-native";

import React, { Component } from "react";

import {
  NetInfo,
  AppRegistry,
  StyleSheet,
  Image,
  View,
  ToolbarAndroid,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Text,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Form,
  Item,
  Input,
  Label,
  Grid,
  Row,
  Col
} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StackNavigator, DrawerNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";
import { CheckBox } from "react-native-elements";

import SideBar from "./sidebar";
import xstyles from "./externalstyle";

textisize = function(size, color = "#191919", weight = "500") {
  return {
    alignSelf: "center",
    fontSize: size,

    color: color,
    fontWeight: weight,
    marginVertical: 10
  };
};

export default class Welcome extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  constructor() {
    super();

    console.ignoredYellowBox = ["Setting a timer"];
  }

  state = {
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    error: "",
    loading: false,
    signup: "",
    isChecked: false,
    isloading: true
  };

  componentDidMount() {
    this.setState({ isloading: false });
  }

  async componentWillMount() {
    const { navigate } = this.props.navigation;

    try {
      const value = await AsyncStorage.getItem("keeplogin");

      if (value !== null) {
        //alert("I chose to stay logged in");
        this.setState({ isChecked: true });
      } else {
        //alert("I chose not");
        AsyncStorage.removeItem("keeplogin");
        AsyncStorage.removeItem("logincookie");
      }
    } catch (error) {
      //silence is golden
    }

    try {
      const value = await AsyncStorage.getItem("logincookie");

      if (value !== null) {
        //alert("I chose to stay logged in");
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        //alert("I chose not");
        AsyncStorage.removeItem("logincookie");
      }
    } catch (error) {
      //silence is golden
    }
  }

  async signupHandler() {
    const { navigate } = this.props.navigation;
    const { email, password, displayName, phoneNumber } = this.state;

    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");

    if (phoneNumber.length < 7 || isNaN(phoneNumber)) {
      this.setState({
        error: "Please enter a valid phone number",
        loading: false
      });
    } else if (password.length < 6) {
      this.setState({
        error: "Your password must be more than six characters",
        loading: false
      });
    } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      this.setState({
        error: "Please type a valid email",
        loading: false
      });
    } else if (
      email !== "" &&
      password !== "" &&
      (phoneNumber !== "") & (displayName !== "")
    ) {
      this.setState({ error: "", loading: true });
      const { email, password, username, phoneNumber } = this.state;

      //AsyncStorage.setItem("displayName", displayName);
      //AsyncStorage.setItem("globalID", "BXI127699");

      this.setState({ error: "", loading: true });

      var details = {
        UserName: username,
        Password: password,
        Email: email,
        PhoneNumber: phoneNumber
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch("http://hbx.stripestech.com" + "/api/Account/CreateUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(async data => {
          if (data.reg_response == "successful") {
            navigate("Welcome");
            alert("Registeration successful, please login");

            AsyncStorage.setItem("phoneNumber", "" + phoneNumber);

            this.setState({ error: "", loading: false });
          } else {
            if (data.isEMailExist) {
              this.setState({
                error: "Email address already in use",
                loading: false
              });
            } else if (data.isPhoneExist) {
              this.setState({
                error: "Phone number already in use",
                loading: false
              });
            } else if (data.isUserNameExist) {
              this.setState({
                error: "Sorry, username already in use",
                loading: false
              });
            } else {
              this.setState({
                error: "Sorry, there was an error, please check your details",
                loading: false
              });
            }
          }
        })
        .catch(error => {
          this.setState({ error: error.message, loading: false });
        });
    } else {
      this.setState({
        error: "One or more items are empty. Please fill everything",
        loading: false
      });
    }
  }

  async loginHandler() {
    const { navigate } = this.props.navigation;

    const { email, password } = this.state;

    //var atpos = email.indexOf("@");
    //  var dotpos = email.lastIndexOf(".");

    //end
    if (this.state.username == "" || this.state.password == "") {
      this.setState({
        error: "Please fill both fields",
        loading: false
      });
    } else {
      const { username, password } = this.state;
      this.setState({ error: "", loading: true });

      var details = {
        UserName: username,
        Password: password,
        grant_type: "password"
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch("http://hbx.stripestech.com" + "/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(async data => {
          if (typeof data.access_token !== "undefined") {
            try {
              vv = await AsyncStorage.getItem("keeplogin");

              AsyncStorage.setItem("username", "" + username);
              AsyncStorage.setItem("email", "" + data.email);
              AsyncStorage.setItem("token", "" + data.access_token);
              AsyncStorage.setItem("userId", "" + data.userId);
              AsyncStorage.setItem("globalId", "" + data.globalId);

              if (vv !== null) {
                AsyncStorage.setItem("logincookie", "" + data.access_token);
              }

              this.setState({ error: "", loading: false });
            } catch (e) {
              //silence is golden
              this.setState({ error: e.message, loading: false });
            }

            navigate("Home");
          } else {
            this.setState({ error: data.error_description, loading: false });
          }
        })
        .catch(error => {
          //this.setState({ error: error.message, loading: false });
          this.setState({
            error: "There was a problem logging in..",
            loading: false
          });
        });
    }
  }

  renderButtonOrSpinner() {
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          style={[styles.centering, { height: 80, marginTop: 60 }]}
          size="large"
          color="green"
        />
      );
    } else if (this.state.signup) {
      return (
        <View>
          <Button style={styles.button} onPress={() => this.signupHandler()}>
            <Text style={styles.buttontxt}>SUBMIT</Text>
          </Button>

          <TouchableOpacity
            onPress={() => navigate("Welcome")}
            style={{ marginTop: 7 }}
          >
            <Text style={textisize(14, "red")}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Button style={styles.button} onPress={() => this.loginHandler()}>
            <Text style={styles.buttontxt}>SIGN IN</Text>
          </Button>

          <Text style={textisize(14)}>Not already a member? </Text>

          <TouchableOpacity onPress={() => this.showSignup()}>
            <Text style={textisize(14, "red")}>Register</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  showSignup() {
    const { navigate } = this.props.navigation;
    this.setState({
      signup: "signup"
    });
    navigate("App");
  }

  async pressIcon() {
    if (!this.state.isChecked) {
      //this means someone is checking the button

      AsyncStorage.setItem("keeplogin", "yes please do");
      this.setState({ isChecked: true });
    } else {
      this.setState({ isChecked: false });
      AsyncStorage.removeItem("keeplogin");
    }
  }

  render() {
    if (!this.state.isloading) {
      ltxt = "Click Here";
      const { navigate } = this.props.navigation;
      const { params } = this.props.navigation.state;
      if (this.state.signup == "signup") {
        return (
          <Container style={{ backgroundColor: "white" }}>
            <Content
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              <Grid style={styles.viewcontain}>
                <Row style={styles.top}>
                  <Image
                    source={require("./images/logo2.png")}
                    style={styles.logo}
                  />
                </Row>
                <Row style={styles.login}>
                  <Col>
                    <Text style={textisize(14, null, "600")}>
                      Create An Account
                    </Text>

                    <Form>
                      <Item>
                        <Icon active name="person" style={styles.lico} />
                        <Input
                          autoFocus={true}
                          autoCorrect={false}
                          style={xstyles.formsize}
                          placeholder="Username"
                          value={this.state.displayName}
                          onChangeText={username => this.setState({ username })}
                          returnKeyType="done"
                        />
                      </Item>

                      <Item>
                        <Icon active name="phone" style={styles.lico} />
                        <Input
                          style={xstyles.formsize}
                          placeholder="Phone Number"
                          onChangeText={phoneNumber =>
                            this.setState({ phoneNumber })}
                        />
                      </Item>

                      <Item>
                        <Icon active name="email" style={styles.lico} />
                        <Input
                          style={xstyles.formsize}
                          placeholder="Email"
                          onChangeText={email => this.setState({ email })}
                        />
                      </Item>

                      <Item last>
                        <Icon active name="lock" style={styles.lico} />
                        <Input
                          style={xstyles.formsize}
                          placeholder="Choose a password"
                          secureTextEntry={true}
                          onChangeText={password => this.setState({ password })}
                        />
                      </Item>

                      <Text style={styles.errorTextStyle}>
                        {this.state.error}
                      </Text>
                      {this.renderButtonOrSpinner()}
                    </Form>
                  </Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        );
      } else {
        const { navigate } = this.props.navigation;
        return (
          <Container style={{ backgroundColor: "#ffffff" }}>
            <Content
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              <Grid style={styles.viewcontain}>
                <Row style={styles.top}>
                  <Image
                    source={require("./images/logo2.png")}
                    style={styles.logo}
                  />
                </Row>
                <Row style={styles.login}>
                  <Col>
                    <Form>
                      <Item>
                        <Icon active name="person" style={styles.lico} />
                        <Input
                          placeholder="Username"
                          value={this.state.username}
                          onChangeText={username => this.setState({ username })}
                          style={xstyles.formsize}
                        />
                      </Item>
                      <Item last>
                        <Icon active name="lock" style={styles.lico} />
                        <Input
                          style={xstyles.formsize}
                          placeholder="Password"
                          secureTextEntry={true}
                          value={this.state.password}
                          onChangeText={password => this.setState({ password })}
                        />
                      </Item>

                      <View>
                        <CheckBox
                          center
                          title="Keep me signed in"
                          iconLeft
                          checkedIcon="check-square-o"
                          uncheckedIcon="square-o"
                          checkedColor="red"
                          checked={this.state.isChecked}
                          onIconPress={() => this.pressIcon()}
                          style={{
                            backgroundColor: "#ffffff",
                            marginTop: 15
                          }}
                          textStyle={{
                            fontSize: 11,
                            backgroundColor: "#ffffff"
                          }}
                          containerStyle={{ backgroundColor: "#ffffff" }}
                          style={{ backgroundColor: "white", marginTop: 25 }}
                        />
                      </View>

                      <Text style={styles.errorTextStyle}>
                        {this.state.error}
                      </Text>
                      {this.renderButtonOrSpinner()}
                    </Form>
                  </Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        );
      }
    } else {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.centering, { height: 80, marginTop: 60 }]}
          size="large"
          color="green"
        />
      );
    }

    //end of isloading block
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    alignContent: "center",

    marginTop: 100
  },

  login: {
    alignSelf: "center",
    maxWidth: width * 0.8,
    marginTop: 20
  },
  top: {
    justifyContent: "center"
  },

  button: {
    backgroundColor: "#f26c4d",
    marginTop: 1,
    alignSelf: "center",
    marginBottom: 15,
    height: 34
  },
  buttontxt: {
    color: "white",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 13
  },

  logo: {
    maxWidth: width * 0.7,
    alignSelf: "center"
  },

  lico: {
    color: "#191919",
    fontSize: 25
  },

  headr: {
    backgroundColor: "#f26c4d"
  },
  headtxt: {
    color: "white"
  },

  errorTextStyle: {
    marginVertical: 15,
    fontSize: 16
  },
  adjust: {
    marginBottom: 40
  }
});
