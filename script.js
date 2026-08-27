/* SPDX-License-Identifier: GPL-3.0-only */

// ================================================================
// LOGIN PAGE
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePass = document.getElementById('togglePass');
  const messageEl = document.getElementById('message');

  // Cek session: kalo udah login, langsung ke dashboard
  if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'dashboard.html';
    return;
  }

  // Toggle password visibility
  if (togglePass) {
    togglePass.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePass.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // Handle login submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      messageEl.textContent = '';
      messageEl.className = 'message';

      if (!username || !password) {
        messageEl.textContent = '⚠️ Username dan password harus diisi!';
        messageEl.className = 'message error';
        return;
      }

      // Validasi login (default: admin/admin123)
      if (username === 'admin' && password === 'admin123') {
        messageEl.textContent = '✅ Login berhasil! Mengalihkan...';
        messageEl.className = 'message success';

        // Simpan session
        localStorage.setItem('isLoggedIn', 'true');

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        messageEl.textContent = '❌ Username atau password salah!';
        messageEl.className = 'message error';
      }
    });
  }

  // ================================================================
  // DASHBOARD
  // ================================================================
  // Cek session: kalo belum login, balik ke halaman login
  if (window.location.pathname.includes('dashboard.html')) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'index.html';
      return;
    }
  }

  // ========== DATA DUMMY ==========
  const dummyModules = [
    { id: 'zygisk_next', name: 'Zygisk Next', version: 'v1.1.0', status: 'active', author: 'Dr-TSNG' },
    { id: 'play_integrity_fix', name: 'Play Integrity Fix', version: 'v15.9', status: 'active', author: 'chiteroman' },
    { id: 'systemless_hosts', name: 'Systemless Hosts', version: 'v1.0', status: 'inactive', author: 'topjohnwu' },
    { id: 'malware_mod', name: 'Malware Module', version: 'v2.0', status: 'blocked', author: 'unknown' },
  ];

  let blacklist = ['malware_mod', 'bootloop_mod'];

  // ========== RENDER MODULES ==========
  function renderModules() {
    const container = document.getElementById('moduleList');
    if (!container) return;

    container.innerHTML = dummyModules.map(mod => {
      const isBlacklisted = blacklist.includes(mod.id);
      const statusClass = mod.status === 'active' ? 'active' :
                          mod.status === 'inactive' ? 'inactive' :
                          'blocked';
      return `
        <div class="module-card ${isBlacklisted ? 'blacklisted' : ''}">
          <h3>${mod.name}</h3>
          <div class="details">
            <span>ID: ${mod.id}</span>
            <span>v${mod.version}</span>
            <span>by ${mod.author}</span>
          </div>
          <span class="status-badge ${statusClass}">${mod.status}</span>
          <button 
            class="toggle-btn ${isBlacklisted ? 'remove' : 'add'}"
            data-id="${mod.id}"
          >
            ${isBlacklisted ? '✅ Remove from Blacklist' : '🚫 Add to Blacklist'}
          </button>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        toggleBlacklist(id);
      });
    });
  }

  // ========== TOGGLE BLACKLIST ==========
  function toggleBlacklist(id) {
    const index = blacklist.indexOf(id);
    if (index > -1) {
      blacklist.splice(index, 1);
    } else {
      blacklist.push(id);
    }
    renderModules();
    renderBlacklist();
  }

  // ========== RENDER BLACKLIST ==========
  function renderBlacklist() {
    const container = document.getElementById('blacklistList');
    if (!container) return;

    if (blacklist.length === 0) {
      container.innerHTML = '<li style="background:transparent; border:none; color:#8b949e;">No modules blacklisted.</li>';
      return;
    }

    container.innerHTML = blacklist.map(id => `
      <li>
        ${id}
        <button class="remove-btn" data-id="${id}">✕</button>
      </li>
    `).join('');

    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        toggleBlacklist(id);
      });
    });
  }

  // ========== TRAFFIC LIGHT ==========
  let currentColor = 'hijau';
  let autoInterval = null;

  function setTrafficLight(color) {
    const light = document.getElementById('light');
    const status = document.getElementById('statusMessage');
    const colors = {
      merah: { bg: '#ff4444', icon: '🛑', msg: 'Berhenti!', class: 'merah' },
      kuning: { bg: '#ffbb00', icon: '⚠️', msg: 'Hati-hati!', class: 'kuning' },
      hijau: { bg: '#44ff44', icon: '✅', msg: 'Jalan!', class: 'hijau' },
    };

    const data = colors[color] || colors.hijau;
    light.style.background = data.bg;
    light.style.boxShadow = `0 0 30px ${data.bg}`;
    light.textContent = data.icon;
    status.textContent = data.msg;
    status.className = `status-text ${data.class}`;
    currentColor = color;
  }

  function toggleTrafficLight(color) {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
    setTrafficLight(color);
  }

  function autoCycle() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
      return;
    }

    const colors = ['merah', 'kuning', 'hijau'];
    let i = 0;
    setTrafficLight(colors[i]);

    autoInterval = setInterval(() => {
      i = (i + 1) % colors.length;
      setTrafficLight(colors[i]);
    }, 1000);

    setTimeout(() => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    }, 6000);
  }

  // ========== TAB NAVIGATION ==========
  function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn:not(#loopModulesBtn)');
    const contents = {
      modules: document.getElementById('modules'),
      traffic: document.getElementById('traffic'),
      blacklist: document.getElementById('blacklist'),
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        Object.keys(contents).forEach(key => {
          contents[key].classList.toggle('active', key === tab.dataset.tab);
        });
      });
    });
  }

  // ========== LOOP MODULES (FITUR BARU) ==========
  function logModulesToConsole() {
    console.log('%c📦 Daftar Module (via Loop)', 'font-size: 16px; font-weight: bold; color: #58a6ff;');
    console.log('=' .repeat(40));
    
    for (let i = 0; i < dummyModules.length; i++) {
      const mod = dummyModules[i];
      const statusIcon = mod.status === 'active' ? '✅' :
                         mod.status === 'inactive' ? '⏸️' :
                         '🚫';
      console.log(`${i+1}. ${statusIcon} ${mod.name} (${mod.status}) — v${mod.version} by ${mod.author}`);
    }
    
    console.log('=' .repeat(40));
    console.log(`✅ Total module: ${dummyModules.length}`);
    
    // Tampilkan notifikasi di halaman
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #0d1117;
      border: 1px solid #58a6ff;
      border-radius: 8px;
      padding: 12px 20px;
      color: #f0f6fc;
      font-size: 0.9rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      z-index: 999;
      animation: fadeIn 0.5s ease;
    `;
    msgEl.textContent = `✅ ${dummyModules.length} module telah di-log ke console!`;
    document.body.appendChild(msgEl);
    
    setTimeout(() => {
      msgEl.style.opacity = '0';
      msgEl.style.transition = 'opacity 0.5s';
      setTimeout(() => msgEl.remove(), 500);
    }, 3000);
  }

  // ========== INIT DASHBOARD ==========
  if (document.getElementById('moduleList')) {
    setupTabs();
    renderModules();
    renderBlacklist();
    setTrafficLight('hijau');

    document.querySelectorAll('.btn[data-color]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        toggleTrafficLight(e.target.dataset.color);
      });
    });

    const autoBtn = document.getElementById('autoCycle');
    if (autoBtn) {
      autoBtn.addEventListener('click', autoCycle);
    }

    // Tombol Log Modules
    const loopBtn = document.getElementById('loopModulesBtn');
    if (loopBtn) {
      loopBtn.addEventListener('click', logModulesToConsole);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
      });
    }
  }
});