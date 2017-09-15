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
  WebView
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

import Icon from "react-native-vector-icons/FontAwesome";

import { StackNavigator } from "react-navigation";

export default class showRecord extends Component {
  static navigationOptions = {
    title: "HealthBoxes",
    header: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    var pp = JSON.parse(params.rec);
    var plenght = pp.lenght;

    return (
      <Container style={{ backgroundColor: "white", justifyContent: "center" }}>
        <Header />
        <Content>
          <Grid>
            <Row>
              <Col style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    alignSelf: "center",
                    marginTop: 20
                  }}
                >
                  Uploaded Records
                </Text>

                <List
                  dataArray={pp}
                  renderRow={item =>
                    <ListItem>
                      <Text style={styles.normaltxt}>
                        {item}
                      </Text>
                    </ListItem>}
                />

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    alignSelf: "center",
                    marginTop: 20
                  }}
                >
                  Your Prescriptions
                </Text>

                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 15,
                    alignSelf: "center",
                    marginTop: 20
                  }}
                >
                  Nothing found.
                </Text>
              </Col>
            </Row>
            <Row />
            <Row />
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
            <Button onPress={() => navigate("Welcome")}>
              <Icon name="cog" style={styles.ico} />
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
