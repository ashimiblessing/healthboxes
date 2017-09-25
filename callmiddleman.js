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
  StatusBar
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
import Modal from "react-native-modal";
import xstyles from "./externalstyle";

import { StackNavigator } from "react-navigation";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import * as firebase from "firebase";

export default class callMiddleMan extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    isModalVisible: false,
    loading: false,
    usr: ""
  };

  async signOut() {
    const { navigate } = this.props.navigation;

    AsyncStorage.removeItem("logincookie");
    await firebase.auth().signOut();

    navigate("Welcome", { message: "Please Login" });
  }

  _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

  async componentDidMount() {
    const { navigate } = this.props.navigation;

    this.setState({ loading: true });

    try {
      const value = await AsyncStorage.getItem("otisanwo");
      if (value !== null) {
        //that means he has paid before, check if the pay is still valid

        var furl =
          "http://app.healthboxes.com/validateauthpayment.php?ref=" +
          value;

        fetch(furl).then(response => response.json()).then(data => {
          //var recieved = JSON.parse(response._bodyText);
          //var recieved = JSON.stringify(response);

          //  alert(JSON.stringify(data));
          if (data.status == "true") {
            //  navigate("callMiddleMan", { parami: "true" });
            this.setState({ loading: false });

            RNImmediatePhoneCall.immediatePhoneCall("0123456789");
          } else {
            //his payment is not valid

            //  navigate("chargeCustomer", { parami: who });

            this.setState({ isModalVisible: true });
            this.setState({ loading: false });
          }
        });

        // We have data!!
        console.log(value);
      } else {
        //he hasn't paid before. Charge him!
        const { navigate } = this.props.navigation;
        this.setState({ isModalVisible: true });
        this.setState({ loading: false });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  handleCall() {
    this.setState({ isModalVisible: false });
    const { navigate } = this.props.navigation;

    navigate("chargeCustomer", { parami: "2000" });
  }

  componentDidMountest() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    const myparam = params.parami;

    if (myparam == "true") {
      RNImmediatePhoneCall.immediatePhoneCall("+2349091111129");
    } else {
      navigate("Home");
    }
  }

  renderModalOrSpinner() {
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
    }

    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackButtonPress={this._hideModal}
        onBackdropPress={this._hideModal}
      >
        <View style={styles.modalchild}>
          <Text style={textisize(20)}>Call a Doctor</Text>

          <Text style={textisize(15)}>
            Please that you will be charged NGN 2000 for this session
          </Text>

          <Button style={styles.callbutton} onPress={() => this.handleCall()}>
            <Text style={styles.cbuttontxt}>Continue</Text>
          </Button>
        </View>
        <Button style={styles.closebutt} onPress={() => this._hideModal()}>
          <Text style={{ color: "#191919", fontWeight: "600" }}>close</Text>
        </Button>
      </Modal>
    );
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
            <Text style={textisize(20, "white", "500")}>Please wait...</Text>
          </Body>

          <Right />
        </Header>
        <Content>
          <View>
            {this.renderModalOrSpinner()}
          </View>

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
        </Content>
        <Footer style={xstyles.newfootie} />
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");
var topsmallheight = height * 0.35;
var tsimg = topsmallheight;

var styles = StyleSheet.create({
  viewcontain: {
    backgroundColor: "#ffffff"
  },

  topsmall: {
    height: height * 0.35,
    backgroundColor: "white"
  },

  figurecontain1: {
    height: 30,
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 0,
    width: width
  },

  figurecontain2: {
    height: 30,
    backgroundColor: "green",
    position: "absolute",
    bottom: 30,
    width: width
  },

  thefigure: {
    fontWeight: "600",
    fontSize: 20
  },
  bottom: {
    backgroundColor: "white",
    alignSelf: "center",
    maxWidth: width * 0.8,
    marginTop: 20,
    height: height * 0.5
  },
  ctxt: {
    color: "#191919",
    fontWeight: "400",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 25
  },

  box: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: width * 0.015
  },
  headicon: {
    fontSize: 40,
    color: "white",
    alignSelf: "center"
  },

  ico: {
    color: "#efefef",
    fontSize: 27
  },
  juxt: {
    justifyContent: "center",
    maxWidth: width,
    alignItems: "center"
  },

  foot: {
    backgroundColor: "#494949"
  },
  dashimg: {
    maxWidth: width,
    height: tsimg
  },

  callbutton: {
    backgroundColor: "#f26c4d",
    marginTop: 20,
    marginTop: 10,
    width: 200,
    alignSelf: "center",
    justifyContent: "center"
  },
  cbuttontxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "600"
  },

  modalchild: {
    width: width * 0.7,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    height: undefined,
    padding: 22
  },

  closebutt: {
    width: 100,
    backgroundColor: "#efefef",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30
  },

  dname: {
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
