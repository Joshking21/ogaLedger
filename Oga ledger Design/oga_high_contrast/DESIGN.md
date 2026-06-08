# Design System Document: The Sovereign Ledger

## 1. Overview & Creative North Star: "The Digital Veranda"
This design system rejects the cluttered, anxiety-inducing aesthetics of traditional finance apps. Instead, it adopts the **"Digital Veranda"** philosophy—inspired by the open, shaded, and communal spaces of Nigerian architecture. 

The system prioritizes **Atmospheric Authority**. It is built on the premise that a ledger is a source of truth, requiring high-contrast legibility for outdoor trade (under the midday sun) and a sense of "calm power" for the business owner. We achieve this by breaking the rigid "app-grid" look in favor of **intentional asymmetry** and **tonal depth**. 

**The Signature Difference:**
- **Intentional Asymmetry:** Large, bold headlines are often offset or left-aligned with generous negative space to guide the eye.
- **Layered Surfaces:** We replace lines with "light"—using shifting background tones to define zones.
- **Editorial Scale:** Typography isn't just for reading; it's a structural element. Numbers are treated as hero graphics.

---

## 2. Colors: Tonal Authority
The palette is rooted in **Naira Green (#00A86B)**, but we utilize its deep and vibrant variants to create a sophisticated, editorial feel.

### The "No-Line" Rule
**Prohibit 1px solid borders.** To separate a list of transactions or section headers, do not draw a line. Instead, shift the background. 
*Example: Place a `surface-container-low` section against a `surface` background.*

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, premium papers.
- **Base Level:** `surface` (#f9f9fc) for the main canvas.
- **Secondary Zone:** `surface-container-low` (#f3f3f6) for grouping minor details.
- **Elevation Zone:** `surface-container-highest` (#e2e2e5) for prominent interactive cards.

### The "Glass & Gradient" Rule
To add soul to the ledger, use a **Signature Gradient** for primary actions:
- **Primary CTA:** Transition from `primary` (#006d43) at the bottom-right to `primary_container` (#00a86b) at the top-left.
- **Floating Glass:** For navigation bars or modal headers, use `surface` with 85% opacity and a `20px` backdrop blur. This ensures the ledger's data "bleeds through" elegantly.

---

## 3. Typography: The Bold Narrative
We utilize a pairing of **Plus Jakarta Sans** (Display/Headlines) and **Inter** (UI/Body) to balance modern flair with Swiss-style functionalism.

- **Display (Plus Jakarta Sans):** Used for account balances and "Oga" moments. `display-lg` (3.5rem) should be used sparingly to celebrate financial milestones.
- **Headlines (Plus Jakarta Sans):** Bold and unapologetic. `headline-md` (1.75rem) provides immediate context for the business owner at a glance.
- **Body (Inter):** High x-height for readability. `body-lg` (1rem) is the workhorse for transaction descriptions.
- **The Scale of Truth:** All currency values must be at least one tier larger than their accompanying label (e.g., if the label is `label-md`, the value is `title-md`).

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty." In this system, depth is clean and structural.

- **The Layering Principle:** Rather than shadows, stack `surface-container-lowest` (#ffffff) cards on top of `surface-container-low` (#f3f3f6) backgrounds. The contrast provides the "lift."
- **Ambient Shadows:** If a floating action button (FAB) or a critical modal requires a shadow, it must be **Ambient Green**:
    - **Color:** `on-primary-fixed-variant` (#005232) at 6% opacity.
    - **Blur:** 24px to 32px.
    - **Y-Offset:** 8px.
- **The Ghost Border Fallback:** If high-glare outdoor conditions require a container edge, use a "Ghost Border": `outline-variant` (#bccabe) at **15% opacity**. Never 100%.

---

## 5. Components: Precision & Touch

### Buttons (The "Power" Action)
- **Primary:** Gradient-filled (Naira Green variant), `xl` (0.75rem) roundedness. Minimum height: **56px** for high-speed thumb interaction.
- **Tertiary:** No background, no border. Use `primary` (#006d43) text in `title-sm` bold.

### Input Fields (The "Entry" Portal)
- **Style:** Forgo the four-sided box. Use a `surface-container-high` (#e8e8ea) fill with a `md` (0.375rem) top-corner radius and a 2px `primary` bottom-stroke only upon focus.
- **Focus State:** The label should animate into a `label-sm` in `primary` color.

### Cards & Lists (The Ledger View)
- **The Divider Rule:** **Forbidden.** Separate transaction items using `16px` of vertical white space.
- **Micro-Coloring:** Positive cash flow uses `primary` (#006d43); debts or expenses use `tertiary` (#a5393e). Use a 5% opacity tint of these colors as a background "glow" for the entire list item to indicate status.

### The "Oga" Summary Card (Specialty Component)
A hero component for the home screen. Use a deep `primary` (#006d43) background with a subtle, large-scale watermark of the Naira symbol (₦) in `on-primary-fixed-variant` (#005232) at 10% opacity, rotated 15 degrees.

---

## 6. Do’s and Don’ts

### Do:
- **Do** lean into white space. It suggests "financial room to breathe."
- **Do** use `display-sm` for currency totals. The money is the hero.
- **Do** ensure all touch targets (icons, buttons, links) are at least **48x48dp**.

### Don’t:
- **Don't** use pure black (#000000). Use `on-surface` (#1a1c1e) for a softer, more premium contrast.
- **Don't** use standard 1px grey dividers. They clutter the ledger and reduce "outdoor" clarity.
- **Don't** use "alert" red for everything. Reserve `tertiary` (#a5393e) for actual financial loss or errors, not just decorative accents.

---

*This design system is a living document intended to empower Nigerian business owners with a tool that feels as professional as their ambition.*