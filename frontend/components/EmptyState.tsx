'use client';
import React from 'react';
import { Paper, Stack, Box, Text, Button } from '@mantine/core';
import { IconSearch, IconPlus, IconFileX } from '@tabler/icons-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}: EmptyStateProps) {
  const defaultIcon = <IconFileX size={48} className="text-slate-400" />;
  
  return (
    <Paper 
      className={`p-12 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${className}`}
      radius="xl"
      withBorder
    >
      <Stack align="center" gap="md">
        <Box className="p-4 rounded-full bg-slate-100 dark:bg-slate-700">
          {icon || defaultIcon}
        </Box>
        <Text size="xl" fw={600} className="text-slate-700 dark:text-slate-300">
          {title}
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 max-w-md">
          {description}
        </Text>
        {action && (
          <Button 
            variant="filled"
            onClick={action.onClick}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0"
          >
            {action.label}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
