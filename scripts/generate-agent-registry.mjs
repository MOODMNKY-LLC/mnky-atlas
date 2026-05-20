import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = '/home/moodmnky/.openclaw/workspace/mnky-atlas';
const outputRoot = path.join(repoRoot, 'agents');
const workspaceRoot = '/home/moodmnky/.openclaw/workspace';
const CORE_FILES = [
  'AGENTS.md',
  'SOUL.md',
  'IDENTITY.md',
  'USER.md',
  'TOOLS.md',
  'HEARTBEAT.md',
];

const HOST_INVENTORY = {
  'master-mood': {
    platform: 'Proxmox 8.4.19',
    kernel: '6.8.12-23-pve',
    os: 'Debian GNU/Linux 12 (bookworm)',
    cpu: 'AMD Ryzen 9 7900X3D, 24 logical CPUs / 12 cores / 2 threads per core',
    memory: '124 GiB total, 99 GiB used, 25 GiB available',
    storage: [
      'sda 931.5G Samsung SSD 870 EVO 1TB',
      'sdb 931.5G Samsung SSD 870 EVO 1TB',
    ],
    networking: [
      'Management IP: 101.0.0.100',
      'Runtime endpoint: 10.0.0.55:18789',
      'Gateway host: https://master.agents.moodmnky.com',
    ],
    guests: [],
    notes: ['Live SSH capture completed on 2026-05-20.'],
  },
  'devops-mnky': {
    platform: 'Ubuntu 24.04.4 LTS on WSL2',
    kernel: '6.6.114.1-microsoft-standard-WSL2',
    os: 'Ubuntu 24.04.4 LTS',
    cpu: '12th Gen Intel Core i9-12900K, 24 logical CPUs / 12 cores / 2 threads per core',
    memory: '62 GiB total, 7.6 GiB used, 55 GiB available',
    storage: [
      'loop0 827.2M loop',
      'loop1 716.9M loop',
      'sda 364.8M Virtual Disk',
      'sdb 144.5M Virtual Disk',
      'sdc 16G Virtual Disk',
      'sdd 1T Virtual Disk',
      'sdf 1T Virtual Disk',
      'sdg 1T Virtual Disk',
      'sdh 151M Virtual Disk',
    ],
    networking: [
      'Workstation/runtime endpoint: 10.0.0.113:18789',
      'WSL2 guest backed by the Windows host rather than a Proxmox bridge',
      'Gateway host: https://devops.agents.moodmnky.com',
    ],
    guests: [],
    notes: ['Live local capture completed on 2026-05-20.'],
  },
  'mood-mnky': {
    platform: 'Proxmox 9.1.11',
    kernel: '7.0.2-3-pve',
    os: 'Debian GNU/Linux 13 (trixie)',
    cpu: '13th Gen Intel Core i9-13900KS, 30 logical CPUs reported by lscpu',
    memory: '125 GiB total, 77 GiB used, 48 GiB available',
    storage: [
      'sda 931.5G Samsung SSD 870 EVO 1TB',
      'nvme1n1 931.5G Samsung SSD 980 PRO 1TB',
      'nvme2n1 931.5G Samsung SSD 980 PRO 1TB',
      'zvols present: zd0 256G, zd16 128G, zd32 128G, zd48 512G',
    ],
    networking: [
      'Management IP: 10.1.0.10/24 on vmbr0.10',
      'vmbr0 on nic0 with VLAN awareness',
      'vmbr1 on nic1',
      'vmbr2 on nic2',
      'Gateway host: https://mood.agents.moodmnky.com',
    ],
    guests: [
      'VM 1000 mnky-command-center',
      'VM 1015 coolify-mood-mnky',
      'VM 1111 mnky-nextcloud',
      'VM 1112 Palworld',
      'CT 120 mnky-media-stack',
    ],
    notes: ['Live SSH capture completed on 2026-05-20.'],
  },
  'sage-mnky': {
    platform: 'Proxmox 8.4.19',
    kernel: '6.8.12-23-pve',
    os: 'Debian GNU/Linux 12 (bookworm)',
    cpu: 'AMD Ryzen 7 5700G, 16 logical CPUs / 8 cores / 2 threads per core',
    memory: '62 GiB total, 59 GiB used, 3.7 GiB available',
    storage: [
      'sda 465.8G Samsung SSD 840 EVO 500GB',
      'sdb 3.6T Samsung SSD 870 EVO 4TB',
      'nvme0n1 1.8T T-FORCE TM8FP7002T',
      'nvme1n1 1.8T T-FORCE TM8FP7002T',
      'zvols present: zd0 512G, zd16 256G',
    ],
    networking: [
      'Management IP: 10.2.0.10/24 on vmbr0.20',
      'vmbr0 on enx8cae4cdda391',
      'vmbr0.30 present but manual/unassigned',
      'Gateway host: https://sage.agents.moodmnky.com',
    ],
    guests: [
      'VM 2001 sage-mnky-desktop',
      'VM 2019 POKE-MNKY',
      'CT 205 mnky-gitlab',
    ],
    notes: ['Live SSH capture completed on 2026-05-20.'],
  },
  'code-mnky': {
    platform: 'Proxmox 8.4.19',
    kernel: '6.8.12-23-pve',
    os: 'Debian GNU/Linux 12 (bookworm)',
    cpu: 'AMD Ryzen 5 4600G, 12 logical CPUs / 6 cores / 2 threads per core',
    memory: '125 GiB total, 98 GiB used, 26 GiB available',
    storage: [
      'sda 465.8G WDC WD5001AALS-00L3B2',
      'sdb 476.9G SATA SSD',
      'zvols present: zd0 256G, zd16 64G, zd32 1T, zd48 512G, zd64 128G',
    ],
    networking: [
      'Management IP: 10.3.0.10/24 on vmbr0.30',
      'vmbr0 VLAN-aware trunk on enp5s0',
      'vmbr1 IPMI LAN 10.199.0.2/24 on enp7s0',
      'Gateway host: https://code.agents.moodmnky.com',
    ],
    guests: [
      'VM 3000 mnky-accelerator',
      'VM 3002 obsidian-mnky',
      'VM 3005 code-mnky-agent',
      'VM 3015 mnky-agent-mail',
      'VM 3030 mnky-flowise-prod',
      'VM 3055 mnky-supabase-prod',
      'VM 3056 mnky-n8n-prod',
    ],
    notes: ['Live SSH capture completed on 2026-05-20. Memory pressure is still the watch item.'],
  },
  'casa-mnky': {
    platform: 'Proxmox 8.4.19',
    kernel: '6.8.12-23-pve',
    os: 'Debian GNU/Linux 12 (bookworm)',
    cpu: 'AMD Ryzen 5 4600G, 12 logical CPUs / 6 cores / 2 threads per core',
    memory: '62 GiB total, 34 GiB used, 27 GiB available',
    storage: [
      'zd0 512G ext4',
      'nvme0n1 1.8T SHGP31-2000GM',
    ],
    networking: [
      'Management IP: 10.4.0.10/24 on vmbr0.40',
      'vmbr0 VLAN-aware on enp5s0',
      'Access port enx8cae4cdda3ce for VLAN 40',
      'Gateway host: https://casa.agents.moodmnky.com',
    ],
    guests: ['VM 4001 casa-mnky-desktop'],
    notes: ['Live SSH capture completed on 2026-05-20.'],
  },
  'edge-mnky': {
    platform: 'Proxmox 9.1.11',
    kernel: '7.0.2-3-pve',
    os: 'Debian GNU/Linux 13 (trixie)',
    cpu: 'Intel Core i7-6700HQ, 8 logical CPUs / 4 cores / 2 threads per core',
    memory: '15 GiB total, 9.4 GiB used, 6.1 GiB available',
    storage: [
      'sda 119.2G SAMSUNG MZNLF128HCHP-00004',
      'sdb 931.5G HGST HTS721010A9E630',
      'sr0 1024M TSSTcorp CDDVDW SU-228GB',
    ],
    networking: [
      'Static 10.0.0.157/24 on vmbr0 with gateway 10.0.0.1',
      'VLAN-aware bridge with VLAN 50 allowed',
      'vmbr0.50 management/edge IP 10.5.0.10/24',
      'Gateway host: https://edge.agents.moodmnky.com',
    ],
    guests: ['VM 5000 Edge-Agent'],
    notes: ['Live SSH capture completed on 2026-05-20.'],
  },
  'poke-mnky': {
    platform: 'Capture pending',
    kernel: 'Capture pending',
    os: 'Capture pending',
    cpu: 'Capture pending',
    memory: 'Capture pending',
    storage: ['Capture pending'],
    networking: [
      'Gateway host: https://poke.agents.moodmnky.com',
      'Runtime endpoint: http://10.3.0.100:18789',
    ],
    guests: [],
    notes: ['No direct live host inventory was captured for this offline/specialized node in the current pass.'],
  },
};

