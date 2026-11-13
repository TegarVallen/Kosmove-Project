import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { getBarang } from '../services/barangService';
import { Barang } from '../types/barang';
import BarangCard from '../components/BarangCard';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

export default function BarangPage() {
  const router = useRouter();

  const [barang, setBarang] = useState<Barang[]>([]);
  const [dipilihIds, setDipilihIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // async/await memanggil getBarang() (yang di dalamnya memakai fetch + .then)
  const muatBarang = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBarang();
      setBarang(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    muatBarang();
  }, []);

  // pilih / batal pilih barang
  const toggleBarang = (id: number) => {
    setDipilihIds((sebelumnya) =>
      sebelumnya.includes(id) ? sebelumnya.filter((x) => x !== id) : [...sebelumnya, id]
    );
  };

  const barangDipilih = barang.filter((item) => dipilihIds.includes(item.id));
  const totalBerat = barangDipilih.reduce((total, item) => total + item.beratKg, 0);

  return (
    <ScrollView contentContainerStyle={{ padding: 22, backgroundColor: '#F6F8FB', flexGrow: 1 }}>
      <Text style={{ color: '#0D9488', fontWeight: '800', fontSize: 12, letterSpacing: 1 }}>
        ESTIMASI BARANG
      </Text>
      <Text style={{ color: '#152238', fontWeight: '800', fontSize: 22, marginTop: 6, marginBottom: 12 }}>
        Pilih barang yang akan dipindahkan
      </Text>

      {loading && <Loading pesan="Mengambil data barang dari server..." />}
      {error && <ErrorMessage pesan={error} onRetry={muatBarang} />}

      {!loading &&
        !error &&
        barang.map((item) => (
          <BarangCard
            key={item.id}
            barang={item}
            dipilih={dipilihIds.includes(item.id)}
            onToggle={toggleBarang}
          />
        ))}

      {!loading && !error && (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E4E8EF',
            marginTop: 6,
          }}
        >
          <Text style={{ color: '#152238', fontWeight: '800' }}>
            {barangDipilih.length} barang dipilih
          </Text>
          <Text style={{ color: '#0D9488', fontWeight: '800', fontSize: 20, marginTop: 4 }}>
            Total berat: {totalBerat} kg
          </Text>
        </View>
      )}

      <Pressable
        onPress={() => router.replace('/')}
        style={{
          backgroundColor: '#17324D',
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 16,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Pilih Layanan (router.replace)</Text>
      </Pressable>
    </ScrollView>
  );
}
