import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const QrPage = () => {
  const [qrImage, setQrImage] = useState("");
  const [status, setStatus] = useState("Waiting for QR...");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://35.207.197.197", {
      //http://35.207.197.197 or localhost : 3000
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
      setStatus("Connection failed ❌");
    });

    // ✅ NEW EVENT NAME (from backend)
    socket.on("wa_qr", (qr) => {
      if (qr) {
        setQrImage(qr);
        setConnected(false);
        setStatus("Scan this QR using WhatsApp");
      }
    });

    // ✅ CONNECTION STATE HANDLER
    socket.on("wa_connection", (state) => {
      console.log("WA Connection State:", state);

      if (state === "qr") {
        setStatus("QR Generated. Please scan.");
        setConnected(false);
      }

      if (state === "open") {
        setStatus("WhatsApp Connected 🎉");
        setConnected(true);
        setQrImage("");
      }

      if (state === "close") {
        setStatus("Disconnected. Reconnecting...");
        setConnected(false);
        setQrImage("");
      }

      if (state === "authenticated") {
        setStatus("Authenticated...");
      }

      if (state === "auth_failure") {
        setStatus("Authentication Failed ❌");
        setConnected(false);
        setQrImage("");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      setLoading(true);
      setStatus("Sending message...");

      const res = await fetch(
        "http://35.207.197.197/master/sendParallelMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groups: [],
            message: {
              messageMediaUrl: "",
              templateName: "readingMsg_YT",
              templateId: "020226",
              messageType: "text",
              messageText: ["Test message"],
            },
          }),
        },
      );

      await res.json();
      setStatus("Message sent successfully ✅");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncServer = async () => {
    try {
      setLoading(true);
      setStatus("Syncing server...");

      const res = await fetch("http://35.207.197.197/master/syncServers");
      await res.json();

      setStatus("Server synced successfully ✅");
    } catch (err) {
      console.error(err);
      setStatus("Server sync failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Scan WhatsApp QR Code</h2>
      <p>{status}</p>

      {qrImage && !connected && (
        <img src={qrImage} alt="WhatsApp QR" width="300" style={styles.image} />
      )}

      {connected && (
        <>
          <button
            onClick={handleSyncServer}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Syncing..." : "Sync Server"}
          </button>

          <button
            onClick={handleSendMessage}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    marginTop: "40px",
  },
  image: {
    marginTop: "20px",
    border: "2px solid #222",
    borderRadius: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#25D366",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
  },
};

export default QrPage;
