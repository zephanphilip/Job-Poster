'use client';
import React, { useState } from 'react';
import { Box, Modal, Paper } from '@mantine/core';
import Navigation from './Navigation';
import CreateJobForm from './CreateJobForm';
import '@/styles/navbar.css';
import '@/styles/jobs.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <Box>
      <Navigation onOpenCreate={() => setCreateOpen(true)} />

      <main>{children}</main>

      <Modal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
        size="xl"
        radius="lg"
        padding={0}
        withCloseButton={false}
        overlayProps={{
          style: {
            backgroundColor: 'rgba(2,6,23,0.45)', 
            WebkitBackdropFilter: 'blur(6px)'
          },
        }}
      >
        <Paper radius="lg" p="xl">
          <CreateJobForm onClose={() => setCreateOpen(false)} />
        </Paper>
      </Modal>
    </Box>
  );
}
