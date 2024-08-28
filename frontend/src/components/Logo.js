import React from 'react';

const Logo = ({w,h}) => (
  <svg
    width={w} height={h}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512.016 512.016"
    xmlSpace="preserve"
  >
    <polygon points="145.544,151.36 105.184,31.92 0.68,31.92 0.68,0 128.096,0 175.784,141.136" />
    <polygon
      style={{ fill: '#FFD67F' }}
      points="68.128,124.56 511.336,124.56 426.856,361.584 141.936,361.584"
    />
    <circle cx="377.128" cy="450.56" r="61.456" />
    <circle cx="191.752" cy="450.56" r="61.456" />
    <polygon
      style={{ fill: '#FF583E' }}
      points="325.28,52.496 451.744,180.664 325.28,308.816 203.936,308.816 330.608,180.664 203.936,52.496"
    />
  </svg>
);

export default Logo;