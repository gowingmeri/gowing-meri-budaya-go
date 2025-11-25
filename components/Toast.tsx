"use client";
import React, { useEffect } from "react";

export default function Toast({ message = "Sukses", onClose, duration = 2000 }: { message?: string; onClose?: () => void; duration?: number }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose && onClose()
    }, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  )
}
