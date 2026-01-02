# Patterns That Work

Reference only. Load when stuck or starting unfamiliar work.

## test-first-bugfix

When: Bug is reproducible

```
1. Write failing test capturing the bug
2. Confirm test fails
3. Fix code
4. Confirm test passes
5. Commit test + fix together
```

Success rate: 100% in testing. Never skip the failing test step.

## extract-then-test

When: Logic is buried in UI or side effects

```
1. Identify pure logic inside impure code
2. Extract to separate module/function
3. Write tests for extracted logic
4. Replace original with import
5. Verify original behavior unchanged
```

Success rate: 100% in testing. Makes untestable code testable.

## state-to-file

When: Need to verify internal state

```
1. Identify state that changes
2. Create JSON file to capture state
3. Modify code to write state on change
4. Write test that reads file and asserts
5. Verify test passes
```

Use when console.log or debugger would normally be used.

## micro-commit

When: Any code change

```
1. Make one logical change
2. Run tests
3. Commit immediately
4. Repeat
```

Smaller commits = easier recovery from context loss.

## scope-split

When: Task touches 5+ files

```
1. List all files that need to change
2. Group into clusters of 2-3 related files
3. Create separate task for each cluster
4. Order tasks by dependency
5. Execute sequentially
```

Never attempt large-scope changes in one session.
