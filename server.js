// ==========================================================================
// UniFind - Campus Lost & Found Backend Server (Express.js + Supabase)
// ==========================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'your-service-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ==========================================================================
// Middleware Configuration
// ==========================================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Request Logger
app.use((req, res, next) => {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// Serve frontend static files
app.use(express.static(__dirname));

// ==========================================================================
// Database Helpers
// ==========================================================================

// Helper: Generate unique ID
function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Helper: Derive zone from location
function deriveZone(location) {
  const locLower = (location || '').toLowerCase();
  if (locLower.includes('library')) return 'Central Library';
  if (locLower.includes('union') || locLower.includes('food court')) return 'Student Union';
  if (locLower.includes('engineering')) return 'Engineering Hall';
  if (locLower.includes('science') || locLower.includes('chem') || locLower.includes('bio')) return 'Science Complex';
  if (locLower.includes('gym') || locLower.includes('rec') || locLower.includes('fitness')) return 'Recreation Center';
  if (locLower.includes('dining') || locLower.includes('cafeteria')) return 'Dining Commons';
  if (locLower.includes('dorm') || locLower.includes('quad') || locLower.includes('tower')) return 'Dorms & Quad';
  if (locLower.includes('shuttle') || locLower.includes('bus') || locLower.includes('transit')) return 'Campus Transit';
  return 'General Campus';
}

// ==========================================================================
// REST API Routes
// ==========================================================================

/**
 * GET /api/health
 * System health and uptime diagnostics
 */
app.get('/api/health', async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('items')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Health check Supabase error:', error);
      return res.status(500).json({
        success: false,
        status: 'error',
        message: 'Database connection failed: ' + error.message,
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      success: true,
      status: 'online',
      service: 'UniFind Campus API',
      uptime: Math.floor(process.uptime()),
      itemsCount: count || 0,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Database connection failed: ' + err.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/stats
 * Real-time summary statistics for campus listings
 */
app.get('/api/stats', async (req, res) => {
  try {
    const { data: items, error } = await supabase
      .from('items')
      .select('status');
    
    if (error) throw error;
    
    const total = items?.length || 0;
    const lost = items?.filter(i => i.status === 'lost').length || 0;
    const found = items?.filter(i => i.status === 'found').length || 0;
    const reunited = items?.filter(i => i.status === 'reunited').length || 0;

    res.json({
      success: true,
      data: {
        total,
        lost,
        found,
        reunited,
        successRate: total > 0 ? Math.round((reunited / total) * 100) : 0
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

/**
 * GET /api/items
 * Retrieve all items with query filtering and sorting
 * Query params: status, category, zone, search, sort
 */
app.get('/api/items', async (req, res) => {
  try {
    let query = supabase.from('items').select('*');
    const { status, category, zone, search, sort } = req.query;

    // Filter by Status
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Filter by Category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Filter by Campus Zone
    if (zone && zone !== 'all') {
      const qZone = zone.toLowerCase();
      query = query.or(`zone.ilike.%${qZone}%,location.ilike.%${qZone}%`);
    }

    // Search Keyword
    if (search && search.trim() !== '') {
      const q = search.trim();
      query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%,category.ilike.%${q}%,custody.ilike.%${q}%`);
    }

    // Sort Results
    if (sort === 'oldest') {
      query = query.order('date', { ascending: true });
    } else if (sort === 'name-asc') {
      query = query.order('title', { ascending: true });
    } else {
      // Default newest first
      query = query.order('date', { ascending: false });
    }

    const { data: items, error, count } = await query;
    
    if (error) throw error;

    res.json({
      success: true,
      count: items?.length || 0,
      data: items || []
    });
  } catch (err) {
    console.error('Get items error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items'
    });
  }
});

/**
 * GET /api/items/:id
 * Retrieve single item by ID
 */
app.get('/api/items/:id', async (req, res) => {
  try {
    const { data: item, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !item) {
      return res.status(404).json({
        success: false,
        message: `Item with ID "${req.params.id}" not found`
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    console.error('Get item error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch item'
    });
  }
});

/**
 * POST /api/items
 * Create a new lost or found report
 */
app.post('/api/items', async (req, res) => {
  try {
    const { title, type, category, location, date, role, contact, description, custody, zone } = req.body;

    // Validation
    if (!title || !type || !category || !location || !date || !contact) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, type, category, location, date, and contact are mandatory.'
      });
    }

    const computedZone = zone || deriveZone(location);

    const newItem = {
      id: generateId('item'),
      title: String(title).trim(),
      type: type === 'found' ? 'found' : 'lost',
      status: type === 'found' ? 'found' : 'lost',
      category: String(category).trim(),
      location: String(location).trim(),
      zone: computedZone,
      date: String(date),
      role: role || 'Student',
      custody: type === 'found' ? (custody ? String(custody).trim() : 'Held by finder') : '',
      contact: String(contact).trim(),
      description: description ? String(description).trim() : '',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from('items')
      .insert([newItem])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Report published successfully',
      data: data
    });
  } catch (err) {
    console.error('Create item error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create report'
    });
  }
});

/**
 * PATCH /api/items/:id/status
 * Update status of an item (e.g. mark as 'reunited')
 */
app.patch('/api/items/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['lost', 'found', 'reunited'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}`
      });
    }

    const { data, error } = await supabaseAdmin
      .from('items')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: `Item with ID "${req.params.id}" not found`
      });
    }

    res.json({
      success: true,
      message: `Item status updated to "${status}"`,
      data: data
    });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update item status'
    });
  }
});

/**
 * DELETE /api/items/:id
 * Delete or archive an item
 */
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('items')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (err) {
    console.error('Delete item error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete item'
    });
  }
});

/**
 * POST /api/claims
 * Submit an ownership verification claim request
 */
app.post('/api/claims', async (req, res) => {
  try {
    const { itemId, claimantName, claimantContact, verificationClues } = req.body;

    if (!itemId || !claimantContact || !verificationClues) {
      return res.status(400).json({
        success: false,
        message: 'Missing required claim fields: itemId, claimantContact, and verificationClues.'
      });
    }

    const newClaim = {
      claim_id: generateId('claim'),
      item_id: itemId,
      claimant_name: claimantName || 'Anonymous Student',
      claimant_contact: claimantContact,
      verification_clues: verificationClues,
      submitted_at: new Date().toISOString(),
      status: 'pending_verification'
    };

    const { data, error } = await supabaseAdmin
      .from('claims')
      .insert([newClaim])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Claim request registered. The reporter has been notified to verify your ownership proof.',
      data: data
    });
  } catch (err) {
    console.error('Create claim error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit claim'
    });
  }
});

