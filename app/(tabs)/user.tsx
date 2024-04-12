import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Image } from "expo-image";
import SettingComponent from "@/components/SettingComponent";

const User = () => {
	const user = false;
	if (!user) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Button title="Login" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Image
					source={require("@/assets/images/icon.png")}
					style={styles.avatarImage}
				/>
				{/* <Text style={styles.avatarText}>{user}</Text> */}
			</View>

			<View style={styles.profileContainer}>
				<SettingComponent
					icon="user-circle-o"
					heading="Account"
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
				<SettingComponent
					icon="sign-out"
					heading="Sign Out"
					// subheading="About Movies"
					// subtitle="more"
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		//   backgroundColor: COLORS.Black,
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
		//   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 16,
		marginTop: 16,
		//   color: COLORS.White,
	},
});
export default User;
