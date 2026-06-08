import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function CheckoutRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#006d43" />
    </View>
  );
}
