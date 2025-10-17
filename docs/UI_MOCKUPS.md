# Rock Spotter UI Mockups & Examples

Visual examples of how the Rock Spotter design system appears in the app.

## 🏠 Home Screen

```
┌────────────────────────────────────────┐
│ Rock Spotter              🔍  👤       │ ← Primary Brown Header
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ [Rock Photo - Beautiful Granite] │ │
│  │                                  │ │
│  │ 🌋 Igneous ←─────────────────────┤ │ ← Volcanic Red Badge
│  ├──────────────────────────────────┤ │
│  │ Beautiful Pink Granite           │ │
│  │ Found this stunning specimen...  │ │
│  │ 📍 San Francisco, CA             │ │
│  │                                  │ │
│  │ ❤️ 24  💬 5  👤 @rockfan123      │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ [Rock Photo - Sedimentary Layer] │ │
│  │                                  │ │
│  │ 🏜️ Sedimentary ←─────────────────┤ │ ← Sandy Beige Badge
│  ├──────────────────────────────────┤ │
│  │ Layered Sandstone                │ │
│  │ Amazing layers from different... │ │
│  │ 📍 Grand Canyon, AZ              │ │
│  │                                  │ │
│  │ ❤️ 42  💬 8  👤 @geopro          │ │
│  └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
│ 🏠    🔍    🗺️    🏃    👤           │ ← Bottom Navigation
└────────────────────────────────────────┘
```

**Colors Used:**
- Background: `#FAFAF8` (Off-white)
- Cards: `#FFFFFF` (White)
- Primary Text: `#2D2D2D` (Almost black)
- Rock Type Badges: Specific rock colors
- Icons: Native emoji

## 🏃 Hunt Card

```
┌────────────────────────────────────────┐
│ Downtown Rock Hunt                     │ ← Bold Title
│ ⭐⭐ Medium                             │ ← Amber Difficulty
├────────────────────────────────────────┤
│                                        │
│ Find 5 hidden rocks in the downtown   │
│ area! Use the clues to discover each  │
│ location.                              │
│                                        │
│ Progress: ▓▓▓▓▓░░░░░ 5/10             │
│                                        │
│ 👥 23 participants                     │
│ 📅 Started: Oct 15                     │
│ ⏰ Ends in 3 days                      │
│                                        │
│ [ Join Hunt ]  [ View Details ]       │
└────────────────────────────────────────┘
```

**Colors Used:**
- Card: `#FFFFFF` with `shadow-md`
- Difficulty: `#FFB74D` (Amber for Medium)
- Progress Bar: `#7C9082` (Sage Green filled)
- Buttons: `#6B5B4C` (Primary Brown)

## 🏆 Achievement Badge

```
     ╭──────────────╮
     │              │
     │      🏆      │ ← Trophy Icon (48px)
     │              │
     │  First Rock  │ ← Achievement Name
     │              │
     │  ┌────────┐  │
     │  │  RARE  │  │ ← Rarity Badge
     │  └────────┘  │
     │              │
     │ Share your   │
     │ first rock   │
     │    photo     │
     │              │
     ╰──────────────╯
```

**Colors Used:**
- Background: `#64B5F6` (Blue for Rare)
- Text: `#FFFFFF` (White)
- Border: Rounded `12px`
- Shadow: `shadow-lg`

## 👤 Profile Screen

```
┌────────────────────────────────────────┐
│ ← Profile Settings                  ⚙️  │
├────────────────────────────────────────┤
│                                        │
│            ╭────────╮                  │
│            │  👤    │                  │ ← Avatar (64px circle)
│            ╰────────╯                  │
│                                        │
│          @rockfan123                   │
│     Rock enthusiast since 2025         │
│                                        │
│  ┌──────┬──────┬──────┬──────┐       │
│  │  15  │   3  │  24  │   5  │       │
│  │ Rocks│Hunts │Likes │Badge │       │
│  └──────┴──────┴──────┴──────┘       │
│                                        │
│  Achievements                      🏆  │
│  ┌────────────────────────────────┐  │
│  │ 🪨 First Rock        Common     │  │
│  │ 📸 Rock Collector    Rare       │  │
│  │ 🏃 Hunt Master       Epic       │  │
│  └────────────────────────────────┘  │
│                                        │
│  Recent Rocks                      📸  │
│  ┌──────┬──────┬──────┬──────┐     │
│  │ [img]│ [img]│ [img]│ [img]│     │
│  └──────┴──────┴──────┴──────┘     │
│                                        │
└────────────────────────────────────────┘
```

**Colors Used:**
- Background: `#F5F3F0` (Light beige)
- Cards: `#FFFFFF`
- Stats: `#7C9082` (Sage Green)
- Achievement Badges: Rarity colors
- Bio Text: `#666666` (Secondary text)

## 🗺️ Map View

```
┌────────────────────────────────────────┐
│ Map                           🔧 ⭐    │
├────────────────────────────────────────┤
│                                        │
│         [Interactive Map]              │
│                                        │
│    📍         📍                       │
│  (Rock 1)   (Rock 2)                  │
│                     📍                 │
│                   (Rock 3)            │
│         📍                             │
│       (Rock 4)                        │
│                                        │
│  ╭────────────────────╮               │
│  │ 🌋 Beautiful      ↑│               │ ← Info Card
│  │    Granite         │               │
│  │ 📍 0.3 mi away     │               │
│  ╰────────────────────╯               │
│                                        │
└────────────────────────────────────────┘
│ [ 🗺️ Map ] [ 📋 List ]               │ ← View Toggle
└────────────────────────────────────────┘
```

