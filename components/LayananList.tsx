import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { formatRupiah } from '../data/layanan';
import { Layanan } from '../types/layanan';

type LayananListProps = {
  daftar: Layanan[];
  dipilihId: number | null;
  onPilih: (id: number) => void; // callback ke komponen induk (Beranda)
};

export default function LayananList({ daftar, dipilihId, onPilih }: LayananListProps) {
  return (
    <View>
      {daftar.map((item) => {
        const aktif = item.id === dipilihId;
        return (
          <Pressable
            key={item.id}
            onPress={() => onPilih(item.id)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: aktif ? '#0D9488' : '#E4E8EF',
            }}
          >
            <Text style={{ color: '#152238', fontWeight: '800', fontSize: 16 }}>{item.nama}</Text>
            <Text style={{ color: '#0D9488', fontWeight: '800', marginTop: 4 }}>
              {formatRupiah(item.harga)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
