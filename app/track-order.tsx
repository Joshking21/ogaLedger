import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Svg, { Polyline, Circle } from "react-native-svg";
import { ArrowLeft, MapPin, Phone, MessageSquare, Clock, Star } from "@/components/icons";
import { useApp } from "../context/AppContext";

const { width, height } = Dimensions.get("window");


const TrackOrder = () => {
  const router = useRouter();
  const { address } = useApp();

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop the delivery car animation along the route coordinates
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: false,
        }),
        Animated.delay(2000),
      ])
    ).start();
  }, []);

  // Map route coordinate path (based on screen scale offsets)
  // Coordinates:
  // 0.00: start position (30, 200)
  // 0.25: go down to (30, 280)
  // 0.50: go down-right to (110, 320)
  // 0.75: go up-right to (180, 250)
  // 0.88: go down-right to (250, 300)
  // 1.00: destination (300, 250)
  const carX = progress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 0.88, 1],
    outputRange: [30, 30, 110, 180, 250, 300],
  });

  const carY = progress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 0.88, 1],
    outputRange: [200, 280, 320, 250, 300, 250],
  });

  const handleBack = () => {
    // Head back to home/dashboard
    router.replace("/home");
  };

  const handleCall = () => {
    Alert.alert("Call Driver", "Connecting to James Adeshola (+234 812 345 6789)...");
  };

  const handleMessage = () => {
    Alert.alert("Message Driver", "Opening chat window with James...");
  };

  return (
    <View className="flex-1 bg-white">
      {/* High Fidelity Vector Map Background */}
      <View className="absolute inset-0 bg-[#E8F1F5]">
        {/* Draw abstract grid streets */}
        <View className="absolute w-[200%] h-12 bg-white/70 rotate-[22deg] top-1/4 -left-1/4" />
        <View className="absolute w-[200%] h-10 bg-white/70 -rotate-[35deg] top-1/2 -left-1/4" />
        <View className="absolute w-[200%] h-12 bg-white/70 rotate-[45deg] top-2/3 -left-1/4" />
        <View className="absolute h-[200%] w-12 bg-white/70 left-1/4 -top-1/2" />
        <View className="absolute h-[200%] w-10 bg-white/70 left-2/3 -top-1/2" />
        
        {/* Abstract Green Areas / Parks */}
        <View className="absolute w-44 h-44 bg-[#D1E8CF]/50 rounded-full top-28 right-4" />
        <View className="absolute w-56 h-56 bg-[#D1E8CF]/50 rounded-full bottom-48 left-2" />

        {/* Abstract Streets Text */}
        <Text className="absolute text-[10px] text-gray-400 font-bold uppercase rotate-[22deg] top-[30%] left-6">
          Adegoke St.
        </Text>
        <Text className="absolute text-[10px] text-gray-400 font-bold uppercase -rotate-[35deg] top-[55%] left-24">
          Olukole St.
        </Text>

        {/* SVG Route Paths & Markers */}
        <View className="absolute inset-0 top-36">
          <Svg width={width} height={height * 0.5}>
            {/* Delivery Route Polyline */}
            <Polyline
              points="30,200 30,280 110,320 180,250 250,300 300,250"
              fill="none"
              stroke="#F27318"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Destination pulsing halo */}
            <Circle cx="300" cy="250" r="12" fill="#F27318" opacity="0.25" />
            <Circle cx="300" cy="250" r="6" fill="#F27318" />
          </Svg>

          {/* Animated Delivery Scooter Indicator */}
          <Animated.View
            style={{
              position: "absolute",
              left: carX,
              top: carY,
              transform: [{ translateX: -12 }, { translateY: -12 }],
            }}
            className="w-7 h-7 rounded-full bg-white border border-orange-500 shadow-md items-center justify-center"
          >
            <Text className="text-[12px]">🛵</Text>
          </Animated.View>

          {/* Destination Pin Marker Label */}
          <View style={{ position: "absolute", left: 275, top: 200 }} className="items-center">
            <View className="bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100 flex-row items-center gap-1">
              <MapPin size={10} color="#F27318" fill="#F27318" />
              <Text className="text-[9px] font-bold text-gray-800">You</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Floating Header overlay */}
      <SafeAreaView className="absolute top-0 left-0 right-0 px-4 flex-row items-center justify-between">
        <Pressable
          onPress={handleBack}
          className="bg-white w-11 h-11 rounded-full items-center justify-center shadow-md shadow-black/5 border border-gray-100"
        >
          <ArrowLeft size={22} color="#1f2937" />
        </Pressable>
        <Text className="text-lg font-extrabold text-gray-900 bg-white/80 px-4 py-1.5 rounded-full overflow-hidden shadow-sm">
          Track Order
        </Text>
        <View className="w-11" />
      </SafeAreaView>

      {/* Floating Bottom Sheets */}
      <View className="absolute bottom-6 left-4 right-4 gap-4">
        {/* Driver Details Card */}
        <View className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require("../assets/Jay.jpg")}
              className="w-12 h-12 rounded-full border border-gray-200"
            />
            <View className="ml-3">
              <Text className="text-sm font-bold text-gray-900">James Adeshola</Text>
              <Text className="text-xs text-gray-400 font-semibold mb-0.5">Driver</Text>
              <View className="flex-row items-center">
                <Star size={10} color="#f59e0b" fill="#f59e0b" />
                <Text className="text-[10px] text-gray-500 font-bold ml-1">4.7</Text>
              </View>
            </View>
          </View>

          {/* Quick Communication Actions */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={handleCall}
              className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center border border-orange-100"
            >
              <Phone size={16} color="#F27318" />
            </Pressable>
            <Pressable
              onPress={handleMessage}
              className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center border border-orange-100"
            >
              <MessageSquare size={16} color="#F27318" />
            </Pressable>
          </View>
        </View>

        {/* Delivery Info Card */}
        <View className="bg-white rounded-3xl p-5 shadow-xl border border-gray-100">
          <View className="flex-row items-start mb-4 border-b border-gray-50 pb-3">
            <View className="bg-orange-50 p-2 rounded-xl">
              <MapPin size={16} color="#F27318" fill="#F27318" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">
                Delivery to
              </Text>
              <Text className="text-sm font-bold text-gray-800 leading-5" numberOfLines={1}>
                {address}
              </Text>
            </View>
          </View>

          <View className="flex-row items-start">
            <View className="bg-orange-50 p-2 rounded-xl">
              <Clock size={16} color="#F27318" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">
                Estimated time
              </Text>
              <Text className="text-sm font-extrabold text-gray-900 leading-5">
                25-30 mins
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrackOrder;
