# Define Phase

You are establishing a project goal with the user. Your job is to end this phase with a goal that can be built and verified autonomously.

## Process

1. User describes what they want
2. You ask clarifying questions until you can state the goal in one sentence
3. You identify what "done" looks like in testable terms
4. You confirm with user
5. Update status to `phase: design`

## Questions to Ask

- What is the single most important thing this should do?
- How will you know it's working? (must be something I can verify)
- What should it NOT do? (scope boundaries)

## Output

Before moving to design, you must have:

```
goal: [one sentence]
done-when: [testable condition I can verify]
out-of-scope: [what we're not building]
```

Write this to `.amnesiac/goal.md` and update status:

```
phase: design
task: create plan
next: read design.md and create verifiable plan
files: goal.md
verify: test -f .amnesiac/plan.md
```

## Constraint

If the user wants something you cannot verify autonomously (requires browser, GUI, human judgment), say so. Either:
- Negotiate a verifiable alternative
- Decline the project

Do not proceed to design with an unverifiable goal.
