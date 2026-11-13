import React from 'react';
import { Pressable, Text, View } from 'react-native';

type ErrorMessageProps = {
  pesan: string;
  onRetry?: () => void; // callback ke induk untuk mencoba lagi
};

export default function ErrorMessage({ pesan, onRetry }: ErrorMessageProps) {
  return (
    <View
      style={{
        backgroundColor: '#FEF3F2',
        borderColor: '#FDA29B',
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        marginVertical: 10,
      }}
    >
      <Text style={{ color: '#B42318', fontWeight: '800', marginBottom: 4 }}>Terjadi kesalahan</Text>
      <Text style={{ color: '#B42318' }}>{pesan}</Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={{
            backgroundColor: '#B42318',
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Coba Lagi</Text>
        </Pressable>
      )}
    </View>
  );
}
