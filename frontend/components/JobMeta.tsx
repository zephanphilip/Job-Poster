// components/JobMeta.tsx
import React from 'react';
import { Group, Text } from '@mantine/core';
import { IconUserPlus, IconBuilding, IconStack } from '@tabler/icons-react';

type Job = {
  title: string;
  experience?: string;     // e.g. "1-3 yr Exp"
  workmode?: string;       // e.g. "Onsite"
  salaryRange?: string;    // e.g. "12000", "12000-24000", "500000"
};

function extractFirstNumber(input?: string): number | null {
  if (!input) return null;
  // remove commas, k/K, ₹, $, whitespace, then find first continuous digits
  const cleaned = input.replace(/,|\s|₹|\$|k/gi, '');
  const m = cleaned.match(/-?(\d+(\.\d+)?)/);
  if (!m) return null;
  const num = Number(m[0]);
  return Number.isFinite(num) ? num : null;
}

function toLpaDisplay(raw?: string): string | undefined {
  const n = extractFirstNumber(raw);
  if (n === null) return undefined;

  if (n >= 100000) {
    // input looks like full rupees (e.g. 500000 -> 5 LPA)
    const val = Math.round(n / 100000);
    return `${val} LPA`;
  }

  // if (n >= 1000) {
  //   // likely given as thousands (e.g. 12000 -> 12 LPA)
  //   const val = Math.round(n / 1000);
  //   return `${val} LPA`;
  // }

  // tiny value: return as is (or convert to LPA with decimals)
  const val = +(n / 100000).toFixed(2);
  return `${val} LPA`;
}

export default function JobMeta({ job }: { job: Job }) {
  const exp = job.experience || 'N/A';
  const mode = job.workmode || 'N/A';
  const salary = toLpaDisplay(job.salaryRange) ?? 'N/A';

  return (
    <div style={{ marginTop: 12 }}>
      <h3 style={{ margin: 0, fontSize: 20 }}>{job.title}</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
        <MetaItem icon={<IconUserPlus size={18} />} text={exp} />
        <span style={{ color: '#9ca3af' }}>•</span>
        <MetaItem icon={<IconBuilding size={18} />} text={mode} />
        <span style={{ color: '#9ca3af' }}>•</span>
        <MetaItem icon={<IconStack size={18} />} text={salary} />
      </div>
    </div>
  );
}

function MetaItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Group gap="xs" align="center" style={{ color: '#6b7280', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Icon color */}
        <div style={{ color: '#6b7280', display: 'flex' }}>{icon}</div>
      </div>
      <Text size="sm" style={{ color: '#6b7280', fontWeight: 600 }}>
        {text}
      </Text>
    </Group>
  );
}
