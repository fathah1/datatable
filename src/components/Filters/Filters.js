import '../../styles/Filters.css'


const Filters = (props) =>{

  const onChangeHandler = (events) =>{
    console.log("filter.js handler", events.target.value);
    props.onFilterChange(events.target.value);

  }


  
  return (
    <div className="FiltersContainer">
        <h3>Purchase Report</h3>

        <div className="filters">
            <h4>filters: </h4>
            <input onChange={onChangeHandler} type="text" placeholder="min purchase amount"/>
        </div>

    </div>
  );
}

export default Filters;