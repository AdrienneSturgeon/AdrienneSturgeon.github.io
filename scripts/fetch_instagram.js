const https = require('https');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const token = process.env.INSTAGRAM_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;

if (!token || !userId) {
  console.error('INSTAGRAM_TOKEN and INSTAGRAM_USER_ID must be set in the environment');
  process.exit(0);
}

const DATA_DIR = path.join(process.cwd(), 'data');
const STATIC_IMG_DIR = path.join(process.cwd(), 'static', 'img', 'instagram');

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error('Failed to get ' + url + ', status ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function ensureDirs() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.mkdir(STATIC_IMG_DIR, { recursive: true });
}

function extFromUrl(u) {
  try {
    const p = new URL(u).pathname;
    const e = path.extname(p);
    if (e) return e.split('?')[0];
    return '.jpg';
  } catch (e) {
    return '.jpg';
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkifyCaption(raw) {
  if (!raw) return '';
  // escape first
  let s = escapeHtml(raw);
  // link hashtags
  s = s.replace(/#([a-zA-Z0-9_]+)/g, (m, tag) => `<a href="https://www.instagram.com/explore/tags/${tag}" target="_blank" rel="noopener">#${tag}</a>`);
  // link mentions
  s = s.replace(/@([a-zA-Z0-9_\.]+)/g, (m, user) => `<a href="https://www.instagram.com/${user}" target="_blank" rel="noopener">@${user}</a>`);
  // link plain URLs
  s = s.replace(/(https?:\/\/[^\s]+)/g, (m) => `<a href="${m}" target="_blank" rel="noopener">${m}</a>`);
  // convert line breaks
  s = s.replace(/\n/g, '<br/>');
  return s;
}

async function fetchMedia() {
  // Basic Display API: fetch media list with essential fields
  // Note: Basic Display API does not provide like_count, but works with personal accounts
  const listUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&access_token=${token}`;
  const listRes = await getJson(listUrl);
  const items = listRes && listRes.data ? listRes.data : [];

  const out = { media: [] };

  for (const it of items) {
    try {
      const id = it.id;
      // Fetch children for carousel posts (if available)
      let children = [];
      if (it.media_type === 'CAROUSEL_ALBUM') {
        try {
          const childUrl = `https://graph.instagram.com/${id}/children?fields=id,media_type,media_url,thumbnail_url&access_token=${token}`;
          const childRes = await getJson(childUrl);
          children = (childRes && childRes.data) ? childRes.data : [];
        } catch (err) {
          console.warn('Could not fetch children for', id, err.message || err);
        }
      }

      const entry = {
        id: it.id,
        caption: it.caption || '',
        formattedCaption: linkifyCaption(it.caption || ''),
        media_type: it.media_type || '',
        media_url: it.media_url || it.thumbnail_url || '',
        permalink: it.permalink || '',
        timestamp: it.timestamp || '',
        children: [],
      };

      // handle main media
      if (entry.media_url) {
        const ext = extFromUrl(entry.media_url);
        const filename = `${entry.id}${ext}`;
        const dest = path.join(STATIC_IMG_DIR, filename);
        try {
          if (!fs.existsSync(dest)) {
            console.log('Downloading', entry.media_url);
            await download(entry.media_url, dest);
          }
        } catch (err) {
          console.error('Download failed for', entry.media_url, err.message || err);
        }
        entry.filename = filename;
      }

      // handle children (carousel)
      if (children && Array.isArray(children)) {
        for (const ch of children) {
          const chUrl = ch.media_url || ch.thumbnail_url || '';
          if (!chUrl) continue;
          const ext = extFromUrl(chUrl);
          const chFilename = `${ch.id}${ext}`;
          const chDest = path.join(STATIC_IMG_DIR, chFilename);
          try {
            if (!fs.existsSync(chDest)) {
              console.log('Downloading child', chUrl);
              await download(chUrl, chDest);
            }
          } catch (err) {
            console.error('Download failed for child', chUrl, err.message || err);
          }
          entry.children.push({ id: ch.id, media_type: ch.media_type || '', filename: chFilename });
        }
      }

      out.media.push(entry);
    } catch (err) {
      console.error('Error fetching media details for', it.id, err.message || err);
    }
  }

  const outPath = path.join(DATA_DIR, 'instagram.json');
  await fsp.writeFile(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', outPath);
}

async function main() {
  try {
    await ensureDirs();
    await fetchMedia();
  } catch (err) {
    console.error('Error fetching instagram media:', err.message || err);
    process.exit(1);
  }
}

main();
