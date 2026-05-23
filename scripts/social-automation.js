#!/usr/bin/env node
/**
 * Buffer Social Auto-Poster for Precious Fix My Life
 * 
 * Setup:
 *   1. Get your Buffer API access token at https://buffer.com/developers
 *   2. Create a Buffer app and get the client_id and client_secret
 *   3. Set env vars: BUFFER_ACCESS_TOKEN, BUFFER_CLIENT_ID, BUFFER_CLIENT_SECRET
 *   4. Configure profiles (Twitter, LinkedIn, FB) below
 *   5. Run: node scripts/social-automation.js
 * 
 * For OAuth flow: https://buffer.com/developers/apps
 */

import { config } from 'dotenv';
config();

// ─── Configuration ───────────────────────────────────────────────────────────

const BUFFER_ACCESS_TOKEN = process.env.BUFFER_ACCESS_TOKEN || 'YOUR_BUFFER_ACCESS_TOKEN';
const BUFFER_API = 'https://api.bufferapp.com/1';

// Profile IDs from your Buffer account (found via GET /profiles.json)
const PROFILES = {
  twitter: process.env.BUFFER_TWITTER_PROFILE_ID || 'YOUR_TWITTER_PROFILE_ID',
  linkedin: process.env.BUFFER_LINKEDIN_PROFILE_ID || 'YOUR_LINKEDIN_PROFILE_ID',
  facebook: process.env.BUFFER_FACEBOOK_PROFILE_ID || 'YOUR_FACEBOOK_PROFILE_ID',
};

// Queue content for each social channel
const POSTS = [
  {
    profile_ids: ['twitter', 'linkedin', 'facebook'],
    text: `Your mind is racing. Your to-do list is 47 items long. And you've been telling yourself "I'll relax when everything is done" for three years straight.\n\nFix Your Mind — the first book in the Precious Fix My Life Series — is built for people like you.\n\n→ https://preciousfixmylife.com/books/fix-your-mind`,
    media: null,
    scheduled_at: null, // null = post now, or ISO string for scheduling
  },
  {
    profile_ids: ['twitter', 'linkedin'],
    text: `The biggest time-management lie we tell ourselves: "I'll say no later."\n\nThe truth: every time you say yes to something unimportant, you're saying no to something that matters.\n\nFix Your Schedule shows you exactly how to protect your time — and your energy.\n\n📖 https://preciousfixmylife.com/books/fix-your-schedule`,
    scheduled_at: null,
  },
  {
    profile_ids: ['linkedin', 'facebook'],
    text: `Most people don't have a communication problem. They have a "I don't know what I actually need" problem.\n\nFix Your Relationships breaks down the exact frameworks for asking for what you need, setting boundaries, and rebuilding trust — without being passive-aggressive or people-pleasing.\n\n→ https://preciousfixmylife.com/books/fix-your-relationships`,
    scheduled_at: null,
  },
  {
    profile_ids: ['twitter', 'linkedin'],
    text: `Money anxiety isn't just about math. It's emotional.\n\nIf you've ever felt shame around spending, fear around checking your balance, or panic at the word "budget" — this is for you.\n\nFix Your Finances addresses the emotional side of money first, then gives you a practical system.\n\n💰 https://preciousfixmylife.com/books/fix-your-finances`,
    scheduled_at: null,
  },
  {
    profile_ids: ['twitter', 'linkedin', 'facebook'],
    text: `You know what to do. You just don't do it.\n\nThat's not a motivation problem. That's a systems problem.\n\nFix Your Habits digs into the actual science of behavior change — and gives you a repeatable system to build any habit and break any bad one.\n\n🔁 https://preciousfixmylife.com/books/fix-your-habits`,
    scheduled_at: null,
  },
  {
    profile_ids: ['twitter'],
    text: `Lead magnet drop: The 10-Minute Mental Reset is a free daily practice guide to calm anxiety, restore focus, and reset your mindset.\n\nGet it free → https://preciousfixmylife.com/#lead-magnet`,
    scheduled_at: null,
  },
];

// ─── API Helpers ──────────────────────────────────────────────────────────────

async function bufferRequest(endpoint, options = {}) {
  const url = `${BUFFER_API}${endpoint}`;
  const res = await fetch(`${url}?access_token=${BUFFER_ACCESS_TOKEN}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Buffer API error ${res.status}: ${err}`);
  }
  return res.json();
}

async function getProfiles() {
  return bufferRequest('/profiles.json');
}

async function queuePost(profileId, text, media = null, scheduledAt = null) {
  const body = {
    profile_ids[]: profileId,
    text,
    ...(media ? { media: { link: media } } : {}),
    ...(scheduledAt ? { scheduled_at: scheduledAt } : {}),
  };

  const res = await fetch(`${BUFFER_API}/updates/create.json?access_token=${BUFFER_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to queue post for profile ${profileId}: ${err}`);
  }
  return res.json();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting Precious Fix My Life Social Auto-Poster\n');

  if (BUFFER_ACCESS_TOKEN === 'YOUR_BUFFER_ACCESS_TOKEN') {
    console.error('❌ Missing BUFFER_ACCESS_TOKEN. Set it in your environment or edit this script.');
    process.exit(1);
  }

  try {
    // 1. Verify profiles
    console.log('📋 Fetching Buffer profiles...');
    const profiles = await getProfiles();
    console.log(`✅ Found ${profiles.length} profile(s):`, profiles.map(p => `${p.service} (${p.id})`).join(', '));

    // 2. Queue all posts
    console.log(`\n📬 Queueing ${POSTS.length} post(s)...`);
    for (const [i, post] of POSTS.entries()) {
      const profileMap = {
        twitter: PROFILES.twitter,
        linkedin: PROFILES.linkedin,
        facebook: PROFILES.facebook,
      };

      const ids = post.profile_ids
        .map(name => profileMap[name])
        .filter(Boolean);

      if (ids.length === 0) continue;

      console.log(`\n  [${i + 1}/${POSTS.length}] Queuing post to: ${post.profile_ids.join(', ')}`);
      console.log(`  Text preview: ${post.text.slice(0, 60)}...`);

      for (const profileId of ids) {
        const result = await queuePost(profileId, post.text, post.media, post.scheduled_at);
        console.log(`  ✅ Posted to profile ${profileId}: ${result.id || 'queued'}`);
      }
    }

    console.log('\n✅ All posts queued successfully!');
    console.log('\n📅 Next step: Set up a recurring schedule in Buffer to auto-post these weekly.');

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
  }
}

main();