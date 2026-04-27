'use client';

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';

interface QRGeneratorProps {
  locale: string;
}

export default function QRGeneratorPage({ locale }: QRGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const menuUrl = `${baseUrl}/${locale}/menu`;

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `menu-qr-${locale}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
          <QrCode size={32} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Menu QR Code
        </h1>
        <p className="text-gray-600 mb-8">
          Scan this code to open the <span className="font-semibold uppercase">{locale}</span> menu.
        </p>

        <div 
          ref={qrRef} 
          className="p-4 bg-white border-4 border-gray-100 rounded-xl mb-8"
        >
          <QRCodeCanvas 
            value={menuUrl} 
            size={256} 
            level="H" 
            includeMargin={false}
          />
        </div>

        <div className="w-full mb-6 p-3 bg-gray-100 rounded-lg overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 font-mono">
          {menuUrl}
        </div>

        <button
          onClick={downloadQRCode}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          <Download size={20} />
          Download PNG
        </button>
      </div>
    </div>
  );
}
