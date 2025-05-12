# Technical Context

## Technology Stack

- Next.js 15 (App Router)
- TypeScript 5
- Better-auth
- Tailwind CSS 4
- Radix UI
- Shadcn UI
- React 19
- NPM Package Manager

## Development Setup

- Node.js environment
- NPM as package manager (v9.11.0)
- Turbopack for development
- ESLint for code linting
- TypeScript for type checking
- Tailwind CSS for styling
- Next.js App Router for routing and server components

## Technical Constraints

- Server-first architecture using Next.js App Router
- Strict TypeScript configuration
- Mobile-first responsive design
- Better-auth for authentication and neondb for database
- Modern browser support only

## Dependencies

Core:
- next: 15.2.2
- react: 19.0.0
- react-dom: 19.0.0
- Better-auth 

UI:
- @radix-ui/react-avatar: 1.1.3
- @radix-ui/react-dropdown-menu: 2.1.6
- @radix-ui/react-label: 2.1.2
- @radix-ui/react-slot: 1.1.2
- class-variance-authority: 0.7.1
- clsx: 2.1.1
- Better-auth
- lucide-react: 0.482.0
- react-slick: 0.30.3
- slick-carousel: 1.8.1
- sonner: 2.0.1
- tailwind-merge: 3.0.2
- tailwindcss-animate: 1.0.7

## UI Components

### DropdownMenu
- Always use `modal={false}` prop to prevent focus trap issues:
```tsx
<DropdownMenu modal={false}>
  {/* dropdown content */}
</DropdownMenu>
```

## Infrastructure

- Version Control: Git
- Package Management: NPM
- Development Server: Next.js dev server with Turbopack
- Database: neondb
- Authentication: Better-auth
- Styling: Tailwind CSS with Shadcn UI components
- IDE Support: VSCode configuration included

## Development Practices

- Functional programming approach
- Server-first architecture with Next.js App Router
- TypeScript for type safety
- Mobile-first responsive design
- Component-driven development with Shadcn UI
- Utility-first CSS with Tailwind
- Modern JavaScript features (ES6+)
- Server Components by default, Client Components when needed

## Testing Strategy

- TypeScript for static type checking
- ESLint for code quality
- Component isolation with Shadcn UI
- Server/Client component separation
- Proper error boundaries implementation
- Middleware for route protection


## Deployment Process

- Build process using Next.js build
- Production deployment with Next.js start
- Environment variables management
- Database migrations and seeding
- Route middleware configuration
- Static asset optimization

## Notes

- Created on: March 19, 2024
- Last Updated: March 19, 2024
- Project Status: Active Development
