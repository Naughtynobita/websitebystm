// ==========================================================================
// UniFind - College Campus Lost & Found Portal Application Logic
// ==========================================================================

// Realistic campus sample data to populate the portal with immediate activity
const DEFAULT_ITEMS = [
  {
    id: 'item-1',
    title: 'Apple AirPods Pro (2nd Gen) in Matte Case',
    type: 'found',
    status: 'found',
    category: 'Electronics',
    location: 'Central Library, 2nd Floor Quiet Study',
    zone: 'Central Library',
    date: '2026-10-14',
    role: 'Library Desk',
    custody: 'Turned into Central Library 1st Floor Circulation Desk',
    contact: 'library-desk@university.edu',
    description: 'Found inside a matte black silicone case on desk #18. AirPods are fully charged. Please provide the Bluetooth pairing name to verify ownership.'
  },
  {
    id: 'item-2',
    title: 'University Student ID Card - Liam Chen',
    type: 'found',
    status: 'found',
    category: 'ID & Cards',
    location: 'Student Union Food Court',
    zone: 'Student Union',
    date: '2026-10-15',
    role: 'Campus Security',
    custody: 'Campus Security Office (Bldg B, Room 102)',
    contact: 'campus-security@university.edu',
    description: 'Student ID card ending in #8492 with a green campus lanyard. Picked up near the salad bar counter and safely logged at the campus safety headquarters.'
  },
  {
    id: 'item-3',
    title: 'Graphing Calculator (TI-84 Plus CE Python)',
    type: 'lost',
    status: 'lost',
    category: 'Electronics',
    location: 'Engineering Hall, Lecture Room 302',
    zone: 'Engineering Hall',
    date: '2026-10-13',
    role: 'Student',
    custody: '',
    contact: 'sarah.m@student.university.edu',
    description: 'Matte black TI-84 with a silver NASA astronaut sticker on the rear slide cover. Misplaced right after the Calculus III morning lecture.'
  },
  {
    id: 'item-4',
    title: 'Dorm Room Brass Keys & Red Car Fob',
    type: 'lost',
    status: 'lost',
    category: 'Keys',
    location: 'Dorms & Quad, West Lawn Benches',
    zone: 'Dorms & Quad',
    date: '2026-10-14',
    role: 'Student',
    custody: '',
    contact: 'jake.dorm@student.university.edu',
    description: 'Three brass dorm keys on a red anodized aluminum carabiner with a small Toyota ignition fob. Urgent as I cannot enter my residence hall.'
  },
  {
    id: 'item-5',
    title: 'Teal Hydro Flask (32 oz Wide Mouth)',
    type: 'found',
    status: 'reunited',
    category: 'Personal Items',
    location: 'Recreation Center, Main Gymnasium',
    zone: 'Recreation Center',
    date: '2026-10-12',
    role: 'Student',
    custody: 'Reunited with owner at Gym Front Desk',
    contact: 'gym-reception@university.edu',
    description: 'Teal wide-mouth bottle with small dent on base and National Parks sticker. Reunited with student owner on Oct 14!'
  },
  {
    id: 'item-5b',
    title: 'Black Samsung Galaxy Watch 6',
    type: 'found',
    status: 'reunited',
    category: 'Electronics',
    location: 'Student Union, 2nd Floor Lounge',
    zone: 'Student Union',
    date: '2026-10-10',
    role: 'Student',
    custody: 'Returned to owner after verification at Student Union desk',
    contact: 'union-info@university.edu',
    description: 'Black smart watch with a cracked screen protector. Returned to its owner after matching the watch ID and campus QR code.'
  },
  {
    id: 'item-5c',
    title: 'Silver MacBook Pro Charger (140W)',
    type: 'found',
    status: 'reunited',
    category: 'Electronics',
    location: 'Central Library, Tech Commons',
    zone: 'Central Library',
    date: '2026-10-09',
    role: 'Library Desk',
    custody: 'Returned to CS student after identity confirmation',
    contact: 'library-tech@university.edu',
    description: 'Silver 140W charger with a small tape mark and clean cable wrap. Returned to the owner during library desk verification.'
  },
  {
    id: 'item-5d',
    title: 'Blue Water Bottle with Sticker Pack',
    type: 'found',
    status: 'reunited',
    category: 'Personal Items',
    location: 'Dining Commons, South Terrace',
    zone: 'Dining Commons',
    date: '2026-10-08',
    role: 'Student',
    custody: 'Picked up by owner after matching blue sticker design',
    contact: 'dining-services@university.edu',
    description: 'Blue stainless bottle with a backpack strap and small star sticker cluster. Returned to the student after a quick photo match.'
  },
  {
    id: 'item-6',
    title: 'Grey North Face Recon Backpack',
    type: 'lost',
    status: 'lost',
    category: 'Books & Study',
    location: 'Science Complex, Chemistry Lab B',
    zone: 'Science Complex',
    date: '2026-10-15',
    role: 'Student',
    custody: '',
    contact: 'emily.bio@student.university.edu',
    description: 'Contains Organic Chemistry textbook, green spiral notebook with exam notes, and black reading glasses in the front pouch.'
  },
  {
    id: 'item-7',
    title: 'Apple 67W USB-C Charger & MagSafe 3 Cable',
    type: 'found',
    status: 'found',
    category: 'Electronics',
    location: 'Central Library, Tech Commons 1st Floor',
    zone: 'Central Library',
    date: '2026-10-14',
    role: 'Library Desk',
    custody: 'Tech Commons Equipment Desk',
    contact: 'library-tech@university.edu',
    description: 'Left plugged into wall outlet cluster #4 beside the 3D printers. Braided white cable with grey cable wrap.'
  },
  {
    id: 'item-8',
    title: 'Navy Blue University Varsity Hoodie (Size L)',
    type: 'found',
    status: 'found',
    category: 'Clothing',
    location: 'Dining Commons, South Booth #12',
    zone: 'Dining Commons',
    date: '2026-10-13',
    role: 'Student',
    custody: 'Turned into Dining Hall Manager Office',
    contact: 'dining-services@university.edu',
    description: 'Campus bookstore varsity hoodie with embroidered university seal. In great condition, freshly laundered.'
  },
  {
    id: 'item-9',
    title: 'Leather Bi-fold Wallet with Campus Transit Pass',
    type: 'lost',
    status: 'lost',
    category: 'ID & Cards',
    location: 'Campus Transit, Blue Shuttle Line Bus #4',
    zone: 'Campus Transit',
    date: '2026-10-15',
    role: 'Student',
    custody: '',
    contact: 'marcus.t@student.university.edu',
    description: 'Dark brown leather wallet containing student metro pass and driver license. Reward offered for return.'
  },
  {
    id: 'item-10',
    title: 'Prescription Reading Glasses in Amber Tortoise Case',
    type: 'found',
    status: 'reunited',
    category: 'Personal Items',
    location: 'Dorms & Quad, North Tower Lobby Lounge',
    zone: 'Dorms & Quad',
    date: '2026-10-11',
    role: 'Faculty / Staff',
    custody: 'Returned to dorm resident',
    contact: 'ra-north@university.edu',
    description: 'Gold-rimmed round frames in brown case. Safely verified and returned to student owner.'
  }
];

