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
  TouchableOpacity,
  Platform
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

import RNPaystack from "react-native-paystack";

import { StackNavigator } from "react-navigation";
import { CardIOModule, CardIOUtilities } from "react-native-awesome-card-io";

export default class scanCard extends Component {
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
    loading: false
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      CardIOUtilities.preload();
    }

    const { navigate } = this.props.navigation;

    this.setState({ loading: true });
    //alert(this.state.loading);

    CardIOModule.scanCard()
      .then(async card => {
        // the scanned card

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

        //alert(this.state.cardNumber);
        RNPaystack.chargeCard({
          cardNumber: card.cardNumber + "",
          expiryMonth: card.expiryMonth + "",
          expiryYear: card.expiryYear + "",
          cvc: card.cvv + "",
          email: emailvalue + "",
          amountInKobo: 200000
        })
          .then(response => {
            console.log(response.reference);

            //alert(response.reference);
            // card charged successfully, get reference here

            var furl =
              "https://citiwebb.com/healthboxes/grabauthcode.php?tranxref=" +
              response.reference;

            fetch(furl).then(response => response.json()).then(data => {
              //var recieved = JSON.parse(response._bodyText);
              //var recieved = JSON.stringify(response);

              /*


            fetch(furl).then(response => {
              //var recieved = JSON.parse(response._bodyText);
              var recieved = JSON.stringify(response);
              var status = response.status;


    */

              if (data.message != "404") {
                //alert(status);
                //there is a problem with how this part was written
                //it's working now, but not the ideal solution.
                //we need to check if card was added to database
                //we'll do it later...solving it now .....
                //..solved
                this.setState({ loading: false });

                AsyncStorage.setItem("auth_code", JSON.stringify(data.message));

                alert("Your card was added successfully");

                navigate("Home");
              } else {
                navigate("addCard");
                this.setState({ loading: false });

                //  alert(status);
                alert("There was a problem saving your card");
              }
              //  const { navigate } = this.props.navigation;

              //  navigate("Appoint", { appoint: "book" });

              //  alert(recieved);
            }); //end of fetch
          })
          .catch(error => {
            navigate("addCard");
            this.setState({ loading: false });
            alert(
              "There was a problem saving your card. Please double check your details; " +
                error.message
            );
            console.log(error); // error is a javascript Error object
            console.log(error.message);
            console.log(error.code);
          });

        /*

        navigate("addCard", {
          cardNumber: card.cardNumber,
          expiryMonth: card.expiryMonth,
          expiryYear: card.expiryYear,
          cvc: card.cvv
        });


*/
      })
      .catch(() => {
        // the user cancelled
        navigate("addCard");
        alert(
          "There was an error accessing your phone's camera. Please enter manually"
        );
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

  async componentDidMount() {}

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
        <Content>
          <View style={{ justifyContent: "center" }}>
            <ActivityIndicator
              animating={this.state.loading}
              style={[styles.centering, { height: 80, marginTop: 60 }]}
              size="large"
              color="green"
            />
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
