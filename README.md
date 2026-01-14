SSE-OPs App-Azure/Git — GitHub → Azure Static Web Apps Deployment Guide
This guide documents how to publish the Onshore Ops Planning Directory (static HTML/CSS/JS) from GitHub to Azure Static Web Apps (SWA). It uses your repository pwarnasinghe/SSER-OpsD and the Azure resource named sse-ops-planning-directory.
1. Prerequisites
• Access to the GitHub repository: https://github.com/pwarnasinghe/SSER-OpsD
• Azure subscription: SSE-Sub-AVD-Renewables-PRD
• Resource group: Onshore-OPS-Planning
• Tools installed: Git, and optionally VS Code with the Live Server extension for local testing.
2. Project layout (repository root)

SSER-OpsD/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css        (uses: background-image: url('../image/background.jpg');)
│   ├── js/
│   │   └── app.js
│   └── image/
│       └── background.jpg
└── (optional) staticwebapp.config.json

3. Local sanity check (optional)
Option A: VS Code Live Server
Open the folder in VS Code → right‑click index.html → “Open with Live Server”.
Option B: Simple local server
python -m http.server 5500   # then visit http://localhost:5500/
4. Push to GitHub (first time)

cd <your-project-folder>
git init
git add .
git commit -m "Initial commit: Onshore Ops Planning Directory"
git branch -M main
git remote add origin https://github.com/pwarnasinghe/SSER-OpsD.git
# If origin exists already, run:
# git remote set-url origin https://github.com/pwarnasinghe/SSER-OpsD.git
git push -u origin main

5. Create Azure Static Web App (SWA)
In Azure Portal → Create resource → Static Web App → fill in:
• Subscription: SSE-Sub-AVD-Renewables-PRD
• Resource group: Onshore-OPS-Planning
• Name: sse-ops-planning-directory (lowercase, unique)
• Plan: Free (for testing) or Standard (you selected Standard; you can switch later)
• Deployment details: Source = GitHub → Organization = pwarnasinghe → Repository = SSER-OpsD → Branch = main
• Build details: Build preset = Custom; App location = /; API location = (blank); Output location = (blank)
Click Review + create → Create. Azure will create a GitHub Actions workflow in your repo.
6. Verify initial deployment
• In your repository on GitHub → Actions → look for “Azure Static Web Apps CI/CD”. Wait for it to complete.
• In the SWA resource Overview, open the URL, e.g., https://blue-forest-072a3d803.6.azurestaticapps.net.
• Validate: cards expand/collapse; Contact buttons open the email client; background image loads.
7. Ongoing updates

# Make changes locally
git add -A
git commit -m "Update content/styles/scripts"
git push

# The GitHub Action redeploys automatically to the SWA production URL.

8. Optional configuration
8.1 Security and headers via staticwebapp.config.json

{
  "navigationFallback": { "rewrite": "/index.html", "exclude": ["/assets/*", "/images/*"] },
  "globalHeaders": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
    "Permissions-Policy": "geolocation=()"
  }
}

Place this file at the repo root and push to apply.
8.2 Custom domain
Static Web App → Custom domains → Add. Create a CNAME record in DNS to point to your SWA default hostname.
8.3 GitHub workflow (auto-created by Azure)
If needed, you can view or adjust the workflow file in the repo under .github/workflows/.
9. Troubleshooting
• 404/empty site: App location set incorrectly (should be '/') or no files in repo root.
• Background image missing: verify assets/image/background.jpg and the CSS path '../image/background.jpg'.
• Action permission errors: re-run the workflow; ensure Azure Static Web Apps app is authorized in GitHub.
• Button click collapses card: ensure app.js stops event propagation on '.contact-btn'.
Appendix A — Suggested .gitignore

.vscode/
.DS_Store
Thumbs.db
*.log

Appendix B — README.md template

# Onshore Ops Planning Directory

Static HTML/CSS/JS site for the SSE Onshore Ops Planning Directory.

## Local dev
- Open `index.html` with Live Server, or run `python -m http.server 5500` and visit http://localhost:5500/

## Deploy
Connected to Azure Static Web Apps: resource 'sse-ops-planning-directory' in resource group 'Onshore-OPS-Planning'.
Every push to `main` redeploys automatically.
This is the folder location " C:\Users\PW91639\onshore-ops-planning-directory>"