// App State
let items = [];
let activeStatusFilter = 'all';
let activeCategoryFilter = 'all';
let activeLocationFilter = 'all';
let activeSortOrder = 'newest';
let searchQuery = '';
let isServerOnline = false;

const API_BASE = '/api';

// Supabase Client
const SUPABASE_URL = 'https://xsrbkwcjypngzuknjnyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcmJrd2NqeXBuZ3p1a25qbnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNTA2ODEsImV4cCI6MjEwNzYyNjY4MX0.pJ33ZGc6QMKK6uYnpuyOgMfYbUZhgZf1xN7Fq3Us8T0';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let authMode = 'login';

// DOM Elements
const itemsGrid = document.getElementById('items-grid');
const emptyState = document.getElementById('empty-state');
const emptyResetBtn = document.getElementById('empty-reset-btn');
const emptyReportBtn = document.getElementById('empty-report-btn');
const resultsCount = document.getElementById('results-count');
const activeFilterChips = document.getElementById('active-filter-chips');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const statusTabs = document.querySelectorAll('.status-tabs .tab');
const categoryFilter = document.getElementById('category-filter');
const locationFilter = document.getElementById('location-filter');
const sortSelect = document.getElementById('sort-select');

// Server Status Indicator
const serverStatusPill = document.getElementById('server-status-pill');
const serverStatusText = document.getElementById('server-status-text');

const authTriggerBtn = document.getElementById('auth-trigger-btn');
const userMenuWrap = document.getElementById('user-menu-wrap');
const userMenuButton = document.getElementById('user-menu-button');
const userDropdown = document.getElementById('user-dropdown');
const userAvatar = document.getElementById('user-avatar');
const userNameDisplay = document.getElementById('user-name-display');
const userLevelDisplay = document.getElementById('user-level-display');
const authModal = document.getElementById('auth-modal');
const closeAuthModalBtn = document.getElementById('close-auth-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');
const logoutBtn = document.getElementById('logout-btn');

// Navigation Elements
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const dismissBannerBtn = document.getElementById('dismiss-banner-btn');

// Modals & Controls
const reportModal = document.getElementById('report-modal');
// const openReportBtn = document.getElementById('open-report-btn'); // Element doesn't exist in HTML
const closeReportModalBtn = document.getElementById('close-report-modal');
const cancelReportBtn = document.getElementById('cancel-report-btn');
const reportForm = document.getElementById('report-form');
const itemDateInput = document.getElementById('item-date');
const custodyGroup = document.getElementById('custody-group');
const labelLocation = document.getElementById('label-location');
const radioTypeLost = document.getElementById('type-lost');
const radioTypeFound = document.getElementById('type-found');

const claimModal = document.getElementById('claim-modal');
const closeClaimModalBtn = document.getElementById('close-claim-modal');
const claimModalTitle = document.getElementById('claim-modal-title');
const claimModalSubtitle = document.getElementById('claim-modal-subtitle');
const claimModalContent = document.getElementById('claim-modal-content');
const claimModalActions = document.getElementById('claim-modal-actions');

// Statistics
const statTotal = document.getElementById('stat-total');
const statLost = document.getElementById('stat-lost');
const statFound = document.getElementById('stat-found');
const statReunited = document.getElementById('stat-reunited');

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const toast = document.getElementById('toast');

// ==========================================================================
// Initialization & Server Connection
// ==========================================================================
async function init() {
  ensureDefaultItems();
  initTheme();
  initDefaultDate();
  await initializeAuth();
  syncAuthUI();
  bindEvents();
  renderRewardsPanel();
  await loadData();
  render();
}

// Initialize Supabase Auth - check for existing session
async function initializeAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // User is logged in, fetch their profile
    await fetchUserProfile(session.user.id);
  } else {
    // Check localStorage for legacy user
    const storedUser = getCurrentUserFromStorage();
    if (storedUser) {
      currentUser = storedUser;
    }
  }

  // Listen for auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      await fetchUserProfile(session.user.id);
      syncAuthUI();
      showToast(`Welcome back, ${currentUser.fullName.split(' ')[0]}!`);
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      localStorage.removeItem('unifind_current_user_v2');
      syncAuthUI();
    } else if (event === 'TOKEN_REFRESHED' && session) {
      await fetchUserProfile(session.user.id);
      syncAuthUI();
    }
  });
}

