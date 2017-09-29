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
  Label
} from "native-base";

import { Grid, Row, Col } from "react-native-easy-grid";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StackNavigator, DrawerNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

import Welcome from "./app";
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

export default class splashScreeni extends Component {
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

  async componentDidMount() {
    const { navigate } = this.props.navigation;

    setTimeout(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Welcome" })]
      });
      this.props.navigation.dispatch(resetAction);
    }, 1500);
  }

  componentWillUnmount() {}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <Container style={styles.viewcontain}>
        <View>
          <Grid>
            <Row />
            <Row style={styles.box}>
              <Image
                source={require("./images/logo2.png")}
                style={styles.splimg}
              />
            </Row>

            <Row />
          </Grid>
        </View>
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white"
  },
  box: {},

  splimg: {
    maxWidth: 300,
    marginTop: 70
  }
});

const HealthBoxes = StackNavigator({
  Splash: { screen: splashScreeni },
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
