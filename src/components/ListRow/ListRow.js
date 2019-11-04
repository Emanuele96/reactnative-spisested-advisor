import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Smiley from "../Smiley/Smiley.js";
import styles from "./ListRow-Styles.js";

const ListRow = props => {
  let row = props.rowData;
  console.log(row);
  let id = row._id;
  let stars =
    row.numberOfRatings === 0
      ? "No rating yet"
      : (row.sumStars / row.numberOfRatings).toFixed(2).toString() + "/5";

  let pic = <Image style={styles.Star} source={require("./star.png")} />;
  return (
    //container for the all row (will have 3 coloumns )
    <View style={styles.Row}>
      <View style={styles.TextColumn}>
        <Text style={styles.TextName}>{row.name}</Text>
        <Text style={styles.TextCity}>{row.city}</Text>
      </View>
      <Smiley style={styles.SmileyColumn} year={2019} value={1} />
      <View style={styles.RatingColumn}>
        {pic}
        <Text style={styles.TextRating}>{stars}</Text>
      </View>
    </View>
  );
};
export default ListRow;
