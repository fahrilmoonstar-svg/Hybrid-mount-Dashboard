/* SPDX-License-Identifier: GPL-3.0-only */
/* Copyright (C) 2026 YuzakiKokuban <heibanbaize@gmail.com> */

import { createSignal } from 'solid-js';
import styles from './TrafficLight.module.css';

function TrafficLight() {
  // State untuk warna lampu
  const [lampu, setLampu] = createSignal('hijau');
  const [pesan, setPesan] = createSignal('Jalan');

  // Fungsi untuk mengganti lampu
  const gantiLampu = (warna) => {
    setLampu(warna);
    
    // SWITCH CASE untuk menentukan pesan
    switch(warna) {
      case "merah":
        setPesan("🛑 Berhenti!");
        break;
      case "kuning":
        setPesan("⚠️ Hati-hati!");
        break;
      case "hijau":
        setPesan("✅ Jalan!");
        break;
      default:
        setPesan("❓ Lampu lalu lintas tidak diketahui");
    }
  };

  // CSS inline untuk warna lampu
  const getWarnaStyle = () => {
    const warna = lampu();
    return {
      background: warna === 'merah' ? '#ff4444' :
                  warna === 'kuning' ? '#ffbb00' :
                  '#44ff44',
      boxShadow: `0 0 30px ${warna === 'merah' ? '#ff4444' :
                              warna === 'kuning' ? '#ffbb00' :
                              '#44ff44'}`
    };
  };

  return (
    <div class={styles.container}>
      <h2 class={styles.title}>🚦 Simulasi Lampu Lalu Lintas</h2>
      
      {/* Lampu */}
      <div class={styles.trafficLight}>
        <div class={styles.light} style={getWarnaStyle()}>
          <span class={styles.icon}>
            {lampu() === 'merah' ? '🛑' :
             lampu() === 'kuning' ? '⚠️' :
             '✅'}
          </span>
        </div>
      </div>

      {/* Status */}
      <div class={styles.status}>
        <span class={styles.statusLabel}>Status:</span>
        <span class={`${styles.statusMessage} ${styles[lampu()]}`}>
          {pesan()}
        </span>
      </div>

      {/* Tombol kontrol */}
      <div class={styles.controls}>
        <button 
          class={`${styles.btn} ${styles.red}`}
          onClick={() => gantiLampu('merah')}
        >
          🔴 Merah
        </button>
        <button 
          class={`${styles.btn} ${styles.yellow}`}
          onClick={() => gantiLampu('kuning')}
        >
          🟡 Kuning
        </button>
        <button 
          class={`${styles.btn} ${styles.green}`}
          onClick={() => gantiLampu('hijau')}
        >
          🟢 Hijau
        </button>
      </div>

      {/* Auto-cycle (bonus) */}
      <div class={styles.autoCycle}>
        <button 
          class={styles.autoBtn}
          onClick={() => {
            const colors = ['merah', 'kuning', 'hijau'];
            let i = 0;
            const interval = setInterval(() => {
              gantiLampu(colors[i % colors.length]);
              i++;
              if (i >= 6) clearInterval(interval);
            }, 1000);
          }}
        >
          🔄 Auto Cycle (6x)
        </button>
      </div>
    </div>
  );
}

export default TrafficLight;