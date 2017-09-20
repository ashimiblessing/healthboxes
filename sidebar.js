import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Button, Container, Content } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigator, DrawerNavigator } from "react-navigation";

export class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.sidebarcontain}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="home" style={styles.ico} />
              <Text style={styles.ttxt}>Home</Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("User")}
            >
              <Icon name="account-circle" style={styles.ico} />
              <Text style={styles.ttxt}>Profile</Text>
            </Button>
            <Button transparent onPress={() => this.signOut()}>
              <Icon name="highlight-off" style={styles.ico} />
              <Text style={styles.ttxt}>Logout</Text>
            </Button>
            <Button transparent onPress={() => alert("HealthBoxes")}>
              <Icon name="info" style={styles.ico} />
              <Text style={styles.ttxt}>About</Text>
            </Button>

            <Button transparent onPress={() => closeDrawer()}>
              <Icon name="info" style={styles.ico} />
              <Text style={styles.ttxt}>Close</Text>
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

export default SideBar;
