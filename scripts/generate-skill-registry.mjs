import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = '/home/moodmnky/.openclaw/workspace/mnky-atlas';
const outputRoot = path.join(repoRoot, 'skills');

const sources = [
  { root: '/home/moodmnky/.openclaw/workspace/.agents/skills', label: 'Workspace Skills', priority: 1 },
  { root: '/home/moodmnky/.openclaw/workspace/skills', label: 'Workspace Skills', priority: 2 },
  { root: '/home/moodmnky/.openclaw/skills', label: 'OpenClaw Skills', priority: 3 },
  { root: '/home/moodmnky/.agents/skills', label: 'Shared Skills', priority: 4 },
  { root: '/home/moodmnky/.local/lib/node_modules/openclaw/skills', label: 'OpenClaw Skills', priority: 5 },
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return {};

  const out = {};
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();
    value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    out[key] = value;
  }
  return out;
}

function summarizeBody(content, name) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
  const headingMatch = body.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    const heading = headingMatch[1].trim();
    if (heading && heading.toLowerCase() !== String(name).toLowerCase()) {
      return heading;
    }
  }

  const paragraphMatch = body.match(/^(?!#)([^\n]{20,160})$/m);
  if (paragraphMatch) {
    return paragraphMatch[1].trim();
  }

  return 'Source skill file with no structured description.';
}

async function findSkillFiles(root) {
  const found = [];

  async function walk(current) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name === 'SKILL.md') {
        found.push(full);
      }
    }
  }

  await walk(root);
  return found;
}

function renderIndex(registry) {
  const groups = new Map();
  for (const item of registry) {
    if (!groups.has(item.sourceLabel)) groups.set(item.sourceLabel, []);
    groups.get(item.sourceLabel).push(item);
  }

  const sections = [];
  for (const label of ['Workspace Skills', 'OpenClaw Skills', 'Shared Skills']) {
    const items = groups.get(label);
    if (!items || items.length === 0) continue;
    items.sort((a, b) => a.name.localeCompare(b.name));

    sections.push(`## ${label}`);
    sections.push('');
    sections.push('The raw capability file for each item lives beside the rendered page as `skill.md`.');
    sections.push('');
    for (const item of items) {
      sections.push(`- [${item.name}](/skills/${item.slug}) - ${item.description} (source: \`${item.sourcePath}\`)`);
    }
    sections.push('');
  }

  return `---\ntitle: Skills\nsidebarTitle: Skills\ndescription: Official docs registry for the current MNKY skill collection.\n---\n\nMNKY Atlas now acts as the docs registry for the current skill collection.\n\n## How to use this library\n\n- Read the human page first.\n- Use the adjacent \`skill.md\` file as the machine-readable source for MCP and API retrieval.\n- Treat the catalog as the index and the raw skill files as the install payload.\n- If a skill changes, update the source \`SKILL.md\` first, then regenerate this registry.\n\n## Machine-readable entrypoints\n\n- Manifest: \`/skills/manifest.json\`\n- Search surface: Mintlify search and MCP\n- Skill payload: \`/skills/<skill>/skill.md\`\n\n${sections.join('\n')}`.trimEnd() + '\n';
}

function renderSkillPage(item) {
  return `---\ntitle: ${item.name}\ndescription: ${item.description}\n---\n\n# ${item.name}\n\nThis page mirrors the current skill definition from \`${item.sourcePath}\`.\n\n## Registry fields\n\n- Source: \`${item.sourcePath}\`\n- Source group: ${item.sourceLabel}\n- Machine-readable payload: \`./skill.md\`\n\nThe adjacent \`skill.md\` file is the canonical machine-readable skill artifact for MCP-based discovery and retrieval.\n`.trimEnd() + '\n';
}

async function main() {
  const candidates = [];
  for (const source of sources) {
    const files = await findSkillFiles(source.root);
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      const meta = parseFrontmatter(content);
      const name = meta.name || path.basename(path.dirname(file));
      const rawDescription = meta.description || '';
      const description = rawDescription && !['|', '>', 'No description provided.'].includes(rawDescription)
        ? rawDescription
        : summarizeBody(content, name);
      candidates.push({
        name,
        description,
        sourcePath: file,
        sourceLabel: source.label,
        priority: source.priority,
        content,
      });
    }
  }

  candidates.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.name !== b.name) return a.name.localeCompare(b.name);
    return a.sourcePath.localeCompare(b.sourcePath);
  });

  const byName = new Map();
  for (const item of candidates) {
    if (!byName.has(item.name)) byName.set(item.name, item);
  }

  const registry = [...byName.values()].map((item) => ({
    name: item.name,
    slug: slugify(item.name),
    description: item.description,
    sourcePath: item.sourcePath,
    sourceLabel: item.sourceLabel,
  })).sort((a, b) => a.name.localeCompare(b.name));

  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  await fs.writeFile(path.join(outputRoot, 'index.mdx'), renderIndex(registry), 'utf8');
  await fs.writeFile(path.join(outputRoot, 'manifest.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    sourceRoots: sources.map(({ root, label }) => ({ root, label })),
    skills: registry,
  }, null, 2) + '\n', 'utf8');

  for (const item of registry) {
    const dir = path.join(outputRoot, item.slug);
    await fs.mkdir(dir, { recursive: true });

    const original = byName.get(item.name);
    await fs.writeFile(path.join(dir, 'index.mdx'), renderSkillPage(item), 'utf8');
    await fs.writeFile(path.join(dir, 'skill.md'), original.content, 'utf8');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
