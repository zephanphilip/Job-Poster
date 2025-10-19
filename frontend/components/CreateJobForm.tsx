'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Title,
  Stack,
  Paper,
  Box,
  Text,
  Grid
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { api } from '../lib/api'; // adjust path if needed
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

type FormValues = {
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange: string;
  salaryRangeMax?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  experience?: string;
  workmode?: string;
  applicationDeadline?: Date | null;
    companylogourl?: string;
};

export default function CreateJobForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      jobType: 'FullTime',
      salaryRange: '',
      salaryRangeMax: '',
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: null,
        experience: '',
        workmode: 'Onsite',
        companylogourl: ''
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      let isoDeadline: string | undefined;
      if (data.applicationDeadline) {
        if (data.applicationDeadline instanceof Date && !isNaN(data.applicationDeadline.getTime())) {
          isoDeadline = data.applicationDeadline.toISOString();
        } else if (typeof data.applicationDeadline === 'string') {
          const parsed = new Date(data.applicationDeadline);
          if (!isNaN(parsed.getTime())) isoDeadline = parsed.toISOString();
        }
      }

      const payload = {
        title: data.title,
        companyName: data.companyName,
        location: data.location,
        jobType: data.jobType,
        salaryRange: data.salaryRange,
        description: data.description,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        applicationDeadline: isoDeadline,
        experience: data.experience,
        workmode: data.workmode,
        companyLogo: data.companylogourl
      };

      await api.post('/jobs', payload);
       window.dispatchEvent(new CustomEvent('jobCreated', { detail: payload }));
      showNotification({
        title: 'Success',
        message: 'Job created successfully!',
        color: 'green'
      });

      // close modal and refresh jobs on the background page
      onClose?.();
      try { router.refresh(); } catch (e) { /* ignore if not available */ }
    } catch (err) {
      console.error('API Error:', err);
      showNotification({
        title: 'Error',
        message: 'Failed to create job. Please try again.',
        color: 'red'
      });
    }
  };

  return (
    <Container size="md" px={0}>
      
        <Stack gap="xl">
          <Title order={3} style={{ textAlign: 'center' }}>Create Job Opening</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="lg">
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Job Title"
                    placeholder="Full Stack Developer"
                    {...register('title', { required: 'Job title is required' })}
                    error={errors.title?.message}
                    size="md"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Company Name"
                    placeholder="Amazon, Microsoft, Swiggy"
                    {...register('companyName', { required: 'Company name is required' })}
                    error={errors.companyName?.message}
                    size="md"
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: 'Location is required' }}
                    render={({ field, fieldState }) => (
                      <Select
                        label="Location"
                        placeholder="Choose Preferred Location"
                        data={[
                          { value: 'Remote', label: 'Remote' },
                          { value: 'Bangalore', label: 'Bangalore' },
                          { value: 'Mumbai', label: 'Mumbai' },
                          { value: 'Delhi', label: 'Delhi' },
                          { value: 'Hyderabad', label: 'Hyderabad' },
                          { value: 'Pune', label: 'Pune' }
                        ]}
                        {...field}
                        error={fieldState.error?.message}
                        size="md"
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Job Type"
                        placeholder="FullTime"
                        data={[
                          { value: 'FullTime', label: 'Full Time' },
                          { value: 'PartTime', label: 'Part Time' },
                          { value: 'Contract', label: 'Contract' },
                          { value: 'Internship', label: 'Internship' }
                        ]}
                        {...field}
                        size="md"
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                   <TextInput
                    label="Experience Required"
                    placeholder="1-3 years"
                    {...register('experience', { required: 'Experience is required' })}
                    error={errors.experience?.message}
                    size="md"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Controller
                    name="workmode"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Work mode"
                        placeholder="Onsite"
                        data={[
                          { value: 'Onsite', label: 'Onsite' },
                          { value: 'Hybrid', label: 'Hybrid' },
                          { value: 'Remote', label: 'Remote' },
                        ]}
                        {...field}
                        size="md"
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>          
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb={5}>Salary Range</Text>
                  <Group grow>
                    <TextInput placeholder="₹0" {...register('salaryRange')} size="md" />
                    <TextInput placeholder="₹12,00,000" {...register('salaryRangeMax')} size="md" />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Controller
                    name="applicationDeadline"
                    control={control}
                    render={({ field }) => (
                      <DateInput
                        label="Application Deadline"
                        placeholder="Select date"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        size="md"
                        leftSection={<IconCalendar size={16} />}
                        clearable
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>
            <TextInput
                label="Company Logo URL"
                placeholder='your company logo url'
                {...register('companylogourl', { required: 'Company logo url is required' })}
                error={errors.companylogourl?.message}
                size="md"
            />
              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                {...register('description', { required: 'Job description is required' })}
                error={errors.description?.message}
                minRows={17}
                size="md"
              />
              <Group justify="space-between" mt="md">
                <Button variant="outline" color='black' onClick={() => onClose?.()}>Save Draft <IconChevronDown size={16} style={{ marginLeft: 8 }} /></Button>
                <Button type="submit">Publish »</Button>
              </Group>
            </Stack>
          </form>
        </Stack>

    </Container>
  );
}
