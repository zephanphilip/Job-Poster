'use client';
import React from 'react';
import Link from 'next/link';
import {
  Container,
  Group,
  Burger,
  Transition,
  rem,
  Text,
  Button,
  Box,
  Stack,
  Paper
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBriefcase, IconPlus } from '@tabler/icons-react';
import '@/styles/navbar.css';

const HEADER_HEIGHT = rem(120);

type Props = {
  onOpenCreate?: () => void;
};

const links = [
  { link: '/', label: 'Home' },
  { link: '/jobs', label: 'Find Jobs' },
  { link: '/talents', label: 'Find Talents' },
  { link: '/about', label: 'About us' },
  { link: '/testimonials', label: 'Testimonials' },
];

export default function Navigation({ onOpenCreate }: Props) {
  const [opened, { toggle, close }] = useDisclosure(false);

  const navLinks = links.map((l) => (
    <Link key={l.label} href={l.link} onClick={close} className="nav-link">
      {l.label}
    </Link>
  ));

  return (
    <Box className="navbar-outer" style={{ height: HEADER_HEIGHT }}>
      <Container size="xl" className="navbar-container">
        <Box className="nav-pill">
          <Group align="center" justify="space-between" className="nav-pill-inner" wrap="nowrap">
            <Link href="/" className="nav-left">
              <Box className="logo-wrap" aria-hidden>
                <IconBriefcase size={26} className="logo-icon" />
              </Box>
            </Link>

            <Group gap={28} className="nav-center">
              {navLinks}
            </Group>

            <Group gap={12} className="nav-right" align="center">
              {onOpenCreate ? (
                <Button onClick={onOpenCreate} className="create-job-btn" radius="md">
                 
                  Create Jobs
                </Button>
              ) : (
                <Button component={Link} href="/jobs/create" className="create-job-btn" radius="md">
                  
                  Create Jobs
                </Button>
              )}

              <Burger opened={opened} onClick={toggle} size="sm" className="mobile-burger" aria-label="Toggle navigation" />
            </Group>
          </Group>
        </Box>

        <Transition transition="pop-top-right" duration={180} mounted={opened}>
          {(styles) => (
            <Paper className="mobile-menu" style={styles} withBorder shadow="md">
              <Stack p="sm" justify="space-between">
                {links.map((l) => (
                  <Link key={l.label} href={l.link} onClick={close} className="mobile-link">
                    {l.label}
                  </Link>
                ))}
                {/* mobile create button */}
                {onOpenCreate ? (
                  <Button onClick={() => { onOpenCreate(); close(); }} className="create-job-btn mobile-create" radius="xl">
                    
                    Create Jobs
                  </Button>
                ) : (
                  <Button component={Link} href="/jobs/create" className="create-job-btn mobile-create" radius="xl">
                    
                    Create Jobs
                  </Button>
                )}
              </Stack>
            </Paper>
          )}
        </Transition>
      </Container>
    </Box>
  );
}
