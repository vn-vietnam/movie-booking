import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Text, View } from "@/components/Themed";

const Error = () => {
	return (
		<View style={styles.container}>
			<LottieView
				autoPlay
				style={{
					width: 500,
					height: 500,
					// backgroundColor: "#eee",
				}}
				source={require("../assets/animations/error.json")}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});

export default Error;
