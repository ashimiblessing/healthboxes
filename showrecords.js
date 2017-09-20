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
  Col,
  List,
  ListItem
} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StackNavigator } from "react-navigation";
import xstyles from "./externalstyle";

export default class showRecord extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    animating: true,
    myfetched: "",
    loading: true
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

  async componentWillMount() {
    const { navigate } = this.props.navigation;

    fetch("https://citiwebb.com/healthboxes/recordlisting.php")
      .then(function(response) {
        var recieved = JSON.parse(response._bodyText);

        AsyncStorage.setItem("myRecords", JSON.stringify(recieved));

        //  alert(recieved);
        //  navigate("Showrecord", { rec: recieved });
      })
      .catch(function(err) {
        // Error :(
      });

    //the second typeof
    /*
    try {
      const value = await AsyncStorage.getItem("myRecords");
      if (value !== null) {
        var pp2 = JSON.parse(params.value);
        var plenght2 = pp2.lenght;
        this.setState({
          myfetched: value
        });
      }
    } catch (error) {
      // Error retrieving data
    }

    */
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;

    if (typeof params == "undefined") {
      AsyncStorage.getItem("myRecords").then(items => {
        var myitems = JSON.parse(items);

        this.updateItems(myitems);
      });
    }
  }

  updateItems(myitems) {
    var pp = myitems;

    const { navigate } = this.props.navigation;
    navigate("Showrecord", { parami: myitems });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    if (typeof params !== "undefined") {
      var pp = params.parami;
      //  var plenght = pp.lenght;

      return (
        <Container
          style={{ backgroundColor: "white", justifyContent: "center" }}
        >
          <Header
            style={{ backgroundColor: "#f26c4d" }}
            androidStatusBarColor="#394753"
          >
            <StatusBar barStyle="light-content" />
            <Body>
              <Text style={textisize(20, "white", "500")}>Dashboard</Text>
            </Body>
          </Header>
          <Content>
            <Grid>
              <Row>
                <Col style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      alignSelf: "center",
                      marginTop: 20
                    }}
                  >
                    Uploaded Records
                  </Text>
                  <List
                    dataArray={pp}
                    renderRow={item =>
                      <ListItem>
                        <Text style={styles.normaltxt}>
                          {item}
                        </Text>
                      </ListItem>}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      alignSelf: "center",
                      marginTop: 20
                    }}
                  >
                    Your Prescriptions
                  </Text>

                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 15,
                      alignSelf: "center",
                      marginTop: 20
                    }}
                  >
                    Nothing found.
                  </Text>
                </Col>
              </Row>
              <Row />
              <Row />
            </Grid>
          </Content>
          <Footer style={xstyles.newfootie} />
        </Container>
      );
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
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    alignContent: "center"
  },

  login: {
    marginTop: 20,
    alignItems: "center"
  },
  top: {
    justifyContent: "center"
  },

  button2: {
    backgroundColor: "#f26c4d",
    marginTop: 20,
    alignSelf: "center"
  },
  buttontxt: {
    color: "white",
    alignSelf: "center",
    fontWeight: "600"
  },

  foot: {
    backgroundColor: "#494949"
  },

  head: {
    backgroundColor: "white"
  },

  ico: {
    color: "white",
    fontSize: 27
  },

  uploadicon: {
    maxWidth: 200,
    alignSelf: "center",
    marginTop: 50
  },

  rtxt: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 30
  },
  normaltxt: {
    alignSelf: "center",
    fontWeight: "300"
  },

  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  }
});
