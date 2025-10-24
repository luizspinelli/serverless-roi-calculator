import './Home.scss'

export function Home() {
  return (
    <div className="home">
      <h1>Welcome to Serverless ROI Calculator</h1>
      <p>Calculate the return on investment for your serverless infrastructure.</p>

      <div className="home-cards">
        <div className="card">
          <h3>Calculate ROI</h3>
          <p>Enter your serverless metrics and get instant ROI calculations</p>
        </div>

        <div className="card">
          <h3>View Reports</h3>
          <p>Access detailed reports and analytics of your calculations</p>
        </div>

        <div className="card">
          <h3>Compare Scenarios</h3>
          <p>Compare different serverless configurations side by side</p>
        </div>
      </div>
    </div>
  )
}
