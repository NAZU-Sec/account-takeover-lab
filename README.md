# Account Takeover Lab

Account Takeover Lab is an educational, local web application for learning about account-takeover risks through intentionally synthetic training scenarios. It is an evolving project: the dashboard catalogue lists planned challenges as planned rather than implying they are already available.

## Current implementation

The application uses Node.js, Express 4, EJS, and CommonJS. Express serves the pages and routes, EJS renders the dashboard and challenge page, and `express-session` provides session middleware. Other declared packages include `morgan` for request logging, `dotenv` for environment loading, `cookie-parser` for cookie parsing, and `mongoose` and `bcryptjs`, which are present but are not currently wired into account persistence or authentication. `nodemon` is available for development.

The dashboard catalogue is based on [`challenges/registry.js`](challenges/registry.js). Current challenge status:

### Level 1

- **Brute-Force Attacks — Partial.** A synthetic credential-checking exercise is available at `/dashboard/level1/task-1`. It does not implement the full range of behavior implied by the challenge title.
- **Session Fixation — Planned.**
- **Weak Passwords — Planned.**

### Level 2

- **Cross-Site Request Forgery — Planned.**
- **Cross-Site Scripting — Planned.**

### Level 3

- **Logic Flows — Planned.**
- **OAuth Vulnerabilities — Planned.**

### Level 4

- **File Upload Vulnerabilities — Planned.**
- **Remote Code Execution — Planned.**

There is currently no implemented registration flow, persistent database connection, Redis integration, or leaderboard.

## Run locally

Install a supported Node.js release and npm, then use PowerShell:

```powershell
git clone https://github.com/NAZU-Sec/account-takeover-lab.git
Set-Location account-takeover-lab
npm.cmd install
npm.cmd start
```

Open <http://localhost:3000>. To run the automated tests:

```powershell
npm.cmd test
```

For development with automatic restarts:

```powershell
npm.cmd run server
```

The server uses port `3000` by default; set `$env:PORT` in PowerShell before starting to select a different port.

## Training credentials

The partial brute-force exercise checks against this synthetic training account (as defined in the application route):

- Username: `account_takeover_user`
- Password: `account_takeover_pass`

These hard-coded values are for the local exercise only and are not production authentication credentials.

## Safety

Use this lab locally and only against its intentionally synthetic training targets. Do not use the techniques against real accounts or systems. Docker isolation is not claimed or verified by this project.

## License

See [LICENSE](LICENSE) for the project license.
