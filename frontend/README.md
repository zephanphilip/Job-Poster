# JobBoard Frontend

A modern, responsive job board application built with Next.js, React, and Mantine UI.

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Clean, modern interface with gradient backgrounds and smooth animations
- **Dark Mode Support**: Automatic dark/light mode switching based on user preference
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: Hover effects, transitions, and loading states

### 🔍 Job Management
- **Job Listings**: Browse jobs with advanced filtering and search
- **Job Creation**: Create detailed job postings with rich forms
- **Real-time Search**: Debounced search with instant results
- **Smart Filters**: Filter by title, location, job type, and salary range

### 🎯 User Experience
- **Loading States**: Beautiful skeleton loaders and spinners
- **Empty States**: Helpful empty state components with actionable buttons
- **Error Handling**: Graceful error handling with user-friendly messages
- **Navigation**: Clean navigation with mobile-responsive menu

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: Mantine UI v8
- **Styling**: Tailwind CSS v4
- **Icons**: Tabler Icons
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **TypeScript**: Full TypeScript support

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Cyan (#06b6d4)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive**: Scales beautifully across all screen sizes

### Components
- **Cards**: Modern job cards with hover effects
- **Forms**: Clean, accessible forms with validation
- **Navigation**: Sticky header with mobile menu
- **Footer**: Comprehensive footer with links and contact info

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Improvements Made

1. **Modern Navigation**: Sticky header with gradient logo and mobile menu
2. **Hero Sections**: Eye-catching hero sections on main pages
3. **Enhanced Job Cards**: Beautiful cards with hover effects and better information hierarchy
4. **Advanced Filtering**: Improved search and filter interface
5. **Loading States**: Skeleton loaders and spinners for better UX
6. **Empty States**: Helpful empty state components
7. **Footer**: Comprehensive footer with contact information
8. **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
9. **Dark Mode**: Automatic dark/light mode support
10. **Animations**: Smooth transitions and hover effects throughout

## 🎨 UI Components

- `Layout`: Main layout wrapper with navigation and footer
- `Navigation`: Responsive navigation header
- `JobCard`: Modern job listing card
- `Footer`: Comprehensive footer component
- `EmptyState`: Reusable empty state component
- `LoadingSpinner`: Loading spinner component

## 🔧 Configuration

The app uses a custom Mantine theme with:
- Custom color palette
- Inter font family
- Consistent border radius and shadows
- Custom component defaults

## 📦 Dependencies

### Core
- `next`: 15.5.5
- `react`: 19.1.0
- `typescript`: 5

### UI & Styling
- `@mantine/core`: 8.3.4
- `@mantine/form`: 8.3.4
- `@mantine/dates`: 8.3.4
- `@mantine/notifications`: 8.3.4
- `@mantine/modals`: Latest
- `@tabler/icons-react`: Latest
- `tailwindcss`: 4

### Forms & HTTP
- `react-hook-form`: 7.65.0
- `axios`: 1.12.2

### Utilities
- `lodash.debounce`: 4.0.8
- `dayjs`: 1.11.18