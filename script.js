/* SPDX-License-Identifier: GPL-3.0-only */

// ================================================================
// LOGIN PAGE & SESSION (SAMA SEPERTI SEBELUMNYA)
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  // ... (kode login dan session sama seperti sebelumnya) ...
});

// ================================================================
// DASHBOARD
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Cek session
  if (window.location.pathname.includes('dashboard.html')) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'index.html';
      return;
    }
  }

  // ========== DATA CLAN ==========
  let clanData = {
    name: 'Hybrid Warriors',
    tag: 'HYB',
    members: 42,
    rank: 'Elite',
  };

  // ========== RENDER CLAN ==========
  function renderClan() {
    const nameEl = document.getElementById('clanName');
    const tagEl = document.getElementById('clanTag');
    const membersEl = document.getElementById('clanMembers');
    const rankEl = document.getElementById('clanRank');

    if (nameEl) nameEl.textContent = clanData.name;
    if (tagEl) tagEl.textContent = clanData.tag;
    if (membersEl) membersEl.textContent = clanData.members;
    if (rankEl) rankEl.textContent = clanData.rank;
  }

  // ========== EDIT CLAN (Popup Sederhana) ==========
  function editClan() {
    const newName = prompt('Masukkan nama clan baru:', clanData.name);
    if (newName !== null && newName.trim() !== '') {
      clanData.name = newName.trim();
    }

    const newTag = prompt('Masukkan tag clan baru:', clanData.tag);
    if (newTag !== null && newTag.trim() !== '') {
      clanData.tag = newTag.trim().toUpperCase();
    }

    const newMembers = prompt('Masukkan jumlah anggota clan:', clanData.members);
    if (newMembers !== null && !isNaN(newMembers) && Number(newMembers) > 0) {
      clanData.members = Number(newMembers);
    }

    const newRank = prompt('Masukkan rank clan:', clanData.rank);
    if (newRank !== null && newRank.trim() !== '') {
      clanData.rank = newRank.trim();
    }

    renderClan();
  }

  // ========== DATA DUMMY MODULES & BLACKLIST ==========
  // ... (kode dummyModules dan blacklist sama seperti sebelumnya) ...

  // ========== RENDER MODULES ==========
  // ... (fungsi renderModules, toggleBlacklist, renderBlacklist sama) ...

  // ========== TRAFFIC LIGHT ==========
  // ... (fungsi setTrafficLight, autoCycle, dll sama) ...

  // ========== TAB NAVIGATION ==========
  function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn:not(#loopModulesBtn)');
    const contents = {
      modules: document.getElementById('modules'),
      traffic: document.getElementById('traffic'),
      blacklist: document.getElementById('blacklist'),
      clan: document.getElementById('clan'), // Tambahkan clan
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        Object.keys(contents).forEach(key => {
          if (contents[key]) {
            contents[key].classList.toggle('active', key === tab.dataset.tab);
          }
        });
      });
    });
  }

  // ========== LOOP MODULES ==========
  function logModulesToConsole() {
    // ... (sama seperti sebelumnya) ...
  }

  // ========== INIT DASHBOARD ==========
  if (document.getElementById('moduleList')) {
    setupTabs();
    renderModules();
    renderBlacklist();
    renderClan(); // Render clan
    setTrafficLight('hijau');

    // Event listener untuk tombol traffic light
    document.querySelectorAll('.btn[data-color]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        toggleTrafficLight(e.target.dataset.color);
      });
    });

    // Auto cycle
    const autoBtn = document.getElementById('autoCycle');
    if (autoBtn) {
      autoBtn.addEventListener('click', autoCycle);
    }

    // Log Modules
    const loopBtn = document.getElementById('loopModulesBtn');
    if (loopBtn) {
      loopBtn.addEventListener('click', logModulesToConsole);
    }

    // Edit Clan
    const editBtn = document.getElementById('editClanBtn');
    if (editBtn) {
      editBtn.addEventListener('click', editClan);
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
      });
    }
  }
});