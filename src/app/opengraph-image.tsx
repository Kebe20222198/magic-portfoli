import { ImageResponse } from "next/og";

export const alt = "Mohamed Kebe, Data Engineer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#fafaf7",
          color: "#16181d",
        }}
      >
        <div style={{ fontSize: 96, letterSpacing: -3 }}>Mohamed Kebe</div>
        <div style={{ marginTop: 24, fontSize: 40 }}>Data Engineer & AI Engineer</div>
        <div style={{ marginTop: 16, fontSize: 30, color: "#565c66" }}>
          Engineering Student at INSEA · Recherche de stage PFE
        </div>
      </div>
    ),
    size,
  );
}
