import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ImageBackground,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getMovieCastDetails, getMovieDetails } from "@/hooks/callApi";
import {
	usePathname,
	useNavigation,
	useGlobalSearchParams,
	useRouter,
} from "expo-router";
import Error from "@/components/Error";
import { baseImagePath } from "../api/api";
import { LinearGradient } from "expo-linear-gradient";
import CategoryHeader from "@/components/CategoryHeader";
import CastCard from "@/components/CastCard";
import Loading from "@/components/Loading";
import { FontAwesome } from "@expo/vector-icons";
const MovieDetail = () => {
	const { id } = useGlobalSearchParams();
	const [movieData, setMovieData] = useState<any>(undefined);
	const [movieCastData, setmovieCastData] = useState<any>(undefined);
	const navigation = useNavigation();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const tempMovieData = await getMovieDetails(Number(id));
			setMovieData(tempMovieData);
		})();

		(async () => {
			const tempMovieCastData = await getMovieCastDetails(Number(id));
			setmovieCastData(tempMovieCastData?.cast);
		})();
	}, []);
	useEffect(() => {
		if (movieData) {
			setLoading(false);
		}
	}, [movieData]);
	// console.log(movieData);
	// if (loading) {
	// 	return <Loading />;
	// }
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerTransparent: true,
		});
	}, []);
	if (loading) {
		return <Loading />;
	}
	// console.log(baseImagePath("w780", movieData?.backdrop_path))
	return (
		<ScrollView
			style={styles.container}
			bounces={false}
			showsVerticalScrollIndicator={false}
		>
			{/* <StatusBar hidden /> */}

			<View>
				<ImageBackground
					source={{
						uri: baseImagePath("w780", movieData?.backdrop_path),
					}}
					style={styles.imageBG}
				>
					<LinearGradient
						colors={["rgba(0,0,0,0)", "transparent"]}
						style={styles.linearGradient}
					>
						<View style={styles.appHeaderContainer}></View>
					</LinearGradient>
				</ImageBackground>
				<View style={styles.imageBG}></View>
				<Image
					source={{ uri: baseImagePath("w342", movieData?.poster_path) }}
					style={styles.cardImage}
				/>
			</View>

			<View style={styles.timeContainer}>
				<FontAwesome
					name="clock-o"
					color="yellow"
					size={20}
					style={{ marginRight: 8 }}
				/>
				{/* <CustomIcon name="clock" style={styles.clockIcon} /> */}
				<Text style={styles.runtimeText}>
					{Math.floor(movieData?.runtime / 60)}h{" "}
					{Math.floor(movieData?.runtime % 60)}m
				</Text>
			</View>

			<View>
				<Text style={styles.title}>{movieData?.original_title}</Text>
				<View style={styles.genreContainer}>
					{movieData?.genres?.map((item: any) => {
						return (
							<View style={styles.genreBox} key={item?.id}>
								<Text style={styles.genreText}>{item?.name}</Text>
							</View>
						);
					})}
				</View>
				<Text style={styles.tagline}>{movieData?.tagline}</Text>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.rateContainer}>
					{/* <CustomIcon name="star" style={styles.starIcon} /> */}
					<View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
						<FontAwesome name="star" color="yellow" size={20} style={{}} />
						<Text style={styles.runtimeText}>
							{movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
						</Text>
					</View>
					<View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
						<FontAwesome name="calendar" color="yellow" size={20} style={{}} />
						<Text style={styles.runtimeText}>
							{movieData?.release_date.substring(8, 10)}{" "}
							{new Date(movieData?.release_date).toLocaleString("default", {
								month: "long",
							})}{" "}
							{movieData?.release_date.substring(0, 4)}
						</Text>
					</View>
				</View>
				<Text style={styles.descriptionText}>{movieData?.overview}</Text>
			</View>

			<View>
				<CategoryHeader title="Top Cast" />
				<FlatList
					data={movieCastData}
					keyExtractor={(item: any) => item.id}
					horizontal
					contentContainerStyle={styles.containerGap24}
					renderItem={({ item, index }) => (
						<CastCard
							shouldMarginatedAtEnd={true}
							cardWidth={80}
							isFirst={index == 0 ? true : false}
							isLast={index == movieCastData?.length - 1 ? true : false}
							imagePath={baseImagePath("w185", item.profile_path)}
							title={item.original_name}
							subtitle={item.character}
						/>
					)}
				/>

				<View>
					<TouchableOpacity
						style={styles.buttonBG}
						onPress={() => {
						
							router.navigate({
								pathname: `/seatBooking/${id}`,
								params: {
									// movieId: id,
									// test: "fdf",
									BgImage: baseImagePath("w780", movieData?.backdrop_path),
									PosterImage: baseImagePath("original", movieData?.poster_path),
								},
							} as any);
						}}
					>
						<Text style={styles.buttonText}>Select Seats</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		//   backgroundColor: COLORS.Black,
	},
	loadingContainer: {
		flex: 1,
		alignSelf: "center",
		justifyContent: "center",
	},
	scrollViewContainer: {
		flex: 1,
	},
	appHeaderContainer: {
		marginHorizontal: 36,
		marginTop: 20 * 2,
	},
	imageBG: {
		width: "100%",
		aspectRatio: 3072 / 1727,
	},
	linearGradient: {
		height: "100%",
	},
	cardImage: {
		width: "60%",
		aspectRatio: 200 / 300,
		position: "absolute",
		bottom: 0,
		alignSelf: "center",
		borderRadius: 25,
	},
	clockIcon: {
		fontSize: 20,
		//   color: COLORS.WhiteRGBA50,
		marginRight: 8,
	},
	timeContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 15,
	},
	runtimeText: {
		//   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 14,
		//   color: COLORS.White,
	},
	title: {
		//   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 24,
		//   color: COLORS.White,
		marginHorizontal: 36,
		marginVertical: 15,
		textAlign: "center",
	},
	genreContainer: {
		flex: 1,
		flexDirection: "row",
		gap: 20,
		flexWrap: "wrap",
		justifyContent: "center",
	},
	genreBox: {
		//   borderColor: COLORS.WhiteRGBA50,
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 25,
	},
	genreText: {
		//   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 10,
		//   color: COLORS.WhiteRGBA75,
	},
	tagline: {
		//   fontFamily: FONTFAMILY.poppins_thin,
		fontSize: 14,
		fontStyle: "italic",
		//   color: COLORS.White,
		marginHorizontal: 36,
		marginVertical: 15,
		textAlign: "center",
	},
	infoContainer: {
		marginHorizontal: 24,
	},
	rateContainer: {
		flexDirection: "column",
		justifyContent: "center",
		gap: 10,
		alignItems: "flex-start",
	},
	starIcon: {
		fontSize: 20,
		//   color: COLORS.Yellow,
	},
	descriptionText: {
		//   fontFamily: FONTFAMILY.poppins_light,
		marginTop: 24,
		fontSize: 14,
		//   color: COLORS.White,
	},
	containerGap24: {
		gap: 24,
	},
	buttonBG: {
		alignItems: "center",
		marginVertical: 24,
	},
	buttonText: {
		borderRadius: 25 * 2,
		paddingHorizontal: 24,
		paddingVertical: 10,
		backgroundColor: "red",
		color: "black",
		//   backgroundColor: COLORS.Orange,
		//   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 14,
		//   color: COLORS.White,
	},
});
export default MovieDetail;
