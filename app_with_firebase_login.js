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
import * as firebase from "firebase";

import HomeScreen from "./homescreen";
import User from "./user";
import Viewer from "./view";
import Record from "./records";
import showRecord from "./showrecords";
import Appointments from "./appointments";
import addCard from "./addcard";
import chargeCustomer from "./chargecustomer";
import callMiddleMan from "./callmiddleman";
import requestVisit from "./requestvisit";
import scanCard from "./scanCard";
import SideBar from "./sidebar";

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
    displayName: "",
    phoneNumber: "",
    error: "",
    loading: false,
    signup: ""
  };

  async componentWillMount() {
    const { navigate } = this.props.navigation;
    if (firebase.apps.length === 0) {
      // Initialize Firebase
      const { navigate } = this.props.navigation;
      firebase.initializeApp({
        apiKey: "AIzaSyDndyT_49VEIftlHTikuyS-ciYfyPtznpI",
        authDomain: "health-boxes.firebaseapp.com",
        databaseURL: "https://health-boxes.firebaseio.com",
        projectId: "health-boxes",
        storageBucket: "",
        messagingSenderId: "715439203741"
      });
    }

    /*



    var user = firebase.auth().currentUser;

    if (user) {
      navigate("Home", { message: "Login Successful" });
      // User is signed in.
    } else {
      //remove saved cookie, controversial?

      AsyncStorage.removeItem("logincookie");

      // No user is signed in.
    }

    /*

    try {
      const value = await AsyncStorage.getItem("logincookie");
      if (value !== null) {
        navigate("Home", { message: "Login Successful" });
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
      //alert("Sorry, cannot access storage");
    }




    // Get a reference to the database service
    var database = firebase.database();


    */
  }

  signupHandler() {
    const { navigate } = this.props.navigation;
    this.setState({ error: "", loading: true });
    const { email, password, displayName, phoneNumber } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        //alert("Registration Successful");

        try {
          var user = firebase.auth().currentUser;

          user
            .updateProfile({
              displayName: displayName
            })
            .then(async function() {
              await AsyncStorage.setItem("logincookie", "I like to save it.");
              await AsyncStorage.setItem("email", "" + email);
              await AsyncStorage.setItem("displayName", "" + displayName);

              navigate("Home");

              this.setState({ error: "", loading: false });

              // Update is now successful.
            })
            .catch(function(error) {
              // An error happened.
              alert(error);
              this.setState({ error: "", loading: false });
            });
        } catch (error) {
          // Error saving data
          alert(error);
        }
      })
      .catch(error => {
        alert(error);
        this.setState({
          error: "" + error,
          loading: false
        });
      });
  }

  async loginHandler() {
    const { navigate } = this.props.navigation;

    this.setState({ error: "", loading: true });
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        //login successful or not

        //logging in..
        try {
          await AsyncStorage.removeItem("logincookie");
          await AsyncStorage.removeItem("email");

          await AsyncStorage.setItem("logincookie", "I like to save it.");
          await AsyncStorage.setItem("email", "" + email);
          //  navigate("Home", { message: "Login Successful" });
        } catch (error) {
          // Error saving data
          //alert(error);
        }

        //grab the auth code

        var furl =
          "http://app.healthboxes.com/showauthcode.php?email=" + email;

        fetch(furl).then(response => response.json()).then(data => {
          //var recieved = JSON.parse(response._bodyText);
          //var recieved = JSON.stringify(response);

          //  var status = response.status;

          if (data.auth_code) {
            AsyncStorage.setItem("auth_code", JSON.stringify(data.auth_code));

            //  alert("Maga ti sanwoo!");

            navigate("Home");
            this.setState({ error: "", loading: false });
          } else {
            //  alert(status);
            AsyncStorage.removeItem("auth_code");
            //  alert("Please add a card");
            navigate("Home");
            this.setState({ error: "", loading: false });
          }
        });
      })
      .catch(error => {
        this.setState({
          error: "Authentication failed.  " + error,
          loading: false
        });
        alert(error);
        //Login was not successful, let's create a new account
      });
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
        <View style={styles.adjust}>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => this.signupHandler()}
          >
            <Text style={styles.buttontxt}>SIGN ME UP</Text>
          </Button>

          <TouchableOpacity
            onPress={() => navigate("Welcome")}
            style={{ marginTop: 7 }}
          >
            <Text style={textisize(18, "red")}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.adjust}>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => this.loginHandler()}
          >
            <Text style={styles.buttontxt}>SIGN IN</Text>
          </Button>

          <Text style={textisize(17)}>Not already a member? </Text>

          <TouchableOpacity onPress={() => this.showSignup()}>
            <Text style={textisize(18, "red")}>Signup Now</Text>
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

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    if (this.state.signup == "signup") {
      return (
        <Container style={{ backgroundColor: "#efefef" }}>
          <Header style={styles.headr} androidStatusBarColor="#394753">
            <StatusBar barStyle="light-content" />
            <Left>
              <Text style={styles.headtxt}>WELCOME</Text>
            </Left>
          </Header>
          <Content>
            <Grid style={styles.viewcontain}>
              <Row style={styles.top}>
                <Image
                  source={require("./images/logo2.png")}
                  style={styles.logo}
                />
              </Row>
              <Row style={styles.login}>
                <Col>
                  <Text style={textisize(20, null, "600")}>Get An Account</Text>

                  <Form>
                    <Item>
                      <Icon active name="person" style={styles.lico} />
                      <Input
                        placeholder="Nickname"
                        value={this.state.displayName}
                        onChangeText={displayName =>
                          this.setState({ displayName })}
                      />
                    </Item>

                    <Item>
                      <Icon active name="email" style={styles.lico} />
                      <Input
                        placeholder="Email "
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                      />
                    </Item>

                    <Item last>
                      <Icon active name="lock" style={styles.lico} />
                      <Input
                        placeholder="Choose a password"
                        secureTextEntry={true}
                        value={this.state.password}
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
        <Container style={{ backgroundColor: "#efefef" }}>
          <Header style={styles.headr} androidStatusBarColor="#394753">
            <StatusBar barStyle="light-content" />
            <Left>
              <Text style={styles.headtxt}>WELCOME</Text>
            </Left>
          </Header>
          <Content>
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
                      <Icon active name="email" style={styles.lico} />
                      <Input
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                      />
                    </Item>
                    <Item last>
                      <Icon active name="lock" style={styles.lico} />
                      <Input
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.password}
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
    }
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    alignContent: "center",

    marginTop: 150
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
    marginTop: 20
  },
  buttontxt: {
    color: "white",
    alignSelf: "center",
    fontWeight: "600"
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

const HealthBoxes = StackNavigator({
  Welcome: { screen: Welcome },
  Home: { screen: HomeScreen },
  User: { screen: User },
  Viewer: { screen: Viewer },
  Record: { screen: Record },
  Showrecord: { screen: showRecord },
  Appoint: { screen: Appointments },
  addCard: { screen: addCard },
  chargeCustomer: { screen: chargeCustomer },
  callMiddleMan: { screen: callMiddleMan },
  requestVisit: { screen: requestVisit },
  scanCard: { screen: scanCard }
});

AppRegistry.registerComponent("HealthBoxes", () => HealthBoxes);
