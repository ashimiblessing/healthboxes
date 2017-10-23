/**
 * React Native App
 * By Ashimi Blessing
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
  TouchableOpacity,
  Linking,
  StatusBar,
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
  Col,
  Drawer
} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StackNavigator, DrawerNavigator } from "react-navigation";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import { Divider } from "react-native-elements";

import Modal from "react-native-modal";

import SideBar from "./sidebar";

import User from "./user";
import xstyles from "./externalstyle";

boxingStyle = function(myColor) {
  return {
    justifyContent: "center",

    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: myColor,
    flexDirection: "column",
    marginBottom: 10
  };
};

textisize = function(size, color = "#191919", weight = "500") {
  return {
    alignSelf: "center",
    fontSize: size,

    color: color,
    fontWeight: weight,
    marginVertical: 10
  };
};

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    isModalVisible: false,
    loading: false,
    usr: ""
  };

  _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

  async callHandler(who) {}

  async signOut() {
    const { navigate } = this.props.navigation;

    AsyncStorage.removeItem("logincookie");

    navigate("Welcome", { message: "Please Login" });
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      try {
        //BackHandler.exitApp();
        //return true;
        //  alert(this.props.navigation.state.routeName);

        /*
        if (this.props.navigation.state.routeName === "Home") {
          // Do something
          BackHandler.exitApp();
        } else {
          this.props.navigation.navigate("Home");
          return true;
        }


        */

        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
          this.navigator.pop();
          return true;
        }

        return false;
      } catch (err) {
        console.log("Can't pop. Exiting the app... yikes!");
        return false;
      }
    });
  }

  componentWillUnmount() {
    console.log("Unmounting app, removing listeners");
    BackHandler.removeEventListener("hardwareBackPress");
  }

  async componentWillMount() {
    var user = "User";

    try {
      const vals = await AsyncStorage.getItem("username");
      const namee = await AsyncStorage.getItem("name");
      const gid = await AsyncStorage.getItem("globalId");

      if (namee != null) {
        //const addcomma = namee.replace(" ", ", ");

        this.setState({ usr: "" + namee });
      } else if (vals != null) {
        this.setState({ usr: "" + vals });
      } else {
        this.setState({ usr: "Welcome!" });
      }
    } catch (error) {
      this.setState({ usr: "Welcome!" });
    }
  }

  async shotiSanwo(action) {
    const { navigate } = this.props.navigation;
    try {
      const value = await AsyncStorage.getItem("auth_code");
      if ("crap" == "crap") {
        // We have data!!
        console.log(value);

        if (action == "call") {
          var gowhere = "";

          RNImmediatePhoneCall.immediatePhoneCall("+2349091111129");
        } else if (action == "appointment") {
          var gowhere = "";

          navigate("Appoint", { appoint: "book" });
        } else if (action == "homevisit") {
          navigate("requestVisit");
        } else if (action == "records") {
          this.setState({ isModalVisible: false });
          var gowhere = "";

          navigate("Viewer", { parami: "account" });
        } else {
          console.log("Oni yeye. Oo mun kankan");
        }

        //end of if in try block
      } else {
        Alert.alert(
          "Add a Payment",
          "To continue enjoying HealthBoxes you need to add payment method.The cost is NGN 2000 a year. Do you want to continue?",
          [
            {
              text: "Maybe Later",
              onPress: () => console.log("OK Pressed")
            },

            { text: "Let's Do It", onPress: () => navigate("addCard") }
          ],
          { cancelable: false }
        );

        //  alert("Yes, oo tii sanwo mehn");
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  handleShowRecord() {
    this.setState({ isModalVisible: false });
    const { navigate } = this.props.navigation;
    navigate("Showrecord");
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    closeDrawer = () => {
      this.drawer._root.close();
    };

    whereto = addr => {
      this.props.navigation.navigate(addr);
    };

    openDrawer = () => {
      this.drawer._root.open();
    };

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.navigator} ref="foo" />}
        onClose={() => closeDrawer()}
      >
        <Container style={styles.viewcontain}>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackButtonPress={this._hideModal}
            onBackdropPress={this._hideModal}
          >
            <View style={styles.modalchild}>
              <Text style={textisize(20)}>Select Option</Text>

              <Button
                style={styles.callbutton}
                onPress={() => this.shotiSanwo("records")}
              >
                <Text style={styles.cbuttontxt}>Upload Record</Text>
              </Button>

              <Button
                style={styles.callbutton}
                onPress={() => this.handleShowRecord()}
              >
                <Text style={styles.cbuttontxt}>View Record</Text>
              </Button>
            </View>
            <Button style={styles.closebutt} onPress={() => this._hideModal()}>
              <Text style={{ color: "#191919", fontWeight: "600" }}>close</Text>
            </Button>
          </Modal>

          <Content
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
          >
            <Header
              style={{ backgroundColor: "#ffffff", width: 0, height: 0 }}
              androidStatusBarColor="#394753"
            />

            <Grid>
              <Row style={styles.topsmall}>
                <Col>
                  <Image
                    source={require("./imgsfresh/rename.png")}
                    style={styles.dashimg}
                  />
                </Col>
              </Row>

              <Row style={xstyles.smallheight}>
                <Left>
                  <Button transparent onPress={() => openDrawer()}>
                    <Icon name="view-headline" style={xstyles.ico2} />
                  </Button>
                </Left>

                <Text style={xstyles.newtxt2}>
                  {this.state.usr}
                </Text>
              </Row>

              <Row style={{ alignSelf: "center" }}>
                <View style={xstyles.hr} />
              </Row>

              <Row size={1} style={styles.juxt}>
                <Col style={styles.box}>
                  <TouchableOpacity
                    onPress={() => this.shotiSanwo("call")}
                    style={styles.tciti}
                  >
                    <Image
                      source={require("./imgsfresh/speech-bubble.png")}
                      style={xstyles.ticon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.shotiSanwo("call")}
                    style={styles.tciti2}
                  >
                    <Text style={styles.ctxt}>
                      CALL A {"\n"} DOCTOR
                    </Text>
                  </TouchableOpacity>
                </Col>

                <Col style={styles.box}>
                  <TouchableOpacity
                    onPress={() => this.shotiSanwo("appointment")}
                    style={styles.tciti}
                  >
                    <Image
                      source={require("./imgsfresh/people.png")}
                      style={xstyles.ticon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.tciti2}
                    onPress={() => this.shotiSanwo("appointment")}
                  >
                    <Text style={styles.ctxt}>
                      SPECIALISTS {"\n"} APPOINTMENT
                    </Text>
                  </TouchableOpacity>
                </Col>

                <Col style={styles.box}>
                  <TouchableOpacity
                    onPress={() => this.shotiSanwo("homevisit")}
                    style={styles.tciti}
                  >
                    <Image
                      source={require("./imgsfresh/syringe.png")}
                      style={xstyles.ticon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate("requestVisit")}
                    style={styles.tciti2}
                  >
                    <Text style={styles.ctxt}>
                      REQUEST {"\n"} HOME VISIT
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Row>

              <Row size={1} style={styles.juxt}>
                <Col style={styles.box}>
                  <TouchableOpacity
                    onPress={() => navigate("otcRefill")}
                    style={styles.tciti}
                  >
                    <Image
                      source={require("./imgsfresh/medical.png")}
                      style={xstyles.ticon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate("otcRefill")}
                    style={styles.tciti2}
                  >
                    <Text style={styles.ctxt}>
                      PHARMACY {"\n"} & OTC REFILLS
                    </Text>
                  </TouchableOpacity>
                </Col>

                <Col style={styles.box}>
                  <TouchableOpacity
                    onPress={() => this._showModal()}
                    style={styles.tciti}
                  >
                    <Image
                      source={require("./imgsfresh/briefcase.png")}
                      style={xstyles.ticon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._showModal()}
                    style={styles.tciti2}
                  >
                    <Text style={styles.ctxt}>
                      REVIEW {"\n"} MY RECORDS
                    </Text>
                  </TouchableOpacity>
                </Col>

                <Col style={styles.box}>
                  <TouchableOpacity
                    onPress={() => navigate("User")}
                    style={styles.tciti}
                  >
                    <Image
                      source={require("./imgsfresh/usermale.png")}
                      style={xstyles.ticon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate("User")}
                    style={styles.tciti2}
                  >
                    <Text style={styles.ctxt}>
                      MY{"\n"} PROFILE
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

var { height, width } = Dimensions.get("window");
var topsmallheight = height * 0.48;
var tsimg = topsmallheight;

var styles = StyleSheet.create({
  viewcontain: {
    backgroundColor: "#ffffff"
  },

  topsmall: {
    height: tsimg,
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
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 10.5,
    marginTop: 10
  },

  box: {
    marginTop: 1,
    marginBottom: 10,

    marginHorizontal: 0,
    maxWidth: width * 0.27
  },
  headicon: {
    fontSize: 30,
    color: "white",
    alignSelf: "center"
  },

  ico: {
    color: "#efefef",
    fontSize: 27
  },
  juxt: {
    alignSelf: "center",
    marginHorizontal: 10
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
  },

  tinklerow: {
    marginHorizontal: width * 0.4
  },

  tciti: {
    paddingTop: 20,
    alignSelf: "center"
  },
  tciti2: { justifyContent: "center" }
});
