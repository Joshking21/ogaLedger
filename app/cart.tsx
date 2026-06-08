import React from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeft, Trash2, Plus, Minus, Star } from "@/components/icons";
import { useApp, CartItem } from "../context/AppContext";

const { width } = Dimensions.get("window");

const ShoppingCart = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useApp();

  const handleBack = () => {
    router.back();
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const delivery = 700;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout");
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm flex-row items-center mb-4 relative">
        {/* Item Image */}
        <Image
          source={{ uri: item.meal.image }}
          className="w-20 h-20 rounded-2xl object-cover"
        />

        {/* Item Specs */}
        <View className="flex-1 ml-4 justify-between pr-8">
          <View>
            <Text className="text-sm font-bold text-gray-950 pr-4 mb-1" numberOfLines={1}>
              {item.meal.title}
            </Text>
            <Text className="text-xs text-gray-500 font-bold mb-1">
              ₦{item.meal.price.toLocaleString()}
            </Text>
            <View className="flex-row items-center">
              <Star size={10} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-[10px] text-gray-400 font-bold ml-1">
                {item.meal.rating} ({item.meal.reviews})
              </Text>
            </View>
          </View>
        </View>

        {/* Delete Button (Trash) */}
        <Pressable
          onPress={() => removeFromCart(item.meal.id)}
          className="absolute top-3 right-3 bg-red-50 w-8 h-8 rounded-full items-center justify-center"
        >
          <Trash2 size={16} color="#ef4444" />
        </Pressable>

        {/* Bottom Right Quantity Selector */}
        <View className="absolute bottom-3 right-3 flex-row items-center bg-gray-100 rounded-xl p-1">
          <Pressable
            onPress={() => updateQuantity(item.meal.id, item.quantity - 1)}
            className="w-6 h-6 rounded-lg bg-white items-center justify-center shadow-sm"
          >
            <Minus size={12} color="#4b5563" />
          </Pressable>
          <Text className="text-xs font-extrabold text-gray-900 mx-3 min-w-[14px] text-center">
            {item.quantity.toString().padStart(2, "0")}
          </Text>
          <Pressable
            onPress={() => updateQuantity(item.meal.id, item.quantity + 1)}
            className="w-6 h-6 rounded-lg bg-white items-center justify-center shadow-sm"
          >
            <Plus size={12} color="#4b5563" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBFBFB] px-4 pt-3">
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable
          onPress={handleBack}
          className="bg-white w-11 h-11 rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <ArrowLeft size={22} color="#1f2937" />
        </Pressable>
        <Text className="text-lg font-extrabold text-gray-900">My Cart</Text>
        <View className="w-11" /> {/* empty space to balance back button */}
      </View>

      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8 pb-20">
          <View className="bg-orange-50 w-20 h-20 rounded-full items-center justify-center mb-6">
            <Trash2 size={36} color="#F27318" />
          </View>
          <Text className="text-lg font-bold text-gray-800 text-center mb-2">
            Your cart is empty!
          </Text>
          <Text className="text-sm text-gray-400 text-center leading-5 mb-8">
            Add some delicious cheap meals to your cart from the Home tab!
          </Text>
          <Pressable
            onPress={() => router.push("/home")}
            className="bg-[#F27318] active:bg-[#C65A10] px-8 py-3 rounded-2xl shadow-md shadow-orange-500/10"
          >
            <Text className="text-white text-sm font-bold">Go to Home</Text>
          </Pressable>
        </View>
      ) : (
        <View className="flex-1 justify-between">
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.meal.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Bottom Order Summary Card */}
          <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl mb-4">
            <Text className="text-base font-extrabold text-gray-900 mb-4">
              Order Summary
            </Text>

            <View className="flex-row justify-between mb-3">
              <Text className="text-sm font-semibold text-gray-400">Subtotal</Text>
              <Text className="text-sm font-bold text-gray-800">
                ₦{subtotal.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text className="text-sm font-semibold text-gray-400">Delivery</Text>
              <Text className="text-sm font-bold text-gray-800">
                ₦{delivery.toLocaleString()}
              </Text>
            </View>

            {/* Dashed Line */}
            <View className="border-t border-dashed border-gray-200 w-full mb-4" />

            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-base font-extrabold text-gray-900">Total</Text>
              <Text className="text-lg font-extrabold text-[#F27318]">
                ₦{total.toLocaleString()}
              </Text>
            </View>

            <Pressable
              onPress={handleCheckout}
              className="w-full bg-[#F27318] active:bg-[#C65A10] h-14 rounded-2xl items-center justify-center shadow-md shadow-orange-500/20"
            >
              <Text className="text-white text-base font-bold">Checkout</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ShoppingCart;
