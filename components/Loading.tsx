import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

type LoadingProps = {
  pesan?: string;
};

export default function Loading({ pesan = 'Memuat data...' }: LoadingProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14 }}>
      <ActivityIndicator size="small" color="#0D9488" style={{ marginRight: 8 }} />
      <Text style={{ color: '#667085', fontSize: 14 }}>{pesan}</Text>
    </View>
  );
}
