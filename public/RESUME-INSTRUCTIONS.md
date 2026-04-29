# Adding your resume

Drop your resume PDF in this folder named exactly `resume.pdf`:

```
public/resume.pdf
```

The "Resume" button in the hero will automatically download/open it.

## Alternative — link to an external resume

If you'd rather host your resume on Google Drive, Dropbox, or LinkedIn:

1. Open `data/bio.js`
2. Change `resumeUrl: '/resume.pdf'` to your full URL
   - Example Google Drive (set sharing → "Anyone with the link"):
     `resumeUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/view'`

The button will open the link in a new tab.

## After adding your resume

1. Commit + push:
   ```bash
   git add public/resume.pdf
   git commit -m "Add resume"
   git push
   ```
2. Vercel auto-deploys within ~60 seconds — button works on the live site.
