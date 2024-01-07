import React from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

const BarcodePage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className=" container mx-auto flex flex-col items-center justify-center h-screen text-amber-600">
      <h1 className="text-2xl font-bold mb-4 "> Here Is Your QR Code BonApetite!  </h1>
      
      <QRCode value={`http://localhost:3000/orderSum/${orderId}`} />
      <hr className='mb-2'></hr>
      <h1 className="text-2xl font-bold mb-4"> Thank You for Choosing ScanEat  </h1>
    </div>
  );
};

export default BarcodePage;
