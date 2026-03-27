# Planning Guide

A world clock and time zone converter that allows users to view current times across multiple time zones simultaneously and convert specific times between zones.

**Experience Qualities**: 
1. **Instantaneous** - Time updates and conversions happen in real-time with immediate visual feedback
2. **Global** - Emphasizes the worldwide nature of time zones with a clean, international aesthetic
3. **Precise** - Communicates accuracy and reliability through crisp typography and clear time displays

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused utility app with time zone management, clock displays, and time conversion functionality. It requires persistent state for saved time zones and dynamic UI updates but doesn't involve complex workflows or multiple views.

## Essential Features

### Live World Clocks
- **Functionality**: Displays current time for multiple selected time zones with auto-updating clocks
- **Purpose**: Quick at-a-glance view of times in different locations around the world
- **Trigger**: Automatically begins on page load
- **Progression**: App loads → Displays saved time zones (or defaults) → Clocks update every second → User can add/remove zones
- **Success criteria**: All clocks display accurate time, update smoothly without flickering, and stay synchronized

### Add/Remove Time Zones
- **Functionality**: Search and select from comprehensive list of time zones, save selections persistently
- **Purpose**: Customize which time zones are relevant to the user's needs
- **Trigger**: User clicks "Add Time Zone" button
- **Progression**: Click add button → Search/select dialog opens → Type to filter zones → Select zone → Zone appears in list with live clock
- **Success criteria**: Search is fast and intuitive, selected zones persist across sessions, duplicate zones are prevented

### Time Converter
- **Functionality**: Set a specific time in one zone and see equivalent time in all other displayed zones
- **Purpose**: Plan meetings and coordinate across time zones by converting a specific moment
- **Trigger**: User clicks on a time zone card or uses conversion mode
- **Progression**: Select source zone → Pick date/time → All other zones update to show equivalent time → Offset information displays clearly
- **Success criteria**: Conversions are instant and accurate, including handling of DST transitions

### Time Zone Information
- **Functionality**: Display UTC offset, location names, current date, and interactive map for each zone
- **Purpose**: Provide context beyond just the time (is it today or tomorrow there?) and visualize city locations
- **Trigger**: Information displays alongside each clock; map opens via "View Map" button
- **Progression**: Zone is added → City name, UTC offset, and date display → Click "View Map" → Dialog opens with OpenStreetMap iframe showing city location
- **Success criteria**: All metadata is accurate and updates appropriately (especially date changes at midnight); maps load correctly with proper coordinates and zoom level

## Edge Case Handling

- **Empty State**: Show helpful prompt to add first time zone when none are saved
- **Duplicate Zones**: Prevent adding the same time zone multiple times
- **Daylight Saving Time**: Automatically handle DST transitions with correct offset adjustments
- **Date Boundaries**: Clearly show when different zones are in different days
- **Search No Results**: Display helpful message when time zone search yields no matches
- **Maximum Zones**: Limit to reasonable number (10 zones) to prevent UI overflow
- **Missing Coordinates**: Gracefully handle time zones without latitude/longitude data by not displaying map button

## Design Direction

The design should evoke precision, internationalism, and modernity. Think aviation control panels, world time displays in airports, and premium watch interfaces. The aesthetic should feel technical yet approachable, with emphasis on legibility and quick scanning. Time should feel like the hero element with generous spacing and bold typography.

## Color Selection

A sophisticated palette inspired by global travel and precision instruments, with deep blue representing the international nature of time zones.

- **Primary Color**: Deep Ocean Blue `oklch(0.35 0.15 250)` - Represents the global, international nature of world time; conveys trust and precision
- **Secondary Colors**: 
  - Slate Gray `oklch(0.92 0.01 250)` - Neutral background for time zone cards
  - Cool Gray `oklch(0.65 0.02 250)` - Supporting text and metadata
