import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import {
	View,
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import React, { useLayoutEffect } from "react";
import Colors from "@/constants/Colors";

WebBrowser.maybeCompleteAuthSession();

const Page = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerTransparent: true,
		});
	}, []);
	useWarmUpBrowser();

	const router = useRouter();
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const onPress = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();

			if (createdSessionId) {
				setActive!({ session: createdSessionId });

				router.replace("/user");
			} else {
			}
		} catch (err) {}
	}, []);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.btnOutline} onPress={onPress}>
				<Ionicons name="logo-google" size={24} style={{ color: "red" }} />
				<Text style={styles.btnOutlineText}>Continue with Google</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 26,
		justifyContent: "center",
		alignItems: "center",
	},

	seperatorView: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 30,
	},
	seperator: {
		fontSize: 16,
	},
	btnOutline: {
		backgroundColor: "#fff",
		borderWidth: 1,

		height: 50,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	btnOutlineText: {
		color: "#000",
		fontSize: 16,
	},
});
