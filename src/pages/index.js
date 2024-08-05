import { useEffect, useRef, useState } from 'react';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="gateway_container">
      <section className="bg-gray-300"></section>
      <section className="bg-gray-400"></section>
      <section className="bg-gray-500"></section>
      <section className="bg-gray-600"></section>
      <div
        onClick={moveToTop}
        className="moveToTop_area"
      >
        TOP
      </div>
    </main>
  );
}
