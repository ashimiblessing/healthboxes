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

import xstyles from "./externalstyle";

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
    phoneNumber: "",
    email: "",
    address: "",
    name: "",
    token: "",
    userid: "",
    username: ""
  };

  async componentWillMount() {
    try {
      const toks = await AsyncStorage.getItem("token");
      const userid = await AsyncStorage.getItem("userId");
      const emai = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const addr = await AsyncStorage.getItem("address");
      const phonen = await AsyncStorage.getItem("phoneNumber");
      const usern = await AsyncStorage.getItem("username");

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
          phoneNumber: phonen,
          username: usern
        });
      }
    } catch (e) {
      //silence is golden
    }
  }

  async loginHandler() {
    this.setState({ error: "", loading: true });

    const { navigate } = this.props.navigation;
    const { name, email, phoneNumber, address, userid, token } = this.state;

    try {
      var details = {
        Id: userid,
        Name: name,
        Email: email,
        PhoneNumber: phoneNumber,
        Address: address
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch("http://hbx.stripestech.com" + "/api/Account/UpdateUser", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        },

        body: formBody
      })
        .then(response => response.json())
        .then(async data => {
          if (data.hbx_response) {
            AsyncStorage.setItem("phoneNumber", "" + phoneNumber);
            AsyncStorage.setItem("address", "" + address);
            AsyncStorage.setItem("name", "" + name);
            AsyncStorage.setItem("email", "" + email);

            this.setState({ error: "", loading: false });

            navigate("Home");
            alert("Profile Saved Successfully");
          } else {
            //  alert(JSON.stringify(data));
            this.setState({
              error: "There was a problem.Please check your details",
              loading: false
            });
          }
        })
        .catch(error => {
          this.setState({ error: error.message, loading: false });
        });
    } catch (e) {
      //  }

      this.setState({ error: e.message, loading: false });
      alert(e.message);
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ datetime });
    this._hideDateTimePicker();
  };

  renderButtonOrSpinner() {
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
      <View>
        <Button style={styles.button2} onPress={() => this.loginHandler()}>
          <Text style={styles.buttontxt}>Save Settings</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header
          style={{ backgroundColor: "white" }}
          androidStatusBarColor="#394753"
        >
          <StatusBar barStyle="light-content" />

          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon
                name="keyboard-arrow-left"
                style={{
                  color: "#f26c4d",
                  fontSize: 27
                }}
              />
            </Button>
          </Left>

          <Body>
            <Text>My Profile</Text>
          </Body>

          <Right />
        </Header>
        <Content
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: "white" }}
        >
          <Grid style={styles.viewcontain2}>
            <Row style={styles.contenti2}>
              <Col>
                <Form>
                  <Item stackedLabel disabled>
                    <Label>Username</Label>

                    <Input
                      style={xstyles.formsize2}
                      disabled
                      defaultValue={this.state.username}
                      onChangeText={username => this.setState({ username })}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Full Name</Label>

                    <Input
                      style={xstyles.formsize2}
                      defaultValue={this.state.name}
                      onChangeText={name => this.setState({ name })}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Email</Label>

                    <Input
                      style={xstyles.formsize2}
                      defaultValue={this.state.email}
                      onChangeText={email => this.setState({ email })}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Address</Label>
                    <Input
                      style={xstyles.formsize2}
                      defaultValue={this.state.address}
                      onChangeText={address => this.setState({ address })}
                    />
                  </Item>

                  <Item stackedLabel last>
                    <Label>Phone Number</Label>
                    <Input
                      style={xstyles.formsize2}
                      placeholder="Phone Number"
                      defaultValue={this.state.phoneNumber}
                      onChangeText={phoneNumber =>
                        this.setState({ phoneNumber })}
                    />
                  </Item>

                  <Text style={styles.errorTextStyle}>
                    {this.state.error}
                  </Text>
                </Form>

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
    color: "#f26c4d",
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
