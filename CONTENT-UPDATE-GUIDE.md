# 📝 Content Update Guide - Orci AI Website

## 🎬 How to Add/Update Videos

### Step 1: Prepare Your Video in Google Drive

1. **Upload** your video to Google Drive
2. **Right-click** on the video → **Share**
3. **Change** to "Anyone with the link"
4. **Set permission** to "Viewer"
5. **Copy** the link (looks like: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)

### Step 2: Test if Video Can Be Embedded

**Important:** Some Google Drive videos can't be embedded! Test first:

1. Take your Google Drive URL
2. Replace `/view` with `/preview`
3. Open in browser: `https://drive.google.com/file/d/FILE_ID/preview`
4. **If video plays** → ✅ Good to use!
5. **If you get an error** → ❌ Video has embedding restrictions

**Alternative for restricted videos:**
- Upload to YouTube (can be unlisted)
- Use YouTube embed URL instead
- Or remove download restrictions in Google Drive settings

### Step 3: Update the File

**File to edit:** `data/guides.ts`

```typescript
{
  id: 'guide-1',
  title: 'כותרת הוידאו שלך',
  description: 'תיאור קצר',
  url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing',
  category: 'קטגוריה'
}
```

### Step 4: Save and Deploy

```bash
# Option A: Quick Update (from command line)
git add .
git commit -m "Update: Added new guide videos"
git push

# Option B: Edit on GitHub (web interface)
# Go to: https://github.com/Orr45/orci-ai-site
# Navigate to: data/guides.ts
# Click: Edit (pencil icon)
# Make changes → Commit directly
```

**Result:** Vercel will auto-deploy in ~30-60 seconds! 🚀

---

## 🖼️ How to Add Header Image

### Step 1: Prepare Your Image

**Options:**
- Upload to Google Drive and get shareable link
- Upload to image hosting (Imgur, Cloudinary)
- Use existing website URL
- **Best:** Add to `/public` folder in project

### Step 2: Add Image to Project (Recommended)

```bash
# Copy your image to the public folder
# Name it: header.jpg (or .png)
cp /path/to/your/image.jpg public/header.jpg
```

### Step 3: Update Home Page

**File to edit:** `app/page.tsx`

Find lines 37-49 (currently commented out):

```tsx
{/* TODO: Header Image Section - User will provide the image URL */}
{/* Uncomment and add image URL when ready:
<section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
  <Image
    src="USER_PROVIDED_IMAGE_URL"
    alt="Orci AI Header"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
</section>
*/}
```

**Replace with:**

```tsx
<section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
  <Image
    src="/header.jpg"
    alt="Orci AI Header"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
</section>
```

### Step 4: Deploy

```bash
git add .
git commit -m "Add header image"
git push
```

---

## 📦 How to Update Product Features

**File to edit:** `data/products.ts`

```typescript
{
  id: 'feature-1',
  icon: '🎯',  // Any emoji
  title: 'כותרת הפיצ\'ר',
  description: 'תיאור מפורט של הפיצ\'ר',
  highlighted: true  // true = מודגש, false = רגיל
}
```

**Add more features:** Just copy-paste the structure and change the values!

---

## 🚀 Complete Workflow Example

### Scenario: You want to add your real videos

```bash
# 1. Edit the file locally
# Open: data/guides.ts
# Replace placeholder URLs with your real video URLs

# 2. Save the file

# 3. Commit and push
git add data/guides.ts
git commit -m "Update: Added real guide videos with proper Drive links"
git push

# 4. Wait ~30 seconds

# 5. Check your live site
# https://orci-ai-site.vercel.app/guides
```

---

## 🔧 Troubleshooting

### Videos Not Playing?

**Issue:** "Video cannot be embedded"
**Fix:**
- Check video sharing settings (must be "Anyone with link")
- Test /preview URL manually
- Check if video has download restrictions
- Alternative: Upload to YouTube

**Issue:** "This video is processing"
**Fix:** Wait a few minutes, Google Drive is still processing

**Issue:** Videos work locally but not on Vercel
**Fix:**
- Check if videos are public
- Verify URLs are correct
- Check browser console for errors

### Images Not Showing?

**Issue:** 404 error
**Fix:**
- Make sure image is in `/public` folder
- Use `/image.jpg` not `public/image.jpg` in code
- Check file extension matches (jpg vs jpeg vs png)

**Issue:** Image too large
**Fix:**
- Optimize image before uploading
- Recommended: Max 2MB, 1920x1080px

---

## 📞 Need Help?

1. Check the live site: https://orci-ai-site.vercel.app
2. Check deployment logs: https://vercel.com/or-shemers-projects/orci-ai-site
3. Check GitHub commits: https://github.com/Orr45/orci-ai-site/commits/main

---

## ⚡ Quick Commands Reference

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub (auto-deploys to Vercel)
git push

# Check git log
git log --oneline

# Undo last commit (before push)
git reset --soft HEAD~1
```

---

**Remember:** Every `git push` triggers automatic deployment! Changes go live in ~30 seconds. 🚀