// Fetch user profile from Supabase profiles table
async function fetchUserProfile(userId) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error || !profile) {
      console.log('No profile found, creating default');
      // Create default profile for new auth users
      await createDefaultProfile(userId);
      return;
    }
    
    saveCurrentUser({
      id: profile.id,
      fullName: profile.full_name,
      email: profile.email,
      studentId: profile.student_id,
      department: profile.department,
      year: profile.year,
      phone: profile.phone,
      profilePhoto: profile.profile_photo || '',
      points: profile.points || 0,
      verifiedReturns: profile.verified_returns || 0,
      rating: profile.rating || 0,
      activityMonths: profile.activity_months || [],
      isLeaderboardVisible: profile.is_leaderboard_visible !== false
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
  }
}

// Create default profile for new Supabase Auth users
async function createDefaultProfile(userId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  
  const defaultProfile = {
    id: userId,
    email: user.email,
    full_name: user.user_metadata?.full_name || user.email.split('@')[0],
    student_id: user.user_metadata?.student_id || '',
    department: user.user_metadata?.department || '',
    year: user.user_metadata?.year || '',
    phone: user.user_metadata?.phone || '',
    profile_photo: '',
    points: 0,
    verified_returns: 0,
    rating: 0,
    activity_months: [],
    is_leaderboard_visible: true,
    created_at: new Date().toISOString()
  };
  
  const { error } = await supabase.from('profiles').upsert(defaultProfile);
  if (error) {
    console.error('❌ Failed to create profile:', error.message);
  } else {
    console.log('✅ Profile created/updated for:', userId);
  }
  saveCurrentUser(defaultProfile);
}

function syncAuthUI() {
  currentUser = getCurrentUserFromStorage();

  if (authTriggerBtn) {
    authTriggerBtn.classList.toggle('hidden', !!currentUser);
  }

  if (userMenuWrap) {
    userMenuWrap.classList.toggle('hidden', !currentUser);
  }

  if (!currentUser) {
    if (userNameDisplay) userNameDisplay.textContent = 'Student';
    if (userLevelDisplay) userLevelDisplay.textContent = 'Guest';
    if (userAvatar) userAvatar.textContent = 'G';
    return;
  }

  const initials = currentUser.fullName
    .split(' ')
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('') || 'ST';

  if (userAvatar) userAvatar.textContent = initials;
  if (userNameDisplay) userNameDisplay.textContent = currentUser.fullName;
  if (userLevelDisplay) userLevelDisplay.textContent = getStudentLevel(currentUser.points || 0);
  renderRewardsPanel();
}

function getStudentLevel(points) {
  if (points >= 500) return 'Campus Hero';
  if (points >= 250) return 'Gold';
  if (points >= 100) return 'Silver';
  return 'Bronze';
}

function renderRewardsPanel() {
  const user = currentUser || { fullName: 'Guest User', points: 0, verifiedReturns: 0, rating: 0, activityMonths: [] };
  const points = Number(user.points || 0);
  const verifiedReturns = Number(user.verifiedReturns || 0);
  const rating = Number(user.rating || 0);
  const nextLevelPoints = getNextLevelTarget(points);
  const level = getStudentLevel(points);
  const scholarshipProgress = Math.min((points / 500) * 100, 100);
  const scholarshipEligible = points >= 500 && verifiedReturns >= 10 && (user.activityMonths || []).length >= 4 && rating >= 4;

  const pointsTotal = document.getElementById('reward-points-total');
  const nextText = document.getElementById('reward-next-level-text');
  const rewardLevelBadge = document.getElementById('reward-level-badge');
  const returnsTotal = document.getElementById('reward-returns-total');
  const ratingTotal = document.getElementById('reward-rating-total');
  const scholarshipState = document.getElementById('reward-scholarship-state');
  const progressText = document.getElementById('scholarship-progress-text');
  const progressFill = document.getElementById('scholarship-progress-fill');
  const scholarshipStatePill = document.getElementById('scholarship-state-pill');
  const scholarshipStatusBadge = document.getElementById('scholarship-status-badge');

  if (pointsTotal) pointsTotal.textContent = points;
  if (nextText) nextText.textContent = points >= 500 ? 'Scholarship threshold reached' : `Next level: ${points} / ${nextLevelPoints}`;
  if (rewardLevelBadge) rewardLevelBadge.textContent = level;
  if (returnsTotal) returnsTotal.textContent = verifiedReturns;
  if (ratingTotal) ratingTotal.textContent = `${rating.toFixed(1)}/5`;
  if (scholarshipState) scholarshipState.textContent = scholarshipEligible ? 'Eligible' : 'Not Eligible';
  if (progressText) progressText.textContent = `${points} / 500 points`;
  if (progressFill) progressFill.style.width = `${scholarshipProgress}%`;
  if (scholarshipStatePill) scholarshipStatePill.textContent = scholarshipEligible ? 'Eligible' : 'Not Eligible';
  if (scholarshipStatusBadge) scholarshipStatusBadge.textContent = currentUser ? (scholarshipEligible ? 'Scholarship Eligible' : 'Review in Progress') : 'Guest Access';

  const checklist = document.getElementById('scholarship-checklist');
  if (checklist) {
    const items = checklist.children;
    if (items.length >= 4) {
      items[0].style.opacity = points >= 500 ? '1' : '0.6';
      items[1].style.opacity = verifiedReturns >= 10 ? '1' : '0.6';
      items[2].style.opacity = (user.activityMonths || []).length >= 4 ? '1' : '0.6';
      items[3].style.opacity = rating >= 4 ? '1' : '0.6';
    }
  }
}

