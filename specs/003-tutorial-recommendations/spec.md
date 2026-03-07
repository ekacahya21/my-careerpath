# Feature Specification: Tutorial Recommendations

**Feature Branch**: `003-tutorial-recommendations`  
**Created**: 2026-03-07  
**Status**: Draft  
**Input**: User description: "Can you also add that when we have skill that isn't matched on the job description, the agent can recommend youtube tutoorial link or other tutorial links for that specific role"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover Learning Resources (Priority: P1)

As a job seeker reviewing my career growth plan, I want to see recommended tutorial links (e.g., YouTube videos or courses) next to the skills I need to acquire, so I can immediately start learning and bridging my skill gaps without having to search for resources manually.

**Why this priority**: Simply telling a user what they lack is helpful, but providing direct avenues to acquire those skills transforms the application from an analysis tool into a genuine growth enabler.

**Independent Test**: Can be fully tested by uploading a CV, waiting for the results to generate, and verifying that the "Career Growth Plan" section includes clickable external tutorial links for the recommended skills.

**Acceptance Scenarios**:

1. **Given** the user is viewing their generated Career Growth Plan, **When** they look at the skills to acquire, **Then** there are accompanying tutorial links (like YouTube or official docs) for those skills.
2. **Given** the user clicks on a recommended tutorial link, **When** the click occurs, **Then** a new browser tab opens pointing to the educational resource.

---

### Edge Cases

- What happens if the AI cannot find a high-quality specific tutorial? (The AI should provide a generalized, high-quality search query link, e.g., a YouTube search URL for the skill).
- How handles UI layout if there are many long URLs? (Links should be presented cleanly, e.g., using icons or short text like "Watch Tutorial" rather than raw URLs).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Analyzer AI MUST be prompted to source and include at least one educational resource link (e.g., YouTube, Coursera, official documentation) for the skills identified in the growth plan.
- **FR-002**: The backend API response schema MUST be updated to include `recommended_resources` (containing a title and URL) alongside or within the `growth_plan` items.
- **FR-003**: The frontend `ResultsPanel` MUST render these resources as clickable links that open in a new tab (`target="_blank"`).
- **FR-004**: The UI MUST present the links cleanly, maintaining the "Cinematic SaaS" design aesthetic (e.g., using an external link icon or subtle styled buttons).

### Key Entities *(include if feature involves data)*

- **Growth Milestone**: Updated to include a list of `recommended_resources`.
- **Resource**: An object containing `title` (e.g., "React Crash Course") and `url` (e.g., `https://youtube.com/...`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of generated growth plans contain at least one valid external tutorial/resource link per major milestone or skill gap.
- **SC-002**: Generated tutorial URLs are properly formatted and result in successful navigation without browser error.
- **SC-003**: User engagement (click-through rate on tutorial links) can theoretically be tracked, indicating the usefulness of the integration.
