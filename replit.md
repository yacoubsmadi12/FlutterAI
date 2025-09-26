# Appio Flow - AI-Powered Flutter App Generator

## Overview

Appio Flow is an AI-powered web platform that transforms simple text prompts into complete Flutter mobile applications. Built as part of the Noorixa AI ecosystem, the platform uses Gemini AI to generate production-ready Flutter code, providing users with a complete development workflow from idea conception to app deployment. The application features a modern React frontend with Express.js backend, supporting multi-language interfaces (English/Arabic), theme customization, user authentication, project management, and integrated PayPal billing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with **React 18** using TypeScript and Vite as the build tool. The application follows a component-based architecture with:

- **UI Framework**: Shadcn/ui components with Radix UI primitives for consistent design
- **Styling**: TailwindCSS with CSS variables for theme customization and RTL support
- **State Management**: React Context for authentication, theme, and language state
- **Data Fetching**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: Firebase Auth integration with Google OAuth and email/password

The frontend implements a responsive layout with conditional sidebar navigation for authenticated users and comprehensive internationalization support.

### Backend Architecture
The server-side uses **Express.js** with TypeScript and follows a RESTful API design:

- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod schemas shared between client and server
- **Session Management**: In-memory storage for development (designed for PostgreSQL in production)
- **API Structure**: Modular route handling with dedicated controllers for auth, projects, generations, and billing

### Database Design
The application uses PostgreSQL with Drizzle ORM, featuring four main entities:

- **Users**: Stores user profiles, preferences, credits, and subscription status
- **Projects**: Contains Flutter project metadata, settings, and generated code
- **Generations**: Tracks AI generation requests with prompt history and credit usage
- **Subscriptions**: Manages billing information and subscription tiers

The schema supports multi-tenancy with user-scoped data access and includes audit trails for generation history.

### AI Integration
**Gemini AI Integration** powers the core Flutter code generation:

- Uses Google's GenAI SDK for prompt-to-code transformation
- Generates complete Flutter projects including main.dart, pubspec.yaml, pages, widgets, and assets
- Supports theme customization and multi-language app generation
- Implements structured JSON responses for consistent code organization

### Payment Processing
**PayPal Integration** handles subscription billing:

- PayPal Server SDK for secure payment processing
- Supports sandbox and production environments
- Credit-based system with tiered subscription plans
- Order creation and capture workflow for one-time purchases

### Authentication System
**Multi-Provider Authentication** supports:

- Firebase Authentication for Google OAuth and email/password
- Custom user profile management in PostgreSQL
- Session-based authentication with Express
- Automatic user creation and profile synchronization

### Development Infrastructure
The application includes modern development tooling:

- **Build System**: Vite with hot module replacement and TypeScript support
- **Code Quality**: Shared TypeScript configuration and ESLint setup
- **Database Migrations**: Drizzle migrations for schema versioning
- **Environment Management**: Separate configs for development and production

## External Dependencies

### Core Services
- **Gemini AI API**: Primary AI service for Flutter code generation using Google's GenAI SDK
- **Firebase Authentication**: User authentication and session management
- **PayPal API**: Payment processing and subscription billing
- **PostgreSQL**: Primary database (Neon serverless recommended)

### Frontend Libraries
- **React Ecosystem**: React 18, React Router (Wouter), React Hook Form
- **UI Framework**: Shadcn/ui with Radix UI primitives
- **State Management**: TanStack React Query, React Context
- **Styling**: TailwindCSS, Class Variance Authority, clsx
- **Development**: Vite, TypeScript, PostCSS

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript
- **Database**: Drizzle ORM, Drizzle Kit for migrations
- **Validation**: Zod for schema validation
- **Build Tools**: ESBuild for production builds, TSX for development

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint, Prettier (implied from consistent formatting)
- **Testing**: Structure supports testing frameworks (testing files excluded from build)