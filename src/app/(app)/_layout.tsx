import { ActivityIndicator, View, useColorScheme } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useSession } from "@/lib/auth-client";

export default function AppLayout() {
  const { data: session, isPending } = useSession();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark ? "#0a0a0a" : "#f5f5f5",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="home" options={{ title: "Home", headerShown: false }} />
    </Stack>
  );
}
