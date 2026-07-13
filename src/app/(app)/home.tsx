import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import { useUsers } from "@/api/hooks/use-users";
import { authClient, useSession } from "@/lib/auth-client";
import { logger } from "@/utils/logger";

export default function HomeScreen() {
  const { data: session } = useSession();
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErr,
    refetch,
  } = useUsers(undefined, {
    // Example endpoint may not exist yet on your backend — keep UI resilient.
    retry: false,
  });

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.replace("/sign-in");
    } catch (err) {
      logger.error("sign-out failed", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signed in</Text>
      <Text style={styles.meta}>
        {session?.user.name} ({session?.user.email})
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Users API example</Text>
        <Text style={styles.hint}>
          Calls GET /users with the Better Auth cookie from SecureStore.
        </Text>

        {usersLoading ? <ActivityIndicator /> : null}
        {usersError ? (
          <Text style={styles.error}>
            {usersErr?.message ?? "Failed to load users (is your API running?)"}
          </Text>
        ) : null}
        {usersData?.users?.length ? (
          usersData.users.map((user) => (
            <Text key={user.id} style={styles.row}>
              {user.name} — {user.email}
            </Text>
          ))
        ) : !usersLoading && !usersError ? (
          <Text style={styles.hint}>No users returned.</Text>
        ) : null}

        <Pressable style={styles.secondaryButton} onPress={() => void refetch()}>
          <Text style={styles.secondaryButtonText}>Refresh users</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  meta: {
    fontSize: 15,
    color: "#444",
  },
  section: {
    marginTop: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  hint: {
    fontSize: 13,
    color: "#777",
  },
  row: {
    fontSize: 15,
    paddingVertical: 4,
  },
  error: {
    color: "#c62828",
    fontSize: 14,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#208AEF",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#208AEF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#208AEF",
    fontWeight: "600",
  },
});