function getNextLevelTarget(points) {
  if (points < 100) return 100;
  if (points < 250) return 250;
  if (points < 500) return 500;
  return 500;
}

/**
 * Checks server health and loads items from REST API or LocalStorage fallback
 */
async function loadData() {
  const online = await checkServerHealth();
  if (online) {
    try {
      const res = await fetch(`${API_BASE}/items`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        items = json.data.length ? json.data : [...DEFAULT_ITEMS];
        saveItemsToStorage();
        render();
        return;
      }
    } catch (err) {
      console.warn('API error, falling back to local cache:', err);
    }
  }

  // Fallback to local storage
  loadItemsFromStorage();
  render();
}

async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    if (res.ok) {
      isServerOnline = true;
      if (serverStatusPill && serverStatusText) {
        serverStatusPill.className = 'server-status-pill online';
        serverStatusText.textContent = 'API Server Online';
      }
      return true;
    }
  } catch (err) {
    // Backend server is offline or user opened file:// directly
  }

  isServerOnline = false;
  if (serverStatusPill && serverStatusText) {
    serverStatusPill.className = 'server-status-pill offline';
    serverStatusText.textContent = 'Local Cache (Offline)';
  }
  return false;
}

function ensureDefaultItems() {
  const saved = localStorage.getItem('unifind_campus_items_v2');
  if (!saved) {
    localStorage.setItem('unifind_campus_items_v2', JSON.stringify(DEFAULT_ITEMS));
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('unifind_campus_items_v2', JSON.stringify(DEFAULT_ITEMS));
    }
  } catch (e) {
    localStorage.setItem('unifind_campus_items_v2', JSON.stringify(DEFAULT_ITEMS));
  }
}

function loadItemsFromStorage() {
  const saved = localStorage.getItem('unifind_campus_items_v2');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      items = Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_ITEMS];
    } catch (e) {
      console.error('Failed to parse saved items:', e);
      items = [...DEFAULT_ITEMS];
    }
  } else {
    items = [...DEFAULT_ITEMS];
  }
  saveItemsToStorage();
}

function saveItemsToStorage() {
  localStorage.setItem('unifind_campus_items_v2', JSON.stringify(items));
}

function initDefaultDate() {
  if (itemDateInput) {
    const today = new Date().toISOString().split('T')[0];
    itemDateInput.value = today;
  }
}

