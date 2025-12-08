# StrideCore

Embeddable tour widget for interactive user onboarding.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Supabase** - Backend (tour data, analytics)

## Setup

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run build:widget # Bundle embeddable widget
```

## Supabase Schema

```sql
-- Tours table
create table tours (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users,
  name text not null,
  steps jsonb not null,
  created_at timestamp default now()
);

-- Analytics table
create table tour_events (
  id uuid primary key default uuid_generate_v4(),
  tour_id uuid references tours,
  event_type text not null,
  step_index int,
  created_at timestamp default now()
);
```

## Usage

Embed on any website:

```html
<script src="https://your-domain.com/embed.js" data-tour-id="your-tour-id"></script>
```
