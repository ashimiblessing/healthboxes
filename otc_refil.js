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
  TextInput,
  TouchableOpacity,
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
  Textarea,
  Picker
} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import xstyles from "./externalstyle";

import { StackNavigator } from "react-navigation";

import * as firebase from "firebase";

textisize = function(size, color = "#191919", weight = "500") {
  return {
    alignSelf: align,
    fontSize: size,

    color: color,
    fontWeight: weight,
    marginVertical: 15
  };
};

export default class otcRefill extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    dose: "",
    drug: "",
    email: "",
    name: "",
    loading: false,
    userid: ""
  };

  requestRefil() {
    const { navigate } = this.props.navigation;
    this.setState({ error: "", loading: true });

    const { drug, email, name, dose } = this.state;
    if (drug === "") {
      this.setState({ error: "Please specify a drug", loading: false });
    } else if (name === "") {
      this.setState({ error: "Please enter name", loading: false });
    } else if (dose === "" || isNaN(dose)) {
      this.setState({
        error: "Please specify a correct dose",
        loading: false
      });
    } else if (email === "") {
      this.setState({
        error: "Please enter an email address",
        loading: false
      });
    } else {
      try {
        fetch(
          "http://app.healthboxes.com/otc_refil.php?name=" +
            name +
            "&email=" +
            email +
            "&drug=" +
            drug +
            "&dose=" +
            dose
        )
          .then(response => response.json())
          .then(async data => {
            //alert(JSON.stringify(data));
            if (typeof data.hbx_response !== "undefined" && data.hbx_response) {
              this.setState({ error: "", loading: false });
              navigate("Home");
              Alert.alert(
                "Confirmation",
                "Your refill request successfully was sent "
              );
            } else {
              //alert(JSON.stringify(data));
              this.setState({
                error: "There was a problem sending your request.",
                loading: false
              });
            }
          })
          .catch(error => {
            //alert(JSON.stringify(error.message));
            //this.setState({ error: error.message, loading: false });
            this.setState({
              error:
                "Sorry, there was an error communicating with the server, please try again",
              loading: false
            });
          });
      } catch (e) {
        //  }

        this.setState({
          error: "Sorry, there was a communication error, please try again",
          loading: false
        });
        //alert(JSON.stringify(e.message));
      }
    }
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
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
      <Button style={styles.button2} onPress={e => this.requestRefil(e)}>
        <Text style={styles.buttontxt}>Submit</Text>
      </Button>
    );
  }

  async componentWillMount() {
    const { navigate } = this.props.navigation;

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

  async componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    let min = new Date();

    return (
      <Container>
        <Header style={styles.headr} androidStatusBarColor="#394753">
          <StatusBar barStyle="light-content" />

          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="keyboard-arrow-left" style={styles.ico} />
            </Button>
          </Left>

          <Body>
            <Text>Request a Refill</Text>
          </Body>
          <Right />
        </Header>
        <Content
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: "white" }}
        >
          <Grid style={styles.viewcontain}>
            <Row style={styles.contenti}>
              <Col>
                <Form>
                  <Item stackedLabel>
                    <Label>Name</Label>
                    <Input
                      onChangeText={text => this.setState({ name: "" + text })}
                      defaultValue={this.state.name}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Email</Label>
                    <Input
                      style={styles.nput}
                      onChangeText={text => this.setState({ email: "" + text })}
                      defaultValue={this.state.email}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Drug</Label>
                    <Input
                      onChangeText={text => this.setState({ drug: "" + text })}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Dose</Label>
                    <Input
                      onChangeText={text => this.setState({ dose: "" + text })}
                      style={xstyles.formsize2}
                    />
                  </Item>

                  <Text>
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
  viewcontain: {
    justifyContent: "center",
    marginTop: 10
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
    marginBottom: 25
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

  contenti: {
    alignSelf: "center",
    marginHorizontal: 20
  },
  datecontain: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#123456",
    width: "auto",
    padding: 5,
    alignItems: "center",
    borderStyle: "dashed"
  },

  headr: {
    backgroundColor: "white"
  },
  headtxt: {
    color: "white"
  }
});
