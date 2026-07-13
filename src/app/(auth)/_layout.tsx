import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#0a0a0a" : "#f5f5f5",
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDark ? "#0a0a0a" : "#f5f5f5",
          },
        }}
      />
    </View>
  );
}
