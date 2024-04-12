import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
const InputHeader = (props: any) => {
	const [searchText, setSearchText] = useState<string>("");
	return (
		<View style={styles.inputBox}>
			<TextInput
			
				style={styles.textInput}
				onChangeText={(textInput) => setSearchText(textInput)}
				value={searchText}
				placeholder="Search your Movies..."
				//   placeholderTextColor={COLORS.WhiteRGBA32}
			/>
			<TouchableOpacity
				style={styles.searchIcon}
				onPress={() => props.searchFunction(searchText)}
			>
				<FontAwesome name="search" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	inputBox: {
		display: "flex",
		paddingVertical: 8,
		paddingHorizontal: 24,
		borderWidth: 2,
		//   borderColor: COLORS.WhiteRGBA15,
		borderRadius: 25,
		flexDirection: "row",
	},
	textInput: {
		width: "90%",
		//   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 14,
		//   color: COLORS.White,
	},
	searchIcon: {
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
});

export default InputHeader;
