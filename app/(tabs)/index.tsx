import {
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import InputHeader from "@/components/InputHeader";
import { useEffect, useState } from "react";
import {
	getNowPlayingMoviesList,
	getPopularMoviesList,
	getUpcomingMoviesList,
} from "@/hooks/callApi";
import CategoryHeader from "@/components/CategoryHeader";
import { baseImagePath } from "../api/api";
import MovieCard from "@/components/MovieCard";
import SubMovieCard from "@/components/SubMovieCard";
import { FontAwesome } from "@expo/vector-icons";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

const { width, height } = Dimensions.get("window");

export default function TabOneScreen() {
	const router = useRouter();
	const [nowPlayingMoviesList, setNowPlayingMoviesList] =
		useState<any>(undefined);
	const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
	const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
	const searchMoviesFunction = () => {
		router.navigate("search");
	};
	useEffect(() => {
		(async () => {
			let tempNowPlaying = await getNowPlayingMoviesList();
			setNowPlayingMoviesList([
				// { id: "dummy1" },
				...tempNowPlaying.results,
				// { id: "dummy2" },
			]);

			let tempPopular = await getPopularMoviesList();
			setPopularMoviesList(tempPopular.results);

			let tempUpcoming = await getUpcomingMoviesList();
			setUpcomingMoviesList(tempUpcoming.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (
				nowPlayingMoviesList == undefined &&
				nowPlayingMoviesList == null &&
				popularMoviesList == undefined &&
				popularMoviesList == null &&
				upcomingMoviesList == undefined &&
				upcomingMoviesList == null
			) {
				return <Loading />;
			}
		})();
	}, [nowPlayingMoviesList, popularMoviesList, upcomingMoviesList]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ flex: 1 }} bounces={false}>
				<CategoryHeader title={"Now Playing"} />
				<FlatList
					style={{}}
					data={nowPlayingMoviesList}
					keyExtractor={(item: any) => item.id}
					bounces={false}
					snapToInterval={width * 0.7 + 36}
					horizontal
					showsHorizontalScrollIndicator={false}
					decelerationRate={0}
					contentContainerStyle={{ gap: 36 }}
					renderItem={({ item, index }) => {
						if (!item.original_title) {
							return (
								<View
									style={{
										width: (width - (width * 0.7 + 36 * 2)) / 2,
									}}
								></View>
							);
						}
						return (
							<MovieCard
								shoudlMarginatedAtEnd={true}
								cardFunction={() => {
									router.push({
										pathname: `/details/${item.id}`,
										params: item.id,
									});
								}}
								cardWidth={width * 0.7}
								isFirst={index == 0 ? true : false}
								isLast={index == upcomingMoviesList?.length - 1 ? true : false}
								title={item.original_title}
								imagePath={baseImagePath("w780", item.poster_path)}
								genre={item.genre_ids.slice(1, 4)}
								vote_average={item.vote_average}
								vote_count={item.vote_count}
							/>
						);
					}}
				/>
				{/* SubMovieCard */}
				<CategoryHeader title={"Popular"} />
				<FlatList
					data={popularMoviesList}
					keyExtractor={(item: any) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					bounces={false}
					contentContainerStyle={{ gap: 36 }}
					renderItem={({ item, index }) => (
						<SubMovieCard
							shoudlMarginatedAtEnd={true}
							cardFunction={() => {
								router.push({
									pathname: `/details/${item.id}`,
									params: item.id,
								});
							}}
							cardWidth={width / 3}
							isFirst={index == 0 ? true : false}
							isLast={index == upcomingMoviesList?.length - 1 ? true : false}
							title={item.original_title}
							imagePath={baseImagePath("w342", item.poster_path)}
						/>
					)}
				/>

				{/* upcomingMoviesList */}
				<CategoryHeader title={"Upcoming"} />
				<FlatList
					data={upcomingMoviesList}
					keyExtractor={(item: any) => item.id}
					horizontal
					bounces={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ gap: 36 }}
					renderItem={({ item, index }) => (
						<SubMovieCard
							shoudlMarginatedAtEnd={true}
							cardFunction={() => {
								router.push({
									pathname: `/details/${item.id}`,
									params: item.id,
								});
							}}
							cardWidth={width / 3}
							isFirst={index == 0 ? true : false}
							isLast={index == upcomingMoviesList?.length - 1 ? true : false}
							title={item.original_title}
							imagePath={baseImagePath("w342", item.poster_path)}
						/>
					)}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 2,
		width: "80%",
	},
});
