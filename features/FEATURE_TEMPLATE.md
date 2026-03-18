# Feature: [Feature Name]

> **Status**: Draft | In Review | Approved | Implemented
> **Author**: 
> **Date**: YYYY-MM-DD

---

## Purpose

_One paragraph explaining what this feature does and why it is needed._

---

## User Journey

_Walk through the feature from the user's perspective. Use numbered steps._

1. User does X
2. App responds with Y
3. …

---

## Data Model Changes

_List any new types, changes to existing interfaces, or new fields. Reference `src/types/`._

```typescript
// Example: new fields on an existing interface
interface ExampleModel {
  newField: string
}
```

---

## Component Breakdown

_List new UI components and which existing components are reused or extended._

| Component | Type | Storybook story? | Notes |
|---|---|---|---|
| `NewComponent` | New | Yes | … |
| `ExistingComponent` | Extended | — | Add `newProp` |

---

## IPC Changes

_List any new or modified IPC channels._

| Channel | Direction | Payload | Response |
|---|---|---|---|
| `feature:action` | renderer → main | `{ id: string }` | `Result` |

---

## Store Changes

_List new stores or changes to existing stores._

---

## Composables

_List any new composables this feature introduces._

---

## Open Questions

- [ ] Question 1
- [ ] Question 2

---

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
