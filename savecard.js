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
  NativeModules
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

export default class addCard extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    valid: false,
    cardmsg: ""
  };

  constructor(props) {
    super(props);
  }

  getdata() {
    fetch("http://app.healthboxes.com/recordlisting.php").then(function(
      response
    ) {
      var recieved = JSON.parse(response._bodyText);
    });

    this.setState({
      myfetched: recieved
    });
  }

  componentWillMount() {
    //  const myrn = require("react-native");
    //  alert(JSON.stringify(myrn.NativeModules));

    const { navigate } = this.props.navigation;
    //alert(JSON.stringify(react-native.NativeModules.RNPaystack));
  }

  _cardOnChange(form) {
    //  const { navigate } = this.props.navigation;
    if (form.valid) {
      const expiry = form.values.expiry.split("/");
      cardno = form.values.number.replace(/\s/g, "");
      //alert(cardno);

      this.setState({
        cardNumber: cardno,
        expiryMonth: expiry[0],
        expiryYear: expiry[1],
        cvc: form.values.cvc,
        valid: true,
        cardmsg: ""
      });
    } else {
      this.setState({
        valid: false,
        cardmsg: "Invalid details"
      });
    }
  }

  cardHandler() {
    //alert(this.state.cardNumber);
    RNPaystack.chargeCard({
      cardNumber: this.state.cardNumber,
      expiryMonth: this.state.expiryMonth,
      expiryYear: this.state.expiryYear,
      cvc: this.state.cvc,
      email: "aseyori.blessing@gmail.com",
      amountInKobo: 150000
    })
      .then(response => {
        console.log(response.reference);

        alert(response.reference);
        // card charged successfully, get reference here
      })
      .catch(error => {
        alert(error);

        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      });
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          style={[styles.centering, { height: 80, marginTop: 60 }]}
          size="large"
          color="green"
        />
      );
    } else if (!this.state.valid) {
      var thestyle = { vals: xstyles.disabledbutton };
    } else {
      var thestyle = { vals: xstyles.button };
    }

    return (
      <View>
        <Button
          full
          rounded
          onPress={() => this.cardHandler()}
          style={thestyle.vals}
          disabled={!this.state.valid}
        >
          <Text style={xstyles.buttontxt}>SUBMIT DETAILS</Text>
        </Button>
      </View>
    );
  }

  async componentDidMount() {
    const { navigate } = this.props.navigation;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f26c4d" }}
          androidStatusBarColor="#394753"
        >
          <StatusBar barStyle="light-content" />

          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="keyboard-arrow-left" style={styles.ico} />
            </Button>
          </Left>
          <Body>
            <Text style={textisize(20, "white", "500")}>Add a Card</Text>
          </Body>

          <Right />
        </Header>
        <Content
  keyboardShouldPersistTaps="always"
  keyboardDismissMode="on-drag">
          <Text style={styles.carddetails}>Enter Your Card Details</Text>

          <CreditCardInput
            autoFocus={true}
            onChange={this._cardOnChange.bind(this)}
          />

          <Text style={textisize(14)}>
            {this.state.cardmsg}
          </Text>

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
