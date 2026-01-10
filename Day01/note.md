# Day 1 – Getting Started

## What I Did
- Set up my 100 Days of Code repository
- Learned how daily commits work
- Reviewed basic Git commands

## Git Commands Practiced – Day 1

# Initialize a repository
- git init                 # Initialize a new Git repository

# Check repository status
- git status               # Check status of files (modified, staged, untracked)

# Track files
- git add .                # Stage all changes for commit
- git add <file>           # Stage a specific file

# Commit changes
- git commit -m "message"  # Commit staged changes with a message

# View commit history
- git log                  # View commit history
- git log --oneline        # View commit history in short format

# Branching
- git branch               # List branches
- git branch <branchname>  # Create a new branch
- git checkout <branchname>  # Switch to another branch
- git branch -M main       # Rename current branch to main

# Remote repository
- git remote add origin <repo_url>  # Connect local repo to GitHub
- git remote -v            # Check remote URLs

# Push & pull
- git push -u origin main  # Push branch to remote and set upstream
- git push                 # Push changes (after upstream is set)
- git pull                 # Pull latest changes from remote

# Undo & reset
- git restore <file>       # Undo changes in working directory
- git restore --staged <file> # Unstage a file
- git reset --soft HEAD~1  # Undo last commit but keep changes staged

# Misc
- git clone <repo_url>     # Clone a repository from GitHub
