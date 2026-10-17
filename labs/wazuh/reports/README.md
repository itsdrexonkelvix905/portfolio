# Reports directory â€” wazuh

This is where the **PDF report** for this lab belongs.

- Expected filename: `wazuh-report.pdf`
- Add supporting exports here if needed (CSV, JSON).

**No PDF has been added yet.** The download button on the lab page and in the
portfolio only appears once you set `reportUrl` in that page's CONFIG block
(and in the root `LABS` array).

To enable the download:

1. Export or write your report as PDF.
2. Save it here as `wazuh-report.pdf`.
3. In this lab's `index.html`, set:
   \\\js
   reportUrl: 'reports/wazuh-report.pdf'
   \\\
4. In the root `index.html` LABS entry, set:
   \\\js
   reportUrl: 'labs/wazuh/reports/wazuh-report.pdf'
   \\\