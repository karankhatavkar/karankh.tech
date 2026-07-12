import { ImageResponse } from "next/og";
import { profile } from "@/app/data/profile";

export const alt =
  "Karan Khatavkar — AI/ML Engineer. Building LLM apps, agents, and ML models for clients.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card mirroring the site's premium-minimal look: near-black canvas,
// soft radial glow, hairline frame, typography-led monochrome hierarchy.
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
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 22% 12%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 55%)",
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
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#71717a",
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
              color: "#fafafa",
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
              color: "#a1a1aa",
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
          <div style={{ display: "flex", color: "#e4e4e7" }}>karankh.tech</div>
          <div style={{ display: "flex", color: "#71717a" }}>
            {`${profile.location} · Freelance & contract`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
