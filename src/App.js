import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const [text, setText] = useState("Waiting...");

  // 🔊 Auto speak
  useEffect(() => {
    if (text && text !== "Waiting...") {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  }, [text]);

  useEffect(() => {
    if (handsRef.current) return; // ✅ prevent re-init

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
      modelComplexity: 0,
    });

    hands.onResults(onResults);
    handsRef.current = hands;

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          try {
            await hands.send({ image: videoRef.current });
          } catch (e) {
            console.log("MediaPipe error:", e);
          }
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results) => {
    if (
      !results ||
      !results.image ||
      !results.multiHandLandmarks ||
      results.multiHandLandmarks.length === 0
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    const lm = results.multiHandLandmarks[0];
    if (!lm || lm.length < 21) return;

    drawConnectors(ctx, lm, Hands.HAND_CONNECTIONS, {
      color: "#00E676",
      lineWidth: 3,
    });

    drawLandmarks(ctx, lm, {
      color: "#FF1744",
      lineWidth: 2,
    });

    const thumb = lm[4]?.x < lm[3]?.x;
    const index = lm[8]?.y < lm[6]?.y;
    const middle = lm[12]?.y < lm[10]?.y;
    const ring = lm[16]?.y < lm[14]?.y;
    const pinky = lm[20]?.y < lm[18]?.y;

    if (index && !middle && !ring && !pinky) {
      setText("Hello Doctor");
    } else if (thumb && !index && !middle && !ring && !pinky) {
      setText("I need help");
    } else if (index && middle && !ring && !pinky) {
      setText("Need water");
    } else if (index && middle && ring && pinky) {
      setText("Stop");
    } else if (!thumb && !index && !middle && !ring && !pinky) {
      setText("I am in pain");
    } else if (!index && middle && !ring && !pinky) {
      setText("(your custom phrase)");
    } else {
      setText("Gesture not recognized");
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.mainCard}>
          <h1>🏥 AI Sign Translator</h1>

          <video ref={videoRef} style={{ display: "none" }} autoPlay />

          <canvas ref={canvasRef} style={styles.video} />

          <div style={styles.output}>📝 {text}</div>
        </div>

        <div style={styles.sideCard}>
          <h3>📘 User Manual</h3>
          <p>☝️ Hello Doctor</p>
          <p>👍 Help</p>
          <p>✌️ Water</p>
          <p>✋ Stop</p>
          <p>✊ Pain</p>
          <p>🖕 Custom</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    gap: "20px",
    width: "90%",
    maxWidth: "1100px",
  },
  mainCard: {
    flex: 3,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    padding: "20px",
    textAlign: "center",
    color: "white",
  },
  sideCard: {
    flex: 1,
    background: "white",
    borderRadius: "15px",
    padding: "15px",
  },
  video: {
    width: "100%",
    borderRadius: "12px",
  },
  output: {
    fontSize: "20px",
    marginTop: "15px",
  },
};

export default App;