import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.light.tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="notification"
				options={{
					title: "News",
					tabBarIcon: ({ color }) => <TabBarIcon name="bell-o" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="ticket"
				options={{
					title: "Ticket",
					tabBarIcon: ({ color }) => <TabBarIcon name="ticket" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: "User",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
				}}
			/>
		</Tabs>
	);
}
