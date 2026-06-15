import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from "expo-router";
import React from "react";
import { AppProvider } from '../context/AppContext';

// 1. Keep the main RootLayout completely plain so Expo Router can bootstrap the native containers safely
export default function RootLayout() {
  return <RootLayoutNav />;
}

// 2. Wrap your application layers inside this lower-level rendering node
function RootLayoutNav() {
  return (
    <AppProvider>
      <GluestackUIProvider mode="light">
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: '#ffffff' } 
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(dashboard)" />
          <Stack.Screen name="detail" />
          <Stack.Screen name="new-transaction" options={{ presentation: "modal" }} />
          <Stack.Screen name="edit-profile" />
        </Stack>
      </GluestackUIProvider>
    </AppProvider>
  );
}