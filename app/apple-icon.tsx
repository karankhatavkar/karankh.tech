import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Solid square — iOS applies its own corner mask.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)",
          color: "#fafafa",
          fontSize: 112,
          fontWeight: 700,
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
