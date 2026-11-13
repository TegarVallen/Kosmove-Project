import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getLayanan } from '../services/layananService';
import { Layanan } from '../types/layanan';
import ErrorMessage from './ErrorMessage';
import LayananList from './LayananList';
import Loading from './Loading';

export default function Beranda() {
  const router = useRouter();

  // useState: data layanan dari "server", pilihan, loading, dan error
  const [daftar, setDaftar] = useState<Layanan[]>([]);
  const [layananDipilih, setLayananDipilih] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data memakai .then() / .catch() / .finally()
  const muatLayanan = () => {
    setLoading(true);
    setError(null);

    getLayanan()
      .then((data) => {
        setDaftar(data);
        if (data.length > 0) setLayananDipilih(data[0].id);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect: dijalankan sekali saat halaman beranda pertama kali dimuat
  useEffect(() => {
    muatLayanan();
  }, []);

  const layananAktif = daftar.find((item) => item.id === layananDipilih);
  const siap = !loading && !error && daftar.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8FB' }}>
      <ScrollView contentContainerStyle={{ padding: 22 }}>
        <Text style={{ color: '#0D9488', fontWeight: '800', fontSize: 12, letterSpacing: 1 }}>
          KOSMOVE
        </Text>
        <Text style={{ color: '#152238', fontWeight: '800', fontSize: 26, marginTop: 6 }}>
          Jasa & Layanan Pindahan Kos
        </Text>

        <View style={{ marginTop: 12, marginBottom: 8 }}>
          {loading && <Loading pesan="Memuat layanan..." />}
          {error && <ErrorMessage pesan={error} onRetry={muatLayanan} />}
          {siap && <Text style={{ color: '#667085', fontSize: 14 }}>Layanan siap dipilih</Text>}
        </View>

        {siap && (
          <>
            <LayananList daftar={daftar} dipilihId={layananDipilih} onPilih={setLayananDipilih} />
            {layananAktif && (
              <Text style={{ color: '#667085', marginTop: 6, marginBottom: 14 }}>
                Dipilih: {layananAktif.nama}
              </Text>
            )}
          </>
        )}

        <Pressable
          disabled={!siap}
          onPress={() => router.push(`/layanan/${layananDipilih}`)}
          style={{
            backgroundColor: siap ? '#17324D' : '#A8B0BC',
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Lihat Detail Layanan</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/barang')}
          style={{
            backgroundColor: '#0D9488',
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Estimasi Barang Pindahan</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
