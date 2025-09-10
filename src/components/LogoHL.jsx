import React from 'react'

export default function LogoHL({ className = 'h-10 w-10' }){
  return (
    <div className={`group inline-block ${className}`}>
      <svg
        viewBox="0 0 180 120"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-label="Havell logo"
      >
        {/* HL letters (simplified geometric version) */}
        <g fill="#0B0D10">
          {/* H */}
          <rect x="20" y="25" width="18" height="70" rx="2" />
          <rect x="58" y="25" width="18" height="70" rx="2" />
          <rect x="38" y="52" width="38" height="16" rx="2" />
          {/* L */}
          <rect x="110" y="25" width="18" height="70" rx="2" />
          <rect x="110" y="83" width="36" height="12" rx="2" />
        </g>
        {/* Red orbit arc */}
        <path
          d="M30,92 C60,130 150,120 155,60 C158,35 135,20 100,22"
          fill="none"
          stroke="#E3362C"
          strokeWidth="14"
          strokeLinecap="round"
          className="logo-arc"
          pathLength="1000"
        />
        <style>{`
          .logo-arc{
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            transition: stroke-dashoffset 800ms cubic-bezier(.4,0,.2,1);
          }
          .group:hover .logo-arc{ stroke-dashoffset: 0; }
        `}</style>
      </svg>
    </div>
  )
}