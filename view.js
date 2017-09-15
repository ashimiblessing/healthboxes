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

var ImagePicker = require("react-native-image-picker");

import * as firebase from "firebase";

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: "Select Record",

  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class Viewer extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  constructor(props) {
    super(props);

    this.state = {
      fileName: "No image selected",
      animating: false
    };
  }

  async signOut() {
    const { navigate } = this.props.navigation;

    AsyncStorage.removeItem("logincookie");
    await firebase.auth().signOut();

    navigate("Welcome", { message: "Please Login" });
  }

  mycomponenti() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        alert("There was an error");
      } else {
        let sourceuri = response.uri;

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let source = { uri: "data:image/jpeg;base64," + response.data };

        this.setState({
          mysource: source,
          surl: sourceuri,
          fileName: response.fileName,
          animating: true
        });

        let photo = { uri: source.uri };
        let formdata = new FormData();

        //formdata.append("image", response);

        formdata.append("image", {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        });

        fetch("https://citiwebb.com/healthboxes/upload2.php", {
          method: "post",

          body: formdata
        })
          .then(response => {
            alert(response._bodyText);
            this.setState({
              animating: false
            });
            const { navigate } = this.props.navigation;
            navigate("View", { message: JSON.stringify(response) });
          })
          .catch(err => {
            alert(err);
          });

        //alert(response.fileName);
      }
    });
  }

  componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    var messag = params.message;
    if (messag != null) {
      alert(messag);
    }
    return (
      <Container>
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
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, { height: 50 }]}
            size="large"
          />

          <Grid style={styles.viewcontain}>
            <Row style={styles.top}>
              <Image
                source={require("./images/uploadicon2.png")}
                style={styles.uploadicon}
              />
            </Row>

            <Row style={styles.login}>
              <Col>
                <Text style={styles.rtxt}>Upload Health Record</Text>

                <Text style={styles.normaltxt}>
                  {this.state.fileName}
                </Text>

                <Button
                  onPress={this.mycomponenti.bind(this)}
                  style={styles.button2}
                >
                  <Text style={styles.buttontxt}>Select to Upload</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>

        <Footer style={styles.foot}>
          <FooterTab>
            <Button onPress={() => navigate("Home")}>
              <Icon name="home" style={styles.ico} />
            </Button>
            <Button onPress={() => navigate("User")}>
              <Icon name="user-circle" style={styles.ico} />
            </Button>
            <Button onPress={() => this.signOut()}>
              <Icon name="highlight-off" style={styles.ico} />
            </Button>
            <Button onPress={() => alert("HealthBoxes App. Version 1.0")}>
              <Icon name="info" style={styles.ico} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    alignContent: "center",
    backgroundColor: "#efefef"
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
    color: "#efefef",
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
