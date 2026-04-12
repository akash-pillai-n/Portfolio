"use client";

import dynamic from "next/dynamic";

// Cursor ripple must be client-only (reads window/mouse events, no SSR)
const CursorRipple = dynamic(
  () => import("./ui/CursorRipple"),
  { ssr: false, loading: () => null }
);

export default function ClientCursorRipple() {
  return <CursorRipple />;
}
