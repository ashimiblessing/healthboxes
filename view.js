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
  StatusBar,
  NavigationActions
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

import { StackNavigator } from "react-navigation";

var ImagePicker = require("react-native-image-picker");

import * as firebase from "firebase";

import xstyles from "./externalstyle";

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

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
      animating: false,
      token: "",
      userid: "",
      name: "",
      address: "",
      phoneNumber: ""
    };
  }

  async componentWillMount() {
    try {
      const toks = await AsyncStorage.getItem("token");
      const userid = await AsyncStorage.getItem("userId");
      const emai = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const addr = await AsyncStorage.getItem("address");
      const phonen = await AsyncStorage.getItem("phoneNumber");

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
  }

  pickerot() {
    const { navigate } = this.props.navigation;
    const { phone, email, datetime, name, address, userid, token } = this.state;
    try {
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.allFiles()]
        },
        (error, res) => {
          // Android

          if (res == null) {
            return;
          }

          console.log(
            res.uri,
            res.type, // mime type
            res.fileName,
            res.fileSize
          );

          this.setState({ animating: true, fileName: res.fileName });
          var photo = {
            uri: res.uri, // CameralRoll Url
            type: res.type,
            name: res.fileName
          };

          var formData = new FormData();
          formData.append("file", photo);

          formData.append(
            "fileContent",
            JSON.stringify({
              fileContent: {
                UserId: userid,
                FileName: res.fileName
              }
            })
          );

          var urll = "http://hbx.stripestech.com" + "/api/HBXCore/UploadFile";
          var xhr = new XMLHttpRequest();
          xhr.open("POST", urll);
          console.log("OPENED", xhr.status);

          xhr.onprogress = function() {
            console.log("LOADING", xhr.status);
          };

          xhr.onload = function() {
            console.log("DONE", xhr.status);
            if (xhr.status == 200) {
              navigate("Home");
              alert("Your file was uploaded successfully");
              //this.setState({ animating: false });
            } else {
              navigate("Home");
              alert("there was a problem uploading your file");
              //this.setState({ animating: false });
            }
          };

          xhr.onerror = function() {
            navigate("Home");
            alert("There was an error. Please check your connection");

            //this.setState({ animating: false });
          };

          xhr.setRequestHeader("Content-Type", "multipart/form-data");
          xhr.send(formData);
        }
      );
    } catch (e) {
      //silence
      alert("hey");
    }
  }

  mycomponenti() {
    const { navigate } = this.props.navigation;

    const { phone, email, datetime, name, address, userid, token } = this.state;

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

        //let photo = { uri: source.uri };
        //let formdata = new FormData();

        var photo = {
          uri: response.uri, // CameralRoll Url
          type: "image/jpeg",
          name: "photo.jpg"
        };

        var formData = new FormData();
        formData.append("file", photo);

        formData.append(
          "fileContent",
          JSON.stringify({
            fileContent: {
              UserId: "935371c9-9b20-41fd-b216-005f3204953c",
              FileName: "Blessing2"
            }
          })
        );

        var urll = "http://hbx.stripestech.com" + "/api/HBXCore/UploadFile";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", urll);
        console.log("OPENED", xhr.status);

        xhr.onprogress = function() {
          console.log("LOADING", xhr.status);
        };

        xhr.onload = function() {
          console.log("DONE", xhr.status);
          if (xhr.status == 200) {
            navigate("Home");
            alert("Your file was uploaded successfully");
          } else {
            navigate("Home");
            alert("there was a problem uploading your file");
          }
        };

        xhr.onerror = function() {
          navigate("Home");
          alert("There was an error. Please check your connection");

          //this.setState((animating: false));
        };

        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(formData);
      }
    });
  }

  renderButtonOrSpinner() {
    if (this.state.animating) {
      return (
        <ActivityIndicator
          animating={this.state.animating}
          style={[
            styles.centering,
            { height: 80, marginTop: 60, marginBottom: 50 }
          ]}
          size="large"
          color="green"
        />
      );
    }

    return (
      <Button onPress={() => this.pickerot()} style={styles.button2}>
        <Text style={styles.buttontxt}>Select to Upload</Text>
      </Button>
    );
  }

  componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    var messag = params.message;
    if (messag != null) {
      alert(messag);
    }
    return (
      <Container>
        <Header
          androidStatusBarColor="#394753"
          style={{ backgroundColor: "white" }}
        >
          <StatusBar barStyle="light-content" />

          <Left>
            <Button transparent onPress={() => navigate("Home")}>
              <Icon name="keyboard-arrow-left" style={styles.ico} />
            </Button>
          </Left>

          <Body>
            <Text>Upload Record</Text>
          </Body>
          <Right />
        </Header>

        <Content
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: "white" }}
        >
          <Grid style={styles.viewcontain}>
            <Row style={styles.top}>
              <Image
                source={require("./images/uploadicon21.png")}
                style={styles.uploadicon}
              />
            </Row>

            <Row style={styles.login}>
              <Col>
                <Text style={styles.rtxt}>Upload Health Record</Text>

                <Text style={styles.normaltxt}>
                  {this.state.fileName}
                </Text>

                {this.renderButtonOrSpinner()}
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer style={xstyles.newfootie} />
      </Container>
    );
  }
}

var { height, width } = Dimensions.get("window");

var styles = StyleSheet.create({
  viewcontain: {
    alignContent: "center",
    backgroundColor: "#ffffff"
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
    alignSelf: "center",
    marginBottom: 40
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
    maxWidth: 120,
    maxHeight: 120,
    alignSelf: "center",
    marginTop: 80
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
