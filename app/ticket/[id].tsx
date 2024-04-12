import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { generateDate, generateSeats, timeArray } from "@/hooks/bookingHooks";

const Ticket = () => {
	const ticketData = useLocalSearchParams();
	const navigation = useNavigation();
	const [dateArray, setDateArray] = useState<any[]>(generateDate());
	const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
	let seat = ticketData?.seatArray as any;
	seat = seat?.split(",");
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerTransparent: true,
		});
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.ticketContainer}>
				<ImageBackground
					source={{ uri: ticketData?.ticketImage as string }}
					style={styles.ticketBGImage}
				>
					<LinearGradient
						colors={["rgba(0,0,0,0)", "transparent"]}
						style={styles.linearGradient}
					>
						<View
							style={[
								styles.blackCircle,
								{ position: "absolute", bottom: -40, left: -40 },
							]}
						></View>
						<View
							style={[
								styles.blackCircle,
								{ position: "absolute", bottom: -40, right: -40 },
							]}
						></View>
					</LinearGradient>
				</ImageBackground>
				<View style={styles.ticketFooter}>
					<Image
						source={require("@/assets/images/barcode.png")}
						style={styles.barcodeImage}
					/>
					<View
						style={[
							styles.blackCircle,
							{ position: "absolute", top: -40, left: -40 },
						]}
					></View>
					<View
						style={[
							styles.blackCircle,
							{ position: "absolute", top: -40, right: -40 },
						]}
					></View>
					<View style={styles.ticketDateContainer}>
						<View style={styles.subtitleContainer}>
							<Text style={styles.dateTitle}>
								{dateArray[Number(ticketData?.date)]?.date}
							</Text>
							<Text style={styles.subtitle}>
								{dateArray[Number(ticketData?.date)]?.day}
							</Text>
						</View>
						<View style={styles.subtitleContainer}>
							{/* <CustomIcon name="clock" style={styles.clockIcon} /> */}
							<Text style={styles.subtitle}>
								{timeArray[Number(ticketData?.time)]}
							</Text>
						</View>
					</View>
					<View style={styles.ticketSeatContainer}>
						{/* <View style={styles.subtitleContainer}>
							<Text style={styles.subheading}>Hall</Text>
							<Text style={styles.subtitle}>02</Text>
						</View>
						<View style={styles.subtitleContainer}>
							<Text style={styles.subheading}>Row</Text>
							<Text style={styles.subtitle}>04</Text>
						</View> */}
						<View style={styles.subtitleContainer}>
							<Text style={styles.subheading}>Seats</Text>
							<Text style={styles.subtitle}>
								{seat.map((item: any, index: number, arr: any) => {
									return item + (index == arr.length - 1 ? "" : " - ");
								})}
							</Text>
						</View>
					</View>
				</View>
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
	ticketContainer: {
		flex: 1,
		justifyContent: "center",
	},
	ticketBGImage: {
		alignSelf: "center",
		width: 300,
		aspectRatio: 200 / 300,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		overflow: "hidden",
		justifyContent: "flex-end",
	},
	linearGradient: {
		height: "70%",
	},
	linear: {
		//   borderTopColor: COLORS.Black,
		borderTopWidth: 3,
		width: 300,
		alignSelf: "center",
		//   backgroundColor: COLORS.Orange,
		borderStyle: "dashed",
	},
	ticketFooter: {
		//   backgroundColor: COLORS.Orange,
		width: 300,
		alignItems: "center",
		paddingBottom: 36,
		alignSelf: "center",
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	ticketDateContainer: {
		flexDirection: "row",
		gap: 36,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
	},
	ticketSeatContainer: {
		flexDirection: "row",
		gap: 36,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
	},
	dateTitle: {
		//   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 24,
		//   color: COLORS.White,
	},
	subtitle: {
		// //   fontFamily: FONTFAMILY.poppins_regular,
		fontSize: 14,
		//   color: COLORS.White,
	},
	subheading: {
		// //   fontFamily: FONTFAMILY.poppins_medium,
		fontSize: 18,
		//   color: COLORS.White,
	},
	subtitleContainer: {
		alignItems: "center",
	},
	clockIcon: {
		fontSize: 24,
		//   color: COLORS.White,
		paddingBottom: 10,
	},
	barcodeImage: {
		height: 50,
		aspectRatio: 158 / 52,
	},
	blackCircle: {
		height: 80,
		width: 80,
		borderRadius: 80,
		//   backgroundColor: COLORS.Black,
	},
});
export default Ticket;
