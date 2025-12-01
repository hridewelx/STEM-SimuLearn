import { SVGProps } from 'react';

export const ReactionIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <defs>
      <linearGradient id="reactionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <style>
        {`
          .flask { 
            animation: gentleFloat 4s ease-in-out infinite; 
            filter: url(#glow);
          }
          .bubble { 
            animation: gentlePulse 3s ease-in-out infinite;
            fill: url(#reactionGradient);
          }
          .bubble-small { 
            animation: gentlePulse 2s ease-in-out infinite;
            fill: url(#reactionGradient);
          }
          .arrow { 
            animation: subtleSlide 2s ease-in-out infinite; 
          }
          .reaction-spark {
            animation: sparkle 1.5s ease-in-out infinite;
            fill: url(#reactionGradient);
          }
          .liquid-surface {
            animation: liquidWave 5s ease-in-out infinite;
          }
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-2px) rotate(0.5deg); }
            50% { transform: translateY(-1px) rotate(-0.5deg); }
            75% { transform: translateY(-1.5px) rotate(0.3deg); }
          }
          @keyframes gentlePulse {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1);
              r: 0.8;
            }
            50% { 
              opacity: 0.7; 
              transform: scale(1.1);
              r: 0.9;
            }
          }
          @keyframes subtleSlide {
            0%, 100% { 
              transform: translateX(0px) scale(1);
              opacity: 1;
            }
            50% { 
              transform: translateX(2px) scale(1.05);
              opacity: 0.9;
            }
          }
          @keyframes sparkle {
            0%, 100% { 
              opacity: 0;
              transform: scale(0) rotate(0deg);
            }
            50% { 
              opacity: 1;
              transform: scale(1) rotate(180deg);
            }
          }
          @keyframes liquidWave {
            0%, 100% { 
              d: path("M8 12c2-1 4-0.5 6-1s4-0.8 6-1");
            }
            25% { 
              d: path("M8 12c2-0.8 4-0.7 6-0.9s4-0.6 6-0.8");
            }
            50% { 
              d: path("M8 12c2-1.2 4-0.9 6-1.1s4-1 6-1.2");
            }
            75% { 
              d: path("M8 12c2-0.9 4-0.8 6-0.7s4-0.9 6-1.1");
            }
          }
        `}
      </style>
    </defs>
    
    {/* Animated Flask with Liquid */}
    <g className="flask">
      {/* Flask Outline */}
      <path d="M8 2h8" strokeWidth="1.8" />
      <path d="M10 2v4l6 6v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6l6-6V2" strokeWidth="1.8" />
      
      {/* Liquid Surface with Wave Animation */}
      <path className="liquid-surface" d="M8 12c2-1 4-0.5 6-1s4-0.8 6-1" stroke="currentColor" strokeWidth="0.8" fill="none" />
      
      {/* Liquid Fill */}
      <path d="M8 12v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6" fill="currentColor" fillOpacity="0.1" />
      
      {/* Flask Stand */}
      <path d="M9 20h6" strokeWidth="1.2" />
    </g>
    
    {/* Dynamic Bubbles with Different Sizes and Timing */}
    <circle className="bubble" cx="10" cy="14" r="0.8" style={{animationDelay: '0s'}} />
    <circle className="bubble" cx="14" cy="12" r="0.8" style={{animationDelay: '0.7s'}} />
    <circle className="bubble-small" cx="12" cy="10" r="0.6" style={{animationDelay: '1.4s'}} />
    <circle className="bubble-small" cx="11" cy="15" r="0.5" style={{animationDelay: '2.1s'}} />
    <circle className="bubble" cx="13" cy="8" r="0.7" style={{animationDelay: '0.3s'}} />
    
    {/* Reaction Sparks - Visual excitement */}
    <circle className="reaction-spark" cx="16" cy="6" r="0.4" style={{animationDelay: '0.2s'}} />
    <circle className="reaction-spark" cx="18" cy="4" r="0.3" style={{animationDelay: '0.8s'}} />
    <circle className="reaction-spark" cx="20" cy="7" r="0.5" style={{animationDelay: '1.2s'}} />
    
    {/* Animated Transformation Arrow */}
    <g className="arrow" transform="translate(18, 8)">
      <path d="M0 0h3" strokeWidth="1.8" />
      <path d="M3-1.5l1.5 1.5-1.5 1.5" strokeWidth="1.8" />
      
      {/* Energy Trail */}
      <circle cx="1" cy="0" r="0.3" fill="currentColor" opacity="0.5" style={{animation: 'gentlePulse 1s ease-in-out infinite'}} />
      <circle cx="0.5" cy="0.2" r="0.2" fill="currentColor" opacity="0.3" style={{animation: 'gentlePulse 1.2s ease-in-out infinite', animationDelay: '0.3s'}} />
    </g>
    
    {/* Molecular Interaction Dots */}
    <g opacity="0.6">
      <circle cx="6" cy="6" r="0.4" fill="currentColor" style={{animation: 'gentlePulse 2.5s ease-in-out infinite', animationDelay: '0.1s'}} />
      <circle cx="4" cy="8" r="0.4" fill="currentColor" style={{animation: 'gentlePulse 2.8s ease-in-out infinite', animationDelay: '0.4s'}} />
      <circle cx="7" cy="4" r="0.4" fill="currentColor" style={{animation: 'gentlePulse 3.1s ease-in-out infinite', animationDelay: '0.7s'}} />
    </g>
  </svg>
);