# Reports directory â€” webgoat

This is where the **PDF report** for this lab belongs.

- Expected filename: `webgoat-report.pdf`
- Add supporting exports here if needed (CSV, JSON).

**No PDF has been added yet.** The download button on the lab page and in the
portfolio only appears once you set `reportUrl` in that page's CONFIG block
(and in the root `LABS` array).

To enable the download:

1. Export or write your report as PDF.
2. Save it here as `webgoat-report.pdf`.
3. In this lab's `index.html`, set:
   \\\js
   reportUrl: 'reports/webgoat-report.pdf'
   \\\
4. In the root `index.html` LABS entry, set:
   \\\js
   reportUrl: 'labs/webgoat/reports/webgoat-report.pdf'
   \\\