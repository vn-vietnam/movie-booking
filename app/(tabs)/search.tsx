import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { baseImagePath, searchMovies } from "../api/api";
import InputHeader from "@/components/InputHeader";
import SubMovieCard from "@/components/SubMovieCard";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Error from "@/components/Error";
const { width, height } = Dimensions.get("screen");

const Search = () => {
	
	const [searchList, setSearchList] = useState([]);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const searchMoviesFunction = async (name: string) => {
		setLoading(true);
		try {
			let response = await fetch(searchMovies(name));
			let json = await response.json();
			setSearchList(json.results);
			
		} catch (error) {
			console.error("Something went wrong in searchMoviesFunction ", error);
		}
		setLoading(false);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				{loading ? (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<LottieView
							autoPlay
							style={{
								width: 200,
								height: 200,
								// backgroundColor: "#eee",
							}}
							source={require("../../assets/animations/loading.json")}
						/>
					</View>
				) : (
					<>
						<View>
							<FlatList
								data={searchList}
								keyExtractor={(item: any) => item.id}
								bounces={false}
								numColumns={2}
								showsVerticalScrollIndicator={false}
								ListHeaderComponent={
									<View style={styles.InputHeaderContainer}>
										<InputHeader searchFunction={searchMoviesFunction} />
									</View>
								}
								contentContainerStyle={styles.centerContainer}
								renderItem={({ item, index }) => (
									<SubMovieCard
										shoudlMarginatedAtEnd={false}
										shouldMarginatedAround={true}
										cardFunction={() => {
											router.push({
												pathname: `/details/${item.id}`,
												params: item.id,
											});
										}}
										cardWidth={width / 2 - 12 * 2}
										title={item.original_title}
										imagePath={baseImagePath("w342", item.poster_path)}
									/>
								)}
							/>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		width,
		alignItems: "center",
		//   backgroundColor: COLORS.Black,
	},
	InputHeaderContainer: {
		display: "flex",
		marginHorizontal: 36,
		marginTop: 28,
		marginBottom: 28 - 12,
	},
	centerContainer: {
		alignItems: "center",
	},
});

export default Search;
