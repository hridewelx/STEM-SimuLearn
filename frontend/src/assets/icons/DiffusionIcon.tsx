import { FC, SVGProps } from 'react';

export const DiffusionIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  console.log(props),
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Container with subtle border */}
    <rect x="3" y="3" width="18" height="18" rx="2" className="stroke-current/20" />
    
    {/* Animated left particles moving right */}
    <circle cx="7" cy="8" r="1" className="fill-blue-500">
      <animate attributeName="cx" values="7;11;7" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="6" cy="14" r="0.8" className="fill-blue-500">
      <animate attributeName="cx" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="cy" values="14;13;14" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="8" cy="18" r="0.6" className="fill-blue-500">
      <animate attributeName="cx" values="8;12;8" dur="4s" repeatCount="indefinite" />
    </circle>
    
    {/* Animated right particles moving left */}
    <circle cx="17" cy="10" r="1" className="fill-amber-500">
      <animate attributeName="cx" values="17;13;17" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="18" cy="16" r="0.8" className="fill-amber-500">
      <animate attributeName="cx" values="18;14;18" dur="2.8s" repeatCount="indefinite" />
      <animate attributeName="cy" values="16;15;16" dur="2.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="16" cy="6" r="0.6" className="fill-amber-500">
      <animate attributeName="cx" values="16;12;16" dur="3.5s" repeatCount="indefinite" />
    </circle>
    
    {/* Central mixing particles with fade */}
    <circle cx="11" cy="12" r="0.7" className="fill-purple-500" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="13" cy="8" r="0.5" className="fill-purple-500" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="1.8s" repeatCount="indefinite" />
    </circle>
  </svg>
);
