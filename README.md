# Daily Bread

Daily Bread is a beautiful devotional website that provides daily spiritual readings and reflections. Each devotion includes inspiration from various religious leaders and authors, and the platform tracks how many times each devotion is viewed.

## Features

### Public Devotions Page
- Browse through a collection of daily devotions
- Each devotion card displays the title, author, and a preview of the content
- Click "Read Full Devotion" to view the complete text
- Responsive grid layout that works on all device sizes

### Admin Dashboard
The admin page provides comprehensive statistics about devotion engagement:

- **Summary Statistics**
  - Total views across all devotions
  - Total number of devotions available
  - Average views per devotion

- **Detailed Statistics Table**
  - View count for each devotion
  - Last viewed timestamp (with relative time display like "2 hours ago")
  - Individual reset button for each devotion
  - View full devotion directly from the admin panel

- **Visual Chart**
  - Bar chart showing views by devotion
  - Easy-to-understand visual comparison of devotion popularity
  - Responsive and interactive

- **Admin Controls**
  - Reset all statistics (with confirmation prompt)
  - Export statistics to JSON for data analysis and backup
  - Individual devotion statistics reset

## How View Tracking Works

The application uses browser localStorage to track devotion views:
- Each time a user opens a devotion, the view count increments
- The last viewed timestamp is recorded
- All data persists between browser sessions
- View counts are stored locally on each device (not synchronized across users)

## File Structure

```
Daily-Bread/
├── index.html              # Main devotions page
├── admin.html              # Admin dashboard
├── styles.css              # All styling for both pages
├── app.js                  # Main page functionality
├── admin.js                # Admin dashboard functionality
├── devotions-data.js       # Devotion content and analytics system
└── README.md               # This file
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser to view devotions
3. Navigate to `admin.html` to view statistics

No server or installation is required - the application runs entirely in your browser!

## Adding New Devotions

To add new devotions, edit the `devotions` array in `devotions-data.js`:

```javascript
{
    id: 7,
    title: "Your Devotion Title",
    author: "Author Name",
    date: "2026-09-06",
    content: `Your full devotion content here. You can use multiple paragraphs separated by double newlines.
    
    This will appear in the full view.`,
    preview: "A short preview that appears on the home page..."
}
```

Then refresh your browser and the new devotion will appear on the home page and admin dashboard.

## Browser Compatibility

This application works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c5f7c;
    --secondary-color: #d4a574;
    --accent-color: #e8f4f8;
    /* etc. */
}
```

### Content
- Modify devotion data in `devotions-data.js`
- Update page text in `index.html` and `admin.html`
- Adjust styling in `styles.css`

## Data Storage

All view statistics are stored in your browser's localStorage under the key `devotion-views`. To clear all data:
1. Open browser developer tools (F12)
2. Go to Application > Local Storage
3. Find the entry for this site and delete `devotion-views`

Or use the "Reset All Statistics" button on the admin page.

## Future Enhancements

Potential features for future versions:
- Backend database integration for cross-device statistics
- User authentication for personalized devotion tracking
- Devotion scheduling and notifications
- Sharing and social media integration
- Search and filtering capabilities
- Dark mode toggle
- Multiple language support

## License

This project is open source and available for personal and commercial use.

## Support

For issues, suggestions, or contributions, please create an issue in the repository.

---

**Daily Bread** - Nourishing your spirit daily.