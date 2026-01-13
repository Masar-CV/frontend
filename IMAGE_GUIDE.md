# Image Guide for Masar Project

## Where to Add Images

### Main Images Directory
```
src/assets/images/
```

### Recommended Folder Structure
You can organize images in subfolders:
```
src/assets/images/
  ├── login/
  │   └── resume-login.png (or .jpg, .svg, etc.)
  ├── register/
  │   └── resume-register.png
  ├── logos/
  │   └── logo.svg
  └── common/
      └── placeholder.png
```

## How to Use Images in Your Components

### Method 1: Import from assets (Recommended for Vite)

```jsx
// In your component file (e.g., Login.jsx)
import resumeImage from '../../../../assets/images/login/resume-login.png';

// Then use it:
<img src={resumeImage} alt="Resume" className="..." />
```

### Method 2: Using Public Folder (For static assets)

1. Create a `public` folder in the project root (if it doesn't exist)
2. Create `public/images/` folder
3. Place your images there
4. Reference them with absolute path:

```jsx
// No import needed, just use:
<img src="/images/resume-login.png" alt="Resume" className="..." />
```

## For Login & Register Pages

Based on your design, you'll need resume/CV images for:
- **Login page**: `src/assets/images/login/resume-login.png`
- **Register page**: `src/assets/images/register/resume-register.png`

## Supported Image Formats
- `.png` (recommended for photos with transparency)
- `.jpg` / `.jpeg` (good for photos)
- `.svg` (perfect for logos and icons)
- `.webp` (modern, optimized format)
- `.gif` (for animations)

## Image Optimization Tips
1. **Resize images** before adding them (recommended size for login/register: 800x1000px or similar)
2. **Compress images** using tools like TinyPNG or ImageOptim
3. **Use appropriate formats**: SVG for logos, PNG for transparent backgrounds, JPG for photos
4. **Consider using WebP** for better performance

## Example Implementation

After adding your images, update the Login and Register components:

```jsx
// Login.jsx
import resumeImage from '../../../../assets/images/login/resume-login.png';

// Replace the placeholder div with:
<img 
  src={resumeImage} 
  alt="Resume" 
  className="absolute bottom-0 left-0 w-96 h-96 opacity-20 transform rotate-12 object-cover"
/>
```

## Quick Steps:
1. ✅ Place your resume images in `src/assets/images/`
2. ✅ Import the image in your component
3. ✅ Replace the placeholder div with an `<img>` tag
4. ✅ Add appropriate className for styling

