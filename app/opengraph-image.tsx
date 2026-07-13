import { ImageResponse } from "next/og";
import { profile } from "@/app/data/profile";

export const alt =
  "Karan Khatavkar — AI/ML Engineer. Building LLM apps, agents, and ML models for clients.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card mirroring the site's shadcn neutral light theme: white canvas,
// hairline frame, typography-led monochrome hierarchy.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 84,
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 22% 12%, rgba(10,10,10,0.04) 0%, rgba(10,10,10,0) 55%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            display: "flex",
            border: "1px solid #e5e5e5",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#737373",
          }}
        >
          {profile.role.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: "#0a0a0a",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 32,
              lineHeight: 1.3,
              color: "#525252",
            }}
          >
            {profile.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: "#0a0a0a" }}>karankh.tech</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", color: "#737373" }}>
              Open to freelance &amp; contract
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#171717",
                color: "#fafafa",
                borderRadius: 999,
                padding: "14px 30px",
                fontSize: 24,
              }}
            >
              Get in touch
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
