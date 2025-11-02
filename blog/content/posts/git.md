---
title: "I don't know branches"
date: "2025-2-11"
excerpt: "Git"
---

Git is powerful. My most impactful project till date revolves around introducing git to students. That makes me question, do ik git? So yeah, writing this as a nice brushup to what I already know related to Git. 

Some common commands  (very basic, even vibe coders should know) ->
- git init -> initialised a git repository,that means now your project is version controlled, inside it makes a .git folder which does all the magic.
- git add <filename or .(for every file changes)> -> adds files to staging area, if we don't add our changed files to staging area, git won't be able to know what all we changed. So any change we do needs to be added to the staging area for us to be able to keep its version's track 
- git commit -m"commit message" -> creates a snapshot of the project. At this time, your project looked like this. This is what commit does, snapshotting, plain and simple.
- git status -> files in the staging area, that needs to be committed. 
- git log -> shows up the existing commits/snapshots of the project. 
- git diff -> difference between the last commit and the code in the staging area, the git difference
- git clone -> clone someone else's repository on our machine, with cokmplete commit history
- git reset <commitHash> -> here we have the commit hash of the thing which we want to keep, and all the later commits will be deleted, like the HEAD will point to that particular commitHash. 

Moving on to the stuff which devs must know, would help
- git stash -> stashed the commits till now, we don't lose these changes, but now the changes made from the last commit are not counted, project is in the original state.
- git stash pop -> get all the stashed changes back. 
- git stash clear -> remove those changes alltogether.
- Branches -> Git allows us to work with different branches, help us to work in teams independently, not make direct commits to production code, help us maintain features separately and stuff. 
- git remote add origin/<name(usually kept as origin)> <github/gitlab url> -> adds a remote repository to our local system. Now we will have to make/maintain changes in a remote server(github/gitlab) so others can push/pull from/to there. 
- git push origin <branchname> -> pushes the changes that are commited to the remote repository 
- git checkout -b <branchname> -> creates and switches to the branch.

Suppose I start to work on a branch, and I  create commits in those branch and now i want to merge the branch into my main branch
- git merge <createdBranchName>-> this will combine all the commits of the createdBranch in 1, and then it will just commit to the main branch after we checkout to the main


