import { ImageResponse } from "next/og";
import { brand, tagline } from "@/config/site";

export const alt = `${brand} – ${tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#FFFFFF",
          color: "#111111",
        }}
      >
        <div style={{ fontSize: 150, letterSpacing: -4, lineHeight: 1 }}>{brand}</div>
        <div style={{ marginTop: 32, width: 96, height: 2, background: "#B8976A" }} />
        <div style={{ marginTop: 32, fontSize: 40, color: "#555555" }}>{tagline}</div>
      </div>
    ),
    size,
  );
}
