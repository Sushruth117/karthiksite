# Karthigeyan R - Memorial Website

A beautiful memorial website celebrating the life of Karthigeyan R, featuring an interactive solar system theme, photo galleries, memories, and special event pages.

## 🌟 Features

### Main Pages
- **Home (Solar System)** - Interactive solar system animation with orbiting planets
- **Memories** - Collection of stories and moments shared by friends
- **Birthday Tribute** - Special page celebrating Karthik's birthday with virtual candle
- **Memorial Day** - Annual student competition and prize distribution event
- **Photo Gallery** - Organized collection of photos from different periods
- **Guest Book** - Interactive form for friends to share memories
- **Timeline** - Visual timeline of important life moments

### Interactive Features
- ✨ Animated starfield background
- 🪐 Solar system with realistic orbits
- 🎛️ Controls for real planet sizes and orbit distances
- 🌞 Red giant mode (Easter egg)
- 🕯️ Virtual candle lighting
- 📸 Lightbox for viewing photos
- 📝 Guest book with local storage
- ⌨️ Keyboard shortcuts (R for orbits, S for sizes, ESC to reset)

## 📁 File Structure

```
karthigeyan-memorial/
├── index.html                 # Main homepage with solar system
├── css/
│   ├── main-style.css        # Main stylesheet for home page
│   └── pages-style.css       # Stylesheet for all sub-pages
├── js/
│   ├── main-script.js        # Main JavaScript functionality
│   └── pages-script.js       # Page-specific JavaScript
├── pages/
│   ├── memories.html         # Memories collection
│   ├── birthday-tribute.html # Birthday celebration page
│   ├── memorial-day.html     # Memorial day event page
│   ├── photo-gallery.html    # Photo gallery
│   ├── guest-book.html       # Interactive guest book
│   └── timeline.html         # Life timeline
└── images/                   # All images (you need to add these)
    ├── favicon.png
    ├── app-icon.png
    ├── karthik-observatory.jpg
    ├── karthik-iim.jpg
    └── [other photos]
```

## 🖼️ Images You Need to Add

Place these images in the `images/` folder:

### Required Images:
1. **favicon.png** - Small icon for browser tab (16x16 or 32x32 px)
2. **app-icon.png** - Larger icon for mobile (180x180 px)
3. **karthik-observatory.jpg** - Main photo from observatory visit (Dec 26, 2019)
4. **karthik-iim.jpg** - Photo from IIM Bangalore

### Photos from Your Collection:
- `20191226_131622.jpg` (and various sizes: p-500, p-800, p-1080, p-1600, etc.)
- `IMG-20190420-WA0004.jpg`
- `IMG-20191013-WA0002.jpg`
- `Kurthik discussing case study.jpg`
- `Kurthik in Tennis team at IIM Bangalore.jpg`
- `Kurthik class (2).jpg`
- `Kurthik in class.jpg`
- `Kurthik in college park.jpg`

### Birthday Celebration Photos (if available):
- `birthday-celebration-1.jpg` through `birthday-celebration-4.jpg`

### Memorial Day Photos (if available):
- `memorial-prize-distribution-1.jpg`
- `memorial-student-presentation-1.jpg`
- `memorial-winners-1.jpg`
- `memorial-audience-1.jpg`
- `memorial-judges-1.jpg`
- `memorial-group-photo.jpg`

**Note:** If you don't have all images yet, the website will still work - images will just show as broken links until you add them.

## 🚀 Setup Instructions

### Step 1: Organize Your Files
1. Download all the files to your computer
2. Keep the folder structure exactly as shown above
3. Add your images to the `images/` folder

### Step 2: Update Content
Edit the HTML files to customize:

**In index.html:**
- Update the hero section text
- Modify navigation card descriptions

**In pages/memories.html:**
- Add more memory cards
- Update the poem if needed

**In pages/birthday-tribute.html:**
- Add real birthday wishes from friends
- Update photo paths

**In pages/memorial-day.html:**
- Fill in actual winner names and projects
- Update event dates
- Add real statistics

**In pages/guest-book.html:**
- Review and update the sample entries
- Adjust form fields if needed

### Step 3: Deploy to Your Domain (karthigeyanr.com)

