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

      {/* Page content */}
      <main>{children}</main>

      {/* Create Job Modal (use overlayProps instead of overlayBlur/overlayOpacity) */}
      <Modal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
        size="xl"
        radius="lg"
        padding={0}
        withCloseButton={false}
        // Use overlayProps to customize overlay safely:
        overlayProps={{
          // recommended: set a backdrop color + blur using CSS style
          style: {
            backgroundColor: 'rgba(2,6,23,0.45)', // darken background
            backdropFilter: 'blur(6px)', // visual blur
            WebkitBackdropFilter: 'blur(6px)'
          },
          // you may also pass any other DOM attributes for the overlay here
        }}
      >
        <Paper radius="lg" p="xl">
          <CreateJobForm onClose={() => setCreateOpen(false)} />
        </Paper>
      </Modal>
    </Box>
  );
}
