import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safari Overland",
    short_name: "Safari Overland",
    description: "Connect with safari service providers across Africa",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF8C00",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
