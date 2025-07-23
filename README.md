# resume.tsx
a nice resume template in react/typescript. see `example.pdf`

## how to use
clone the repo, do
```
npm install
npm run dev
```
then edit `src/resume.tsx`. use `ctrl+p` in your browser to export.

Visit `/?anon` to view an anonymized version without personal contact details.

The workflow in `.github/workflows/pages.yml` builds the site and generates a
`dist/resume.pdf` for deployment on Cloudflare Pages.