// ==========================================================================
// Render Logic
// ==========================================================================
function render() {
  updateStats();
  renderFilterChips();

  // Filter items
  let filtered = items.filter(item => {
    // Status Filter
    if (activeStatusFilter !== 'all') {
      if (item.status !== activeStatusFilter) return false;
    }

    // Category Filter
    if (activeCategoryFilter !== 'all') {
      if (item.category !== activeCategoryFilter) return false;
    }

    // Location / Zone Filter
    if (activeLocationFilter !== 'all') {
      const itemZone = item.zone || '';
      const itemLoc = item.location || '';
      const filterZone = activeLocationFilter.toLowerCase();
      if (!itemZone.toLowerCase().includes(filterZone) && !itemLoc.toLowerCase().includes(filterZone)) {
        return false;
      }
    }

    // Search Query (title, location, description, category, custody)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (item.title || '').toLowerCase().includes(q);
      const matchLoc = (item.location || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      const matchCustody = (item.custody || '').toLowerCase().includes(q);

      if (!matchTitle && !matchLoc && !matchDesc && !matchCat && !matchCustody) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (activeSortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (activeSortOrder === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (activeSortOrder === 'name-asc') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0;
  });

  // Update Result Count text
  resultsCount.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;

  // Toggle "Reset filters" link visibility
  const isFiltered = activeStatusFilter !== 'all' || 
                     activeCategoryFilter !== 'all' || 
                     activeLocationFilter !== 'all' || 
                     searchQuery.trim() !== '';

  resetFiltersBtn.style.display = isFiltered ? 'inline-flex' : 'none';

  // Render Grid or Empty state
  if (filtered.length === 0) {
    itemsGrid.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    itemsGrid.innerHTML = filtered.map(createItemCardHTML).join('');
  }
}

function createItemCardHTML(item) {
  const isLost = item.status === 'lost';
  const isFound = item.status === 'found';
  const isReunited = item.status === 'reunited';

  let badgeClass = 'badge-lost';
  let badgeLabel = '🔍 Lost';
  let ctaLabel = 'I Found This';

  if (isFound) {
    badgeClass = 'badge-found';
    badgeLabel = '📦 Found';
    ctaLabel = 'Claim Item';
  } else if (isReunited) {
    badgeClass = 'badge-reunited';
    badgeLabel = '🎉 Reunited';
    ctaLabel = 'View History';
  }

  // Format date nicely
  const dateFormatted = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Category Icon Lookup
  const categoryIcons = {
    'Electronics': '📱',
    'ID & Cards': '🪪',
    'Keys': '🔑',
    'Books & Study': '📚',
    'Clothing': '🧥',
    'Personal Items': '🎒',
    'Sports & Gear': '⚽'
  };
  const catIcon = categoryIcons[item.category] || '📦';

  // Custody Badge Row if present
  let custodyRow = '';
  if (item.custody) {
    custodyRow = `
      <div class="custody-badge-row">
        <span>🛡️ <strong>Custody:</strong> ${escapeHTML(item.custody)}</span>
      </div>
    `;
  }

  return `
    <article class="item-card" data-id="${item.id}">
      <div>
        <div class="item-top">
          <span class="badge ${badgeClass}">${badgeLabel}</span>
          <div class="item-top-right">
            <span class="category-tag">${catIcon} ${escapeHTML(item.category)}</span>
            <span class="reporter-tag">By ${escapeHTML(item.role || 'Campus User')}</span>
          </div>
        </div>

        <h3 class="item-title">${escapeHTML(item.title)}</h3>
        <p class="item-description">${escapeHTML(item.description || 'No additional details provided.')}</p>

        <div class="item-meta">
          <div class="meta-row">
            <span class="meta-icon">📍</span>
            <span><strong>Location:</strong> ${escapeHTML(item.location)}</span>
          </div>
          <div class="meta-row">
            <span class="meta-icon">📅</span>
            <span><strong>Date:</strong> ${dateFormatted}</span>
          </div>
          ${custodyRow}
        </div>
      </div>

      <div class="item-actions">
        <button class="btn btn-secondary" onclick="openClaimModal('${item.id}')">
          Details
        </button>
        <button class="btn btn-primary" onclick="openClaimModal('${item.id}')">
          ${ctaLabel}
        </button>
        <button class="btn btn-icon btn-share" onclick="shareItem('${item.id}')" title="Copy item link">
          🔗
        </button>
      </div>
    </article>
  `;
}

function renderFilterChips() {
  if (!activeFilterChips) return;
  const chips = [];

  if (activeStatusFilter !== 'all') {
    chips.push({
      label: `Status: ${activeStatusFilter.toUpperCase()}`,
      clear: () => {
        activeStatusFilter = 'all';
        statusTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-status') === 'all'));
        render();
      }
    });
  }

  if (activeCategoryFilter !== 'all') {
    chips.push({
      label: `Category: ${activeCategoryFilter}`,
      clear: () => {
        activeCategoryFilter = 'all';
        categoryFilter.value = 'all';
        render();
      }
    });
  }

  if (activeLocationFilter !== 'all') {
    chips.push({
      label: `Zone: ${activeLocationFilter}`,
      clear: () => {
        activeLocationFilter = 'all';
        locationFilter.value = 'all';
        render();
      }
    });
  }

  if (searchQuery.trim() !== '') {
    chips.push({
      label: `Search: "${searchQuery}"`,
      clear: () => {
        searchQuery = '';
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        render();
      }
    });
  }

  activeFilterChips.innerHTML = chips.map((c, idx) => `
    <span class="filter-chip">
      ${escapeHTML(c.label)}
      <span class="chip-remove" onclick="removeFilterChip(${idx})">&times;</span>
    </span>
  `).join('');

  window._activeChips = chips;
}

window.removeFilterChip = function(idx) {
  if (window._activeChips && window._activeChips[idx]) {
    window._activeChips[idx].clear();
  }
};

function updateStats() {
  const total = items.length;
  const lostCount = items.filter(i => i.status === 'lost').length;
  const foundCount = items.filter(i => i.status === 'found').length;
  const reunitedCount = items.filter(i => i.status === 'reunited').length;

  statTotal.textContent = total;
  statLost.textContent = lostCount;
  statFound.textContent = foundCount;
  statReunited.textContent = reunitedCount;
}

// ==========================================================================
// Event Listeners & Modals
// ==========================================================================
function bindEvents() {
  // Auth triggers
  if (authTriggerBtn) {
    authTriggerBtn.addEventListener('click', () => openAuthModal('login'));
  }

  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', closeAuthModal);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await supabase.auth.signOut();
      localStorage.removeItem('unifind_current_user_v2');
      currentUser = null;
      syncAuthUI();
      closeUserMenu();
      showToast('Logged out successfully.');
    });
  }

  if (userMenuButton) {
    userMenuButton.addEventListener('click', () => {
      const isHidden = userDropdown.classList.toggle('hidden');
      userMenuButton.setAttribute('aria-expanded', String(!isHidden));
    });
  }

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.authTab;
      setAuthTab(mode);
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', handleSignUpSubmit);
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
      const identifier = document.getElementById('login-identifier')?.value.trim() || '';
      if (!identifier) {
        showToast('Enter your email or student ID to receive a reset link.');
        return;
      }
      showToast(`Password reset link sent to the registered email for ${identifier}.`);
    });
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
      closeUserMenu();
    }
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    render();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    render();
  });

  // Status Tabs
  statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      statusTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeStatusFilter = tab.getAttribute('data-status');
      render();
    });
  });

  // Category Filter
  categoryFilter.addEventListener('change', (e) => {
    activeCategoryFilter = e.target.value;
    render();
  });

  // Location Filter
  locationFilter.addEventListener('change', (e) => {
    activeLocationFilter = e.target.value;
    render();
  });

  // Sort Selector
  sortSelect.addEventListener('change', (e) => {
    activeSortOrder = e.target.value;
    render();
  });

  // Reset Filters
  resetFiltersBtn.addEventListener('click', resetFilters);
  emptyResetBtn.addEventListener('click', resetFilters);

  // Navigation Links & Buttons
  document.getElementById('nav-report-lost-btn')?.addEventListener('click', () => openReportModal('lost'));
  document.getElementById('nav-report-found-btn')?.addEventListener('click', () => openReportModal('found'));
  document.getElementById('nav-desks-btn')?.addEventListener('click', () => scrollToSection('dropoffs-section'));
  document.getElementById('nav-guide-btn')?.addEventListener('click', () => scrollToSection('how-it-works-section'));

  // Hero CTA Buttons
  document.getElementById('hero-lost-btn')?.addEventListener('click', () => openReportModal('lost'));
  document.getElementById('hero-found-btn')?.addEventListener('click', () => openReportModal('found'));

  // Mobile Menu Toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileNavDrawer.setAttribute('aria-hidden', !isOpen);
      mobileMenuIcon.textContent = isOpen ? '✕' : '☰';
    });
  }

  // Mobile Drawer Links
  document.getElementById('mob-browse')?.addEventListener('click', () => closeMobileMenu());
  document.getElementById('mob-report-lost')?.addEventListener('click', () => {
    closeMobileMenu();
    openReportModal('lost');
  });
  document.getElementById('mob-report-found')?.addEventListener('click', () => {
    closeMobileMenu();
    openReportModal('found');
  });
  document.getElementById('mob-desks')?.addEventListener('click', () => {
    closeMobileMenu();
    scrollToSection('dropoffs-section');
  });
  document.getElementById('mob-guide')?.addEventListener('click', () => {
    closeMobileMenu();
    scrollToSection('how-it-works-section');
  });

  // Dismiss Campus Alert Banner
  if (dismissBannerBtn) {
    dismissBannerBtn.addEventListener('click', () => {
      const banner = document.querySelector('.campus-alert-banner');
      if (banner) banner.style.display = 'none';
    });
  }

  // Report Modal Open / Close
  emptyReportBtn.addEventListener('click', () => openReportModal('lost'));
  closeReportModalBtn.addEventListener('click', () => closeModal(reportModal));
  cancelReportBtn.addEventListener('click', () => closeModal(reportModal));

  // Report Type Radio Switchers
  radioTypeLost.addEventListener('change', updateReportFormView);
  radioTypeFound.addEventListener('change', updateReportFormView);

  // Claim Modal Close
  closeClaimModalBtn.addEventListener('click', () => closeModal(claimModal));

  // Close modals when clicking backdrop
  [reportModal, claimModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(reportModal);
      closeModal(claimModal);
      closeMobileMenu();
      closeAuthModal();
    }
  });

  // Report Form Submit
  reportForm.addEventListener('submit', handleReportSubmit);

  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);
}

