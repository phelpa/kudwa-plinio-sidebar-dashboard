# Financial Dashboard

A visually appealing and user-friendly financial dashboard built with React, TypeScript, Tailwind CSS, and Recharts. The dashboard displays financial data from JSON files with interactive charts and key performance indicators.

## Features

- **Multi-Period View**: Switch between Monthly, Quarterly, and Yearly data views
- **Interactive Charts**:
  - Line charts for cash flow trends
  - Pie charts for revenue and expense breakdowns
  - Bar charts for cash flow analysis
  - Composed charts for profit & loss overview
- **Key Performance Indicators**: Display of important financial metrics with change indicators
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Custom Color Palette**: Uses a carefully selected color scheme for optimal readability

## Color Palette

- **Warm Brown**: `#B09280` - Used for secondary elements
- **Bright Yellow**: `#EAE62F` - Used for highlights and accents
- **Soft Blue**: `#698AC5` - Primary color for buttons and key elements
- **Dark Gray**: `#262626` - Primary text color
- **Light Gray**: `#FBFAFA` - Background color

## Technologies Used

- **React 19** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Recharts** - Powerful charting library for React
- **Vite** - Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd kudwa-plinio-sidebar-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── BarChart.tsx
│   │   └── ComposedChart.tsx
│   ├── Dashboard.tsx
│   ├── KPICard.tsx
│   └── LoadingSpinner.tsx
├── main-dashboard-jsons/
│   ├── monthly.json
│   ├── quarterly.json
│   └── yearly.json
├── types/
│   └── dashboard.ts
├── utils/
│   └── formatters.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Data Structure

The dashboard loads data from three JSON files:

- `monthly.json` - Monthly financial data
- `quarterly.json` - Quarterly financial data
- `yearly.json` - Yearly financial data

Each file contains:

- Main dashboard data with charts and date arrays
- KPI data with top-level and regular metrics
- Chart data for various visualization types

## Charts Available

1. **Cash at Bank** - Line chart showing cash flow trends
2. **Profit & Loss Overview** - Composed chart with stacked columns and lines
3. **Revenue Split** - Pie chart showing revenue distribution
4. **Expense Split** - Pie chart showing expense categories
5. **Cash Flow** - Bar chart showing operational and investment cash flows

## Customization

### Adding New Charts

1. Create a new chart component in `src/components/charts/`
2. Import and use it in the `Dashboard.tsx` component
3. Ensure your data follows the `ChartData` interface

### Modifying Colors

Update the color palette in `tailwind.config.js` and the chart color arrays in individual chart components.

### Adding New Data Periods

1. Add new JSON files to `src/main-dashboard-jsons/`
2. Update the `PeriodType` in `src/types/dashboard.ts`
3. Add the new period to the Dashboard component's switch statement

## Performance Considerations

- JSON data is imported statically for optimal bundling
- Charts are rendered using SVG for crisp display at any resolution
- Responsive design ensures good performance on mobile devices
- Loading states provide better user experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
