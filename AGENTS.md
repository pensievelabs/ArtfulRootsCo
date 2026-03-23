# Instructions for AI Agents

To ensure consistency and quality across all screen sizes, all UI changes must be verified against these three standard breakpoints. Use the browser tool to verify layouts at the following viewport dimensions:

## Required Viewport Testing

| Layout | Width | Height | Description |
| :--- | :--- | :--- | :--- |
| **Desktop** | 1280px | 800px | Standard desktop view |
| **Tablet** | 768px | 1024px | iPad / Tablet portrait view |
| **Phone** | 375px | 812px | iPhone / Mobile portrait view |

## Responsive Guidelines
- **Desktop**: Full horizontal navigation, multiple grid columns.
- **Tablet**: Compact horizontal navigation or hamburger menu if necessary, reduced spacing.
- **Phone**: Hamburger menu toggle is MANDATORY. Single-column layouts for hero and feature sections.
- **Side Padding**: Ensure a minimum of `1.5rem` to `2rem` side padding on all screens to prevent content from touching the edges of the display.

## Self-Learning Loop & Design Consistency

To maintain the "Editorial Calm" aesthetic and ensure long-term consistency:

- **Before Planning**: Read [WEBSITE_DESIGN_LANGUAGE.md](file:///Users/priyankdesai/Develop/ArtfulRootsCo/WEBSITE_DESIGN_LANGUAGE.md) to understand the core principles, color palette, and component conventions.
- **After Implementation**: If your change introduced a new UI pattern, feature, or significant design decision, update `WEBSITE_DESIGN_LANGUAGE.md`. 
    - Keep updates **extremely concise**.
    - Focus on the *why* (rationale) and the *how* (CSS tokens/HTML structure).
    - Document new features in the "Page Structure" or "Component Conventions" sections.

## Verification Checklist
- [ ] Header logo and navigation are correctly aligned and padded.
- [ ] Buttons and interactive elements are an appropriate size for touch on mobile/tablet.
- [ ] No horizontal scrolling occurs on mobile/tablet.
- [ ] The hamburger menu functional and accessible.
