import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatRupiah } from '../../data/layanan';
import { getLayananById } from '../../services/layananService';
import { Layanan } from '../../types/layanan';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

export default function DetailLayananPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [layanan, setLayanan] = useState<Layanan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data memakai async/await + try/catch/finally
  useEffect(() => {
    const muatDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLayananById(Number(id));
        setLayanan(data);
      } catch (err) {
        // masuk ke sini kalau Promise di-reject (mis. id tidak ada)
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    muatDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F6F8FB' }}>
        <Loading pesan="Memuat detail layanan..." />
      </View>
    );
  }

  if (error || !layanan) {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F6F8FB' }}>
        <ErrorMessage pesan={error ?? 'Layanan tidak ditemukan'} />
        <Pressable onPress={() => router.replace('/')} style={buttonStyle}>
          <Text style={buttonTextStyle}>Kembali ke Beranda</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 22, backgroundColor: '#F6F8FB', flexGrow: 1 }}>
      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#E4E8EF' }}>
        <Text style={{ color: '#0D9488', fontWeight: '800', fontSize: 12, letterSpacing: 1 }}>DETAIL LAYANAN</Text>
        <Text style={{ color: '#152238', fontWeight: '800', fontSize: 25, marginTop: 10 }}>{layanan.nama}</Text>
        <Text style={{ color: '#667085', fontSize: 15, lineHeight: 23, marginTop: 10 }}>{layanan.deskripsi}</Text>
        <Text style={{ color: '#0D9488', fontWeight: '800', fontSize: 24, marginTop: 18 }}>{formatRupiah(layanan.harga)}</Text>
        <Text style={{ color: '#7D8794', fontSize: 12, marginTop: 8 }}>
          Harga merupakan estimasi untuk kebutuhan demo praktikum.
        </Text>
      </View>

      <Pressable onPress={() => router.back()} style={[buttonStyle, { marginTop: 18 }]}>
        <Text style={buttonTextStyle}>← Kembali (router.back)</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/')} style={[buttonStyle, { backgroundColor: '#0D9488', marginTop: 10 }]}>
        <Text style={buttonTextStyle}>Ke Beranda (router.replace)</Text>
      </Pressable>
    </ScrollView>
  );
}

const buttonStyle = {
  backgroundColor: '#17324D',
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 12,
  alignItems: 'center' as const,
};

const buttonTextStyle = {
  color: '#FFFFFF',
  fontWeight: '800' as const,
};
