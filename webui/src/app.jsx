/* SPDX-License-Identifier: GPL-3.0-only */
/* Copyright (C) 2026 YuzakiKokuban <heibanbaize@gmail.com> */

import { createSignal, onMount } from 'solid-js';
import Header from './components/Header';
import ModuleList from './components/ModuleList';
import BlacklistManager from './components/BlacklistManager';
import styles from './App.module.css';

function App() {
  const [modules, setModules] = createSignal([]);
  const [blacklist, setBlacklist] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  // Simulasi fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      // Di real app, ini panggil API dari backend
      // const res = await fetch('/api/modules');
      // const data = await res.json();

      // Data dummy untuk demo
      const dummyModules = [
        { id: 'zygisk_next', name: 'Zygisk Next', version: 'v1.1.0', status: 'active', author: 'Dr-TSNG' },
        { id: 'play_integrity_fix', name: 'Play Integrity Fix', version: 'v15.9', status: 'active', author: 'chiteroman' },
        { id: 'systemless_hosts', name: 'Systemless Hosts', version: 'v1.0', status: 'inactive', author: 'topjohnwu' },
        { id: 'malware_mod', name: 'Malware Module', version: 'v2.0', status: 'blocked', author: 'unknown' },
      ];
      const dummyBlacklist = ['malware_mod', 'bootloop_mod'];

      setModules(dummyModules);
      setBlacklist(dummyBlacklist);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchData);

  const toggleBlacklist = (moduleId) => {
    setBlacklist((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div class={styles.app}>
      <Header />
      <main class={styles.main}>
        {loading() && <div class={styles.loading}>Loading modules...</div>}
        {error() && <div class={styles.error}>Error: {error()}</div>}
        {!loading() && !error() && (
          <>
            <ModuleList
              modules={modules()}
              blacklist={blacklist()}
              onToggleBlacklist={toggleBlacklist}
            />
            <BlacklistManager
              blacklist={blacklist()}
              onRemove={(id) => toggleBlacklist(id)}
            />
          </>
        )}
      </main>
      <footer class={styles.footer}>
        Hybrid Mount v6.0.0 — Built with SolidJS
      </footer>
    </div>
  );
}

export default App;