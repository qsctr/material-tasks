# material-tasks

An unfinished, work in progress material design Polymer tasks web-app.

To add tasks, click the + button in the toolbar. Do not use the FAB. It is
confusing (fab is supposed to be important) but the fab does not work for now.

Each task should have a project. In the add toolbar choose the project before
pressing OK, or else it will not work. Pressing enter will not work too, you
have to press OK.

The tasks will be saved automatically, and when you open the page again all the
tasks will be there. The website uses HTML local storage to save tasks.

There is currently no way to delete/complete tasks. The checkbox doesn't do
anything. There is a temporary red square for testing, click that to clear all
the local storage, then reload, and all tasks will be gone.

Again, this is unfinished, so here are the things that work:

- Editing existing tasks

- Saving tasks to local storage

- Adding new tasks

Here are the things that do not work:

- adding new tasks through the FAB (only logs to console for now)

- renaming projects (now they are named project 1, project 2, project 3, etc.)

- deleting tasks / marking as done (checkbox does not work)

- changing project of an existing task