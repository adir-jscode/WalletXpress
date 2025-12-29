# Digital Xpress - Digital Wallet Frontend

## Live Deployment Link

https://digital-xpress-sigma.vercel.app/

## Project Overview

Digital Xpress is a comprehensive digital wallet application built for secure, fast, and convenient financial transactions. The platform supports three user roles: Users (for personal transactions), Agents (for cash-in/out services), and Admins (for system management). It features user authentication, transaction management, wallet operations, and a responsive UI designed for both web and mobile experiences.

Key features include:

- User registration and login with role-based access
- Dashboard views for Users, Agents, and Admins with relevant metrics
- Transaction history and management
- Cash-in and cash-out services for Agents
- Admin controls for user and agent management, transaction monitoring, and wallet oversight
- Responsive design with dark/light mode support
- Integration with a backend API for data management

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Routing**: React Router
- **UI Library**: Shadcn/ui (built on Radix UI and Tailwind CSS)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner for toasts
- **Theme**: Next Themes for dark/light mode
- **HTTP Client**: Axios (via RTK Query)
- **Development Tools**: ESLint, TypeScript, Vite plugins

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- A backend API server (configured via environment variables)

### Installation

Clone the repository:

```bash
git clone https://github.com/adir-jscode/WalletXpress.git
cd digital-xpress
```
