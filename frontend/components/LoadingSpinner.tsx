'use client';
import React from 'react';
import { Box, Loader } from '@mantine/core';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <Box className={`flex justify-center items-center p-8 ${className}`}>
      <Loader size={size} color="blue" />
    </Box>
  );
}