/**
 * GET /api/desks
 * Verified Campus Drop-Off Desks directory
 */
app.get('/api/desks', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'desk-1',
        name: 'Campus Safety Headquarters',
        hours: '24/7 Service',
        location: 'Security Building B, Suite 102',
        phone: '(555) 019-4400',
        priorityItems: ['Student IDs', 'Wallets', 'Laptops', 'Keys']
      },
      {
        id: 'desk-2',
        name: 'Central Library Helpdesk',
        hours: 'Mon - Sun: 8 AM - 11 PM',
        location: 'Main Atrium, 1st Floor Desk',
        phone: '(555) 019-8230',
        priorityItems: ['Books', 'Calculators', 'Earbuds', 'Chargers']
      },
      {
        id: 'desk-3',
        name: 'Student Union Info Desk',
        hours: 'Mon - Fri: 8 AM - 8 PM',
        location: 'Student Center, Lobby Level',
        phone: '(555) 019-3310',
        priorityItems: ['Jackets', 'Water Bottles', 'Backpacks', 'Cards']
      },
      {
        id: 'desk-4',
        name: 'Recreation Center Desk',
        hours: 'Mon - Sat: 6 AM - 10 PM',
        location: 'Main Gym Entrance Lobby',
        phone: '(555) 019-5520',
        priorityItems: ['Gym bags', 'Hydro flasks', 'Shoes', 'Fitness watches']
      }
    ]
  });
});

// Fallback route for single page apps (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==========================================================================
// Start Server
// ==========================================================================
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🎓 UniFind Campus Server running at: http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - GET    /api/health`);
  console.log(`   - GET    /api/stats`);
  console.log(`   - GET    /api/items (supports status, category, zone, search, sort)`);
  console.log(`   - GET    /api/items/:id`);
  console.log(`   - POST   /api/items`);
  console.log(`   - PATCH  /api/items/:id/status`);
  console.log(`   - POST   /api/claims`);
  console.log(`   - GET    /api/desks`);
  console.log(`=======================================================`);
  console.log(`⚠️  Configure SUPABASE_URL and SUPABASE_ANON_KEY in environment variables`);
});