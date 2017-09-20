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
  WebView,
  StatusBar,
  NativeModules,
  BackHandler
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
import xstyles from "./externalstyle";

import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input";

import RNPaystack from "react-native-paystack";

import { StackNavigator } from "react-navigation";

import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import * as firebase from "firebase";

export default class chargeCustomer extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    loading: "",
    cancall: ""
  };

  constructor(props) {
    super(props);
  }

  async signOut() {
    const { navigate } = this.props.navigation;

    AsyncStorage.removeItem("logincookie");
    await firebase.auth().signOut();

    navigate("Welcome", { message: "Please Login" });
  }

  getdata(furl) {}

  async componentWillMount() {
    this.setState({ loading: true });

    //  const myrn = require("react-native");
    //  alert(JSON.stringify(myrn.NativeModules));

    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    //const dstate=params.parami;
    const myamount = params.parami;
    const myurl = params.furl;

    if (myamount == "2000") {
      try {
        const auth_code = await AsyncStorage.getItem("auth_code");

        const email = await AsyncStorage.getItem("email");
        const amount = myamount + "00";
        if (auth_code !== null) {
          // We have data!!

          var furl =
            "https://citiwebb.com/healthboxes/chargereturncustomer.php?email=" +
            email +
            "&amount=" +
            amount +
            "&auth_code=" +
            JSON.parse(auth_code);
          //  alert(furl);
          fetch(furl).then(response => response.json()).then(data => {
            //var recieved = JSON.parse(response._bodyText);
            //var recieved = JSON.stringify(response);

            //  var status = response.status;

            if (data.message == "Successful") {
              AsyncStorage.setItem("otisanwo", data.reference);

              //    alert("Maga ti sanwoo!");
              //  alert("Payment successful, calling...");

              //call the number
              RNImmediatePhoneCall.immediatePhoneCall("0123456789");
              //alert(data.reference);
              this.setState({ loading: false });
            } else {
              const { navigate } = this.props.navigation;
              //  alert(status);
              this.setState({ loading: false });
              alert(JSON.stringify(data));
              alert(
                "We could not receive your payment. Please try re-confirmimg your card details and attempt the call again"
              );
              navigate("addCard");
            }
          });

          console.log(value);
        } else {
          this.setState({ loading: false });

          alert("I can't seem to find your card details.Please add a card");
          navigate("addCard");
        }
      } catch (error) {
        // Error retrieving data
      }
    } else if (myamount == "10000") {
      try {
        const auth_code = await AsyncStorage.getItem("auth_code");

        const email = await AsyncStorage.getItem("email");
        const amount = myamount + "00";
        if (auth_code !== null) {
          // We have data!!

          var furl =
            "https://citiwebb.com/healthboxes/chargereturncustomer.php?email=" +
            email +
            "&amount=" +
            amount +
            "&auth_code=" +
            JSON.parse(auth_code);

          fetch(furl).then(response => response.json()).then(data => {
            //var recieved = JSON.parse(response._bodyText);
            //var recieved = JSON.stringify(response);

            //  var status = response.status;

            if (data.message == "Successful") {
              AsyncStorage.setItem("otisanwobook", data.reference);

              fetch(furl).then(function(response) {
                const recievedmessage = JSON.parse(response._bodyText);
                //  alert("recievedmessage");
              });

              //    alert("Maga ti sanwoo!");
              //  alert("Payment successful, calling...");

              //call the number
              alert(
                "Home visit booked. We will contact you as soon as possible"
              );
              navigate("Home");
              //alert(data.reference);
              this.setState({ loading: false });
            } else {
              const { navigate } = this.props.navigation;
              //  alert(status);
              this.setState({ loading: false });
              alert(JSON.stringify(data));
              alert(
                "We could not receive your payment. Please try re-confirmimg your card details and attempt the call again"
              );
              navigate("addCard");
            }
          });

          console.log(value);
        } else {
          this.setState({ loading: false });

          alert("I can't seem to find your card details.Please add a card");
          navigate("addCard");
        }
      } catch (error) {
        // Error retrieving data
      }
    } else {
    }

    //alert(JSON.stringify(react-native.NativeModules.RNPaystack));
  }

  callAgainHandler() {
    const { navigate } = this.props.navigation;
  }

  async componentDidMount() {
    const { navigate } = this.props.navigation;

    BackHandler.addEventListener("hardwareBackPress", () => {
      try {
        navigate("Home");
        return true;
      } catch (err) {
        console.debug("Can't pop. Exiting the app...");
        return false;
      }
    });
  }

  componentWillUnmount() {
    console.log("Unmounting app, removing listeners");
    BackHandler.removeEventListener("hardwareBackPress");
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
    } else if (this.state.callcomplete) {
      alert(
        "Your sesion has been marked as complete. Please click the call button to start a new session"
      );

      navigate("Welcome");
    } else {
      return (
        <View style={{ marginTop: 50 }}>
          <Button
            style={xstyles.button}
            full
            rounded
            onPress={() => navigate("Home")}
          >
            <Text style={xstyles.buttontxt}>Close</Text>
          </Button>
        </View>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f26c4d" }}
          androidStatusBarColor="#394753"
        >
          <StatusBar barStyle="light-content" />
          <Body>
            <Text style={textisize(20, "white", "500")}>
              Commencing Payment
            </Text>
          </Body>
        </Header>
        <Content>
          {this.renderButtonOrSpinner()}
        </Content>

        <Footer style={xstyles.newfootie} />
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");
var topsmallheight = height * 0.4;
var tsimg = topsmallheight;

var styles = StyleSheet.create({
  viewcontain: {
    backgroundColor: "#ffffff"
  },

  ctxt: {
    color: "#191919",
    fontWeight: "400",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 25
  },

  carddetails: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 25,

    color: "#181818",
    alignSelf: "center"
  },

  favico: {
    color: "#f26c4d",
    fontSize: 30,
    marginTop: 17
  }
});
