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
  TextInput,
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
import DateTimePicker from "react-native-modal-datetime-picker";

import { StackNavigator } from "react-navigation";

textisize = function(size, color = "#191919", weight = "500") {
  return {
    alignSelf: "center",
    fontSize: size,

    color: color,
    fontWeight: weight,
    marginVertical: 10,
    fontFamily: "OpenSans-Bold"
  };
};

export default class User extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    isDateTimePickerVisible: false,
    phone: "",
    email: "",
    datetime: "",
    name: ""
  };

  loginHandler() {
    const { navigate } = this.props.navigation;
    alert("Profile saved");
    navigate("Home");
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ datetime });
    this._hideDateTimePicker();
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f26c4d" }}
          androidStatusBarColor="#394753"
        >
          <StatusBar barStyle="light-content" />
          <Body>
            <Text style={textisize(20, "white", "500")}>Your Profile</Text>
          </Body>
        </Header>
        <Content>
          <Grid style={styles.viewcontain2}>
            <Row style={styles.contenti2}>
              <Col>
                <Text style={textisize(30, null, "600")}>Settings</Text>
                <Form>
                  <Item stackedLabel>
                    <Label>Name</Label>
                    <Input style={styles.nput} />
                  </Item>

                  <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Item stackedLabel>
                      <Label>DOB</Label>

                      <Input />

                      <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                      />
                    </Item>
                  </TouchableOpacity>
                  <Item stackedLabel>
                    <Label>State/Country</Label>
                    <Input style={styles.nput} />
                  </Item>

                  <Item stackedLabel>
                    <Label>Medical History</Label>
                    <Input style={styles.nput} />
                  </Item>

                  <Item stackedLabel last>
                    <Label>Notes</Label>
                    <Input style={styles.nput} />
                  </Item>
                </Form>

                <Button
                  style={styles.button2}
                  full
                  rounded
                  onPress={() => this.loginHandler()}
                >
                  <Text style={styles.buttontxt}>Save Settings</Text>
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
              <Icon name="account-circle" style={styles.ico} />
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
  viewcontain2: {
    justifyContent: "center",
    backgroundColor: "white"
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
    backgroundColor: "#f26c4d"
  },

  head: {
    backgroundColor: "white"
  },

  ico: {
    color: "white",
    fontSize: 27
  },

  contenti2: {
    alignSelf: "center",
    marginHorizontal: 20,
    backgroundColor: "white"
  },

  nput: {}
});
var styles = StyleSheet.create({
  viewcontain2: {
    justifyContent: "center"
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
    backgroundColor: "#efefef"
  },

  ico: {
    color: "white",
    fontSize: 27
  },

  contenti2: {
    alignSelf: "center",
    marginHorizontal: 20
  },

  nput: {}
});
