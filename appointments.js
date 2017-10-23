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

export default class Appointments extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  state = {
    phoneNumber: "",
    email: "",
    datetime: "Pick a date",
    name: "",
    notes: "",
    isDateTimePickerVisible: false,
    messages: "",
    loading: false,
    userid: "",
    address: "",
    selected1: "key0",
    nicedate: "Pick a date"
  };

  constructor(props) {
    super(props);
    this.bookHandler = this.bookHandler.bind(this);
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      datetime: "" + date.toISOString(),
      nicedate: "" + date.toString()
    });

    this._hideDateTimePicker();
  };

  bookHandler() {
    const { navigate } = this.props.navigation;
    this.setState({ error: "", loading: true });

    const {
      phone,
      email,
      datetime,
      name,
      notes,
      userid,
      token,
      selected1
    } = this.state;
    if (datetime === "Pick a date") {
      this.setState({ error: "Please pick a date", loading: false });
    } else if (phone === "") {
      this.setState({ error: "Please enter phone number", loading: false });
    } else if (name === "") {
      this.setState({ error: "Please enter name", loading: false });
    } else if (selected1 === "key0") {
      this.setState({
        error: "Please pick an appointment type",
        loading: false
      });
    } else {
      try {
        var details = {
          UserId: userid,
          Name: name,
          notes: notes + "\n\n\n\n Appointment Type: " + selected1,
          Date: datetime
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("http://hbx.stripestech.com" + "/api/HBXCore/CreateAppointment", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token
          },

          body: formBody
        })
          .then(response => response.json())
          .then(async data => {
            //alert(JSON.stringify(data));
            if (typeof data.hbx_response !== "undefined" && data.hbx_response) {
              this.setState({ error: "", loading: false });
              Alert.alert("Confirmation", "Appointment Booked Successfully");
              navigate("Home");
            } else {
              //alert(JSON.stringify(data));
              this.setState({
                error: "There was a problem booking your appointment.",
                loading: false
              });
            }
          })
          .catch(error => {
            //alert(JSON.stringify(error.message));
            //this.setState({ error: error.message, loading: false });
            this.setState({
              error: "Sorry, there was a communication error, please try again",
              loading: false
            });
          });
      } catch (e) {
        //  }

        this.setState({ error: e.message, loading: false });
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
      <Button style={styles.button2} onPress={e => this.bookHandler(e)}>
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

    if (params.appoint == "book") {
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
              <Text>Book an Appointment</Text>
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
                        onChangeText={text =>
                          this.setState({ name: "" + text })}
                        defaultValue={this.state.name}
                        style={xstyles.formsize2}
                      />
                    </Item>

                    <Item stackedLabel>
                      <Label>Phone</Label>
                      <Input
                        style={styles.nput}
                        onChangeText={text =>
                          this.setState({ phoneNumber: "" + text })}
                        defaultValue={this.state.phoneNumber}
                        style={xstyles.formsize2}
                      />
                    </Item>

                    <Picker
                      style={{
                        marginLeft: 10,
                        marginTop: 13
                      }}
                      iosHeader="Select Appointment Type"
                      mode="dropdown"
                      selectedValue={this.state.selected1}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Item
                        label="Select appointment type"
                        value="key0"
                        itemTextStyle={xstyles.formsize2}
                      />
                      <Item
                        label="Pediatric Surgery"
                        value="Pediatric Surgery"
                      />
                      <Item label="ENT" value="ENT" />
                      <Item
                        label="Orthopaedic Surgery"
                        value="Orthopaedic Surgery"
                      />
                      <Item label="Psychiatry" value="Psychiatry" />
                      <Item label="Urology" value="Urology" />
                      <Item label="General Medicine" value="General Medicine" />
                      <Item label="Ophthalmologist" value="Ophthalmologist" />
                    </Picker>

                    <Item stackedLabel>
                      <Label>Date</Label>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={styles.datecontain}
                      >
                        <Text
                          style={{
                            fontSize: 14,

                            color: "#123456"
                          }}
                        >
                          {this.state.nicedate}
                        </Text>
                      </TouchableOpacity>
                    </Item>

                    <Item stackedLabel last>
                      <Label>Notes</Label>
                      <Input
                        onChangeText={text =>
                          this.setState({ notes: "" + text })}
                        style={{ fontSize: 13, height: 70 }}
                        multiline
                      />
                    </Item>

                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode="datetime"
                      minimumDate={min}
                    />
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
