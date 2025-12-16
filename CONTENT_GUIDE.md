# Content Customization Guide

All wedding content can now be edited from a single file: **`src/config/content.js`**

## Quick Start

Edit `/src/config/content.js` to customize:

### 1. Couple Names
```javascript
couple: {
  groomFirstName: 'Fatih',
  groomFullName: 'Muhammad Fatih',
  brideFirstName: 'Novel',
  brideFullName: 'Novel',
  coupleNames: 'Fatih & Novel',
}
```

### 2. Wedding Date & Time
```javascript
wedding: {
  // IMPORTANT: Update this for the countdown timer!
  // Format: 'YYYY-MM-DDTHH:MM:SS+07:00' (Jakarta timezone)
  dateTime: '2026-01-25T14:00:00+07:00',
  
  saveTheDate: 'Save the Date · January 2026',
  ceremonyDate: 'Saturday · January 25, 2026',
  ceremonyTime: '14:00 WIB',
  receptionDate: 'Saturday · January 25, 2026',
  receptionTime: '18:00 WIB',
}
```

### 3. Venue Information
```javascript
venue: {
  ceremony: {
    name: 'Grand Ballroom',
    location: 'The Ritz-Carlton Jakarta',
    address: 'Mega Kuningan, Jakarta Selatan',
  },
  reception: {
    name: 'Pacific Ballroom',
    location: 'The Ritz-Carlton Jakarta',
    address: 'Mega Kuningan, Jakarta Selatan',
  },
  dressCode: 'Formal · Black Tie Optional',
}
```

### 4. Personal Stories & Messages
```javascript
coupleSection: {
  groom: {
    title: 'The Groom',
    bio: 'Your custom bio...',
  },
  bride: {
    title: 'The Bride',
    bio: 'Your custom bio...',
  },
  story: {
    title: 'Our Story',
    text: 'Your love story...',
  },
}
```

## What Gets Updated Automatically

When you edit `content.js`, these sections update automatically:

✅ **Hero Section**
- Couple names with letter-by-letter animation
- Subtitle
- Save the date text

✅ **Couple Section**
- Section title
- Groom/bride names and photos labels
- Titles (The Groom / The Bride)
- Personal bios
- Love story text

✅ **Event Section**
- Section title
- Ceremony details (type, time, date, venue)
- Reception details (type, time, date, venue)
- Dress code

✅ **Countdown Section**
- Section title and subtitle
- Countdown labels (Days, Hours, Minutes, Seconds)
- **Countdown timer** (reads from `wedding.dateTime`)

✅ **Gallery Section**
- Section title
- Image labels

✅ **Guest Book Section**
- Section title and subtitle
- Form labels and placeholders
- Submit button text

✅ **Footer**
- Closing message
- Couple names
- Meta text

## Hot Reload

The development server supports hot reload. When you edit `content.js`:
1. Save the file
2. The browser will automatically refresh
3. You'll see your changes instantly

## Notes

- **Date Format**: The countdown timer requires ISO 8601 format with timezone
- **Typography**: Text follows the luxury editorial style automatically
- **Responsive**: All text adapts to different screen sizes
- **No Code Required**: Just edit the strings in `content.js`

That's it! Customize the content to your heart's desire. 💕
