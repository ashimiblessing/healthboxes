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

    alignSelf: "center"
  },

  disabledbutton: {
    marginTop: 20,

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
  },

  newfootie: {
    backgroundColor: "white",
    height: 0,
    width: 0,
    shadowOpacity: 0
  },
  smallheight: {
    height: 50,
    padding: 10
  },
  ico2: {
    color: "#f26c4d",
    fontSize: 27
  },
  newtxt: {
    color: "#f26c4d",
    fontSize: 15,
    fontWeight: "500"
  },
  newtxt2: {
    color: "#f26c4d",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 5
  },
  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "#efefef",
    width: width - 15
  },
  ticon: {
    width: 41,
    height: 41,
    paddingTop: 4
  },

  formsize: {
    fontSize: 13
  },
  formsize2: {
    fontSize: 13,
    height: 45
  }
};
