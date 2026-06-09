import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {


  return (
    <>
        {/* <StatusBar style="auto"/> */}
      <Stack
        screenOptions={{
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "yellow ",
            headerShown:false,
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
