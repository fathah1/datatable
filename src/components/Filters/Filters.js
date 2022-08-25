import '../../styles/Filters.css'


const Filters = (props) =>{

  const onChangeHandler = (events) =>{
    console.log("filter.js handler", events.target.value);
    props.onFilterChange(events.target.value);

  }
  
  return (
    <div className="FiltersContainer">
        <h3 className="text-center">Purchase Report</h3>

        <div className="filters">
            <h4 className="filterComponents">Filters: </h4>

       
            <h5 className="filterComponents headings">Min Purchase Amount:</h5>
            <input 
            onChange={onChangeHandler}
            type="number" 
            placeholder="min purchase amount"
            className="filterComponents"/>

            <h5 className="filterComponents headings">Min Purchase Amount:</h5>
            <input 
            onChange={onChangeHandler}
            type="number" 
            placeholder="min purchase amount"
            className="filterComponents"/>

            <h5 className="filterComponents headings">Min Purchase Amount:</h5>
            <input 
            onChange={onChangeHandler}
            type="number" 
            placeholder="min purchase amount"
            className="filterComponents"/>
            </div>

    </div>
  );
}

export default Filters;