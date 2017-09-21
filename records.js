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

import Icon from "react-native-vector-icons/FontAwesome";

import { StackNavigator } from "react-navigation";
import xstyles from "./externalstyle";

export default class Record extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  constructor(props) {
    super(props);

    this.state = {
      animating: true,
      myfetched: null,
      loading: false
    };
  }

  getdata() {
    fetch("https://healthboxes.com/healthboxes_apis/recordlisting.php").then(function(
      response
    ) {
      var recieved = JSON.parse(response._bodyText);
    });

    this.setState({
      myfetched: recieved
    });
  }

  componentWillMount() {
    this.setState({
      loading: true
    });
    const { navigate } = this.props.navigation;

    fetch("https://healthboxes.com/healthboxes_apis/recordlisting.php")
      .then(function(response) {
        var recieved = JSON.parse(response._bodyText);

        AsyncStorage.setItem("myRecords", JSON.stringify(recieved));
        //  alert(recieved);
      })
      .catch(function(err) {
        // Error :(
      });
  }

  async componentDidMount() {
    const { navigate } = this.props.navigation;

    try {
      const value = await AsyncStorage.getItem("myRecords");
      if (value !== null) {
        // We have data!!
        /*
        setTimeout(function() {
          navigate("Showrecord", { rec: value });
        }, 5000);

*/
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View>
        <ActivityIndicator
          animating={this.state.loading}
          style={[styles.centering, { height: 80, marginTop: 60 }]}
          size="large"
          color="green"
        />

        <Text style={{ alignSelf: "center", fontWeight: "400", fontSize: 15 }}>
          Loading Records...
        </Text>
      </View>
    );
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
    backgroundColor: "#000000"
  },

  head: {
    backgroundColor: "white"
  },

  ico: {
    color: "red",
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
