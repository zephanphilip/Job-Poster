'use client';
import React, { useState, useEffect } from 'react';
import { Card, Text, Group, Stack, Box } from '@mantine/core';
import {
  IconMapPin,
  IconBuilding,
  IconExternalLink,
} from '@tabler/icons-react';

interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string; // optional URL if available
  location: string;
  jobType: string;
  salaryRange: string;
  description: string;
  applicationDeadline?: string;
  requirements?: string;
  responsibilities?: string;
  experience?: string;
  workmode?: string;
  createdAt?: string;
}

interface JobCardProps {
  job: Job;
  onApply?: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const getTimeAgo = (dateString?: string) => {
  if (!dateString) return 'Unknown';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHrs > 0) return `${diffHrs}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return 'Just now';
};

  const companyInitial = job.companyName?.charAt(0).toUpperCase() || 'C';

  return (
    <Card className="job-card" padding={0} radius="md" withBorder>
      <div className="card-stack">
        <Group justify="space-between" align="flex-start" style={{ marginBottom: 4 }}>
          <Box className="company-logo">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.companyName} />
            ) : (
              <Text size="xl" fw={700} style={{ color: '#0f172a' }}>{companyInitial}</Text>
            )}
          </Box>

          <div className="time-pill">{getTimeAgo(job.createdAt)}</div>
        </Group>

        <h3 className="job-title">{job.title}</h3>

        <div className="job-meta">
          <span className="meta-item">
            👤 {job.experience}
          </span>

          <span className="dot">•</span>

          <span className="meta-item">
            🏢 {job.workmode}
          </span>

          <span className="dot">•</span>

          <span className="meta-item">
            💰 ₹{job.salaryRange}
          </span>
        </div>

        <ul className="job-bullets">
          <li>
            {job.description
              ? job.description.split(' ').slice(0, 40).join(' ') +
                (job.description.split(' ').length > 40 ? ' ...' : '')
              : 'No description available'}
          </li>

        </ul>

        <div className="card-bottom">
          <button
            className="apply-btn"
            onClick={() => onApply?.(job)}
            type="button"
            aria-label={`Apply to ${job.title}`}
          >
            <span className="apply-btn-text">Apply Now</span>
          </button>
        </div>
      </div>
    </Card>
  );
}