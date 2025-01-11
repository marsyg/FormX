import { useState } from "react";
import QRCode from "qrcode";
import { usePathname } from "next/navigation";
const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
   const pathname = usePathname();
  console.log(pathname);
  const generateQRCode = async () => {
    try {
      console.log(pathname, "full pathh-----");
      const qrCodeURL = await QRCode.toDataURL(url);
      setQrCode(qrCodeURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      />
      <br />
      <button
        onClick={generateQRCode}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate QR Code
      </button>
      <div style={{ marginTop: "20px" }}>
        {qrCode && <img src={qrCode} alt="Generated QR Code" />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
