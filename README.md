# amnesiac

Autonomous software development for agents with no persistent memory.

## What This Is

A skill for Claude (and other LLMs) that enables autonomous software development despite context loss between sessions. Every project built with amnesiac is designed from the start to be independently verifiable without requiring memory of previous sessions.

## Core Principle

**You will forget everything. Design accordingly.**

## Installation

### Claude.ai / Claude Code
Copy this folder to your skills directory or upload as a custom skill.

### In a Project
```bash
mkdir -p .amnesiac
cp /path/to/amnesiac/status.template .amnesiac/status
```

## How It Works

1. Claude reads `SKILL.md` at session start
2. Checks if `.amnesiac/status` exists in project
3. If no → runs adoption flow to set up the project
4. If yes → reads status, loads appropriate phase file, continues work

### Phases

- **define** - Establish goal with user (one-time)
- **design** - Create plan where every task is verifiable (one-time)
- **implement** - Test-first development loop
- **maintain** - Bug fixes and feature additions

### Progressive Disclosure

Only the current phase's instructions are loaded, minimizing context usage:

| What | When Loaded | Size |
|------|-------------|------|
| SKILL.md | Every session | ~60 lines |
| Phase file | When in that phase | ~80 lines |
| patterns.md | When stuck | ~70 lines |
| antipatterns.md | When stuck | ~70 lines |

## Key Constraints

1. **If you can't verify it without a browser, don't build it**
2. **If verify fails 3 times, stop and escalate**
3. **If a task touches 5+ files, split it first**
4. **Commit after every passing verify**

## Files

```
amnesiac/
├── SKILL.md           # Entry point
├── adopt.md           # Setup for existing projects
├── define.md          # Goal establishment
├── design.md          # Verifiable plan creation
├── implement.md       # Test-first build loop
├── maintain.md        # Bug fixes and features
├── patterns.md        # What works (reference)
├── antipatterns.md    # What fails (reference)
├── status.template    # Copy to new projects
└── metrics/
    ├── adopters.json       # Registry of projects
    └── collect-metrics.js  # Aggregation script
```

## Metrics

Track success rates across projects:

```bash
# Register a project
# Edit metrics/adopters.json

# Collect metrics
node metrics/collect-metrics.js --period 2026-01
```

## License

MIT