const AGENTS = [
  {
    name: 'MASTER MOOD',
    slug: 'master-mood',
    hostname: 'MNKY-HQ',
    ip: '10.0.0.55',
    harness: 'openclaw',
    runtimeId: 'rt_mnky_hq',
    runtimeType: 'openclaw',
    runtimeName: 'MNKY H.Q',
    primaryAgentName: 'MASTER MOOD',
    gatewayHost: 'https://master.agents.moodmnky.com',
    role: 'hub_orchestrator',
    teamType: 'orchestrator',
    status: 'online',
    description: 'Central orchestrator. Oversees MOOD MNKY, SAGE MNKY, CODE MNKY, and manages EDGE, CASA, and POKE.',
    agentDescription: 'Central orchestrator agent responsible for managing the datacenter and the broader virtual ecosystem of agents and processes.',
    createdAt: '2024-01-01T00:00:00.000Z',
    uptimeSeconds: 864000,
    endpoint: 'http://10.0.0.55:18789',
    skills: ['openclaw-hq-mcp-gateway-tools', 'healthcheck', 'clawhub', 'skill-creator', 'find-skills'],
    tools: ['gateway_control', 'agent_invoke', 'host_config', 'process_orchestration'],
    capabilities: ['orchestration', 'delegation', 'coordination', 'monitoring', 'secret_sharing'],
    models: [
      { name: 'claude-3-sonnet', provider: 'anthropic', contextLength: '200000' },
      { name: 'gpt-4-turbo', provider: 'openai', contextLength: '128000' },
    ],
    memoryStores: [{ name: 'fleet_state', type: 'redis', documentCount: 8 }],
    workflows: [{ name: 'Gateway Health Sweep', trigger: 'cron', enabled: true }],
    cronJobs: [{ name: 'Health Check', schedule: '*/5 * * * *', enabled: true }],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw host with runtime inventory captured in docs, hardware capture pending',
    },
    notes: [
      'This is the fleet hub and the primary coordination point.',
      'The docs currently know the runtime, endpoint, uptime, and inventory surface, but not a full hardware bill of materials.',
    ],
  },
  {
    name: 'DEVOPS MNKY',
    slug: 'devops-mnky',
    hostname: 'DEVOPS-MNKY',
    ip: '10.0.0.113',
    harness: 'openclaw',
    runtimeId: 'rt_devops_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'DEVOPS MNKY',
    primaryAgentName: 'DEVOPS MNKY',
    gatewayHost: 'https://devops.agents.moodmnky.com',
    role: 'personal_workstation_assistant',
    teamType: 'personal',
    status: 'online',
    description: "Simeon's personal day-to-day virtual assistant on the home/workstation computer.",
    agentDescription: "Simeon's personal day-to-day virtual assistant. Works alongside Simeon directly while MASTER MOOD manages the datacenter.",
    createdAt: '2024-03-05T00:00:00.000Z',
    uptimeSeconds: 86400,
    endpoint: 'http://10.0.0.113:18789',
    skills: ['healthcheck', 'tmux', 'github', 'node-inspect-debugger', 'taskflow', 'self-improvement'],
    tools: ['calendar', 'notes', 'local_shell', 'browser_control'],
    capabilities: ['daily_tasks', 'scheduling', 'local_automation', 'personal_assistant'],
    models: [{ name: 'claude-3-sonnet', provider: 'anthropic', contextLength: '200000' }],
    memoryStores: [{ name: 'personal_context', type: 'sqlite', documentCount: 156 }],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw workstation host; detailed hardware inventory pending',
    },
    notes: [
      'This is the operator-facing assistant on the workstation layer.',
      'The docs know the runtime endpoint and inventory surface, but not the host hardware bill of materials yet.',
    ],
  },
  {
    name: 'MOOD MNKY',
    slug: 'mood-mnky',
    hostname: 'MOOD-MNKY',
    ip: '10.1.0.111',
    harness: 'openclaw',
    runtimeId: 'rt_mood_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'MOOD MNKY',
    primaryAgentName: 'MOOD MNKY',
    gatewayHost: 'https://mood.agents.moodmnky.com',
    role: 'core_agent_host',
    teamType: 'core',
    status: 'online',
    description: 'Brand/product/ecommerce-oriented agent host.',
    agentDescription: 'Brand, product, and ecommerce agent host.',
    createdAt: '2024-01-15T00:00:00.000Z',
    uptimeSeconds: 432000,
    endpoint: 'http://10.1.0.111:18789',
    skills: ['agentmail', 'notion', 'supabase', 'nextcloud-delivery', 'youtube-transcript-obsidian'],
    tools: ['brand_workflows', 'content_ops', 'store_sync'],
    capabilities: ['brand', 'product', 'commerce', 'content'],
    models: [{ name: 'claude-3-sonnet', provider: 'anthropic', contextLength: '200000' }],
    memoryStores: [{ name: 'brand_state', type: 'redis', documentCount: 0 }],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw runtime host; hardware capture pending',
    },
    notes: ['This runtime is the brand/product/ecommerce layer in the fleet model.'],
  },
  {
    name: 'SAGE MNKY',
    slug: 'sage-mnky',
    hostname: 'SAGE-MNKY',
    ip: '10.2.0.32',
    harness: 'openclaw',
    runtimeId: 'rt_sage_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'SAGE MNKY',
    primaryAgentName: 'SAGE MNKY',
    gatewayHost: 'https://sage.agents.moodmnky.com',
    role: 'core_agent_host',
    teamType: 'core',
    status: 'online',
    description: 'Reflection, community, and research-oriented agent host.',
    agentDescription: 'Reflection, community, and research-oriented agent host.',
    createdAt: '2024-01-20T00:00:00.000Z',
    uptimeSeconds: 518400,
    endpoint: 'http://10.2.0.32:18789',
    skills: ['summarize', 'obsidian', 'notion', 'weather', 'blogwatcher'],
    tools: ['research', 'note_capture', 'summarization'],
    capabilities: ['reflection', 'community', 'research'],
    models: [{ name: 'claude-3-sonnet', provider: 'anthropic', contextLength: '200000' }],
    memoryStores: [{ name: 'research_context', type: 'redis', documentCount: 0 }],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw runtime host; hardware capture pending',
    },
    notes: ['Research and reflection are the emphasis here.'],
  },
  {
    name: 'CODE MNKY',
    slug: 'code-mnky',
    hostname: 'CODE-MNKY',
    ip: '10.3.0.50',
    harness: 'openclaw',
    runtimeId: 'rt_code_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'CODE MNKY',
    primaryAgentName: 'CODE MNKY',
    gatewayHost: 'https://code.agents.moodmnky.com',
    role: 'core_agent_host',
    teamType: 'core',
    status: 'online',
    description: 'Development, automation, and DevOps-oriented agent host.',
    agentDescription: 'Development, automation, and DevOps-oriented agent host.',
    createdAt: '2024-02-01T00:00:00.000Z',
    uptimeSeconds: 604800,
    endpoint: 'http://10.3.0.50:18789',
    skills: ['github', 'tmux', 'node-inspect-debugger', 'supabase', 'openclaw-hq-mcp-gateway-tools'],
    tools: ['code_review', 'git_ops', 'shell', 'browser_control'],
    capabilities: ['development', 'automation', 'devops'],
    models: [{ name: 'claude-3-sonnet', provider: 'anthropic', contextLength: '200000' }],
    memoryStores: [{ name: 'code_state', type: 'redis', documentCount: 0 }],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw runtime host; hardware capture pending',
    },
    notes: ['This runtime is the code and operations layer in the fleet model.'],
  },
  {
    name: 'CASA MNKY',
    slug: 'casa-mnky',
    hostname: 'CASA-MNKY',
    ip: '10.4.0.34',
    harness: 'openclaw',
    runtimeId: 'rt_casa_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'CASA MNKY',
    primaryAgentName: 'CASA MNKY',
    gatewayHost: 'https://casa.agents.moodmnky.com',
    role: 'extended_agent_host',
    teamType: 'extended',
    status: 'degraded',
    description: 'Host-local managing agent.',
    agentDescription: 'Host-local managing agent.',
    createdAt: '2024-02-10T00:00:00.000Z',
    uptimeSeconds: 259200,
    endpoint: 'http://10.4.0.34:18789',
    skills: ['google-home', 'openhue', 'sonoscli', 'weather', 'healthcheck'],
    tools: ['home_automation', 'local_control'],
    capabilities: ['home', 'control', 'automation'],
    models: [{ name: 'claude-3-sonnet', provider: 'anthropic', contextLength: '200000' }],
    memoryStores: [{ name: 'casa_state', type: 'redis', documentCount: 0 }],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw runtime host; hardware capture pending',
    },
    notes: ['This runtime currently appears degraded in the source model.'],
  },
  {
    name: 'EDGE MNKY',
    slug: 'edge-mnky',
    hostname: 'EDGE-MNKY',
    ip: '10.0.0.50',
    harness: 'openclaw',
    runtimeId: 'rt_edge_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'EDGE MNKY',
    primaryAgentName: 'EDGE MNKY',
    gatewayHost: 'https://edge.agents.moodmnky.com',
    role: 'remote_edge_agent_host',
    teamType: 'edge',
    status: 'online',
    description: 'Reachable remotely over NetBird. Treat remote NetBird address as alternate endpoint.',
    agentDescription: 'Remote edge agent host with LAN and NetBird reachability.',
    createdAt: '2024-02-15T00:00:00.000Z',
    uptimeSeconds: 172800,
    endpoint: 'http://10.0.0.50:18789',
    alternateEndpoint: 'http://100.91.186.219:18789',
    skills: ['node-connect', 'healthcheck', 'tmux', 'canvas', 'github'],
    tools: ['edge_control', 'remote_shell'],
    capabilities: ['remote_access', 'edge', 'fallback_connectivity'],
    models: [
      { name: 'gpt-4', provider: 'openai', contextLength: '128000' },
      { name: 'claude-3', provider: 'anthropic', contextLength: '200000' },
    ],
    memoryStores: [{ name: 'edge_state', type: 'redis', documentCount: 0 }],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw runtime host; hardware capture pending',
    },
    notes: ['This runtime is modeled as the remote/edge entry point.'],
  },
  {
    name: 'POKE MNKY',
    slug: 'poke-mnky',
    hostname: 'POKE-MNKY',
    ip: '10.3.0.100',
    harness: 'openclaw',
    runtimeId: 'rt_poke_mnky',
    runtimeType: 'openclaw',
    runtimeName: 'POKE MNKY',
    primaryAgentName: 'POKE MNKY',
    gatewayHost: 'https://poke.agents.moodmnky.com',
    role: 'specialized_agent_host',
    teamType: 'specialized',
    status: 'offline',
    description: 'Pokemon/family/kid-friendly specialized agent host.',
    agentDescription: 'Pokemon/family/kid-friendly specialized agent host.',
    createdAt: '2024-03-01T00:00:00.000Z',
    uptimeSeconds: null,
    endpoint: 'http://10.3.0.100:18789',
    skills: ['gog', 'discord', 'imsg', 'meme-maker', 'weather'],
    tools: ['pokemon_api', 'trivia', 'safe_search'],
    capabilities: ['games', 'education', 'family_safe', 'entertainment'],
    models: [],
    memoryStores: [],
    workflows: [],
    cronJobs: [],
    hardware: {
      cpu: 'Not yet captured in current docs',
      memory: 'Not yet captured in current docs',
      storage: 'Not yet captured in current docs',
      gpu: 'Not yet captured in current docs',
      os: 'OpenClaw runtime host; hardware capture pending',
    },
    notes: ['This runtime is offline in the current source model.'],
  },
];

