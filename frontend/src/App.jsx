// src/App.jsx
import './styles.css';
import MonthlyChart from './components/MonthlyChart';
import MonthOverMonthChart from './components/MonthOverMonthChart';
import TopCustomersTable from './components/TopCustomersTable';
import BestProductsTable from './components/BestProductsTable';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Karma Healthcare – Sales Analytics</h1>
          <p className="subtitle">Last 6 months performance overview</p>
        </div>
      </header>

      {/* Single grid: chart | table per row */}
      <section className="grid">
        <div className="card">
          <MonthlyChart />
        </div>
        <div className="card">
          <TopCustomersTable />
        </div>
        <div className="card">
          <MonthOverMonthChart />
        </div>
        <div className="card">
          <BestProductsTable />
        </div>
      </section>
    </div>
  );
}
