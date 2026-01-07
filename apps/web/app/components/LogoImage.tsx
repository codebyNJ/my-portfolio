"use client";

import React from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export default function LogoImage({ src, alt = '', className = '' }: Props) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    // hide the broken image; company text remains visible
    img.style.display = 'none';
  };

  return (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
}
