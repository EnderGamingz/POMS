'use client';
import { useQRCode } from 'next-qrcode';

export function QrDisplay({ value }: { value: string }) {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={value}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#202020',
          light: '#ffffff',
        },
      }}
    />
  );
}
