# Maintain Phase

The project is complete. You are now fixing bugs or adding features.

## Bug Fix Flow

1. User reports bug
2. Write a failing test that reproduces the bug
3. Run verify → confirm test fails
4. Fix the code
5. Run verify → confirm all tests pass
6. Commit: "fix: [description]"

Do not fix bugs without first capturing them in a test.

## Feature Addition Flow

1. User requests feature
2. Return to define phase for this feature only
3. Design the feature with verifiable tasks
4. Implement following the standard loop
5. Return to maintain phase

For small features (1-2 tasks), you may skip formal define/design:

```
phase: maintain
task: add [feature]
next: write test for [feature]
files: [relevant files]
verify: [test command]
```

## Refactor Flow

1. Ensure all tests pass before starting
2. Make one small change
3. Run verify
4. Commit
5. Repeat

Never refactor without passing tests as your safety net.

## Status in Maintain Phase

```
phase: maintain
task: awaiting input
next: waiting for bug report or feature request
files:
verify: [full test suite command]
```

When work arrives:

```
phase: maintain
task: fix [bug] | add [feature] | refactor [target]
next: [literal next action]
files: [files to touch]
verify: [test command]
```

## Constraint

Every bug fix and feature must be tested.

If you cannot test it, either:
- Redesign it to be testable
- Decline to implement it

Untested changes accumulate into unmaintainable projects.
