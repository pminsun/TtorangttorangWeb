import { useEffect, useState } from 'react';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="gateway_container">
      <section></section>
      <div
        onClick={moveToTop}
        className="moveToTop_area"
      >
        TOP
      </div>
    </main>
  );
}
