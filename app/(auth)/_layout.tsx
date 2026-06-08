import { StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreen } from "react-native-screens";
import { Colors } from "../../constants/colors";

const RootLayout = () => {


  return (
    <>
        {/* <StatusBar style="auto"/> */}
      <Stack
        screenOptions={{
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "yellow ",
            animation:"none"
        }}
        >
      </Stack>
      {/* <Slot/> */}
      {/* <Text>Footer</Text> */}
          </>
  );
};

export default RootLayout;
