import { ImageResponse } from "next/og";

// 32px for browser tabs; 48px because Google requires ≥48×48 to show a
// favicon in search results.
const icons = [
  { id: "32", size: { width: 32, height: 32 } },
  { id: "48", size: { width: 48, height: 48 } },
];

export function generateImageMetadata() {
  return icons.map((icon) => ({
    id: icon.id,
    size: icon.size,
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const iconId = await id;
  const { width, height } =
    icons.find((icon) => icon.id === iconId)?.size ?? icons[0].size;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          borderRadius: Math.round(width * 0.19),
          color: "#fafafa",
          fontSize: Math.round(width * 0.62),
          fontWeight: 700,
        }}
      >
        K
      </div>
    ),
    { width, height }
  );
}
