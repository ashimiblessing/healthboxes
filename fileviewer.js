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
import RNFetchBlob from "react-native-fetch-blob";

export default class fileViewer extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    const parami = params.uri;

    var stre = parami.split(".");
    var len1 = stre.length;

    var ext = "." + stre[len1 - 1];

    var date = new Date();
    var url = parami;

    //const { fs } = RNFetchBlob;
    let PictureDir = RNFetchBlob.fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,

        path:
          PictureDir +
          "/image_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: "HealthBoxes record"
      }
    };
    RNFetchBlob.config(options).fetch("GET", url).then(res => {
      this.setState({ loaded: true });
      Alert.alert("Confirmation", "Your file was downloaded successfully");
      goBack();
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    const parami = params.uri;

    if (this.state.loaded) {
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
              <Text>Document Download</Text>
            </Body>

            <Right />
          </Header>

          <Content>
            <Text>PLease check notifications for file</Text>
          </Content>
        </Container>
      );
    } else {
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

          <Content>
            <Text>Your file is downloading</Text>

            <ActivityIndicator
              animating={!this.state.loaded}
              style={[styles.centering, { height: 80, marginTop: 60 }]}
              size="large"
              color="green"
            />
          </Content>
        </Container>
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
