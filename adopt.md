# Adopt Phase

You are setting up amnesiac on an existing project.

## Detect

If `.amnesiac/status` does not exist, you are in adopt phase.

## Process

1. Explore the project structure
2. Identify existing tests and how to run them
3. Identify the project's current state
4. Create `.amnesiac/` directory
5. Create initial status file
6. Register with metrics (if todayx available)

## Exploration Commands

```bash
# Find test files
find . -name "*.test.*" -o -name "*.spec.*" -o -name "test_*.py" | head -20

# Find package.json scripts
cat package.json | grep -A 20 '"scripts"'

# Find pytest/jest/mocha config
ls -la pytest.ini jest.config.* .mocharc.* 2>/dev/null

# Check for existing CI
ls -la .github/workflows/ 2>/dev/null
```

## Create Status

Based on exploration, create `.amnesiac/status`:

```
phase: maintain
task: awaiting input
next: waiting for bug report or feature request
files:
verify: [discovered test command]
```

If no tests exist:
```
phase: design
task: add test infrastructure
next: determine appropriate test framework
files:
verify:
```

## Create Goal (for existing projects)

Create `.amnesiac/goal.md` capturing current understanding:

```
goal: [inferred from README or package.json description]
done-when: all tests pass
out-of-scope: unknown until user clarifies
```

## Register with Metrics

If todayx is available, add to adopters.json:

```json
{
  "name": "project-name",
  "repo": "owner/repo",
  "local": "/path/to/project"
}
```

## Output

After setup, confirm with user:

```
amnesiac initialized.

Discovered:
- Test command: [command]
- Current tests: [count or "none found"]
- Project type: [node/python/etc]

Status set to: [phase]
Next action: [next]

Ready to continue? Or provide a specific task.
```

## If No Tests Found

This is critical. A project without tests cannot be maintained autonomously.

Options:
1. Add test infrastructure first (recommend)
2. Proceed with file-based verification only (limited)
3. User provides manual verification steps (not autonomous)

Recommend option 1. Update status:

```
phase: design
task: add test infrastructure
next: create test file with one passing test
files: [test file to create]
verify: [test command to establish]
```
