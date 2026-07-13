import { ActivityIndicator, View } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useSession } from "@/lib/auth-client";

export default function AppLayout() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: "Home" }} />
    </Stack>
  );
}
