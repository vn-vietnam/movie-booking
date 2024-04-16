import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { generateDate, generateSeats, timeArray } from "@/hooks/bookingHooks";
import { MaterialIcons } from "@expo/vector-icons";
import { DarkTheme } from "@react-navigation/native";

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
							<MaterialIcons
								name="access-time"
								size={30}
								style={{ paddingBottom: 5 }}
							/>

							<Text style={styles.subtitle}>
								{timeArray[Number(ticketData?.time)]}
							</Text>
						</View>
					</View>
					<View style={styles.ticketSeatContainer}>
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
		borderTopColor: "black",
		borderTopWidth: 3,
		width: 300,
		alignSelf: "center",
		backgroundColor: "orange",
		borderStyle: "dashed",
	},
	ticketFooter: {
		backgroundColor: "green",
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
		fontSize: 24,
	},
	subtitle: {
		fontSize: 14,
	},
	subheading: {
		fontSize: 18,
	},
	subtitleContainer: {
		alignItems: "center",
	},
	clockIcon: {
		fontSize: 24,

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
	},
});
export default Ticket;
