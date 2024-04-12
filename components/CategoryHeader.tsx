import React from "react";
import { Text, StyleSheet } from "react-native";

const CategoryHeader = (props: any) => {
	return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		paddingHorizontal: 36,
		paddingVertical: 28,
	},
});

export default CategoryHeader;
