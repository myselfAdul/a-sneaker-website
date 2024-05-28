import React from "react";
import { QRCodeSVG } from "qrcode.react";
import "./QrCode.scss";

const QrCode = () => {
  return (
    <div className="qr-box">
      <h1>Check our product Authentidy</h1>
      <h2>scan this Qr code</h2>
      <hr />
      <div className="qr">
        <QRCodeSVG
          value="https://www.nike.com/gb/w/mens-shoes-nik1zy7ok"
          size={256}
        />
      </div>
    </div>
  );
};

export default QrCode;
