import { Link, Stack } from "expo-router";
import { Image, ImageBackground, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Text, View } from "@/components/Themed";

const Loading = () => {
	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

	return (
		<View style={styles.container}>
			<LottieView
				autoPlay
				style={{
					width: 100,
					height: 100,
					// backgroundColor: "#eee",
				}}
				source={require("../assets/animations/loading.json")}
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

export default Loading;
