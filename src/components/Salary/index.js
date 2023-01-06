import './index.css'

const Salary = props => {
  const {details, salaryLen} = props
  const {label, salaryRangeId} = details
  const salary = e => {
    salaryLen(e.target.value)
    console.log(e.target.value)
  }
  return (
    <div>
      <li>
        <input
          onChange={salary}
          type="checkbox"
          id={salaryRangeId}
          value={salaryRangeId}
        />
        <label className="head" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    </div>
  )
}
export default Salary
