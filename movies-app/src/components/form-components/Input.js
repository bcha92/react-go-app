const Input = props => (
    <div className="mb-3" /* Title */>
        {props.type !== "hidden" && <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>}
        
        {props.type === "select" ? // Dropdown Menu Select
        <select
            className="form-select"
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
        >
        <option className="form-select">Choose...</option>
        {props.mpaa.map((value, index) => (
            <option key={index} className="form-select" id={value} value={value}>{value}</option>
        ))}
        </select>

        : props.type === "textarea" ? // Large Text Area
        <textarea
        className={`form-control ${props.className}`}
        id={props.name}
        name={props.name}
        rows="3"
        onChange={props.handleChange}
        value={props.value}
        /> :
        <input // Text Input
            type={props.type}
            className={`form-control ${props.className}`}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
        />}
        {props.className === "is-invalid" &&<div className={props.errorDiv}>{props.errorMsg}</div>}
    </div>
);

export default Input;