'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  TextInput,
  Select,
  Group,
  Stack,
  Box,
  Text,
  RangeSlider,
  Divider
} from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import Layout from '../../components/Layout';
import JobCard from '../../components/JobCard';
import { api } from '../../lib/api';
import '@/styles/jobs.css';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange: string;
  description: string;
  applicationDeadline?: string;
  requirements?: string;
  responsibilities?: string;
  createdAt?: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]); // in 'k'

  // Fetch jobs from backend
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on load
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // 🔄 Automatically refresh jobs when new one is created
  useEffect(() => {
    const onJobCreated = (e: Event) => {
      const custom = e as CustomEvent<Job>;
      if (custom.detail) {
        const newJob = custom.detail;
        setJobs((prev) => [newJob, ...prev]);
      } else {
        fetchJobs();
      }
    };

    window.addEventListener('jobCreated', onJobCreated as EventListener);
    return () => {
      window.removeEventListener('jobCreated', onJobCreated as EventListener);
    };
  }, [fetchJobs]);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesType = !jobTypeFilter || job.jobType === jobTypeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <Layout>
      <Container size="xl" py="xl" className="jobs-page-container">
        {/* Search & Filters */}
        <Box className="search-filters-sheet pill-layout" mb="xl">
          <Group align="center" gap={0} className="filters-inner" wrap="nowrap">
            {/* Search Input */}
            <Box className="filter-item grow">
              <TextInput
                placeholder="Search By Job Title, Role"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="md"
                variant="unstyled"
                className="pill-input"
                leftSection={<IconSearch size={16} />}
                styles={{ input: { paddingLeft: '2.2rem' } }}
              />
            </Box>

            <Divider orientation="vertical" className="filter-divider" />

            {/* Location Select */}
            <Box className="filter-item">
              <Select
                placeholder="Preferred Location"
                data={[
                  { value: '', label: 'All Locations' },
                  { value: 'Remote', label: 'Remote' },
                  { value: 'Bangalore', label: 'Bangalore' },
                  { value: 'Mumbai', label: 'Mumbai' },
                  { value: 'Delhi', label: 'Delhi' }
                ]}
                value={locationFilter}
                onChange={(val) => setLocationFilter(val || '')}
                size="md"
                variant="unstyled"
                className="pill-select"
                leftSection={<IconMapPin size={16} />}
                styles={{ input: { paddingLeft: '2.2rem' } }}
                rightSectionWidth={16}
              />
            </Box>

            <Divider orientation="vertical" className="filter-divider" />

            {/* Job Type Select */}
            <Box className="filter-item">
              <Select
                placeholder="Job type"
                data={[
                  { value: '', label: 'All Types' },
                  { value: 'FullTime', label: 'Full Time' },
                  { value: 'PartTime', label: 'Part Time' },
                  { value: 'Contract', label: 'Contract' },
                  { value: 'Internship', label: 'Internship' }
                ]}
                value={jobTypeFilter}
                onChange={(val) => setJobTypeFilter(val || '')}
                size="md"
                variant="unstyled"
                className="pill-select"
                leftSection={<IconBriefcase size={16} />}
                styles={{ input: { paddingLeft: '2.2rem' } }}
                rightSectionWidth={16}
              />
            </Box>

            <Divider orientation="vertical" className="filter-divider" />

            {/* Salary Range */}
            <Box className="filter-item salary-block">
              <Stack gap="xs" align="flex-start" className="salary-group">
                <Group justify="space-between" align="center" className="salary-top" style={{ width: '100%' }}>
                  <Text size="sm" className="salary-label">Salary Per Month</Text>
                  <Text size="sm" className="salary-value">
                    ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
                  </Text>
                </Group>

                <RangeSlider
                  value={salaryRange}
                  onChange={(val) => setSalaryRange(val as [number, number])}
                  min={0}
                  max={200}
                  step={5}
                  className="salary-slider"
                  size="sm"
                  styles={{
                    track: { height: 2, background: '#000' },
                    bar: { height: 2, background: '#000' },
                    thumb: {
                      width: 12,
                      height: 12,
                      background: '#000',
                      border: '2px solid #fff',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                    },
                    mark: { display: 'none' },
                  }}
                />
              </Stack>
            </Box>
          </Group>
        </Box>

        {/* Jobs Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Grid gutter="xl" className="jobs-grid-mantine">
            {filteredJobs.map((job, index) => (
  <Grid.Col
    key={job.id || `${job.title}-${index}`}
    span={{ base: 12, sm: 6, md: 6, lg: 4 }}
  >
    <JobCard job={job} onApply={(job) => console.log('Apply to:', job.title)} />
  </Grid.Col>
))}

          </Grid>
        )}

        {!loading && filteredJobs.length === 0 && (
          <Box className="text-center py-12">
            <Text size="lg" className="text-slate-500">
              No jobs found matching your criteria
            </Text>
          </Box>
        )}
      </Container>
    </Layout>
  );
}