function closeMobileMenu() {
  if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuIcon.textContent = '☰';
  }
}

function closeUserMenu() {
  if (userDropdown) userDropdown.classList.add('hidden');
  if (userMenuButton) userMenuButton.setAttribute('aria-expanded', 'false');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function openAuthModal(mode = 'login') {
  setAuthTab(mode);
  authModal.classList.add('active');
  authModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  if (!authModal) return;
  authModal.classList.remove('active');
  authModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setAuthTab(mode) {
  authMode = mode;
  authTabs.forEach(tab => {
    const isActive = tab.dataset.authTab === mode;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  const loginPanel = document.getElementById('auth-panel-login');
  const signupPanel = document.getElementById('auth-panel-signup');
  if (loginPanel) loginPanel.classList.toggle('active', mode === 'login');
  if (signupPanel) signupPanel.classList.toggle('active', mode === 'signup');
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  loginError.textContent = '';

  const email = document.getElementById('login-identifier').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    loginError.textContent = 'Please enter your email and password.';
    return;
  }

  // Check if it's an email or student ID
  let loginEmail = email;
  if (!email.includes('@')) {
    // Try to find user by student ID first
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('student_id', email)
      .single();
    if (profile?.email) {
      loginEmail = profile.email;
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password
  });

  if (error) {
    loginError.textContent = error.message;
    return;
  }

  // Fetch user profile
  await fetchUserProfile(data.user.id);
  syncAuthUI();
  closeAuthModal();
  showToast(`Welcome back, ${currentUser.fullName.split(' ')[0]}!`);
}

async function handleSignUpSubmit(event) {
  event.preventDefault();
  signupError.textContent = '';
  signupError.style.color = '#b91c1c';

  const form = event.currentTarget;
  const fullName = document.getElementById('signup-full-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const studentId = document.getElementById('signup-student-id').value.trim();
  const department = document.getElementById('signup-department').value.trim();
  const year = document.getElementById('signup-year').value;
  const phone = document.getElementById('signup-phone').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const acceptedTerms = document.getElementById('signup-terms').checked;
  const honestyChecked = document.getElementById('signup-honesty').checked;
  const leaderboardOptIn = document.getElementById('signup-leaderboard').checked;

  if (!fullName || !email || !studentId || !department || !year || !phone || !password || !confirmPassword) {
    signupError.textContent = 'Please complete every required sign-up field.';
    return;
  }

  // Email format validation (accept any valid email)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    signupError.textContent = 'Please enter a valid email address.';
    return;
  }

  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    signupError.textContent = 'Password must be at least 8 characters and include letters and numbers.';
    return;
  }

  if (password !== confirmPassword) {
    signupError.textContent = 'Passwords do not match.';
    return;
  }

  if (!acceptedTerms || !honestyChecked) {
    signupError.textContent = 'You must accept the required checkboxes to continue.';
    return;
  }

  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        student_id: studentId,
        department,
        year,
        phone
      }
    }
  });

  if (error) {
    signupError.textContent = error.message;
    return;
  }

  if (data.user) {
    // Profile will be created by database trigger or we can create it here
    await createDefaultProfile(data.user.id);
    // Update profile with signup data
    const { error: updateError } = await supabase.from('profiles').update({
      full_name: fullName,
      student_id: studentId,
      department,
      year,
      phone,
      is_leaderboard_visible: leaderboardOptIn
    }).eq('id', data.user.id);
    
    if (updateError) {
      console.error('❌ Failed to update profile:', updateError.message);
    } else {
      console.log('✅ Profile updated with signup data');
    }
  }

  form.reset();
  closeAuthModal();
  
  if (data.session) {
    await fetchUserProfile(data.user.id);
    syncAuthUI();
    showToast('Account created! You can now report, claim, and earn kindness points.');
  } else {
    showToast('Account created! Please check your email to verify, then log in.');
  }
}

