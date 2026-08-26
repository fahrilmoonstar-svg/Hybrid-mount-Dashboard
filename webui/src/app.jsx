/* SPDX-License-Identifier: GPL-3.0-only */

import { createSignal, onMount } from 'solid-js';
import Header from './components/Header';
import ModuleList from './components/ModuleList';
import BlacklistManager from './components/BlacklistManager';
import TrafficLight from './components/TrafficLight'; // ← IMPORT BARU
import styles from './App.module.css';

function App() {
  const [modules, setModules] = createSignal([]);
  const [blacklist, setBlacklist] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  const [activeTab, setActiveTab] = createSignal('modules'); // ← TAB BARU

  // ... (fetchData, toggleBlacklist, dll sama kayak sebelumnya)

  return (
    <div class={styles.app}>
      <Header />
      
      {/* TAB NAVIGATION */}
      <div class={styles.tabs}>
        <button 
          class={activeTab() === 'modules' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('modules')}
        >
          📦 Modules
        </button>
        <button 
          class={activeTab() === 'traffic' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('traffic')}
        >
          🚦 Traffic Light
        </button>
        <button 
          class={activeTab() === 'blacklist' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('blacklist')}
        >
          🚫 Blacklist
        </button>
      </div>

      <main class={styles.main}>
        {activeTab() === 'modules' && (
          <>
            {loading() && <div class={styles.loading}>Loading modules...</div>}
            {error() && <div class={styles.error}>Error: {error()}</div>}
            {!loading() && !error() && (
              <ModuleList
                modules={modules()}
                blacklist={blacklist()}
                onToggleBlacklist={toggleBlacklist}
              />
            )}
          </>
        )}

        {activeTab() === 'traffic' && (
          <TrafficLight />
        )}

        {activeTab() === 'blacklist' && (
          <BlacklistManager
            blacklist={blacklist()}
            onRemove={(id) => toggleBlacklist(id)}
          />
        )}
      </main>

      <footer class={styles.footer}>
        Hybrid Mount v6.0.0 — Built with SolidJS
      </footer>
    </div>
  );
}

export default App;