export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="main-panel">
          <Upload />
          <Dashboard />
          <HistoryDashboard />
        </div>
        <div className="side-panel">
          <RecyclingSection />
          <Sustainability />
          <CompliancePanel />
        </div>
      </div>
    </>
  );
}