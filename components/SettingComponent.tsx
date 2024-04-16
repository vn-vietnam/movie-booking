import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SettingComponent = (props: any) => {
	return (
		<View style={styles.container}>
			<View style={{ marginRight: 10 }}>
				{/* <CustomIcon name={props.icon} style={styles.iconStyle} /> */}
				<FontAwesome name={props.icon} size={30} />
			</View>
			<View style={styles.settingContainer}>
				<Text style={styles.title}>{props.heading}</Text>
				<Text style={styles.subtitle}>{props.subheading}</Text>
				<Text style={styles.subtitle}>{props.subtitle}</Text>
			</View>
		</View>
	);
};

export default SettingComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingVertical: 20,
	},
	settingContainer: {
		flex: 1,
	},
	iconStyle: {
		
		fontSize: 24,
		paddingHorizontal: 20,
	},
	iconBG: {
		justifyContent: "center",
	},
	title: {
		
		fontSize: 18,
		
	},
	subtitle: {
		
		fontSize: 14,
		
	},
});
