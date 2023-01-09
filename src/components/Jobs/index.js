import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Filterr from '../Filter'
import Salary from '../Salary'
import JobCard from '../JobsCard'

import './index.css'

const apiConstans = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    id: 1,
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    id: 2,
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    id: 3,
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    id: 4,
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
// eslint-disable-next-line
const salaryRangesList = [
  {
    id: 1,
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    id: 2,
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    id: 3,
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    id: 4,
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    leftData: {},
    status: apiConstans.initial,
    jobStatus: apiConstans.initial,
    employmentType: '',
    minPackage: 0,
    input: '',
    // eslint-disable-next-line
    salarydate: [],
  }

  componentDidMount = () => {
    this.left()
    this.getJobs()
  }

  left = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwt = Cookies.get('jwt_token')
    this.setState({status: apiConstans.inProgress})
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwt}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(response)
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(profileData)
      this.setState({leftData: profileData, status: apiConstans.success})
    } else {
      this.setState({status: apiConstans.failure})
    }
  }

  getJobs = async () => {
    const {employmentType, minPackage, input} = this.state
    const profileApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${input}`
    const jwtt = Cookies.get('jwt_token')

    this.setState({jobStatus: apiConstans.progress})
    const OptionA = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtt}`},
    }
    const response = await fetch(profileApiUrl, OptionA)
    console.log(response)
    const salarydata = await response.json()

    if (response.ok === true) {
      const fetchedJobsData = salarydata.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(fetchedJobsData)
      this.setState({
        salarydate: fetchedJobsData,

        jobStatus: apiConstans.success,
      })
    } else {
      this.setState({jobStatus: apiConstans.failure})
    }
  }

  progress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  win = () => {
    const {leftData} = this.state
    const {name, profileImageUrl, shortBio} = leftData

    return (
      <div className="profile-view">
        <img alt={name} className="profile-image" src={profileImageUrl} />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  retryButton = async () => {
    this.setState({jobStatus: apiConstans.progress})
  }

  fail = () => (
    <button className="retry-button" type="button" onClick={this.retryButton}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {status} = this.state
    switch (status) {
      case apiConstans.inProgress:
        return this.progress()
      case apiConstans.success:
        return this.win()
      case apiConstans.failure:
        return this.fail()

      default:
        return null
    }
  }

  employee = eve => {
    this.setState({employmentType: eve})
  }

  salaryLen = val => {
    this.setState({minPackage: val})
  }

  inputtext = e => {
    this.setState({input: e.target.value})
    console.log(e.target.value)
  }

  wins = () => {
    const {salarydate, input} = this.state
    const jobsDisplay = salarydate.length > 10

    return jobsDisplay ? (
      <div className="details-container">
        <ul className="job">
          {salarydate.map(eachData => (
            <JobCard key={eachData.id} jobDetails={eachData} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <div className="search-input-content">
          <input
            type="search"
            className="search"
            placeholder="Search"
            value={input}
            onChange={this.changeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  lose = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  showing = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case apiConstans.inProgress:
        return this.progress()
      case apiConstans.success:
        return this.wins()
      case apiConstans.failure:
        return this.lose()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobContainer">
        <Header />
        <div className="jobs-bottom">
          <div className="left-jobs">
            {this.renderProfile()}
            <hr />
            <div>
              <h1 className="head">Type of Employment</h1>
              <ul className="ul">
                {employmentTypesList.map(product => (
                  <Filterr
                    details={product}
                    key={product.id}
                    employee={this.employee}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h1 className="head">Salary Range</h1>
              <ul className="ul">
                {salaryRangesList.map(product => (
                  <Salary
                    details={product}
                    key={product.id}
                    salaryLen={this.salaryLen}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="right-jobs">
            <div className="search-input">
              <input
                placeholder="Search"
                type="search"
                onChange={this.inputtext}
              />
              <button type="button" className="btn-search">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.showing()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
