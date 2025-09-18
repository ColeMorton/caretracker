# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records for the CareTracker project.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences. ADRs help teams:

- Document the reasoning behind architectural choices
- Provide context for future maintainers
- Enable informed decision-making
- Create a historical record of architectural evolution

## ADR Lifecycle

1. **Proposed** - The decision is under consideration
2. **Accepted** - The decision has been made and is being implemented
3. **Deprecated** - The decision is no longer recommended but may still be in use
4. **Superseded** - The decision has been replaced by a newer decision

## How to Create an ADR

1. Copy `template.md` to a new file: `NNNN-title.md` (where NNNN is the next sequential number)
2. Fill in all sections of the template
3. Submit for review via pull request
4. Update status as the decision progresses

## Naming Convention

- Use zero-padded 4-digit numbers: `0001-`, `0002-`, etc.
- Use kebab-case for titles: `api-framework-selection.md`
- Full example: `0001-api-framework-selection.md`

## Index of Current ADRs

| Number | Title | Status | Date | Summary |
|--------|-------|--------|------|---------|
| [0001](0001-api-framework-selection.md) | API Framework Selection | Accepted | 2025-09-18 | Choose Fastify over Express for performance and TypeScript support |
| [0002](0002-frontend-state-management.md) | Frontend State Management | Accepted | 2025-09-18 | Use TanStack Query + Zustand for optimal developer experience |
| [0003](0003-authentication-architecture.md) | Authentication Architecture | Accepted | 2025-09-18 | Implement JWT with refresh token rotation for security |
| [0004](0004-database-access-patterns.md) | Database Access Patterns | Accepted | 2025-09-18 | Use Prisma ORM with type-safe database operations |
| [0005](0005-testing-strategy.md) | Testing Strategy | Accepted | 2025-09-18 | Comprehensive testing with Vitest, Playwright, and property-based testing |

## Guidelines

### When to Write an ADR

Write an ADR for decisions that:
- Have significant impact on the architecture
- Are difficult to reverse
- Have multiple viable alternatives
- Need to be communicated to the team
- May be questioned in the future

### ADR Quality Standards

- **Context**: Clearly describe the problem and constraints
- **Options**: List at least 2-3 alternatives considered
- **Reasoning**: Explain why the chosen option is best
- **Consequences**: Document both positive and negative impacts
- **Implementation**: Include technical details and migration notes
- **Validation**: Define success metrics and review criteria

### Review Process

1. All ADRs must be reviewed by at least 2 senior developers
2. ADRs affecting multiple teams require cross-team review
3. ADRs must be updated when implementation reveals new information
4. Deprecated ADRs should explain what replaced them and why