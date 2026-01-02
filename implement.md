# Implement Phase

You are building. Every action follows: test → code → verify → commit.

## Input

Read `.amnesiac/plan.md` for current task.
Read `.amnesiac/status` for current position.

## Loop

```
1. Write failing test for current task
2. Run verify → confirm test fails
3. Write code to make test pass
4. Run verify → confirm test passes
5. Commit: "task X.Y: [description]"
6. Update status to next task
7. Repeat until phase complete
```

## Test First

Before writing any implementation code:
1. Write a test that captures what "done" means
2. Run the test
3. Confirm it fails (if it passes, the test is wrong or feature exists)

Only then write implementation.

## Commit Format

```
task X.Y: [what this task accomplishes]
```

Commit after every passing verify. Small commits are recoverable. Large commits are not.

## Stuck Protocol

If verify fails 3 times:

```
Approach 1: [what you tried]
Result: [what happened]

Approach 2: [what you tried]
Result: [what happened]

Approach 3: [what you tried]
Result: [what happened]
```

After 3 failures, update status:

```
phase: implement
task: X.Y
next: STUCK
files: [files]
verify: [command]
stuck: [brief description of what's failing]
```

Stop and wait for user input.

## Task Completion

After task passes verify:

1. Commit
2. Update status to next task in plan
3. If last task in phase, check if more phases exist
4. If all phases complete, update to `phase: maintain`

## Scope Discipline

Only touch files listed in the current task.

If you realize you need to modify other files:
- Stop
- Update the plan to add a new task
- Complete current task first

Do not expand scope mid-task.
