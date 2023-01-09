import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home">
    <Header />
    <h1 className="heading">Find The Job That Fits Your Life</h1>
    <p className="heading">
      Millions of people are searching for jobs,salary,informationand company
      reviews.find the jobs that fits your abilites and potential
    </p>
    <Link to="/jobs">
      <button className="butto" type="button">
        Find Jobs
      </button>
    </Link>
  </div>
)
export default Home
