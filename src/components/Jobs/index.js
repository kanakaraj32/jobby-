import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Filterr from '../Filter'
import Salary from '../Salary'

import './index.css'

const apiConstans = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
// eslint-disable-next-line
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
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
    // eslint-disable-next-line
    const {employmentType, minPackage, input} = this.state
    const profileApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${input}`
    const jwtt = Cookies.get('jwt_token')
    this.setState({jobStatus: apiConstans.progress})
    const OptionA = {
      method: 'GET',
      header: {Authorization: `Bearer ${jwtt}`},
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
                    key={product.employmentTypeId}
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
                    key={product.salaryRangeId}
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
            <div>raju</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
