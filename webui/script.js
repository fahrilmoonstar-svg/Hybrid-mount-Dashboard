/* SPDX-License-Identifier: GPL-3.0-only */

// ============ DATA DUMMY ============
const dummyModules = [
  { id: 'zygisk_next', name: 'Zygisk Next', version: 'v1.1.0', status: 'active', author: 'Dr-TSNG' },
  { id: 'play_integrity_fix', name: 'Play Integrity Fix', version: 'v15.9', status: 'active', author: 'chiteroman' },
  { id: 'systemless_hosts', name: 'Systemless Hosts', version: 'v1.0', status: 'inactive', author: 'topjohnwu' },
  { id: 'malware_mod', name: 'Malware Module', version: 'v2.0', status: 'blocked', author: 'unknown' },
];

let blacklist = ['malware_mod', 'bootloop_mod'];

// ============ RENDER MODULES ============
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

  // Event listener untuk tombol toggle blacklist
  container.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      toggleBlacklist(id);
    });
  });
}

// ============ TOGGLE BLACKLIST ============
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

// ============ RENDER BLACKLIST ============
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

// ============ TRAFFIC LIGHT ============
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
  status.className = `status ${data.class}`;
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

  // Berhenti otomatis setelah 6x
  setTimeout(() => {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }, 6000);
}

// ============ TAB NAVIGATION ============
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = {
    modules: document.getElementById('modules'),
    traffic: document.getElementById('traffic'),
    blacklist: document.getElementById('blacklist'),
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update aktif tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Tampilkan konten sesuai tab
      Object.keys(contents).forEach(key => {
        contents[key].classList.toggle('active', key === tab.dataset.tab);
      });
    });
  });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  renderModules();
  renderBlacklist();
  setTrafficLight('hijau');

  // Event listener tombol traffic light
  document.querySelectorAll('.btn[data-color]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      toggleTrafficLight(e.target.dataset.color);
    });
  });

  document.getElementById('autoCycle').addEventListener('click', autoCycle);
});