function renderListSection(title, items, emptyMessage, level = 2) {
  const body = items.length ? items.map((item) => `- ${item}`).join('\n') : `- ${emptyMessage}`;
  return `${'#'.repeat(level)} ${title}\n\n${body}`;
}

function renderHostInventory(agent) {
  const inventory = HOST_INVENTORY[agent.slug];
  if (!inventory) {
    return `## Host inventory\n\n- Live host inventory not yet captured.`;
  }

  const sections = [
    '## Host inventory',
    '',
    `- Platform: ${inventory.platform}`,
    `- Kernel: ${inventory.kernel}`,
    `- OS: ${inventory.os}`,
    `- CPU: ${inventory.cpu}`,
    `- Memory: ${inventory.memory}`,
    '',
    renderListSection('Networking', inventory.networking, 'No networking capture yet.', 3),
    renderListSection('Storage', inventory.storage, 'No storage capture yet.', 3),
  ];

  if (inventory.guests && inventory.guests.length) {
    sections.push('', renderListSection('Guests', inventory.guests, 'No guest inventory captured yet.', 3));
  }

  if (inventory.notes && inventory.notes.length) {
    sections.push('', renderListSection('Capture notes', inventory.notes, 'No capture notes.', 3));
  }

  return sections.join('\n');
}

