import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MyCarousel from "@/components/carousel";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      <MyCarousel />
    </SafeAreaView>
  );
};

export default Home;

