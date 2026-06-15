import React, { createContext, useContext, useState } from "react";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "sale" | "debt" | "expense";
  date: string;
  timestamp: string; // ISO String
  customerName?: string;
  description?: string;
  photoUri?: string;
  status: "completed" | "owed" | "paid";
}

export interface Debtor {
  id: string;
  name: string;
  amountOwed: number;
  phone: string;
  avatar: string;
  overdueDays: number;
}

export interface BusinessProfile {
  name: string;
  category: string;
  phone: string;
  address: string;
  avatar: string;
}

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (
    tx: Omit<Transaction, "id" | "timestamp" | "date" | "status">,
  ) => void;
  deleteTransaction: (id: string) => void;
  debtors: Debtor[];
  sendReminder: (debtorId: string) => void;
  businessProfile: BusinessProfile;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock data matching the oga ledger design metrics precisely!
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "Wholesale Supply",
    amount: 85000,
    type: "sale",
    date: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    customerName: "Alhaji Musa Provisions",
    description: "Bulk sales of detergents, oil, and flour bags.",
    status: "completed",
  },
  {
    id: "tx-2",
    title: "Ibrahim K.",
    amount: 24500,
    type: "debt",
    date: "Yesterday",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    customerName: "Ibrahim K.",
    description: "Credit purchase of 2 packs of beverages and soft drinks.",
    status: "owed",
  },
  {
    id: "tx-3",
    title: "Store Rent",
    amount: 150000,
    type: "expense",
    date: "Oct 24",
    timestamp: new Date("2025-10-24T12:00:00.000Z").toISOString(),
    description:
      "Annual store rental payment contribution for Victoria Island location.",
    status: "paid",
  },
  {
    id: "tx-4",
    title: "Supermarket Restock",
    amount: 343500,
    type: "sale",
    date: "4 hours ago",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    customerName: "Walk-in Customer",
    description: "Daily retail cash purchases from multiple walk-in buyers.",
    status: "completed",
  },
  {
    id: "tx-5",
    title: "Funmi A. Credit",
    amount: 59700,
    type: "debt",
    date: "3 days ago",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: "Funmi A.",
    description: "Credit supply for catering event items.",
    status: "owed",
  },
  {
    id: "tx-6",
    title: "Chidi N. Credit",
    amount: 100000,
    type: "debt",
    date: "5 days ago",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: "Chidi N.",
    description: "Credit supply of cosmetics inventory items.",
    status: "owed",
  },
];

const INITIAL_DEBTORS: Debtor[] = [
  {
    id: "debtor-1",
    name: "Ibrahim K.",
    amountOwed: 24500,
    phone: "0803 123 4567",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5LIb-aT-BP7NExTet2om2yCU00ZUPFwqXUmre86ziDpJdGVQRXUep-xYHjvsc-Dj5nqItu-WRk88CdRS-pbUUSXIoAlyLru2nULgszL4F2OJsALxRk5ZMVu5Iuxcb1-ib3h53hTACDsXjBwZrcvaA_vfBi6ps-xTk5pFBdzmGwLyNUMFSBXGvoad3XptNowSUHgfTPPstbMtB4HtEqj2zfPeA8Acs_E4pLvO2-aYU9pCO7FUAi6ovCjgdBdrFt4fDzI-uCcTaO3o",
    overdueDays: 1,
  },
  {
    id: "debtor-2",
    name: "Funmi A.",
    amountOwed: 59700,
    phone: "0815 987 6543",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDINZUViKOUEyVDFCWPTC4XyaZwtvS1RI76E2wyDXGActNTMVsZlukjesLZ3a0kzjqwov5jY85-LiZMnGqBSGdMARVdmbGgEE5jXzpobwFzMCNPrsUHGYqTqmHOIpm-KmI74Gk7ohtUkl7m_F5RMZaN7iCrZ50Kbjf2sZWeW2I7Hl8NuaOEfaQycNq2pZuGtiNEvMwLy9bWJolbJ1iTyigjTpo_Q0Wv5nK--a-3_gDcfSQflP2CXlqT12heGaadp3AGhJue0V32mOA",
    overdueDays: 3,
  },
  {
    id: "debtor-3",
    name: "Chidi N.",
    amountOwed: 100000,
    phone: "0706 444 8888",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIuy4jixsqeD6Nj0OPPKmRjfFvZjS5oLaPJo_28k5SEWdALhczva_9Fs-XEn9FOUA2mxg4FuGhKo2xbwJD2PPnG06li3P37roLm2_C8sLZ1ZGLyCA4WV2fpxMo0QOFAWjrTPBE29k3ASLp6Ft2n757vGn2sxBfzrPULMFSmy04s1wFtBYGC2AScF7JF_3NWBGYxxcq79iF0D7opeXKs1agjZs2R-aFGr9_U58xQQ8KV1jAPq_EqRJZ2ehJtJe1i1b8yX9NK6WfaQQ",
    overdueDays: 5,
  },
];