**Colors Used:**
- Map markers: Rock type colors
- Info card: `#FFFFFF` with `shadow-xl`
- Toggle buttons: `#7C9082` when active

## 🌙 Dark Mode Example

```
┌────────────────────────────────────────┐
│ Rock Spotter              🔍  👤       │ ← Header (#2C2C2C)
├────────────────────────────────────────┤
│                                        │ Background: #1E1E1E
│  ┌──────────────────────────────────┐ │
│  │ [Rock Photo]                     │ │
│  │ 🌋 Igneous                        │ │
│  ├──────────────────────────────────┤ │ Card: #2C2C2C
│  │ Beautiful Granite                │ │ Text: #E8E8E8
│  │ Found this amazing...            │ │ Secondary: #B0B0B0
│  │ 📍 San Francisco, CA             │ │
│  │ ❤️ 24  💬 5                       │ │
│  └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

**Dark Mode Colors:**
- Primary BG: `#1E1E1E`
- Card BG: `#2C2C2C`
- Primary Text: `#E8E8E8`
- Secondary Text: `#B0B0B0`
- Borders: `#3A3A3A`

## 📱 Button Styles

### Primary Button
```
┌─────────────────┐
│  Create Rock    │ ← #6B5B4C background, white text
└─────────────────┘
```

### Secondary Button
```
┌─────────────────┐
│   Join Hunt     │ ← #7C9082 background, white text
└─────────────────┘
```

### Text Button
```
  Cancel          ← #6B5B4C text, transparent background
```

### Icon Button
```
┌───┐
│ ❤️ │ ← 40x40px, #6B5B4C when active
└───┘
```

## 🎨 Rock Type Badges Showcase

```
🌋 Igneous     (#D84A3F - Volcanic Red)
🏜️ Sedimentary (#D4A574 - Sandy Beige)
⛰️ Metamorphic (#6B8E9F - Slate Blue)
💎 Mineral     (#8B7B9B - Crystal Purple)
🦴 Fossil      (#8B7355 - Fossil Brown)
🪨 Other       (#7A8B8B - Gray-Green)
```

## 🎯 Difficulty Indicators

```
⭐ Easy        (#81C784 - Light Green)
⭐⭐ Medium     (#FFB74D - Amber)
⭐⭐⭐ Hard     (#E57373 - Light Red)
```

## 🏆 Rarity Showcase

```
🥉 Common      (#9E9E9E - Gray)
🥈 Rare        (#64B5F6 - Blue)
🥇 Epic        (#BA68C8 - Purple)
👑 Legendary   (#FFD54F - Gold)
```

## 🔔 Notification Toast

```
┌────────────────────────────────────────┐
│ ✓ Rock posted successfully!            │ ← Success (#5A8B5F)
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ⚠️ Please fill in all fields           │ ← Warning (#D4A033)
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ✗ Failed to upload photo               │ ← Error (#D84A3F)
└────────────────────────────────────────┘
```

## 📋 Form Elements

### Text Input
```
┌────────────────────────────────────────┐
│ Rock Title                             │ ← Label
├────────────────────────────────────────┤
│ Beautiful Pink Granite                 │ ← Input (#FFFFFF bg)
└────────────────────────────────────────┘
```

### Dropdown/Select
```
┌────────────────────────────────────────┐
│ Rock Type                          ▼   │
├────────────────────────────────────────┤
│ 🌋 Igneous                            │
│ 🏜️ Sedimentary                        │
│ ⛰️ Metamorphic                         │
│ 💎 Mineral                            │
│ 🦴 Fossil                             │
│ 🪨 Other                              │
└────────────────────────────────────────┘
```

### Checkbox
```
☑️ Make this rock public
☐ Add to my collection
```

### Slider
```
Distance: 5 km
━━━━━━━━━○━━━━━━━━
0                    50
```

## 📊 Stats Display

```
┌─────────────────────────────────────────┐
│ Your Stats                              │
├─────────────────────────────────────────┤
│                                         │
│   Rocks Shared        Hunts Completed  │
│       15                    3           │
│   ───────────         ───────────       │
│   Total Likes         Achievements     │
│       124                   8           │
│                                         │
└─────────────────────────────────────────┘
```

## 🔍 Search Bar

```
┌────────────────────────────────────────┐
│ 🔍 Search rocks, users, hunts...      │
└────────────────────────────────────────┘
```

## ⚙️ Settings Toggle

```
Dark Mode                         [ ○ ] ← Toggle off (gray)
Notifications                     [ ● ] ← Toggle on (sage green)
```

---

## Spacing Examples

**Card Padding**: 16px all sides  
**Screen Padding**: 16px edges  
**Section Spacing**: 24px between sections  
**List Item Gap**: 12px between items

## Font Usage in Context

- **Headings**: Inter Bold, 20-28px
- **Body Text**: Inter Regular, 16px
- **Rock Descriptions**: Merriweather Regular, 16px
- **Captions**: Inter Regular, 12-14px
- **Coordinates**: Roboto Mono, 12px

---

These mockups demonstrate how the Rock Spotter design system creates a cohesive, professional, and engaging user experience with appropriate theming for a rock enthusiast platform! 🪨✨
