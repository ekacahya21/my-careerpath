# Feature Specification: Company Matches Link

**Feature Branch**: `002-company-matches-link`  
**Created**: 2026-03-07  
**Status**: Draft  
**Input**: User description: "i want to update the company matches to open job opening website on new tab"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore Job Openings (Priority: P1)

As a job seeker reviewing my career growth plan, I want to be able to click on any recommended company match so that a new browser tab opens directly to relevant job openings for that company, reducing the friction of manually searching.

**Why this priority**: The core value proposition of the Scout agent is finding real-world matches. Connecting the generated match directly to actionable job searches bridges the gap between AI analysis and real-world application.

**Independent Test**: Can be fully tested by uploading a CV, waiting for the results to generate, clicking on one of the recommended companies in the "Company Matches" section, and verifying that a new browser tab opens to a relevant search or job portal.

**Acceptance Scenarios**:

1. **Given** the user is viewing the AI analysis results, **When** they click on a recommended company card, **Then** a new browser tab opens.
2. **Given** a new tab opens from a company click, **When** the page loads, **Then** the URL corresponds to a search query or job page related to that specific company.
3. **Given** the user hovers over a company match card, **When** resting the cursor, **Then** there is clear visual feedback (e.g., cursor changes to pointer, subtle hover styling) indicating that the element is clickable.

---

### Edge Cases

- What happens if the generated search query contains special characters? (The search string must be properly URL-encoded before opening the new tab).
- How is the clickable area defined? (The entire company card should be clickable, not just the text).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render each company match item in the Results Panel as a clickable link or button.
- **FR-002**: Clicking a company match MUST trigger navigation to an external URL in a new browser tab (`target="_blank"`).
- **FR-003**: The external URL MUST utilize the `search_query_used` data property returned by the Scout agent to formulate a dynamic job search URL (e.g., a Google search or LinkedIn jobs search).
- **FR-004**: The system MUST provide visual affordance (cursor change) to indicate the company cards are interactive links.

### Key Entities *(include if feature involves data)*

- **Company Match**: An object containing `company_name`, `match_reason`, and `search_query_used`. The `search_query_used` will be the foundation for constructing the external link.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of generated company matches are clickable and result in successful navigation to a new tab.
- **SC-002**: The generated external URLs validly format the AI-provided `search_query_used` without causing browser malformed URL errors.
- **SC-003**: Time-to-action (from viewing a match to searching for a job) is reduced to a single click for the user.
