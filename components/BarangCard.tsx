import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Barang } from '../types/barang';

type BarangCardProps = {
  barang: Barang;
  dipilih: boolean;
  onToggle: (id: number) => void;
};

export default function BarangCard({ barang, dipilih, onToggle }: BarangCardProps) {
  return (
    <Pressable
      onPress={() => onToggle(barang.id)}
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: dipilih ? '#0D9488' : '#E4E8EF',
      }}
    >
      <Image
        source={{ uri: barang.thumbnail }}
        style={{ width: 70, height: 70, borderRadius: 10, backgroundColor: '#EEF1F6' }}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ color: '#152238', fontWeight: '800', fontSize: 15 }}>{barang.nama}</Text>
        <Text style={{ color: '#667085', fontSize: 12, marginTop: 2 }} numberOfLines={2}>
          {barang.deskripsi}
        </Text>
        <Text style={{ color: '#0D9488', fontWeight: '800', marginTop: 4 }}>
          {barang.beratKg} kg {dipilih ? '✓ dipilih' : ''}
        </Text>
      </View>
    </Pressable>
  );
}
