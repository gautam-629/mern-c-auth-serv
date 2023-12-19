CheckList for the express project initial setup
- [ ] Git setup


## About git and Setup
> **Advantage of git**
1. **version control** : Run previous verion of code
2. **safety** :  Create different branches for experimentation (testing) without any fear of affecting the main codebase.
3. **code ducumentation** : Use **commit** messages for documentation, providing clarity on code changes.
4. **collaboration** :Developers can work on different branches and merge changes into the main branch, enabling concurrent development.
5. **Conflict Resolution** : Git helps in resolving conflicts that may arise during collaboration.
6. **code review** :  Facilitate code reviews by allowing senior or individual developers to assess and provide feedback on the code.
7. **Accountability**:  Developers detail the changes they make, providing accountability for code modifications.
8. **Backup purpose**

> **Setup**

**.gitignore** : generate this file with the help of .gitignore extension(**To use the extension go to the Command Palette (Shift+CMD+P on macOS or Shift+CTRL+P on Windows) and launch Generate .gitignore File command**) `but why .gitignore` bcz *The .gitignore file is crucial because it allows developers to specify which files and directories should be excluded from version control. This is necessary to avoid cluttering the repository with irrelevant or sensitive files, such as compiled binaries, temporary files, and configuration files with sensitive information. By using .gitignore, developers can maintain a cleaner version history and focus on tracking only the essential code and project files.*

>**Open git**
1. **git init** :Start tracking changes in your project with Git
2. **git add .** : stages all changes in the current directory for the next commit in Git.
3. **git commit -m "first commit** :  Save the current state of your project with a message describing the changes.
4. **git branch -M main**: Rename the default branch from "master" to "main."
5. **git remote add origin** https://github.com/gautam-629/mern-c-auth-serv.git: Connect your local project to a remote repository on GitHub.(origin is remote name)
6. **git push -u origin main**:Upload your changes to GitHub so others can see your project.(sync)

>**Note**: started with dot(.) file or folder are hidden file **ls -a** *to list hidden file or folder*



