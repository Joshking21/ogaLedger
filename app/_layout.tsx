import '@/global.css';
import { useColorScheme, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AppProvider } from '../context/AppContext';

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <GluestackUIProvider mode="light">
        <View className="flex-1 bg-white">
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(dashboard)" />
              <Stack.Screen name="detail" />
              <Stack.Screen name="new-transaction" options={{ presentation: "modal" }} />
              <Stack.Screen name="edit-profile" />
            </Stack>
        </View>
      </GluestackUIProvider>
    </AppProvider>
  );
};

export default RootLayout;

