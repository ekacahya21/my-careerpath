# Data Model: Tutorial Recommendations

This feature does not introduce new database tables or persistent state, as the application relies entirely on ADK stateless multi-agent processing.

However, it introduces a new entity structure to the AI's JSON output, which acts as the core data model.

## Entity: Resource

Represents an external educational tutorial or document.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | A descriptive title of the resource (e.g., "React Crash Course for Beginners"). |
| `url` | `string` | A valid, fully-formed external URL pointing to the resource (e.g., YouTube or official documentation). |

## Entity: Growth Milestone (Augmented)

The existing growth milestone entity is augmented to hold resources.

| Field | Type | Description |
|---|---|---|
| `step` | `integer` | The chronological sequence of this milestone (1, 2, or 3). |
| `focus` | `string` | A short phrase naming the focus area. |
| `skills_to_acquire` | `array<string>` | An array of 2-4 critical skills needed for this phase. |
| `recommended_resources` | `array<Resource>` | **(NEW)** An array of 1-3 highly relevant external educational links to acquire the identified skills. |