- **Accent Color**: Bright Cyan `oklch(0.75 0.15 210)` - Highlights active time zones and interactive elements; suggests digital precision
- **Foreground/Background Pairings**: 
  - Background White `oklch(0.99 0 0)`: Deep Ocean Blue text `oklch(0.35 0.15 250)` - Ratio 9.2:1 ✓
  - Primary `oklch(0.35 0.15 250)`: White text `oklch(0.99 0 0)` - Ratio 9.2:1 ✓
  - Slate Gray `oklch(0.92 0.01 250)`: Deep Ocean Blue text `oklch(0.35 0.15 250)` - Ratio 8.1:1 ✓
  - Accent Cyan `oklch(0.75 0.15 210)`: Deep Ocean Blue text `oklch(0.35 0.15 250)` - Ratio 3.8:1 ✓ (for large text only)

## Font Selection

Typography should emphasize clarity and readability for time displays while maintaining a technical, international aesthetic.

- **Primary Font**: Space Grotesk - A geometric sans-serif with technical character, perfect for time displays
- **Monospace Font**: JetBrains Mono - For time displays to ensure consistent digit width and alignment

- **Typographic Hierarchy**: 
  - H1 (App Title): Space Grotesk Bold/32px/tight letter spacing
  - H2 (Time Zone Label): Space Grotesk Medium/18px/normal spacing
  - Time Display (Large): JetBrains Mono Bold/48px/tabular numbers
  - Time Display (Small): JetBrains Mono Medium/24px/tabular numbers
  - Metadata (UTC offset, date): Space Grotesk Regular/14px/relaxed spacing
  - Body Text: Space Grotesk Regular/16px/normal spacing

## Animations

Animations should emphasize the passage of time and the global nature of the app while maintaining precision and clarity.

Subtle pulsing on the second hand or time display creates life without distraction. Zone cards should slide in smoothly when added with a gentle spring animation. The time converter should use crossfade transitions when switching between zones. Dialog overlays should fade in with a subtle backdrop blur for depth. Hover states on interactive elements should respond with immediate but gentle scale and color transitions.

## Component Selection

- **Components**: 
  - `Card` - For each time zone display with clean borders and subtle shadows
  - `Dialog` - For adding new time zones with search functionality and viewing city maps
  - `Button` - Primary actions (add zone) with accent color, secondary for remove actions, outline for map viewing
  - `Input` - Search field in add zone dialog with icon
  - `ScrollArea` - For time zone list in dialog when results are lengthy
  - `Badge` - For UTC offset indicators with subtle background
  - `Separator` - Between time zone cards for visual organization
  - Custom clock component with `framer-motion` for smooth time updates
  - OpenStreetMap iframe integration for city location visualization

- **Customizations**: 
  - Custom time picker component using radix primitives
  - Animated clock face or time display with smooth second transitions
  - Search results list with keyboard navigation
  - Zone card with remove button that appears on hover

- **States**: 
  - Buttons: Solid primary color with slight scale on hover (1.02x), pressed state with reduced scale (0.98x)
  - Cards: Default with subtle border, hover with elevated shadow and border color shift to accent
  - Input: Subtle border with focus ring in accent color, smooth transition
  - Badges: Muted background with border, no interactive states
  - Remove button: Appears on card hover with fade-in animation, destructive color on hover

- **Icon Selection**: 
  - `Plus` - Add time zone
  - `X` or `Trash` - Remove time zone  
  - `MagnifyingGlass` - Search input
  - `Globe` - App logo/header icon
  - `Clock` - Converter mode icon
  - `MapPin` - Location indicator and map view action
  - `Eye` - Show live time mode

- **Spacing**: 
  - Container padding: `p-6` on desktop, `p-4` on mobile
  - Card gaps: `gap-4` in grid layout
  - Internal card padding: `p-6`
  - Element spacing: `space-y-2` for related items, `space-y-4` for sections
  - Button padding: `px-6 py-3`

- **Mobile**: 
  - Grid switches from 2-3 columns to single column stack
  - Time displays scale down from 48px to 36px
  - Cards use full width with reduced padding (`p-4` instead of `p-6`)
  - Search dialog becomes full-screen sheet on mobile
  - Touch targets minimum 44x44px for all interactive elements
  - Simplified layout prioritizes current time over detailed metadata