const INITIAL_PROFILE: BusinessProfile = {
  name: "Oga Ledger Retail",
  category: "retail",
  phone: "803 123 4567",
  address: "12, Victoria Island Crescent, Lagos State, Nigeria.",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCOKCBKKGl6KY2twZa30U7k3mPqk3v4B16ADWnqwSV8K20ejgbZKstwVKPOCZpcr8O4dd4vMqhAZz-HvIJD4bdnvSO5zQlQ4Ovaj-3EdJcQsITUfCsLL98MGn6x7WirTClvOZr8zQKvZcV71X0-r4_9j_4JEV5RB9JIurNvgIk9ueQgp9L-1AWBw3cv50YUnS1v2VaqIm0plObqpirt7wtY1pcNdtdm37dgN6ZN-lM_G_OuiMay1B9DaJbQq5-13EsIOh6J6x1OAhI",
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [debtors, setDebtors] = useState<Debtor[]>(INITIAL_DEBTORS);
  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfile>(INITIAL_PROFILE);

  const addTransaction = (
    tx: Omit<Transaction, "id" | "timestamp" | "date" | "status">,
  ) => {
    const id = `tx-${Math.random().toString(36).substr(2, 9)}`;
    const status: Transaction["status"] =
      tx.type === "debt"
        ? "owed"
        : tx.type === "expense"
          ? "paid"
          : "completed";
    const newTx: Transaction = {
      ...tx,
      id,
      timestamp: new Date().toISOString(),
      date: "Just now",
      status,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // If it's a debt, update or add to debtors list
    if (tx.type === "debt") {
      const debtorName = tx.customerName || "Unnamed Debtor";
      setDebtors((prev) => {
        const existing = prev.find(
          (d) => d.name.toLowerCase() === debtorName.toLowerCase(),
        );
        if (existing) {
          return prev.map((d) =>
            d.id === existing.id
              ? { ...d, amountOwed: d.amountOwed + tx.amount }
              : d,
          );
        } else {
          return [
            ...prev,
            {
              id: `debtor-${Math.random().toString(36).substr(2, 9)}`,
              name: debtorName,
              amountOwed: tx.amount,
              phone: "0800 000 0000",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60",
              overdueDays: 0,
            },
          ];
        }
      });
    }
  };

  const deleteTransaction = (id: string) => {
    const target = transactions.find((t) => t.id === id);
    if (target && target.type === "debt") {
      // Deduct from debtors
      const debtorName = target.customerName || "";
      setDebtors((prev) =>
        prev
          .map((d) => {
            if (d.name.toLowerCase() === debtorName.toLowerCase()) {
              return {
                ...d,
                amountOwed: Math.max(0, d.amountOwed - target.amount),
              };
            }
            return d;
          })
          .filter((d) => d.amountOwed > 0),
      );
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const sendReminder = (debtorId: string) => {
    // Simulated reminder logger/alerter
    console.log(`Sending reminder alert to debtor: ${debtorId}`);
  };

  const updateBusinessProfile = (profile: Partial<BusinessProfile>) => {
    setBusinessProfile((prev) => ({ ...prev, ...profile }));
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        debtors,
        sendReminder,
        businessProfile,
        updateBusinessProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
