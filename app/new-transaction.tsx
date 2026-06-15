import {
    BookOpen,
    Calendar,
    Camera,
    CheckCircle2,
    FileText,
    User,
    Wallet,
    X
} from "lucide-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
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
  const [selectedDate, setSelectedDate] = useState("Today, Oct 24, 2025");

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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative background blur */}
      <View
        pointerEvents="none"
        style={[styles.bgBlob, { backgroundColor: bgBlurColor }]}
      />

      {/* Top Header App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
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
        >
          {/* Amount Entry Area */}
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

          {/* Segmented Control Selector: Cash Sale vs Debt vs Expense */}
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

          {/* Details Form fields */}
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

            {/* Description / Notes */}
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

            {/* Date Picker row */}
            <View style={styles.dateRow}>
              <View style={styles.dateLeft}>
                <View style={styles.dateIconWrap}>
                  <Calendar size={20} color="#6d7a70" />
                </View>
                <View>
                  <Text style={styles.dateLabelText}>Transaction Date</Text>
                  <Text style={styles.dateValue}>{selectedDate}</Text>
                </View>
              </View>
              <Pressable
                onPress={() =>
                  Alert.alert("Date Selection", "Date picker dialog simulated.")
                }
              >
                <Text style={[styles.changeBtn, { color: themeColor }]}>
                  Change
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Photo attachment box */}
          <Pressable
            onPress={() =>
              Alert.alert(
                "Camera Integration",
                "Simulating system camera upload attachment.",
              )
            }
            style={({ pressed }) => [
              styles.photoBox,
              pressed && { opacity: 0.75 },
            ]}
          >
            <Camera size={20} color="#6d7a70" />
            <Text style={styles.photoBoxText}>
              Attach Receipt or Item Photo
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Save button wrapper */}
      <View style={styles.saveWrapper}>
        <Pressable
          onPress={handleSave}
          style={[styles.saveBtn, { backgroundColor: themeColor }]}
        >
          <CheckCircle2 size={20} color="#ffffff" />
          <Text style={styles.saveBtnText}>Save Transaction</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9fc",
  },
  flex1: {
    flex: 1,
  },
  bgBlob: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 320,
    height: 320,
    borderRadius: 160,
    pointerEvents: "none",
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 999,
  },
  closeBtnPressed: {
    backgroundColor: "#f1f5f4",
  },
  headerTitle: {
    fontWeight: "800",
    fontSize: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  draftText: {
    fontSize: 12,
    color: "#6d7a70",
    fontWeight: "700",
  },
  draftDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00a86b",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  amountArea: {
    alignItems: "center",
    paddingVertical: 24,
  },
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
  currencySymbol: {
    fontWeight: "800",
    fontSize: 36,
  },
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
  segmentLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  fieldsContainer: {
    gap: 24,
    marginBottom: 32,
  },
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
  inputRowTop: {
    alignItems: "flex-start",
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#1a1c1e",
    fontWeight: "500",
  },
  multilineInput: {
    textAlignVertical: "top",
    minHeight: 60,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  dateLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f4",
    alignItems: "center",
    justifyContent: "center",
  },
  dateLabelText: {
    fontSize: 12,
    color: "#6d7a70",
    fontWeight: "600",
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1c1e",
  },
  changeBtn: {
    fontWeight: "700",
    fontSize: 14,
  },
  photoBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(188,202,190,0.3)",
    borderRadius: 24,
    backgroundColor: "rgba(243,243,246,0.4)",
  },
  photoBoxText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#6d7a70",
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
  saveBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default NewTransaction;
