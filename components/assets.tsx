import { Text, View } from 'react-native';
import React from 'react';
import { AlertCircle, TrendingUp, PackageSearch, Calendar } from 'lucide-react-native';

const AssetDetails = [
  {
    id: '1',
    label: 'Overdue Debts',
    value: '14',
    subText: '3 High priority',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    iconColor: '#dc2626'
  },
  {
    id: '2',
    label: 'MoM Growth',
    value: '+24%',
    subText: 'Since last month',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    iconColor: '#16a34a'
  },
  {
    id: '3',
    label: 'Low Stock',
    value: '8 Items',
    subText: 'Restock needed',
    icon: PackageSearch,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    iconColor: '#d97706'
  },
  {
    id: '4',
    label: 'Next Restock',
    value: 'Apr 20',
    subText: 'Monday morning',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: '#9333ea'
  },
];

export default function Assets() {
  return (
    <View className="px-4 mt-6">
      <Text className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        Business Insights
      </Text>
      
      {/* Grid Container */}
      <View className="flex-row flex-wrap justify-between text-xl">
        {AssetDetails.map((item) => {
          const Icon = item.icon;
          return (
            <View 
              key={item.id} 
              className="w-[48%] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl mb-4 shadow-sm"
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center mb-3 ${item.bgColor}`}>
                <Icon size={20} color={item.iconColor} />
              </View>
              
              <Text className="text-zinc-500 text-md font-medium mb-1">
                {item.label}
              </Text>
              
              <Text className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </Text>
              
              <Text className="text-zinc-400 text-md mt-1">
                {item.subText}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}