#### Option A: Using GitHub Pages (Free)
1. Create a GitHub account
2. Create a new repository named `karthigeyan-memorial`
3. Upload all files maintaining the folder structure
4. Go to Settings → Pages
5. Select main branch as source
6. Add your custom domain: karthigeyanr.com
7. Update DNS settings with your domain registrar:
   - Add CNAME record pointing to `[username].github.io`

#### Option B: Using Traditional Web Hosting
1. Get hosting service (Hostinger, Bluehost, etc.)
2. Upload all files via FTP/File Manager
3. Maintain the folder structure
4. Point your domain to the hosting

#### Option C: Using Netlify (Easiest, Free)
1. Sign up at netlify.com
2. Drag and drop your entire folder
3. Add custom domain karthigeyanr.com
4. Update DNS settings automatically

## 🎨 Customization Guide

### Changing Colors
Edit CSS variables in `css/main-style.css`:
```css
:root {
  --color-gold: #d4af37;        /* Main accent color */
  --color-gold-light: #f0d878;  /* Lighter accent */
  --color-bg: #050508;          /* Background color */
  --color-text: #ffffff;        /* Main text color */
}
```

### Adding New Memories
In `pages/memories.html`, copy this template:
```html
<div class="memory-card">
    <div class="memory-header">
        <span class="memory-number">5</span>
        <h3 class="memory-title">Memory Title</h3>
    </div>
    <div class="memory-content">
        <p class="memory-text">
            Your memory text here...
        </p>
    </div>
</div>
```

### Adding Photos to Gallery
In `pages/photo-gallery.html`, add:
```html
<div class="photo-item">
    <img src="../images/your-photo.jpg" alt="Description" loading="lazy">
    <p class="photo-caption">Your caption here</p>
</div>
```

### Updating Contact Email
Search and replace `sushruthk9@gmail.com` with your preferred email across all files.

## 📱 Mobile Responsiveness

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Breakpoints:
- Desktop: 992px and above
- Tablet: 768px - 991px
- Mobile: 767px and below

## ⌨️ Keyboard Shortcuts

- `R` - Enable real orbit distances
- `Shift + R` - Reset orbit distances
- `S` - Enable real planet sizes
- `Shift + S` - Reset planet sizes
- `ESC` - Reset all modes

## 🔧 Technical Details

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

### Performance
- Lazy loading images
- Optimized animations
- Minimal JavaScript
- No external dependencies (except Google Fonts)

### Accessibility
- Keyboard navigation
- Focus indicators
- ARIA labels
- Reduced motion support
- High contrast mode support

## 📝 Guest Book Data

The guest book stores entries in browser's localStorage. For production:

### Option 1: Email Integration
Connect the form to an email service:
- Formspree (formspree.io)
- EmailJS (emailjs.com)
- Netlify Forms (if using Netlify)

### Option 2: Database Backend
For permanent storage, consider:
- Firebase Realtime Database
- Supabase
- Custom backend with Node.js

## 🎯 Future Enhancements

Consider adding:
- [ ] Search functionality for memories
- [ ] Filtering photos by date/category
- [ ] Admin panel for managing content
- [ ] Email notifications for new guest book entries
- [ ] Social media sharing buttons
- [ ] Download memories as PDF
- [ ] Multi-language support (Tamil translation)

## 🤝 Contributing Memories

Friends and family can:
1. Visit the Guest Book page
2. Fill out the form with their memory
3. Email photos to include: sushruthk9@gmail.com

## 💝 Maintaining the Site

### Regular Updates:
- Add new guest book entries after review
- Update memorial day page with new event info
- Add photos as they're shared
- Keep candle count visible and meaningful

### Annual Tasks:
- Update birthday tribute on his birthday
- Update memorial day page after annual event
- Refresh with new photos and memories

## 📧 Contact

For questions or to share memories:
Email: sushruthk9@gmail.com

## 🙏 Credits

Created with love and care to honor the memory of Karthigeyan R.

**Technology Stack:**
- Pure HTML5, CSS3, JavaScript (No frameworks)
- Google Fonts (Open Sans, Playfair Display, Major Mono Display, Noto Sans Tamil)
- Responsive design with CSS Grid & Flexbox

---

*"Just like these laughable humans, Did you think I too would fall?" - Bharathiyar*

**In loving memory • Forever in our hearts • 1992-2024**