function renderIndex() {
  const cards = AGENTS.map((agent) => `    <Card title="${agent.name}" icon="server" href="/agents/${agent.slug}" className="border">\n      ${agent.description}\n    </Card>`).join('\n');

  return `---\ntitle: Agents\nsidebarTitle: Agents\ndescription: Host-and-harness profiles, fleet topology, and operational context for the MNKY agent estate.\n---\n\n# Agents\n\nThe agent section is the operating map for the MNKY ecosystem.\n\nIt explains who the agents are, where they run, what they control, which skills they use, and how the docs surface fits into the datacenter and the company.\n\n## Ecosystem view\n\n- **MASTER MOOD** is the orchestrator and fleet hub.\n- **DEVOPS MNKY** is the personal operator layer on Simeon's workstation.\n- **MOOD, SAGE, and CODE** are the core service planes for brand, research, and development.\n- **CASA, EDGE, and POKE** are extended or specialized planes with narrower responsibilities.\n- **Skills** are the reusable capability library.\n- **Agent pages** are the machine cards: host, harness, gateway, specs, runtime, skills, and core files.\n\n## How it functions\n\n- A request enters through a gateway host like \`https://master.agents.moodmnky.com\` or \`https://devops.agents.moodmnky.com\`.\n- The harness (\`openclaw\` in this fleet) routes runtime execution, session state, and tool access.\n- The host page records the machine identity, networking, hardware, and guest surfaces.\n- The skills registry supplies the reusable capability docs that can be linked, retrieved, or installed.\n- The docs layer is the durable map so humans and agents stop re-discovering the same topology.\n\n## What lives here\n\n- Host identity and hardware inventory\n- Networking and gateway URL\n- Runtime and harness profile\n- Guest/VM/CT surfaces where applicable\n- Core files: \`AGENTS.md\`, \`SOUL.md\`, \`IDENTITY.md\`, \`USER.md\`, \`TOOLS.md\`, \`HEARTBEAT.md\`\n- Linked skills and operational notes\n- Capture notes when a field is still live-only or incomplete\n\n## How to use it\n\n- Use agent pages when you need the full host and runtime profile.\n- Use the Skills registry when you need reusable capability docs.\n- Use this landing page when you want the big-picture fleet shape before drilling into one node.\n\n## Build-out priorities\n\n- Add live inventory capture for every agent and keep it current.\n- Add a comparison page for CPU, memory, storage, and OS across the fleet.\n- Add a gateway directory or health matrix if you want a quick operational dashboard.\n- Add service/guest cross-links from each agent to the systems it owns.\n- Add a release or change log for agent topology changes.\n\n## Quick roster\n\n<div className=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\n${cards}\n</div>\n\n## Related registries\n\n- [Skills](/skills/index)\n- [Host notes](/hosts/index)\n- [Agent catalog](/agents/catalog)\n`.trimEnd() + '\n';
}

