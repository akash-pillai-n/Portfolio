"use client";

import dynamic from "next/dynamic";

const KatanaBackground = dynamic(
  () => import("./three/KatanaBackground"),
  { ssr: false, loading: () => null }
);

export default function ClientKatana() {
  return <KatanaBackground />;
}
