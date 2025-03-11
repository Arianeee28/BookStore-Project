# GitHub Repository Guide for Bookstore Project

## Method 1: Using GitHub Web Interface (No Commands Required)

### 1. Create New Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" button in top right corner
3. Select "New repository"
4. Fill in:
   - Repository name: `bookstore-project`
   - Description: "A React bookstore website with search and cart functionality"
   - Choose "Public"
   - Check "Add a README file"
   - Click "Create repository"

### 2. Upload Files (Through Web Interface)

#### First Upload (Core Files):
1. Click "Add file" > "Upload files"
2. Drag or select these files:
```
- package.json
- tsconfig.json
- vite.config.ts
- postcss.config.js
- tailwind.config.ts
- theme.json
```
3. Add commit message: "Add core configuration files"
4. Click "Commit changes"

#### Second Upload (Source Code):
1. Click "Add file" > "Upload files"
2. Upload these folders:
```
- client/
- server/
- shared/
```
3. Add commit message: "Add application source code"
4. Click "Commit changes"

#### Third Upload (Assets):
1. Click "Add file" > "Upload files"
2. Upload:
```
- attached_assets/ (with all book images)
```
3. Add commit message: "Add book cover images"
4. Click "Commit changes"

### 3. Create Branches (Through Web Interface)

1. Create Development Branch:
   - Click the "main" branch dropdown
   - Type "develop" in the branch field
   - Click "Create branch: develop from 'main'"

2. Create Feature Branches:
   - Switch to "develop" branch first
   - Click branch dropdown
   - Create these branches one by one:
     - feature/initial-setup
     - feature/book-listing
     - feature/book-details
     - feature/cart-functionality
     - feature/search-functionality
     - feature/payment-integration

### 4. Branch Protection Rules (Optional)
1. Go to repository "Settings"
2. Click "Branches" in sidebar
3. Click "Add branch protection rule"
4. Set up rules:
   - Branch name pattern: `main`
   - Check "Require pull request reviews before merging"
   - Check "Require status checks to pass before merging"
   - Save changes

## Method 2: Using GitHub Desktop (Alternative to Command Line)

1. Download and Install GitHub Desktop
2. Clone Your Repository:
   - File > Clone Repository
   - Select your repository
   - Choose local path
   - Click "Clone"

3. Create Branches:
   - Click Current Branch
   - Click "New Branch"
   - Name it (e.g., "feature/search-functionality")
   - Click "Create Branch"

4. Make Changes:
   - Make changes in your code editor
   - Changes appear automatically in GitHub Desktop
   - Add commit message
   - Click "Commit to [branch]"
   - Click "Push origin"

## Project Structure
```
bookstore-project/
├── client/                  # Frontend React application
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       └── lib/           # Utilities and hooks
├── server/                 # Backend Express server
├── shared/                # Shared types and schemas
└── attached_assets/       # Book cover images
```

## Important Files to Include
- `.gitignore` - Add these patterns:
```
node_modules/
dist/
.env
.DS_Store
*.log
```

## Best Practices
1. Always create a new branch for new features
2. Write clear commit messages
3. Create Pull Requests for code review
4. Keep branches up to date with develop
5. Delete branches after merging

## Common Workflows

### Adding a New Feature:
1. Switch to develop branch
2. Create new feature branch
3. Make changes and commit
4. Create Pull Request to develop
5. After review, merge to develop

### Updating Your Local Repository:
1. Switch to develop branch
2. Pull latest changes
3. Create new feature branch
4. Start working on new features
