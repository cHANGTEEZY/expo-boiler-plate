import { ActivityIndicator, View, useColorScheme } from "react-native";
import { Redirect } from "expo-router";

import { useSession } from "@/lib/auth-client";

export default function Index() {
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

  if (session) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/sign-in" />;
}
