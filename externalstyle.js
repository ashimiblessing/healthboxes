import { Dimensions } from "react-native";

var { height, width } = Dimensions.get("window");

module.exports = {
  foot: {
    backgroundColor: "#494949"
  },

  buttontxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "600"
  },

  button: {
    backgroundColor: "#f26c4d",
    marginTop: 20,
    width: width * 0.8,
    alignSelf: "center"
  },

  disabledbutton: {
    marginTop: 20,
    width: width * 0.8,
    alignSelf: "center"
  },

  ico: {
    color: "#efefef",
    fontSize: 27
  },

  headicon: {
    fontSize: 40,
    color: "white",
    alignSelf: "center"
  }
};