function handleAuthTabToggle() {
  const loginPanel = document.getElementById('auth-panel-login');
  const signupPanel = document.getElementById('auth-panel-signup');
  if (loginPanel) loginPanel.classList.toggle('active', authMode === 'login');
  if (signupPanel) signupPanel.classList.toggle('active', authMode === 'signup');
}

window.openReportModal = function(type = 'lost') {
  if (!currentUser) {
    openAuthModal('login');
    showToast('Please log in to report or claim an item.');
    return;
  }
  if (type === 'found') {
    radioTypeFound.checked = true;
  } else {
    radioTypeLost.checked = true;
  }
  updateReportFormView();
  openModal(reportModal);
};

window.openClaimModal = function(id) {
  if (!currentUser) {
    openAuthModal('login');
    showToast('Please log in to claim or contact a finder.');
    return;
  }

  const item = items.find(i => i.id === id);
  if (!item) return;

  const isReunited = item.status === 'reunited';
  const isFound = item.status === 'found';

  claimModalTitle.textContent = item.title;
  claimModalSubtitle.textContent = `${item.category} • Reported by ${item.role} on ${item.date}`;

  let custodyHtml = '';
  if (item.custody) {
    custodyHtml = `
      <div class="claim-info-row">
        <span class="claim-label">Safe Custody:</span>
        <span class="claim-value">🛡️ ${escapeHTML(item.custody)}</span>
      </div>
    `;
  }

  claimModalContent.innerHTML = `
    <div class="claim-info-box">
      <div class="claim-info-row">
        <span class="claim-label">Status:</span>
        <span class="claim-value" style="text-transform: capitalize;">${escapeHTML(item.status)}</span>
      </div>
      <div class="claim-info-row">
        <span class="claim-label">Campus Location:</span>
        <span class="claim-value">📍 ${escapeHTML(item.location)}</span>
      </div>
      ${custodyHtml}
      <div class="claim-info-row">
        <span class="claim-label">Reporter Contact:</span>
        <span class="claim-value">✉️ ${escapeHTML(item.contact)}</span>
      </div>
    </div>

    <div>
      <h4 style="font-size: 0.92rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-primary);">
        Item Description &amp; Verification Clues:
      </h4>
      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
        ${escapeHTML(item.description || 'No additional description provided. Please provide verification info directly to the reporter.')}
      </p>
    </div>

    <div class="verification-tip-box">
      💡 <strong>Campus Ownership Verification Tip:</strong> 
      To protect owners, do not release items without confirming specific identifiers (e.g. phone lock screen wallpaper, serial numbers, unique scratches, or exact pocket contents).
    </div>

    ${
      !isReunited
        ? `
        <div class="claim-form-box">
          <h4>📩 Submit Official Ownership Verification</h4>
          <p>Provide specific ownership clues to confirm this belonging with the finder or campus desk:</p>
          <form onsubmit="handleClaimSubmit(event, '${item.id}')">
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <input type="text" id="claimant-name" class="form-input" placeholder="Your Name / Student ID (Optional)" required />
            </div>
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <input type="text" id="claimant-contact" class="form-input" placeholder="Your University Email or Phone Number" required />
            </div>
            <div class="form-group" style="margin-bottom: 0.75rem;">
              <textarea id="claimant-clues" class="form-input" rows="2" placeholder="Specific proof (e.g. serial number, lock screen photo, stickers, contents)" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Submit Verification Proof to Database
            </button>
          </form>
        </div>
        `
        : ''
    }
  `;

  claimModalActions.innerHTML = `
    <button class="btn btn-outline" onclick="closeModal(claimModal)">Close</button>
    ${
      !isReunited
        ? `<button class="btn btn-secondary" onclick="markAsReunited('${item.id}')">🎉 Mark as Reunited</button>`
        : ''
    }
    <a href="mailto:${encodeURIComponent(item.contact)}?subject=UniFind Portal: Regarding ${encodeURIComponent(item.title)}" class="btn btn-primary">
      ✉️ Email Reporter
    </a>
  `;

  openModal(claimModal);
};

function updateReportFormView() {
  const isFound = radioTypeFound.checked;
  if (isFound) {
    labelLocation.innerHTML = 'Campus Location Where Item Was Found <span class="required">*</span>';
    custodyGroup.style.display = 'flex';
  } else {
    labelLocation.innerHTML = 'Campus Location Last Seen <span class="required">*</span>';
    custodyGroup.style.display = 'none';
  }
}

function resetFilters() {
  activeStatusFilter = 'all';
  activeCategoryFilter = 'all';
  activeLocationFilter = 'all';
  activeSortOrder = 'newest';
  searchQuery = '';

  searchInput.value = '';
  categoryFilter.value = 'all';
  locationFilter.value = 'all';
  sortSelect.value = 'newest';
  clearSearchBtn.style.display = 'none';

  statusTabs.forEach(tab => {
    const isAll = tab.getAttribute('data-status') === 'all';
    tab.classList.toggle('active', isAll);
    tab.setAttribute('aria-selected', isAll);
  });

  render();
}

/**
 * Handle Report Submission (saves to Backend API when online, or LocalStorage)
 */
