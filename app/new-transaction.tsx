import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Wallet,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";

const NewTransaction = () => {
  const router = useRouter();
  const { addTransaction } = useApp();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"sale" | "debt" | "expense">("sale");
  const [customerName, setCustomerName] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const [receipt, setReceipt] = useState<string | null>(null);

  // Date picker states
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [inputDay, setInputDay] = useState("");
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState(new Date().getFullYear());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const incrementDay = () => {
    const val = parseInt(inputDay, 10);
    const newVal = isNaN(val) ? 1 : Math.min(val + 1, 31);
    setInputDay(newVal.toString());
  };

  const decrementDay = () => {
    const val = parseInt(inputDay, 10);
    const newVal = isNaN(val) ? 1 : Math.max(val - 1, 1);
    setInputDay(newVal.toString());
  };

  const incrementMonth = () => {
    const val = parseInt(inputMonth, 10);
    const newVal = isNaN(val) ? 1 : Math.min(val + 1, 12);
    setInputMonth(newVal.toString());
  };

  const decrementMonth = () => {
    const val = parseInt(inputMonth, 10);
    const newVal = isNaN(val) ? 1 : Math.max(val - 1, 1);
    setInputMonth(newVal.toString());
  };

  const handleDayChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    if (cleanText === "") {
      setInputDay("");
      return;
    }
    const val = parseInt(cleanText, 10);
    if (val < 1) {
      setInputDay("1");
    } else if (val > 31) {
      setInputDay("31");
    } else {
      setInputDay(cleanText);
    }
  };

  const handleMonthChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    if (cleanText === "") {
      setInputMonth("");
      return;
    }
    const val = parseInt(cleanText, 10);
    if (val < 1) {
      setInputMonth("1");
    } else if (val > 12) {
      setInputMonth("12");
    } else {
      setInputMonth(cleanText);
    }
  };

  // Date list starting from 2025fill
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const endYear = Math.max(currentYear + 5, 2030);
  const yearsList = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  } as const;

  const formatDateForDisplay = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleDateString("en-US", dateOptions)}`;
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleDateString("en-US", dateOptions)}`;
    }
    return date.toLocaleDateString("en-US", dateOptions);
  };

  const openDatePicker = () => {
    setInputDay(selectedDate.getDate().toString());
    setInputMonth((selectedDate.getMonth() + 1).toString());
    setInputYear(selectedDate.getFullYear());
    setIsYearDropdownOpen(false);
    setIsDatePickerOpen(true);
  };

  const handleConfirmDate = () => {
    const day = parseInt(inputDay, 10);
    const month = parseInt(inputMonth, 10);

    if (isNaN(day) || isNaN(month)) {
      Alert.alert(
        "Invalid Date",
        "Please enter a valid numeric day and month.",
      );
      return;
    }

    if (month < 1 || month > 12) {
      Alert.alert("Invalid Month", "Please enter a month between 1 and 12.");
      return;
    }

    const maxDays = new Date(inputYear, month, 0).getDate();
    if (day < 1 || day > maxDays) {
      Alert.alert(
        "Invalid Day",
        `Please enter a day between 1 and ${maxDays} for the selected month.`,
      );
      return;
    }

    const newDate = new Date(inputYear, month - 1, day);
    setSelectedDate(newDate);
    setIsDatePickerOpen(false);
  };

  const handleSave = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }
    if (type === "expense" && !expense.trim()) {
      Alert.alert(
        "Missing Title",
        "Please enter a name or category for the expense.",
      );
      return;
    }
    addTransaction({
      title:
        type === "sale"
          ? description || "Wholesale Supply"
          : type === "debt"
            ? customerName || "Unnamed Debtor"
            : expense || "Unnamed Expense",
      amount: numAmount,
      type,
      customerName: type === "debt" ? customerName || undefined : undefined,
      description: description || undefined,
      timestamp: selectedDate.toISOString(),
      date: formatDateForDisplay(selectedDate),
    });
    Alert.alert(
      "Success",
      `Recorded transaction of ₦${numAmount.toLocaleString()} successfully.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  const themeColor =
    type === "sale" ? "#006d43" : type === "debt" ? "#a5393e" : "#d97706";

  const bgBlurColor =
    type === "sale"
      ? "rgba(16, 185, 129, 0.1)"
      : type === "debt"
        ? "rgba(239, 68, 68, 0.1)"
        : "rgba(245, 158, 11, 0.1)";

  const chooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      // setProfileUrl(result.assets[0].uri);
      // await AsyncStorage.setItem("profileUrl", result.assets[0].uri);
      setReceipt(result.assets[0].uri);
    }
  };

  // 2. Core Action: Open Phone Camera
  const takeNewPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      // setProfileUrl(result.assets[0].uri);
      // await AsyncStorage.setItem("profileUrl", result.assets[0].uri);
      setReceipt(result.assets[0].uri);
    }
  };

  const addReceipt = () => {
    Alert.alert("Add Receipt", "Select photo from gallery or take one", [
      { text: "Choose from Gallery", onPress: chooseFromGallery },
      { text: "Take a Photo", onPress: takeNewPhoto },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative background blob */}
      <View
        pointerEvents="none"
        style={[styles.bgBlob, { backgroundColor: bgBlurColor }]}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.closeBtn,
              pressed && styles.closeBtnPressed,
            ]}
          >
            <X size={24} color="#6d7a70" />
          </Pressable>
          <Text style={[styles.headerTitle, { color: themeColor }]}>
            New Transaction
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.draftText}>Draft saved</Text>
          <View style={styles.draftDot} />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex1}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.flex1}
          keyboardDismissMode="on-drag"
        >
          {/* Amount Entry */}
          <View style={styles.amountArea}>
            <Text style={styles.amountLabel}>
              {type === "expense" ? "Amount Spent" : "Amount Received"}
            </Text>
            <View style={styles.amountRow}>
              <Text style={[styles.currencySymbol, { color: themeColor }]}>
                ₦
              </Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="#bccabe"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                autoFocus
                style={styles.amountInput}
              />
            </View>
          </View>

          {/* Segmented Control */}
          <View style={styles.segmentContainer}>
            <Pressable
              onPress={() => setType("sale")}
              style={[
                styles.segmentBtn,
                type === "sale" && styles.segmentBtnActive,
              ]}
            >
              <BookOpen
                size={18}
                color={type === "sale" ? "#006d43" : "#6d7a70"}
              />
              <Text
                style={[
                  styles.segmentLabel,
                  { color: type === "sale" ? "#006d43" : "#6d7a70" },
                ]}
              >
                Cash Sale
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setType("debt")}
              style={[
                styles.segmentBtn,
                type === "debt" && styles.segmentBtnActive,
              ]}
            >
              <User size={18} color={type === "debt" ? "#a5393e" : "#6d7a70"} />
              <Text
                style={[
                  styles.segmentLabel,
                  { color: type === "debt" ? "#a5393e" : "#6d7a70" },
                ]}
              >
                Debt
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setType("expense")}
              style={[
                styles.segmentBtn,
                type === "expense" && styles.segmentBtnActive,
              ]}
            >
              <Wallet
                size={18}
                color={type === "expense" ? "#d97706" : "#6d7a70"}
              />
              <Text
                style={[
                  styles.segmentLabel,
                  { color: type === "expense" ? "#d97706" : "#6d7a70" },
                ]}
              >
                Expense
              </Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          <View style={styles.fieldsContainer}>
            {type === "sale" ? (
              <View>
                <Text style={styles.fieldLabel}>What is the sale?</Text>
                <View style={styles.inputRow}>
                  <User size={20} color="#6d7a70" />
                  <TextInput
                    placeholder="What Item was sold? (e.g Steering, Racks)"
                    placeholderTextColor="#6d7a70"
                    value={customerName}
                    onChangeText={setCustomerName}
                    style={styles.textInput}
                  />
                </View>
              </View>
            ) : type === "debt" ? (
              <View>
                <Text style={styles.fieldLabel}>Who is this for?</Text>
                <View style={styles.inputRow}>
                  <User size={20} color="#6d7a70" />
                  <TextInput
                    placeholder="Customer Name (Optional)"
                    placeholderTextColor="#6d7a70"
                    value={customerName}
                    onChangeText={setCustomerName}
                    style={styles.textInput}
                  />
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.fieldLabel}>What was the expense?</Text>
                <View style={styles.inputRow}>
                  <Wallet size={20} color="#6d7a70" />
                  <TextInput
                    placeholder="Expense Name (e.g. Rent, Fuel, Restock)"
                    placeholderTextColor="#6d7a70"
                    value={expense}
                    onChangeText={setExpense}
                    style={styles.textInput}
                  />
                </View>
              </View>
            )}

            {/* Description */}
            <View>
              <Text style={styles.fieldLabel}>
                {type === "expense"
                  ? "Additional Details (Optional)"
                  : "What was it for?"}
              </Text>
              <View style={[styles.inputRow, styles.inputRowTop]}>
                <FileText size={20} color="#6d7a70" style={{ marginTop: 4 }} />
                <TextInput
                  placeholder={
                    type === "expense"
                      ? "Add notes about this expense"
                      : "Description of goods or services"
                  }
                  placeholderTextColor="#6d7a70"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  style={[styles.textInput, styles.multilineInput]}
                />
              </View>
            </View>

            {/* Date Row */}
            <View style={styles.dateRow}>
              <View style={styles.dateLeft}>
                <Pressable
                  onPress={() => {
                    setSelectedDate(new Date());
                  }}
                >
                  <View style={styles.dateIconWrap}>
                    <Calendar size={20} color="#6d7a70" />
                  </View>
                </Pressable>
                <View>
                  <Text style={styles.dateLabelText}>Transaction Date</Text>
                  <Text style={styles.dateValue}>
                    {formatDateForDisplay(selectedDate)}
                  </Text>
                </View>
              </View>
              <Pressable onPress={openDatePicker}>
                <Text style={[styles.changeBtn, { color: themeColor }]}>
                  Change
                </Text>
              </Pressable>
            </View>
          </View>

          {!receipt ? (
            <View className="w-full flex justify-center ">
              <Pressable
                onPress={() =>
                  // Alert.alert(
                  //   "Camera Integration",
                  //   "Simulating system camera upload attachment.",
                  // )
                  addReceipt()
                }
                // style={({ pressed }) => [
                //   styles.photoBox,
                //   pressed && { opacity: 0.75 },
                // ]}
                className={`flex justify-center h-40 border-4 border-dotted border-spacing-2 border-[${
                  type === "sale"
                    ? "#006d43"
                    : type === "debt"
                      ? "#a5393e"
                      : "#d97706"
                }] justify-self-center items-center rounded-3xl`}
              >
                <Camera size={24} color="#6d7a70" />
                <Text style={styles.photoBoxText}>
                  Attach Receipt or Item Photo
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={addReceipt}
              style={({ pressed }) => [
                styles.receiptBox,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Image
                source={{ uri: receipt }}
                style={styles.receiptImage}
                resizeMode="cover"
              />
              <View style={styles.receiptOverlay}>
                <Camera size={20} color="#ffffff" />
                <Text style={styles.receiptOverlayText}>Tap to change</Text>
              </View>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Save Button */}
      <View style={styles.saveWrapper}>
        <Pressable
          onPress={handleSave}
          style={[styles.saveBtn, { backgroundColor: themeColor }]}
        >
          <CheckCircle2 size={20} color="#ffffff" />
          <Text style={styles.saveBtnText}>Save Transaction</Text>
        </Pressable>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={isDatePickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDatePickerOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setIsYearDropdownOpen(false);
            setIsDatePickerOpen(false);
          }}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => {
              e.stopPropagation();
              setIsYearDropdownOpen(false);
            }}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Transaction Date</Text>
            </View>

            {/* Inputs Row */}
            <View style={styles.inputsRow}>
              {/* Day Column */}
              <View
                style={styles.inputCol}
                className="flex justify-center items-center"
              >
                <Text style={styles.modalInputLabel}>Day</Text>
                <Pressable
                  onPress={incrementDay}
                  style={({ pressed }) => [
                    styles.arrowSpinnerBtn,
                    pressed && styles.arrowSpinnerBtnPressed,
                  ]}
                >
                  <ChevronUp size={30} color="#6d7a70" />
                </Pressable>
                <TextInput
                  style={styles.modalTextInput}
                  value={inputDay}
                  onChangeText={handleDayChange}
                  placeholder="DD"
                  placeholderTextColor="#bccabe"
                  keyboardType="number-pad"
                  maxLength={2}
                  className="w-full"
                />
                <Pressable
                  onPress={decrementDay}
                  style={({ pressed }) => [
                    styles.arrowSpinnerBtn,
                    pressed && styles.arrowSpinnerBtnPressed,
                  ]}
                >
                  <ChevronDown size={30} color="#6d7a70" />
                </Pressable>
              </View>

              {/* Month Column */}
              <View
                style={styles.inputCol}
                className="flex items-center justify-center"
              >
                <Text style={styles.modalInputLabel}>Month</Text>
                <Pressable
                  onPress={incrementMonth}
                  style={({ pressed }) => [
                    styles.arrowSpinnerBtn,
                    pressed && styles.arrowSpinnerBtnPressed,
                  ]}
                >
                  <ChevronUp size={30} color="#6d7a70" />
                </Pressable>
                <TextInput
                  style={styles.modalTextInput}
                  value={inputMonth}
                  onChangeText={handleMonthChange}
                  placeholder="MM"
                  placeholderTextColor="#bccabe"
                  keyboardType="number-pad"
                  maxLength={2}
                  className="w-full"
                />
                <Pressable
                  onPress={decrementMonth}
                  style={({ pressed }) => [
                    styles.arrowSpinnerBtn,
                    pressed && styles.arrowSpinnerBtnPressed,
                  ]}
                >
                  <ChevronDown size={30} color="#6d7a70" />
                </Pressable>
              </View>

              {/* Year Column */}
              <View
                style={[styles.inputCol, { zIndex: 50 }]}
                className="flex gap-[28px]"
              >
                <Text style={styles.modalInputLabel}>Year</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                >
                  <Text style={styles.dropdownTriggerText}>{inputYear}</Text>
                  <ChevronDown size={16} color="#6d7a70" />
                </Pressable>

                {isYearDropdownOpen && (
                  <View style={styles.dropdownListContainer}>
                    <ScrollView
                      style={styles.dropdownScrollView}
                      nestedScrollEnabled
                      keyboardShouldPersistTaps="handled"
                    >
                      {yearsList.map((y) => (
                        <Pressable
                          key={y}
                          style={[
                            styles.dropdownItem,
                            y === inputYear && {
                              backgroundColor: themeColor + "15",
                            },
                          ]}
                          onPress={() => {
                            setInputYear(y);
                            setIsYearDropdownOpen(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownItemText,
                              y === inputYear && {
                                color: themeColor,
                                fontWeight: "700",
                              },
                            ]}
                          >
                            {y}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setIsDatePickerOpen(false)}
                style={styles.cancelActionBtn}
              >
                <Text style={styles.cancelActionBtnText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmDate}
                style={[
                  styles.confirmActionBtn,
                  { backgroundColor: themeColor },
                ]}
              >
                <Text style={styles.confirmActionBtnText}>Confirm</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9fc" },
  flex1: { flex: 1 },
  bgBlob: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(188,202,190,0.1)",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  closeBtn: { padding: 4, borderRadius: 999 },
  closeBtnPressed: { backgroundColor: "#f1f5f4" },
  headerTitle: { fontWeight: "800", fontSize: 20 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  draftText: { fontSize: 12, color: "#6d7a70", fontWeight: "700" },
  draftDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00a86b",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 260,
  },
  amountArea: { alignItems: "center", paddingVertical: 24 },
  amountLabel: {
    color: "#6d7a70",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 6,
    width: "100%",
  },
  currencySymbol: { fontWeight: "800", fontSize: 36 },
  amountInput: {
    fontWeight: "800",
    fontSize: 48,
    color: "#1a1c1e",
    textAlign: "center",
    padding: 0,
    flex: 1,
    minWidth: 120,
  },
  segmentContainer: {
    backgroundColor: "#f3f3f6",
    padding: 6,
    borderRadius: 24,
    flexDirection: "row",
    gap: 6,
    marginBottom: 32,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  segmentBtnActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentLabel: { fontSize: 12, fontWeight: "700" },
  fieldsContainer: { gap: 24, marginBottom: 32 },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6d7a70",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    paddingLeft: 4,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f6",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(188,202,190,0.1)",
  },
  inputRowTop: { alignItems: "flex-start" },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#1a1c1e",
    fontWeight: "500",
  },
  multilineInput: { textAlignVertical: "top", minHeight: 60 },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  dateLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  dateIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f4",
    alignItems: "center",
    justifyContent: "center",
  },
  dateLabelText: { fontSize: 12, color: "#6d7a70", fontWeight: "600" },
  dateValue: { fontSize: 14, fontWeight: "700", color: "#1a1c1e" },
  changeBtn: { fontWeight: "700", fontSize: 14 },
  photoBox: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 28,
    borderWidth: 1.5,
    borderColor: "#bccabe",
    borderRadius: 24,
    backgroundColor: "#f3f3f6",
  },
  photoBoxText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#6d7a70",
    marginTop: 4,
  },
  receiptBox: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    overflow: "hidden",
  },
  receiptImage: {
    width: "100%",
    height: 250,
  },
  receiptOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  receiptOverlayText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  saveWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(188,202,190,0.1)",
  },
  saveBtn: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: { color: "#ffffff", fontWeight: "700", fontSize: 18 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1c1e",
  },
  inputsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    zIndex: 10,
  },
  inputCol: {
    flex: 1,
    position: "relative",
  },
  modalInputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6d7a70",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  modalTextInput: {
    backgroundColor: "#f3f3f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1a1c1e",
    fontWeight: "600",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "rgba(188, 202, 190, 0.15)",
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3f3f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(188, 202, 190, 0.15)",
  },
  dropdownTriggerText: {
    fontSize: 16,
    color: "#1a1c1e",
    fontWeight: "600",
  },
  dropdownListContainer: {
    position: "absolute",
    top: 85,
    left: 0,
    right: 0,
    backgroundColor: "#f3f3f6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bccabe",
    maxHeight: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    zIndex: 100,
  },
  dropdownScrollView: {
    maxHeight: 180,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f6",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#1a1c1e",
    fontWeight: "500",
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f3f3f6",
    paddingTop: 16,
  },
  cancelActionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  cancelActionBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6d7a70",
  },
  confirmActionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmActionBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },
  arrowSpinnerBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f6",
    borderRadius: 8,
    paddingVertical: 4,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(188, 202, 190, 0.15)",
  },
  arrowSpinnerBtnPressed: {
    backgroundColor: "#e2e2e5",
  },
});

export default NewTransaction;
