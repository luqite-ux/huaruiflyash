import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

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
          background: "#ffffff",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 24 24" fill="none">
          <path d="M12 1.5 L21 8 L12 12.5 L3 8 Z" fill="#0B4DA1" />
          <path d="M12 11.5 L21 16 L12 22.5 L3 16 Z" fill="#0B4DA1" />
        </svg>
      </div>
    ),
    size,
  )
}
