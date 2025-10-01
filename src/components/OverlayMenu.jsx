// src/components/OverlayMenu.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function OverlayMenu({ open, onClose }) {
  if (!open) return null;

  // lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* sliding panel */}
      <aside className="absolute right-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-2xl p-6 z-[110]">
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full hover:bg-black/5"
        >
          ✕
        </button>

        <nav className="mt-10 grid gap-4 text-lg">
          <Link to="/quote" onClick={onClose} className="hover:underline">Instant Quote</Link>
          <Link to="/solutions" onClick={onClose} className="hover:underline">Solutions</Link>
          <Link to="/materials" onClick={onClose} className="hover:underline">Materials</Link>
          <Link to="/about" onClick={onClose} className="hover:underline">About</Link>
          <Link to="/contact" onClick={onClose} className="hover:underline">Contact</Link>
        </nav>
      </aside>
    </div>
  );
}
