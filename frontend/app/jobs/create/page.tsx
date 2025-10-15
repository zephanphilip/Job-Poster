'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextInput, Textarea, Select, Button, Group, Title, Stack, Paper, Box, Text, Grid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPlus, IconBriefcase, IconBuilding, IconMapPin, IconCurrencyDollar, IconCalendar, IconFileText } from '@tabler/icons-react';
import { api } from '../../../lib/api';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';

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
  applicationDeadline?: Date | null;
};

export default function CreateJob() {
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
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Safely convert applicationDeadline to ISO string
      let isoDeadline: string | undefined = undefined;
      
      if (data.applicationDeadline) {
        // Check if it's already a Date object
        if (data.applicationDeadline instanceof Date && !isNaN(data.applicationDeadline.getTime())) {
          isoDeadline = data.applicationDeadline.toISOString();
        } 
        // If it's a string, convert to Date first
        else if (typeof data.applicationDeadline === 'string') {
          const parsedDate = new Date(data.applicationDeadline);
          if (!isNaN(parsedDate.getTime())) {
            isoDeadline = parsedDate.toISOString();
          }
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
      };

      console.log('Submitting payload:', payload);
      await api.post('/jobs', payload);
      
      showNotification({ 
        title: 'Success', 
        message: 'Job created successfully!',
        color: 'green'
      });
      
      router.push('/jobs');
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
    <Layout>
      <Container size="md" py="xl">
        <Paper 
          className="create-job-modal"
          radius="xl"
          withBorder
        >
          <Stack gap="xl">
            {/* Modal Title */}
            <Title order={2} className="modal-title">
              Create Job Opening
            </Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap="lg">
                {/* Row 1: Job Title + Company Name */}
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

                {/* Row 2: Location + Job Type */}
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

                {/* Row 3: Salary Range + Application Deadline */}
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text size="sm" fw={500} mb={5}>Salary Range</Text>
                    <Group grow>
                      <TextInput 
                        placeholder="₹0"
                        {...register('salaryRange')} 
                        size="md"
                      />
                      <TextInput 
                        placeholder="₹12,00,000"
                        {...register('salaryRangeMax')} 
                        size="md"
                      />
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
                          onChange={(date) => {
                            // Ensure we're storing a proper Date object
                            field.onChange(date);
                          }}
                          size="md"
                          leftSection={<IconCalendar size={16} />}
                          clearable
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>

                {/* Job Description */}
                <Textarea 
                  label="Job Description" 
                  placeholder="Please share a description to let the candidate know more about the job role"
                  {...register('description', { required: 'Job description is required' })} 
                  error={errors.description?.message}
                  minRows={4}
                  size="md"
                />

                {/* Optional: Requirements */}
                <Textarea 
                  label="Requirements (Optional)" 
                  placeholder="List key requirements and qualifications"
                  {...register('requirements')} 
                  minRows={3}
                  size="md"
                />

                {/* Optional: Responsibilities */}
                <Textarea 
                  label="Responsibilities (Optional)" 
                  placeholder="Describe main responsibilities for this role"
                  {...register('responsibilities')} 
                  minRows={3}
                  size="md"
                />

                {/* Footer Buttons */}
                <div className="modal-footer">
                  <Button 
                    variant="outline"
                    size="md"
                    className="btn-draft"
                    onClick={() => router.push('/jobs')}
                  >
                    Save Draft
                  </Button>
                  <Button 
                    type="submit" 
                    size="md"
                    className="apply-btn"
                  >
                    Publish »
                  </Button>
                </div>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </Layout>
  );
}
