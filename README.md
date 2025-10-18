# Buchung – Reservation Demo (Vue 3 + Bootstrap)

## Project Overview
A simple hotel booking demo where users enter their name and create one or more reservation lines. Each line has a type (Vollpension/Halbpension), begin and end dates, and an automatically calculated line total. A summary (Rechnung) view shows the full bill.

## Features
- **Personal data**: Capture first and last name.
- **Dynamic reservation lines**: Use **+** to add a line after the current one and **−** to remove the current line (at least one line always remains).
- **Date validation**: Prevents past dates and ensures end date is after begin date.
- **Auto totals**: Calculates per-line totals and an overall bill.
- **Summary view**: Switch between booking form and invoice.

## Tech Stack
- **Vue 3** (CDN) for state and component management.
- **Bootstrap 5** (CDN) for layout and styling.
- **Font Awesome 6** (CDN) for icons.
- Plain **HTML/CSS/JS**; no build step required.

## Live Demo
https://holidayserv.netlify.app/

## Getting Started
### Prerequisites
- A modern web browser. No backend or PHP required.

### Run Locally
- Open `index.html` directly in your browser, or serve this folder with any simple static server.

## Usage Guide
- **Add/Remove lines**: Click the green **+** to add a reservation line after the current one. Click the red **−** to remove the current line (cannot remove the last remaining line).
- **Fill details**: Select `Art`, then choose `Begin Date` and `End Date`.
  - `Begin Date` cannot be in the past.
  - `End Date` must be after `Begin Date`.
- **Totals**: Line amount is calculated from the number of days and the selected type:
  - `Vollpension`: 160 € per day
  - `Halbpension`: 80 € per day
- **Summary**: Click `Rechnung` to view the invoice. Use `Zurück` to return. `Reset Seite` reloads the page.

## Project Structure
```
buchung/
├─ index.html          # Page shell; mounts Vue app and includes CDNs
├─ buchen.js           # Vue app + components (personal-com, buchen-com, bill-com)
├─ buchen.css          # Styles
└─ pic/                # Images (e.g., logo)
```

## Development Notes
- **Components in `buchen.js`**:
  - `personal-com`: name inputs with v-model-style emits.
  - `buchen-com`: one reservation line; emits updates and `add-line`/`remove-line`.
  - `bill-com`: renders the invoice and computes the total amount.
- **App state**:
  - `lines`: array of line objects `{ beginDate, endDate, daysDifference, select }`.
  - `lineTotals`: computed from `lines`.
- **UI behavior**:
  - `+` calls `addLineAfter(index)` to insert a new line after the current one.
  - `−` calls `removeLineAt(index)` but keeps at least one line.

## Customization
- Adjust prices and labels in `buchen.js` (`lineTotals` and `bill-com`).
- Update styling in `buchen.css`.
- Replace the logo under `pic/` and update paths in `index.html`.

## License
No license specified.

## Author
Amal Abdalla
