import './index.css'

const Filterr = props => {
  const {details, employee} = props
  const {label, employmentTypeId} = details
  const change = e => {
    employee(e.target.value)
  }

  return (
    <div>
      <li>
        <input
          onChange={change}
          type="checkbox"
          id={employmentTypeId}
          value={employmentTypeId}
        />
        <label className="head" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    </div>
  )
}
export default Filterr
