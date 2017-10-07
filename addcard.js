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
    cardmsg: "",
    loading: "",
    cardNumber2: "",
    expiryMonth2: "",
    expiryYear2: "",
    cvc2: "",
    error: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

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

  async cardHandler() {
    const { navigate } = this.props.navigation;
    this.setState({ loading: true });

    try {
      var emailvalue = await AsyncStorage.getItem("email");
      if (value !== null) {
        // We have data!!
        console.log("email is here, yipes!" + value);
      }
    } catch (error) {
      // Error retrieving data
    }

    const { params } = this.props.navigation.state;

    RNPaystack.chargeCard({
      cardNumber: this.state.cardNumber,
      expiryMonth: this.state.expiryMonth,
      expiryYear: this.state.expiryYear,
      cvc: this.state.cvc,
      email: emailvalue,
      amountInKobo: 1000000
    })
      .then(response => {
        console.log(response.reference);
        //alert(params.details.token);

        fetch(
          "http://hbx.stripestech.com" +
            "/api/HBXCore/VerifyPayment?reference=" +
            response.reference,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + params.details.token
            }
          }
        )
          .then(response => response.json())
          .then(async data => {
            //alert(JSON.stringify(data));
            if (
              typeof data.hbx_result.status !== "undefined" &&
              data.hbx_result.status
            ) {
              try {
                var detai = {
                  UserId: params.details.userid,
                  Name: params.details.name,
                  Address: params.details.address,
                  Date: params.details.datetime,
                  Status: 1
                };

                var formBody = [];
                for (var property in detai) {
                  var encodedKey = encodeURIComponent(property);
                  var encodedValue = encodeURIComponent(detai[property]);
                  formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                fetch(
                  "http://hbx.stripestech.com" + "/api/HBXCore/CreateHomeVisit",
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: "Bearer " + params.details.token
                    },

                    body: formBody
                  }
                )
                  .then(response => response.json())
                  .then(async data => {
                    //alert(JSON.stringify(data));
                    if (
                      typeof data.hbx_response !== "undefined" &&
                      data.hbx_response
                    ) {
                      this.setState({ error: "", loading: false });

                      navigate("Home");
                      Alert.alert(
                        "Confirmation",
                        "Your home visit request has been successfully made"
                      );
                    } else {
                      //alert(JSON.stringify(data));
                      this.setState({
                        error: "There was a problem booking your home visit.",
                        loading: false
                      });
                    }
                  })
                  .catch(error => {
                    alert(JSON.stringify(error.message));
                    this.setState({
                      error: "Sorry, " + error.message,
                      loading: false
                    });
                  });
              } catch (e) {
                //alert(JSON.stringify(e.message));
                this.setState({ error: e.message, loading: false });
              }

              //navigate("requestVisit", { details: params.details });
              //  alert(params.details);
            } else {
              alert(
                "There was an error confirming your payment. Please try again"
              );
              navigate("Home");
            }
          });

        //the catch below is for paystack chargecard
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(
          "There was a problem adding your card. Please double check your details; " +
            error.message
        );
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
          onPress={() => this.cardHandler()}
          style={thestyle.vals}
          disabled={!this.state.valid}
        >
          <Text style={xstyles.buttontxt}>SUBMIT DETAILS</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header
          style={{ backgroundColor: "white" }}
          androidStatusBarColor="#394753"
        >
          <StatusBar barStyle="light-content" />

          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon
                name="keyboard-arrow-left"
                style={{
                  color: "#f26c4d",
                  fontSize: 27
                }}
              />
            </Button>
          </Left>

          <Body>
            <Text>Enter Your Card Details</Text>
          </Body>

          <Right />
        </Header>
        <Content
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: "white" }}
        >
          <View style={{ marginTop: 10 }}>
            <CreditCardInput
              autoFocus={true}
              onChange={this._cardOnChange.bind(this)}
              cardScale={0.7}
            />

            <Text style={textisize(14)}>
              {this.state.cardmsg}
            </Text>

            <Text style={textisize(14)}>
              {this.state.error}
            </Text>

            {this.renderButtonOrSpinner()}
          </View>
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
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 25,

    color: "#181818",
    alignSelf: "center"
  },

  favico: {
    color: "#f26c4d",
    fontSize: 30,
    marginTop: 17
  },

  ico: {
    color: "#efefef",
    fontSize: 27
  }
});
