---
title: "I don't know branches"
date: "2025-11-2"
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
- git remote add upstream <github original url>-> sets up upstream url. 
- git push origin <branchname> -> pushes the changes that are commited to the remote repository 
- git checkout -b <branchname> -> creates and switches to the branch.

Suppose I start to work on a branch, and I  create commits in those branch and now i want to merge the branch into my main branch
- git merge <createdBranchName>-> this will combine all the commits of the createdBranch in 1, and then it will just commit to the main branch after we checkout to the main

Remote url is the repository which we own on github and we want to push/pull to/from.
When we fork a project from github, the original project's url is called the upstream thing.
We cannot push to upstream url, so we always make our own copy, push from their, and then create what is called as a Pull request. 

- git pull upstream main / git fetch upstream && git merge upstream/main-> updating forks with upstream repo, then do git push origin main
squashing means to club together the commits. 
- git merge <branchName> -> merge one branch to the other branch with an extra commit like `merged branch <branchName>`
- git rebase main ->similar to the merge, but no extra commit.  

Suppose we are contributing to an open source project, here what we will do for the complete flow
- Fork the repo
- Clone the repo in our machines
- Set upstream(original repo from where we forked) and origin is our fork.
- Create a new branch to work with our feature. 
- Commit our changes. 
- then before making a PR, do git fetch upstream (instead of pull so no merge occurs).
- git rebase upstream/main.
- if we get conflicts, resolving them manually would help. 
- git push origin ourBranch
- from github create a PR. 

Removing commits
- git revert <commitHash> ->undoes the hashedCommit, and creates a !, as another commit
- git reset --soft <commithash> -> undoes the commit but keep changes staged.
- git reset --hard <commithash> -> discards everything upto that commit.

-  git cherrypick <commitHash > -> brings a particular commit to our branch.