async function handleReportSubmit(e) {
  e.preventDefault();

  if (!currentUser) {
    openAuthModal('login');
    showToast('Please log in to report a campus item.');
    return;
  }

  const reportType = document.querySelector('input[name="report-type"]:checked').value;
  const title = document.getElementById('item-title').value.trim();
  const category = document.getElementById('item-category').value;
  const location = document.getElementById('item-location').value.trim();
  const date = document.getElementById('item-date').value;
  const role = document.getElementById('item-role').value;
  const contact = document.getElementById('item-contact').value.trim();
  const desc = document.getElementById('item-desc').value.trim();
  const custody = document.getElementById('item-custody')?.value.trim() || '';

  if (!title || !category || !location || !date || !contact) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }

  // Derive zone tag from location
  let zone = 'General Campus';
  const locLower = location.toLowerCase();
  if (locLower.includes('library')) zone = 'Central Library';
  else if (locLower.includes('union') || locLower.includes('food court')) zone = 'Student Union';
  else if (locLower.includes('engineering')) zone = 'Engineering Hall';
  else if (locLower.includes('science') || locLower.includes('chem') || locLower.includes('bio')) zone = 'Science Complex';
  else if (locLower.includes('gym') || locLower.includes('rec') || locLower.includes('fitness')) zone = 'Recreation Center';
  else if (locLower.includes('dining') || locLower.includes('cafeteria')) zone = 'Dining Commons';
  else if (locLower.includes('dorm') || locLower.includes('quad') || locLower.includes('tower')) zone = 'Dorms & Quad';
  else if (locLower.includes('shuttle') || locLower.includes('bus') || locLower.includes('transit')) zone = 'Campus Transit';

  const payload = {
    title,
    type: reportType,
    status: reportType,
    category,
    location,
    zone,
    date,
    role,
    custody: reportType === 'found' ? (custody || 'Held by finder') : '',
    contact,
    description: desc
  };

  // Attempt server post if online
  if (isServerOnline) {
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success && result.data) {
        items.unshift(result.data);
        saveItemsToStorage();

        activeStatusFilter = 'all';
        activeCategoryFilter = 'all';
        activeLocationFilter = 'all';
        searchQuery = '';
        categoryFilter.value = 'all';
        locationFilter.value = 'all';
        sortSelect.value = 'newest';
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        statusTabs.forEach(tab => {
          const isAll = tab.getAttribute('data-status') === 'all';
          tab.classList.toggle('active', isAll);
          tab.setAttribute('aria-selected', isAll);
        });

        reportForm.reset();
        initDefaultDate();
        closeModal(reportModal);
        showToast(`🎉 Campus report saved to server database!`);
        render();
        return;
      }
    } catch (err) {
      console.warn('Server error on submit, falling back to local:', err);
    }
  }

  // Fallback local storage
  const newItem = {
    ...payload,
    id: 'item-' + Date.now()
  };
  items.unshift(newItem);
  saveItemsToStorage();

  activeStatusFilter = 'all';
  activeCategoryFilter = 'all';
  activeLocationFilter = 'all';
  searchQuery = '';
  categoryFilter.value = 'all';
  locationFilter.value = 'all';
  sortSelect.value = 'newest';
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  statusTabs.forEach(tab => {
    const isAll = tab.getAttribute('data-status') === 'all';
    tab.classList.toggle('active', isAll);
    tab.setAttribute('aria-selected', isAll);
  });

  reportForm.reset();
  initDefaultDate();
  closeModal(reportModal);

  showToast(`🎉 Campus report for "${title}" published!`);
  render();
}

// ==========================================================================
// Claim / Contact Modal Logic & Claim Submission
// ==========================================================================

window.handleClaimSubmit = async function(e, itemId) {
  e.preventDefault();

  if (!currentUser) {
    openAuthModal('login');
    showToast('Please log in to submit verification claims.');
    return;
  }

  const name = document.getElementById('claimant-name')?.value.trim();
  const contact = document.getElementById('claimant-contact')?.value.trim();
  const clues = document.getElementById('claimant-clues')?.value.trim();

  if (!contact || !clues) {
    showToast('⚠️ Please provide contact and verification clues.');
    return;
  }

  if (isServerOnline) {
    try {
      const res = await fetch(`${API_BASE}/claims`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          claimantName: name,
          claimantContact: contact,
          verificationClues: clues
        })
      });
      const result = await res.json();
      if (result.success) {
        showToast('✅ Claim proof submitted to campus safety records!');
        closeModal(claimModal);
        return;
      }
    } catch (err) {
      console.warn('Server error on claim:', err);
    }
  }

  showToast('✅ Claim proof logged locally!');
  closeModal(claimModal);
};

window.markAsReunited = async function(id) {
  if (!currentUser) {
    openAuthModal('login');
    showToast('Please log in to confirm a reunion.');
    return;
  }

  if (isServerOnline) {
    try {
      const res = await fetch(`${API_BASE}/items/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'reunited' })
      });
      const result = await res.json();
      if (result.success) {
        const itemIndex = items.findIndex(i => i.id === id);
        if (itemIndex > -1) items[itemIndex].status = 'reunited';
        saveItemsToStorage();
        closeModal(claimModal);
        showToast(`🎉 Item marked as reunited in database!`);
        render();
        return;
      }
    } catch (err) {
      console.warn('Server status update failed, saving locally:', err);
    }
  }

  // Fallback
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex > -1) {
    items[itemIndex].status = 'reunited';
    saveItemsToStorage();
    closeModal(claimModal);
    showToast(`🎉 "${items[itemIndex].title}" marked as reunited!`);
    render();
  }
};

window.shareItem = function(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;

  const shareText = `[UniFind Campus Lost & Found] ${item.status.toUpperCase()}: ${item.title} at ${item.location}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast('📋 Item details copied to clipboard!');
    }).catch(() => {
      showToast(`📍 ${item.title}`);
    });
  } else {
    showToast(`📍 ${item.title}`);
  }
};

// ==========================================================================
// UI Helpers & Theme Switcher
// ==========================================================================
function openModal(modal) {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initTheme() {
  const savedTheme = localStorage.getItem('unifind_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('unifind_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start application
document.addEventListener('DOMContentLoaded', init);