import React from "react";
import { List } from "react-native-paper";

export default function ListHeader(props) {
  return <List.Subheader style={{ fontSize: props.size }}>{props.title}</List.Subheader>;
}
