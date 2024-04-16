import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
const SubMovieCard = (props: any) => {
	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

	return (
		<TouchableOpacity onPress={() => props.cardFunction()}>
			<View
				style={[
					styles.container,
					props.shoudlMarginatedAtEnd
						? props.isFirst
							? { marginLeft: 36 }
							: props.isLast
							? { marginRight: 36 }
							: {}
						: {},
					props.shouldMarginatedAround ? { margin: 12 } : {},
					{ maxWidth: props.cardWidth },
				]}
			>
				<Image
					placeholder={blurhash}
					contentFit="cover"
					transition={100}
					style={[styles.cardImage, { width: props.cardWidth }]}
					source={{ uri: props.imagePath }}
				/>
				<Text numberOfLines={1} style={styles.textTitle}>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		
	},
	cardImage: {
		aspectRatio: 2 / 3,
		borderRadius: 20,
	},
	textTitle: {
		
		fontSize: 14,
	
		textAlign: "center",
		paddingVertical: 10,
	},
});

export default SubMovieCard;
