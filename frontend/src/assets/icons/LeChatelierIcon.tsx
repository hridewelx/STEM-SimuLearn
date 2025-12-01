import { FC, SVGProps } from 'react';

export const LeChatelierIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Balance/Scale base */}
    <path d="M12 3v18" />
    <path d="M8 21h8" />
    
    {/* Balance beam */}
    <path d="M3 9l9-2 9 2" />
    
    {/* Left pan (reactants) */}
    <circle cx="5" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
    <path d="M3 9v3" />
    
    {/* Right pan (products) */}
    <circle cx="19" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
    <path d="M21 9v3" />
    
    {/* Equilibrium arrows */}
    <path d="M9 15l2-1 2 1" />
    <path d="M11 14l2 1 2-1" />
    
    {/* Small particles/bubbles */}
    <circle cx="5" cy="11" r="0.5" fill="currentColor" />
    <circle cx="19" cy="11" r="0.5" fill="currentColor" />
  </svg>
);

export default LeChatelierIcon;
