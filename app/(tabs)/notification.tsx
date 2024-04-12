import { Image, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "@/constants/data";

export default function Notification() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{data.map((e) => (
					<View key={e.id} lightColor="#eee">
						<View style={{ flexDirection: "row", width: "100%" }} lightColor="#eee" >
							<Image
								source={{
									uri: e.img,
								}}
								style={{
									width: 100,
									height: 100,
									borderRadius: 25,
								}}
							/>
							<View style={{ width: "auto", marginLeft: 10 }} lightColor="#eee">
								<Text
									style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5, width: 230 }}
								>
									{e.title}
								</Text>
								<Text style={{ textAlign: "left", width: 230 }}>
									{e.description}
								</Text>
							</View>
						</View>
						<View
							style={styles.separator}
							lightColor="black"
							darkColor="white"
						/>
					</View>
				))}

				{/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {

		flex: 1,
		marginHorizontal: 20,
		marginVertical: 30,
		// alignItems: "center",
		// justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 2,
		width: "100%",
	},
});