function renderCatalog() {
  const lines = AGENTS.map((agent) => `- [${agent.name}](/agents/${agent.slug}) - ${agent.hostname} · ${agent.harness} · ${agent.gatewayHost} · ${agent.status}`);
  return `---\ntitle: Agent Catalog\ndescription: Fleet roster and runtime directory for MNKY agents.\n---\n\n# Agent Catalog\n\n${lines.join('\n')}\n\n## Conventions\n\n- \`hostname\` is the machine-level name.\n- \`harness\` is the runtime/orchestration layer.\n- \`runtimeId\` is the internal registry handle.\n- \`primaryAgentName\` is the public agent identity.\n`;
}

function renderHarnesses() {
  return `---\ntitle: Harnesses\ndescription: How the agent harness layer is modeled in this docs set.\n---\n\n# Harnesses\n\nThe harness is the runtime layer that sits under the agent identity.\n\n## Current harness model\n\n- \`openclaw\` is the canonical harness for the current MNKY agent fleet.\n- The harness is where orchestration, tool routing, session state, and live execution happen.\n- The agent page should describe the harness, but not bury the runtime details in prose.\n\n## Harness fields to document\n\n- runtime type\n- runtime ID\n- primary agent name\n- LAN endpoint\n- alternate endpoint, if any\n- status\n- uptime\n- model inventory\n- tool inventory\n- skill inventory\n`;
}

