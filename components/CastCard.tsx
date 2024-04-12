import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const CastCard = (props: any) => {
	return (
		<View
			style={[
				styles.container,
				props.shouldMarginatedAtEnd
					? props.isFirst
						? { marginLeft: 24 }
						: props.isLast
						? { marginRight: 24 }
						: {}
					: {},
				{ maxWidth: props.cardWidth },
			]}
		>
			<Image
				source={{ uri: props.imagePath }}
				style={[styles.cardImage, { width: props.cardWidth }]}
			/>
			<Text style={styles.title} numberOfLines={1}>
				{props.title}
			</Text>
			<Text style={styles.subtitle} numberOfLines={1}>
				{props.subtitle}
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	cardImage: {
		aspectRatio: 1920 / 2880,
		borderRadius: 25 * 4,
	},
	title: {
		alignSelf: "stretch",
		// fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 12,
		// color: COLORS.White,
	},
	subtitle: {
		alignSelf: "stretch",
		// fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 10,
		// color: COLORS.White,
	},
});
export default CastCard;
