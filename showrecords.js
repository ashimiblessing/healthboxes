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
  Col,
  List,
  ListItem
} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StackNavigator } from "react-navigation";
import xstyles from "./externalstyle";

var RNFS = require("react-native-fs");
var SavePath =
  Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

export default class showRecord extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
      myfetched: "",
      loading: true,
      crap: [],
      mtitems: [],
      loaded: false
    };
  }

  handlePress = thefile => {
    OpenFile.openDoc(
      [
        {
          url: thefile,
          fileName: "sample"
        }
      ],
      (error, url) => {
        if (error) {
          console.error(error);
        } else {
          console.log(url);
        }
      }
    );
  };

  async componentWillMount() {
    const { navigate } = this.props.navigation;

    try {
      //AsyncStorage.setItem("myRecords", "");
      var toks = await AsyncStorage.getItem("token");
      var userid = await AsyncStorage.getItem("userId");
      var emai = await AsyncStorage.getItem("email");
      var name = await AsyncStorage.getItem("name");
      var addr = await AsyncStorage.getItem("address");
      var phonen = await AsyncStorage.getItem("phoneNumber");

      if (
        toks !== "" ||
        userid !== "" ||
        name !== "" ||
        email !== "" ||
        addr !== "" ||
        phonen !== ""
      ) {
        this.setState({
          token: toks,
          userid: userid,
          email: emai,
          name: name,
          address: addr,
          phoneNumber: phonen
        });
      }
    } catch (e) {
      //silence is golden
    }

    fetch(
      "http://hbx.stripestech.com" +
        "/api/HBXCore/GetFile/" +
        this.state.userid,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + toks
        }
      }
    )
      .then(response => response.json())
      .then(async data => {
        //var recieved = JSON.parse(data);

        //AsyncStorage.setItem("myRecords", JSON.stringify(data.hbx_result));
        this.setState({ mtitems: data.hbx_result, loaded: true });
      })
      .catch(function(err) {
        // Error :(
      });

    //this.setState({ loaded: true });
  }

  async componentDidMount() {
    /*

    const { params } = this.props.navigation.state;
    this.setState({ loaded: false });
    try {
      const itt = await AsyncStorage.getItem("myRecords");

      this.setState({ crap: JSON.parse(itt), loaded: true });
    } catch (e) {
      //
    }


    */
  }

  renderImage(url) {
    str = url.split(".");

    //alert("http://hbx.stripestech.com/fileupload/" + url);
    const { navigate } = this.props.navigation;
    navigate("fileViewer", {
      uri: "http://hbx.stripestech.com/fileupload/" + url
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    if (this.state.loaded) {
      var aa = this.state.mtitems;
      var sliced = aa.slice(1, 15);

      return (
        <Container
          style={{ backgroundColor: "white", justifyContent: "center" }}
        >
          <Header
            style={{ backgroundColor: "#ffffff" }}
            androidStatusBarColor="#394753"
          >
            <StatusBar barStyle="light-content" />

            <Left>
              <Button transparent onPress={() => navigate("Home")}>
                <Icon name="keyboard-arrow-left" style={styles.ico} />
              </Button>
            </Left>
            <Body>
              <Text>Uploaded Records</Text>
            </Body>

            <Right />
          </Header>
          <Content
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
          >
            <Grid>
              <Row>
                <List
                  dataArray={sliced}
                  renderRow={item =>
                    <ListItem>
                      <Col
                        style={{ marginLeft: 10, justifyContent: "flex-start" }}
                        size={6}
                      >
                        <Text style={styles.normaltxt}>
                          {item.FileName}
                        </Text>
                      </Col>

                      <Col size={1}>
                        <Icon
                          name="file-download"
                          style={{ fontSize: 23, color: "red" }}
                          onPress={() => this.renderImage(item.FileUrl)}
                        />
                      </Col>
                    </ListItem>}
                />
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
    color: "#f26c4d",
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
    fontWeight: "300",
    fontSize: 13
  },

  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  }
});
