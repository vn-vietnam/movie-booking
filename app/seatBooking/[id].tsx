import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	FlatList,
	ToastAndroid,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { generateDate, generateSeats, timeArray } from "@/hooks/bookingHooks";

const Booking = () => {
	// const { BgImage } = props?.route?.params;
	const param = useLocalSearchParams();
	// console.log(param);
	const navigation = useNavigation();
	const router = useRouter();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerTransparent: true,
		});
	}, []);
	const [dateArray, setDateArray] = useState<any[]>(generateDate());
	const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
	const [price, setPrice] = useState<number>(0);
	const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
	const [selectedSeatArray, setSelectedSeatArray] = useState([]);
	const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

	const selectSeat = (index: number, subindex: number, num: number) => {
		if (!twoDSeatArray[index][subindex].taken) {
			let array: any = [...selectedSeatArray];
			let temp = [...twoDSeatArray];
			temp[index][subindex].selected = !temp[index][subindex].selected;
			if (!array.includes(num)) {
				array.push(num);
				setSelectedSeatArray(array);
			} else {
				const tempindex = array.indexOf(num);
				if (tempindex > -1) {
					array.splice(tempindex, 1);
					setSelectedSeatArray(array);
				}
			}
			setPrice(array.length * 5.0);
			setTwoDSeatArray(temp);
		}
	};
	const BookSeats = async () => {
		if (
			selectedSeatArray.length !== 0 &&
			timeArray[selectedTimeIndex] !== undefined &&
			dateArray[selectedDateIndex] !== undefined
		) {
			try {
				await SecureStore.setItemAsync(
					"ticket",
					JSON.stringify({
						seatArray: selectedSeatArray,
						time: selectedTimeIndex,
						date: selectedDateIndex,
						ticketImage: param?.PosterImage,
					})
				);
			} catch (error) {
				console.error(
					"Something went Wrong while storing in BookSeats Functions",
					error
				);
			}
			router.navigate({
				pathname: `/ticket/${param.id}`,
				params: {
					seatArray: selectedSeatArray,
					time: selectedTimeIndex,
					date: selectedDateIndex,
					ticketImage: param?.PosterImage,
				},
			});

			ToastAndroid.show("Request sent successfully!", ToastAndroid.BOTTOM);
		} else {
			ToastAndroid.show("Request sent fail!", ToastAndroid.BOTTOM);
		}
	};
	return (
		<ScrollView
			style={styles.container}
			bounces={false}
			showsVerticalScrollIndicator={false}
		>
			<View>
				<ImageBackground
					source={{ uri: param?.BgImage as string }}
					style={styles.ImageBG}
				>
					<LinearGradient
						colors={["rgba(0,0,0,0)", "transparent"]}
						style={styles.linearGradient}
					>
						<View style={styles.appHeaderContainer}>
							{/* <AppHeader
								name="close"
								header={""}
								action={() => navigation.goBack()}
							/> */}
						</View>
					</LinearGradient>
				</ImageBackground>
				<Text
					style={{
						height: 5,
						marginHorizontal: 100,
						marginTop: 20,
						marginBottom: 10,
						borderRadius: 10,
						alignItems: "center",
						alignContent: "center",
						flex: 1,
						backgroundColor: "red",
					}}
				></Text>
				<Text style={styles.screenText}>Screen this side</Text>
			</View>

			<View style={styles.seatContainer}>
				<View style={styles.containerGap20}>
					{twoDSeatArray?.map((item, index) => {
						return (
							<View key={index} style={styles.seatRow}>
								{item?.map((subitem, subindex) => {
									return (
										<TouchableOpacity
											key={subitem.number}
											onPress={() => {
												selectSeat(index, subindex, subitem.number);
											}}
										>
											<MaterialIcons
												name="chair"
												style={[
													subitem.taken ? { color: "red" } : {},
													subitem.selected ? { color: "green" } : {},
												]}
												size={20}
												// style={{ marginRight: 8 }}
											/>
											{/* <CustomIcon
												name="seat"
												style={[
													styles.seatIcon,
													subitem.taken ? { color: 'grey' } : {},
													subitem.selected ? { color: 'orange' } : {},
												]}
											/> */}
										</TouchableOpacity>
									);
								})}
							</View>
						);
					})}
				</View>
				<View style={styles.seatRadioContainer}>
					<View style={styles.radioContainer}>
						{/* <CustomIcon name="radio" style={styles.radioIcon} /> */}
						<MaterialIcons
							name="chair"
							// color="red"
							size={20}
							// style={{ marginRight: 8 }}
						/>
						<Text style={styles.radioText}>Available</Text>
					</View>
					<View style={styles.radioContainer}>
						<MaterialIcons
							name="chair"
							color="red"
							size={20}
							// style={{ marginRight: 8 }}
						/>
						{/* <CustomIcon
							name="radio"
							style={[styles.radioIcon, { color: COLORS.Grey }]}
						/> */}
						<Text style={styles.radioText}>Taken</Text>
					</View>
					<View style={styles.radioContainer}>
						<MaterialIcons
							name="chair"
							color="green"
							size={20}
							// style={{ marginRight: 8 }}
						/>
						{/* <CustomIcon
							name="radio"
							style={[styles.radioIcon, { color: COLORS.Orange }]}
						/> */}
						<Text style={styles.radioText}>Selected</Text>
					</View>
				</View>
			</View>

			<View>
				<FlatList
					data={dateArray}
					keyExtractor={(item) => item.date}
					horizontal
					bounces={false}
					contentContainerStyle={styles.containerGap24}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
								<View
									style={[
										styles.dateContainer,
										index == 0
											? { marginLeft: 24 }
											: index == dateArray.length - 1
											? { marginRight: 24 }
											: {},
										index == selectedDateIndex
											? { backgroundColor: "orange" }
											: {},
									]}
								>
									<Text style={styles.dateText}>{item.date}</Text>
									<Text style={styles.dayText}>{item.day}</Text>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>

			<View style={styles.OutterContainer}>
				<FlatList
					data={timeArray}
					keyExtractor={(item) => item}
					horizontal
					bounces={false}
					contentContainerStyle={styles.containerGap24}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
								<View
									style={[
										styles.timeContainer,
										index == 0
											? { marginLeft: 24 }
											: index == dateArray.length - 1
											? { marginRight: 24 }
											: {},
										index == selectedTimeIndex
											? { backgroundColor: "orange" }
											: {},
									]}
								>
									<Text style={styles.timeText}>{item}</Text>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>

			<View style={styles.buttonPriceContainer}>
				<View style={styles.priceContainer}>
					<Text style={styles.totalPriceText}>Total Price</Text>
					<Text style={styles.price}>$ {price}.00</Text>
				</View>
				<TouchableOpacity onPress={BookSeats}>
					<Text style={styles.buttonText}>Buy Tickets</Text>
				</TouchableOpacity>
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
	ImageBG: {
		width: "100%",
		aspectRatio: 3072 / 1727,
	},
	linearGradient: {
		height: "100%",
	},
	appHeaderContainer: {
		marginHorizontal: 36,
		marginTop: 20 * 2,
	},
	screenText: {
		textAlign: "center",
		//   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 10,
		//   color: COLORS.WhiteRGBA15,
	},
	seatContainer: {
		marginVertical: 20,
	},
	containerGap20: {
		gap: 20,
	},
	seatRow: {
		flexDirection: "row",
		gap: 20,
		justifyContent: "center",
	},
	seatIcon: {
		fontSize: 24,
		//   color: COLORS.White,
	},
	seatRadioContainer: {
		flexDirection: "row",
		marginTop: 36,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	radioContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	radioIcon: {
		fontSize: 20,
		//   color: COLORS.White,
	},
	radioText: {
		// //   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 12,
		//   color: COLORS.White,
	},
	containerGap24: {
		gap: 24,
	},
	dateContainer: {
		width: 10 * 7,
		height: 10 * 10,
		borderRadius: 10 * 10,
		//   backgroundColor: COLORS.DarkGrey,
		alignItems: "center",
		justifyContent: "center",
	},
	dateText: {
		// //   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 24,
		//   color: COLORS.White,
	},
	dayText: {
		// //   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 12,
		//   color: COLORS.White,
	},
	OutterContainer: {
		marginVertical: 24,
	},
	timeContainer: {
		paddingVertical: 10,
		borderWidth: 1,
		//   borderColor: COLORS.WhiteRGBA50,
		paddingHorizontal: 20,
		borderRadius: 25,
		//   backgroundColor: COLORS.DarkGrey,
		alignItems: "center",
		justifyContent: "center",
	},
	timeText: {
		// //   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 14,
		//   color: COLORS.White,
	},
	buttonPriceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingBottom: 24,
	},
	priceContainer: {
		alignItems: "center",
	},
	totalPriceText: {
		// //   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 14,
		//   color: COLORS.Grey,
	},
	price: {
		// //   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 24,
		//   color: COLORS.White,
	},
	buttonText: {
		borderRadius: 25,
		paddingHorizontal: 24,
		paddingVertical: 10,
		// //   fontFamily: FONTFAMILY.poppins_semibold,
		fontSize: 16,
		//   color: COLORS.White,
		//   backgroundColor: COLORS.Orange,
	},
});
export default Booking;