function renderWorkspaces() {
  return `---\ntitle: Workspaces\ndescription: Agent-specific work areas and conventions.\n---\n\n# Workspaces\n\n## Agent folders\n\n- \`master/\`\n- \`mood/\`\n- \`sage/\`\n- \`code/\`\n\n## Inside each folder\n\n- \`inbox/\`\n- \`notes/\`\n- \`scratch/\`\n- \`outputs/\`\n- \`temp/\`\n\n## Working rule\n\nUse the workspace for live work. Promote durable results to the vault when they matter.\n`;
}

async function loadCoreFiles() {
  const files = [];
  for (const name of CORE_FILES) {
    const fullPath = path.join(workspaceRoot, name);
    const content = await fs.readFile(fullPath, 'utf8');
    files.push({ name, path: fullPath, content });
  }
  return files;
}

function renderAgentPage(agent, coreFiles) {
  const endpointLines = [`- Primary endpoint: \`${agent.endpoint}\``];
  if (agent.alternateEndpoint) endpointLines.push(`- Alternate endpoint: \`${agent.alternateEndpoint}\``);
  endpointLines.push(`- Gateway host: \`${agent.gatewayHost}\``);
  endpointLines.push(`- Harness: \`${agent.harness}\``);
  endpointLines.push(`- Runtime type: \`${agent.runtimeType}\``);
  endpointLines.push(`- Runtime ID: \`${agent.runtimeId}\``);
  endpointLines.push(`- Primary agent name: \`${agent.primaryAgentName}\``);
  endpointLines.push(`- Status: \`${agent.status}\``);
  if (agent.uptimeSeconds !== null && agent.uptimeSeconds !== undefined) {
    endpointLines.push(`- Uptime: \`${agent.uptimeSeconds}\` seconds`);
  }

  const modelLines = agent.models.length
    ? agent.models.map((model) => `\`${model.name}\` (${model.provider}, context ${model.contextLength})`)
    : [];

  const memoryLines = agent.memoryStores.length
    ? agent.memoryStores.map((item) => `\`${item.name}\` (${item.type}, ${item.documentCount} docs)`)
    : [];

  const workflowLines = agent.workflows.length
    ? agent.workflows.map((item) => `\`${item.name}\` (${item.trigger}, ${item.enabled ? 'enabled' : 'disabled'})`)
    : [];

  const cronLines = agent.cronJobs.length
    ? agent.cronJobs.map((item) => `\`${item.name}\` (${item.schedule}, ${item.enabled ? 'enabled' : 'disabled'})`)
    : [];

  const skillLines = agent.skills.map((skill) => `[${skill}](/skills/${skill})`);
  const notes = agent.notes.map((note) => `- ${note}`).join('\n');
  const hostInventorySection = renderHostInventory(agent);

  const capabilitiesSection = renderListSection('Capabilities', agent.capabilities, 'No capabilities captured yet.');
  const toolsSection = renderListSection('Tools', agent.tools, 'No tools captured yet.');
  const modelsSection = renderListSection('Models', modelLines, 'No model inventory captured yet.');
  const memorySection = renderListSection('Memory', memoryLines, 'No memory inventory captured yet.');
  const workflowsSection = renderListSection('Workflows', workflowLines, 'No workflows captured yet.');
  const cronSection = renderListSection('Cron jobs', cronLines, 'No cron jobs captured yet.');
  const skillsSection = renderListSection('Skills', skillLines, 'No skills linked yet.');
  const coreFilesSection = renderListSection(
    'Core files',
    coreFiles.map((file) => `[${file.name}](/agents/${agent.slug}/core/${file.name})`),
    'No core files captured yet.'
  );

  return `---\ntitle: ${agent.name}\ndescription: ${agent.description}\n---\n\n# ${agent.name}\n\n${agent.agentDescription}\n\n## Identity\n\n- Hostname: \`${agent.hostname}\`\n- IP: \`${agent.ip}\`\n- Gateway host: \`${agent.gatewayHost}\`\n- Harness: \`${agent.harness}\`\n- Runtime: \`${agent.runtimeName}\`\n- Runtime ID: \`${agent.runtimeId}\`\n- Primary agent: \`${agent.primaryAgentName}\`\n- Team type: \`${agent.teamType}\`\n- Role: \`${agent.role}\`\n- Status: \`${agent.status}\`\n- Created at: \`${agent.createdAt}\`\n\n## Networking\n\n${endpointLines.join('\n')}\n\n${hostInventorySection}\n\n## Agent profile\n\n${capabilitiesSection}\n\n${toolsSection}\n\n${modelsSection}\n\n${memorySection}\n\n${workflowsSection}\n\n${cronSection}\n\n${skillsSection}\n\n${coreFilesSection}\n\n## Notes\n\n${notes}\n`.replace(/\n{3,}/g, '\n\n');
}

async function main() {
  const coreFiles = await loadCoreFiles();
  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  await fs.writeFile(path.join(outputRoot, 'index.mdx'), renderIndex(), 'utf8');
  await fs.writeFile(path.join(outputRoot, 'catalog.mdx'), renderCatalog(), 'utf8');
  await fs.writeFile(path.join(outputRoot, 'harnesses.mdx'), renderHarnesses(), 'utf8');
  await fs.writeFile(path.join(outputRoot, 'workspaces.mdx'), renderWorkspaces(), 'utf8');
  await fs.writeFile(path.join(outputRoot, 'manifest.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    harness: 'openclaw',
    agents: AGENTS.map((agent) => ({
      ...agent,
      hostInventory: HOST_INVENTORY[agent.slug] ?? null,
    })),
  }, null, 2) + '\n', 'utf8');

  for (const agent of AGENTS) {
    const dir = path.join(outputRoot, agent.slug);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.mdx'), renderAgentPage(agent, coreFiles), 'utf8');
    const coreDir = path.join(dir, 'core');
    await fs.mkdir(coreDir, { recursive: true });
    for (const file of coreFiles) {
      await fs.writeFile(path.join(coreDir, file.name), file.content, 'utf8');
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
