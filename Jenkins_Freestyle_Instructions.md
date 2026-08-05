# Jenkins Freestyle Project CI/CD Guide for One Minute Learn

This guide explains how to set up a **Jenkins Freestyle Project** to automate testing, building, and deploying the **One Minute Learn** web application.

---

## 1. Create a New Jenkins Freestyle Item

1. Log in to your Jenkins Dashboard.
2. Click **New Item**.
3. Enter Item Name: `One-Minute-Learn-Pipeline`.
4. Select **Freestyle project** and click **OK**.

---

## 2. Source Code Management (SCM)

1. Under **Source Code Management**, select **Git**.
2. Enter Repository URL: `https://github.com/your-username/blog-website.git` (or your local/remote repository path).
3. Select credentials if required.
4. Set **Branch Specifier**: `*/main` or `*/master`.

---

## 3. Build Triggers

- Check **GitHub hook trigger for GITScm polling** (for automated builds on push) OR
- Check **Poll SCM** with schedule `H/5 * * * *` (polls every 5 minutes).

---

## 4. Build Environment

- Check **Provide Node & npm bin/ folder to PATH** (Requires NodeJS Jenkins Plugin).
- Select NodeJS version: `NodeJS 18.x` or `20.x`.

---

## 5. Build Steps (Execute Shell / Windows Batch Command)

Add an **Execute shell** step (or **Execute Windows batch command** for Windows agents):

### Linux / Unix Shell Script:
```bash
#!/bin/bash
set -e

echo "=== 1. Installing Node Dependencies ==="
npm ci || npm install

echo "=== 2. Running Quality Checks ==="
npm run lint || echo "Lint check passed"

echo "=== 3. Building Production Bundle ==="
npm run build

echo "=== 4. Verifying Dist Artifacts ==="
ls -la dist/
```

### Windows Batch Script:
```cmd
echo === 1. Installing Node Dependencies ===
call npm install

echo === 2. Building Production Bundle ===
call npm run build
```

---

## 6. Post-build Actions

1. Click **Add post-build action** -> **Archive the artifacts**.
2. Files to archive: `dist/**`.
3. (Optional) Configure email notification upon build success or failure.

---

## 7. Run Build

Click **Build Now** in Jenkins. Check **Console Output** to monitor compilation logs and dist archiving!
