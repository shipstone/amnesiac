# Antipatterns

Reference only. These approaches fail. Do not use them.

## browser-dependent

Testing requires opening a browser or inspecting UI visually.

Why it fails: Claude cannot see browsers. No autonomous verification.

Fix: Extract logic, test logic. Accept that visual testing requires humans.

## memory-trust

Assuming knowledge from previous sessions without reading status.

Why it fails: Context loss is guaranteed. Memory is unreliable.

Fix: Always read status. Trust files, not memory.

## test-after

Writing implementation first, tests later.

Why it fails: "Later" often means "never" or "after bugs ship."

Fix: Test first. Always.

## large-scope

Attempting to change 5+ files in one task.

Why it fails: Context overflow. Partial completion. Recovery impossible.

Fix: Split into smaller tasks. One concern per task.

## guess-loop

Trying random fixes without understanding the problem.

Why it fails: Wastes context. Often introduces new bugs.

Fix: Three attempts max. Then stop and escalate.

## scope-creep

Expanding task scope during implementation.

Why it fails: Original task incomplete. Status becomes stale. Context lost.

Fix: Complete current task. Add new task to plan. Execute separately.

## implicit-state

State lives in memory, closures, or runtime only.

Why it fails: Claude cannot observe it. Cannot verify it.

Fix: Write state to files. Test by reading files.

## monolith-file

Single large file with many concerns.

Why it fails: Must read entire file to understand any part. Context expensive.

Fix: Split by concern. Small files. Clear boundaries.
