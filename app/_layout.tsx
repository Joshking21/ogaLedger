import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { AppProvider } from '../context/AppContext';

const RootLayout = () => {
  // const colorScheme = useColorScheme();

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

