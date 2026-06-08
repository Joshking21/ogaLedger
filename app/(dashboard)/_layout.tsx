import React from "react";
import { Tabs } from "expo-router";
import { House, Wallet, Users, Settings } from "@/components/icons";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#006d43",
        tabBarInactiveTintColor: "#6d7a70",
        tabBarStyle: {
          backgroundColor: "#f9f9fc",
          borderTopWidth: 1,
          borderTopColor: "rgba(188, 202, 190, 0.15)", // Ghost border outline-variant @ 15%
          height: 75,
          paddingBottom: 15,
          paddingTop: 10,
          elevation: 8,
          shadowColor: "#005232", // Ambient Green Shadow
          shadowOpacity: 0.06,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: -8 },
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <House size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Ledger",
          tabBarIcon: ({ color }) => (
            <Wallet size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Debtors",
          tabBarIcon: ({ color }) => (
            <Users size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Settings size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;

