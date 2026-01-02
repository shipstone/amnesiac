# Design Phase

You are creating a plan that can be executed with zero context. Every task must be independently verifiable.

## Input

Read `.amnesiac/goal.md` for:
- goal
- done-when
- out-of-scope

## Process

1. Break goal into phases (max 5)
2. Break each phase into tasks (max 5 per phase)
3. For each task, define the verify command
4. If you cannot define verify, redesign the task until you can
5. Write plan to `.amnesiac/plan.md`

## Plan Format

```
# Plan

## Phase 1: [name]

### Task 1.1: [description]
files: [list]
verify: [command]
done: [condition]

### Task 1.2: [description]
files: [list]
verify: [command]
done: [condition]

## Phase 2: [name]
...
```

## Verification Rules

Every verify command must:
- Return exit code 0 on success, non-zero on failure
- Run without user interaction
- Complete in under 30 seconds
- Not require a browser or GUI

Valid verify commands:
- `node test.js`
- `python -m pytest test_file.py`
- `grep "expected" output.json`
- `test -f expected_file.txt`
- `./verify.sh`

Invalid verify commands:
- `open index.html` (requires browser)
- `npm start` (runs server, doesn't verify)
- Manual inspection of any kind

## Task Constraints

Each task must:
- Touch 4 or fewer files
- Be completable in one session
- Have a verify command defined BEFORE implementation

If a task is too large, split it.

## Output

After writing plan.md, update status:

```
phase: implement
task: 1.1
next: [first action of task 1.1]
files: [files for task 1.1]
verify: [verify command for task 1.1]
```

## Constraint

Do not leave any task without a verify command. If you cannot verify it, either:
- Redesign the task to expose verifiable state
- Remove the task from scope
- Create a verification script that captures the state

A plan with unverifiable tasks is not a valid plan.
