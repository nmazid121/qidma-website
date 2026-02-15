# Admin Panel Guide

This guide explains how to use the admin panel to manage events on your QIDMA website.

## 🚀 Getting Started

### 1. Set Up Admin Password

Create a `.env.local` file in the root of your project (or set environment variables in Vercel):

```env
ADMIN_PASSWORD=your-secure-password-here
```

**Important:** Choose a strong password and keep it secure!

### 2. Access the Admin Panel

1. Navigate to `/admin/login` on your website
2. Enter your admin password
3. You'll be redirected to the admin dashboard

## 📝 Managing Events

### Adding a New Event

1. Click the **"Add Event"** button
2. Choose whether it's an **Upcoming Event** or **Past Event**
3. Fill in the event details:
   - **Title** (required)
   - **Date** (required)
   - **Time** (optional)
   - **Location** (optional)
   - **Description** (required)
   - **Category** (required)
   - **Expected Attendees** (optional)
4. Click **"Create Event"**

### Editing an Event

1. Find the event in the admin dashboard
2. Click the **"Edit"** button on the event card
3. Make your changes
4. Click **"Update Event"**

### Deleting an Event

1. Find the event in the admin dashboard
2. Click the **trash icon** button
3. Confirm the deletion

### Adding Images to Events

Currently, images need to be added manually by editing the JSON file. Future updates will include an image upload feature.

To add images manually:
1. Upload images to `/public/images/` folder
2. Edit `/lib/data/events.json`
3. Add image objects to the event's `images` array:
```json
{
  "images": [
    { "src": "/images/event-photo-1.jpg", "alt": "Description of photo" },
    { "src": "/images/event-photo-2.jpg", "alt": "Another description" }
  ]
}
```

## 🌐 Deployment on Vercel

### No Separate Backend Needed!

This admin system works entirely with **Next.js API routes**, which Vercel automatically handles as serverless functions. You don't need a separate backend service.

### Steps to Deploy:

1. **Push your code to GitHub**
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Set Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add `ADMIN_PASSWORD` with your secure password

4. **Deploy!**
   - Vercel will build and deploy your site
   - Your admin panel will be available at `your-site.vercel.app/admin/login`

### Important Notes for Vercel:

- **File Storage:** The current setup uses a JSON file for storage. For production, consider:
  - **Vercel Postgres** (recommended) - Free tier available
  - **Supabase** - Free tier, easy setup
  - **MongoDB Atlas** - Free tier available
  
  The JSON file approach works but has limitations on serverless platforms.

## 🔒 Security Notes

- The current authentication is simple password-based. For production, consider:
  - Using NextAuth.js for proper session management
  - Adding rate limiting
  - Using environment variables for sensitive data (already implemented)

## 📚 Future Enhancements

- Image upload functionality
- Rich text editor for descriptions
- Event image management UI
- Bulk operations
- Export/import events

## 🆘 Troubleshooting

### Can't log in?
- Check that `ADMIN_PASSWORD` is set correctly in your environment variables
- Clear your browser's sessionStorage and try again

### Events not saving?
- Check that the `/lib/data/events.json` file exists and is writable
- For Vercel, you may need to switch to a database (see above)

### Need Help?
- Check the console for error messages
- Ensure all dependencies are installed: `npm install`

