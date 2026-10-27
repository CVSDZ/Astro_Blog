import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const postsDir = join(root, 'src', 'content', 'posts');
const publicDir = join(root, 'public');
const outFile = join(publicDir, 'search-index.json');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, '');
    }
    data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~|#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const files = (await readdir(postsDir)).filter((f) => f.endsWith('.md'));
const index = [];

for (const file of files) {
  const raw = await readFile(join(postsDir, file), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  if (String(data.draft).toLowerCase() === 'true') continue;

  const slug = file.replace(/\.md$/, '');
  index.push({
    slug,
    title: data.title || slug,
    summary: data.summary || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    week: Number(data.week) || 0,
    date: data.date || '',
    text: stripMarkdown(body).slice(0, 2000),
  });
}

await mkdir(publicDir, { recursive: true });
await writeFile(outFile, JSON.stringify(index, null, 2), 'utf8');
console.log(`search-index.json 生成完成:${index.length} 篇文章`);