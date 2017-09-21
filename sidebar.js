import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { Button, Container, Content } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import * as firebase from "firebase";

//var { navigate } = this.props.navigation;

export class SideBar extends Component {
  whereto(addr) {
    const { navigate } = this.props.navigation;

    navigate(addr);
  }

  async signOut() {
    AsyncStorage.removeItem("logincookie");
    await firebase.auth().signOut();

    this.props.navigation.navigate("Welcome");
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.sidebarcontain}>
            <Button transparent onPress={() => whereto("Home")}>
              <Icon name="home" style={styles.ico} />
              <Text style={styles.ttxt}>Home</Text>
            </Button>

            <Button transparent onPress={() => alert("HealthBoxes")}>
              <Icon name="info" style={styles.ico} />
              <Text style={styles.ttxt}>About</Text>
            </Button>

            <Button transparent onPress={() => whereto("User")}>
              <Icon name="account-circle" style={styles.ico} />
              <Text style={styles.ttxt}>Profile</Text>
            </Button>

            <Button transparent onPress={() => this.signOut()}>
              <Icon name="highlight-off" style={styles.ico} />
              <Text style={styles.ttxt}>Logout</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
var { height, width } = Dimensions.get("window");
var styles = StyleSheet.create({
  ico: {
    color: "#efefef",
    fontSize: 27
  },
  sidebarcontain: {
    width: width * 0.75,
    backgroundColor: "#494949",
    marginTop: 50
  },
  ttxt: {
    color: "white",
    fontSize: 17,
    marginVertical: 12,
    marginHorizontal: 5
  }
});

module.exports = SideBar;
