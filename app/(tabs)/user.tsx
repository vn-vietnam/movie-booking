import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import SettingComponent from "@/components/SettingComponent";
import { Link, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

const User = () => {
	const { signOut, isSignedIn } = useAuth();
	const { user } = useUser();
	const router = useRouter();
	const handleLogout = () => {
		signOut();
	};
	const handleLogin = () => {
		router.push("/(modals)/login");
	};
	if (!user) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<TouchableOpacity
					style={{
						backgroundColor: "#fff",
						borderWidth: 1,

						height: 50,
						borderRadius: 8,
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "row",
						paddingHorizontal: 10,
					}}
					onPress={handleLogin}
				>
					<Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
						Log in
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Image source={user?.imageUrl} style={styles.avatarImage} />
				<Text>{user?.firstName + "" + user?.lastName}</Text>
			</View>

			<View style={styles.profileContainer}>
				<SettingComponent
					icon="user-circle-o"
					heading={user?.emailAddresses?.[0]?.emailAddress}
					subheading="Edit Profile"
					subtitle="Change Password"
				/>
				<SettingComponent
					icon="cogs"
					heading="Settings"
					subheading="Theme"
					subtitle="Permissions"
				/>
				<SettingComponent
					icon="star-o"
					heading="Rating Movie"
					subheading="Rating"
					subtitle="Comment"
				/>
				<TouchableOpacity
					style={{
						backgroundColor: "#fff",
						borderWidth: 1,

						height: 50,
						borderRadius: 8,
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "row",
						paddingHorizontal: 10,
					}}
					onPress={handleLogout}
				>
					<Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
						Log out
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		marginTop: 40,
	},
	appHeaderContainer: {
		marginHorizontal: 36,
		marginTop: 20 * 2,
	},
	profileContainer: {
		alignItems: "center",
		padding: 36,
	},
	avatarImage: {
		height: 80,
		width: 80,
		borderRadius: 80,
	},
	avatarText: {
		fontSize: 16,
		marginTop: 16,
	},
});
export default User;
