# Development Scripts Guide

This project contains a **React + TypeScript frontend** and a **FastAPI Python backend**. The root `package.json` provides scripts for setting up the development environment, installing dependencies, and running both applications.

---

## Quick Start

### First-time setup

After cloning the repository or setting up the project on a new computer, run:

```bash
npm run setup
```

Once setup completes, start the development environment with:

```bash
npm run dev
```

For normal day-to-day development, you usually only need:

```bash
npm run dev
```

---

## `npm run setup`

### Purpose

Sets up the entire local development environment.

### What it does

Runs the following setup process:

1. Installs root Node dependencies.
2. Installs frontend dependencies.
3. Creates the backend Python virtual environment.
4. Upgrades `pip`.
5. Installs Python dependencies from `requirements.txt`.

### When to use it

Run this:

* After cloning the repository for the first time.
* When setting up the project on a new computer.
* After deleting the backend `.venv`.
* When rebuilding the entire development environment.

### Usage

```bash
npm run setup
```

This is generally a **one-time setup command**, not something that needs to run every time the application starts.

---

## `npm run dev`

### Purpose

Starts both the frontend and backend development servers simultaneously.

### What it starts

**Frontend**

```text
React + Vite
http://localhost:5173
```

The exact Vite port may change if `5173` is already being used.

**Backend**

```text
FastAPI + Uvicorn
http://127.0.0.1:8000
```

### When to use it

This is the main command for **daily development**.

```bash
npm run dev
```

The `concurrently` package runs both servers in the same terminal session.

---

## `npm run frontend`

### Purpose

Starts only the React frontend.

Internally runs:

```bash
cd frontend && npm run dev
```

### When to use it

Use this when:

* Working only on frontend components.
* Debugging React or TypeScript.
* The backend is already running separately.

### Usage

```bash
npm run frontend
```

---

## `npm run backend`

### Purpose

Starts only the FastAPI backend using the project's Python virtual environment.

Internally runs:

```bash
cd backend && .\.venv\Scripts\python -m uvicorn app.main:app --reload
```

The `--reload` option automatically restarts FastAPI when Python source files change.

### When to use it

Use this when:

* Working only on backend APIs.
* Testing endpoints through Swagger.
* Debugging FastAPI.
* The frontend is already running separately.

### Usage

```bash
npm run backend
```

Once running, the API is available at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

ReDoc documentation:

```text
http://127.0.0.1:8000/redoc
```

---

# Setup Scripts

## `npm run setup-frontend`

### Purpose

Installs the frontend Node dependencies defined in:

```text
frontend/package.json
```

Internally runs:

```bash
cd frontend && npm install
```

### When to use it

Run this when:

* `frontend/node_modules` does not exist.
* Frontend dependencies have changed.
* `frontend/package-lock.json` has changed after pulling new code.
* Frontend dependencies appear corrupted.

### Usage

```bash
npm run setup-frontend
```

You normally do **not** need to run this every time the frontend starts.

---

## `npm run setup-backend`

### Purpose

Creates and configures the Python backend environment.

It performs:

```text
Create backend/.venv
        ↓
Upgrade pip
        ↓
Install requirements.txt
```

### When to use it

Run this when:

* Setting up the backend for the first time.
* `backend/.venv` was deleted.
* The virtual environment became corrupted.
* Rebuilding the Python environment from scratch.

### Usage

```bash
npm run setup-backend
```

The `.venv` directory is a local development environment and should **not be committed to Git**.

---

# Dependency Management

## `npm run install-backend`

### Purpose

Installs all Python dependencies currently listed in:

```text
backend/requirements.txt
```

### When to use it

Run this when:

* Someone adds a new Python dependency to `requirements.txt`.
* You pull changes containing updated backend dependencies.
* A required backend package is missing.
* You want to synchronize `.venv` with `requirements.txt`.

### Usage

```bash
npm run install-backend
```

Unlike `setup-backend`, this does **not need to recreate the virtual environment**.

---

## `npm run freeze-backend`

### Purpose

Writes the currently installed Python packages and versions into:

```text
backend/requirements.txt
```

Internally uses:

```bash
pip freeze
```

### When to use it

Use this after intentionally installing or changing a Python dependency that should become part of the project.

For example:

```bash
cd backend
.\.venv\Scripts\python -m pip install pytest
cd ..

npm run freeze-backend
```

This updates `requirements.txt` so other developers and CI/CD environments can install the same dependencies.

### Important

Do not run `freeze-backend` casually.

It rewrites `requirements.txt` based on everything currently installed in the virtual environment.

Review the resulting changes before committing them.

---

# Typical Development Workflow

## First time cloning the repository

```bash
git clone <repository>
cd <repository>

npm run setup
npm run dev
```

---

## Normal development day

Simply run:

```bash
npm run dev
```

There is no need to recreate `.venv` or reinstall every dependency each time.

---

## Only working on FastAPI

```bash
npm run backend
```

Then use Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## Only working on React

```bash
npm run frontend
```

---

## After pulling new frontend dependencies

Run:

```bash
npm run setup-frontend
```

Then:

```bash
npm run dev
```

---

## After pulling new backend dependencies

Run:

```bash
npm run install-backend
```

Then:

```bash
npm run dev
```

---

## If `.venv` becomes corrupted

Delete:

```text
backend/.venv
```

Then rebuild it:

```bash
npm run setup-backend
```

Afterward:

```bash
npm run dev
```

---

# Script Summary

| Script                    | Purpose                                           | When to Run                                         |
| ------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| `npm run setup`           | Sets up the entire project                        | First clone or complete environment rebuild         |
| `npm run dev`             | Starts frontend + backend                         | Normal daily development                            |
| `npm run frontend`        | Starts React only                                 | Frontend-only development                           |
| `npm run backend`         | Starts FastAPI only                               | Backend/API development                             |
| `npm run setup-frontend`  | Installs frontend dependencies                    | First setup or dependency changes                   |
| `npm run setup-backend`   | Creates `.venv` and installs Python dependencies  | First setup or rebuilding `.venv`                   |
| `npm run install-backend` | Installs `requirements.txt` into existing `.venv` | Backend dependencies changed                        |
| `npm run freeze-backend`  | Updates `requirements.txt` from `.venv`           | After intentionally adding/changing Python packages |

---

# Recommended `.gitignore`

Generated dependencies and local environments should not be committed:

```gitignore
# Root Node dependencies
node_modules/

# Frontend
frontend/node_modules/
frontend/dist/

# Python virtual environment
backend/.venv/

# Python cache
__pycache__/
*.py[cod]

# Environment variables / secrets
.env
.env.*
!.env.example
```

The repository should contain dependency definitions such as:

```text
package.json
package-lock.json
frontend/package.json
frontend/package-lock.json
backend/requirements.txt
```

These files allow local environments and CI/CD runners to recreate the required dependencies without committing `node_modules` or `.venv`.

---

# CI/CD Note

Local scripts and CI/CD serve different purposes.

Locally:

```text
npm run setup
→ prepare machine

npm run dev
→ develop application
```

In GitHub Actions, the CI pipeline should create a **fresh temporary environment** rather than relying on the local `.venv`.

A future CI workflow can independently:

```text
Frontend CI
→ npm ci
→ lint
→ build
→ test

Backend CI
→ setup Python
→ pip install -r requirements.txt
→ lint
→ pytest
```

This ensures the project can be successfully built and tested from a clean environment before code is merged or deployed.
