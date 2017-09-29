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
import xstyles from "./externalstyle";

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
        <Content
  keyboardShouldPersistTaps="always"
  keyboardDismissMode="on-drag">
          <Grid>
            <Row>
              <Col style={{ marginLeft: 10 }}>
                <Form>
                  <Item>
                    <Input placeholder="Condition 1" />
                  </Item>

                  <Item>
                    <Input placeholder="Username" />
                  </Item>

                  <Item last>
                    <Input placeholder="Password" />
                  </Item>
                  <Button style={styles.button} full rounded>
                    <Text style={styles.buttontxt}>SAVE</Text>
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row />
            <Row />
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
