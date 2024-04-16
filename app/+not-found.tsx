import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Text, View } from "@/components/Themed";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text style={styles.title}>This screen doesn't exist.</Text>

				<LottieView
					autoPlay
					style={{
						width: 200,
						height: 200,
					}}
					source={require("../assets/animations/404.json")}
				/>

				<Link href="/" style={styles.link}>
					<Text style={styles.linkText}>Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}

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
