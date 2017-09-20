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
  Col
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

export default class Appointments extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    phone: "",
    email: "",
    datetime: "Pick a date",
    name: "",
    notes: "",
    isDateTimePickerVisible: false,
    messages: "",
    loading: false
  };

  constructor(props) {
    super(props);
    this.bookHandler = this.bookHandler.bind(this);
  }

  async signOut() {
    const { navigate } = this.props.navigation;

    AsyncStorage.removeItem("logincookie");
    await firebase.auth().signOut();

    navigate("Welcome", { message: "Please Login" });
  }

  getdata() {
    fetch("https://citiwebb.com/healthboxes/recordlisting.php").then(function(
      response
    ) {
      var recieved = JSON.parse(response._bodyText);
    });

    this.setState({
      myfetched: recieved
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ datetime: "" + date.toLocaleString() });
    this._hideDateTimePicker();
  };

  bookHandler() {
    if (this.state.name != "") {
      this.setState({ messages: "", loading: true });

      const { phone, email, datetime, name, notes } = this.state;

      fetch(
        "https://citiwebb.com/healthboxes/bookappointment.php?name=" +
          name +
          "&email=" +
          email +
          "&phone=" +
          phone +
          "&notes=" +
          notes +
          "&datetime=" +
          datetime
      ).then(response => {
        var recieved = JSON.parse(response._bodyText);
        const { navigate } = this.props.navigation;

        navigate("Home", { appoint: "book" });

        alert(recieved);
      });
    } else {
      alert("Fields cannot be empty");
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
      <Button
        style={styles.button2}
        full
        rounded
        onPress={e => this.bookHandler(e)}
      >
        <Text style={styles.buttontxt}>Book Appointment</Text>
      </Button>
    );
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;
  }

  async componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let min = new Date();

    if (params.appoint == "book") {
      return (
        <Container>
          <Header style={styles.headr} androidStatusBarColor="#394753">
            <StatusBar barStyle="light-content" />

            <Body>
              <Text style={styles.headtxt}>Appointments</Text>
            </Body>
          </Header>
          <Content>
            <Grid style={styles.viewcontain}>
              <Row style={styles.contenti}>
                <Col>
                  <Text style={textisize(30)}>Book Appointment</Text>
                  <Form>
                    <Item stackedLabel>
                      <Label>Name</Label>
                      <Input
                        style={styles.nput}
                        onChangeText={text =>
                          this.setState({ name: "" + text })}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label>Email</Label>
                      <Input
                        style={styles.nput}
                        onChangeText={text =>
                          this.setState({ email: "" + text })}
                      />
                    </Item>

                    <Item stackedLabel>
                      <Label>Phone</Label>
                      <Input
                        style={styles.nput}
                        onChangeText={text =>
                          this.setState({ phone: "" + text })}
                      />
                    </Item>

                    <Item stackedLabel>
                      <Label>Date</Label>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={styles.datecontain}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "500",
                            color: "#123456"
                          }}
                        >
                          {this.state.datetime}
                        </Text>
                      </TouchableOpacity>
                    </Item>

                    <Item stackedLabel last>
                      <Label>Notes</Label>
                      <Input
                        style={styles.nput}
                        onChangeText={text =>
                          this.setState({ notes: "" + text })}
                      />
                    </Item>

                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode="datetime"
                      minimumDate={min}
                    />
                  </Form>

                  {this.renderButtonOrSpinner()}
                </Col>
              </Row>
            </Grid>
          </Content>

          <Footer style={xstyles.newfootie} />
        </Container>
      );
    } else {
      return <Text>Hello! see your appointments</Text>;
    }
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
    color: "#efefef",
    fontSize: 27
  },

  contenti: {
    alignSelf: "center",
    marginHorizontal: 20
  },
  datecontain: {
    alignSelf: "flex-start",
    marginTop: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#123456",
    width: "auto",
    padding: 10,
    alignItems: "center",
    borderStyle: "dashed"
  },

  headr: {
    backgroundColor: "#f26c4d"
  },
  headtxt: {
    color: "white"
  },

  nput: {}
});
