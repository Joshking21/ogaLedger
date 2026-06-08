import React, { useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import StyledButton from "../../components/button";

const Login = () => {
  const handleLogin = () => console.log("Logging in...", email, password);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  console.log(email);

  return (
    <Pressable onPress={Keyboard.dismiss} className="flex-1 text -red-600">
      <View className="flex gap-4 p-4">
        <TextInput
          placeholder="Email"
          className=" border p-4 rounded-lg"
          keyboardType="numbers-and-punctuation"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Text"
          className=" border p-4 "
          value={password}
          secureTextEntry
          keyboardType="numeric"
          onChangeText={setPassword}
        />
        <StyledButton title="Sign In" onPress={handleLogin} />
      </View>

      {/* Danger/Delete Button */}
      {/* <StyledButton
        title="Delete Account"
        onPress={() => {console.log("Deleting shit")}}
        variant="danger"
      />

      
      
      <StyledButton
        title="Custom Green"
        onPress={() => {}}
        className="bg-green-500 active:bg-green-600 rounded-full"
        variant=""
      /> */}
    </Pressable>
  );
};

export default Login;
