import '../../styles/Filters.css'


const Filters = (props) =>{

  const onMinBalanceChangeHandler = (events) =>{
    props.onMinBalanceFilterChange(events.target.value);

  }

  const onVendorChangeHandler = (events) =>{
    props.onVendorChange(events.target.value);

  }
  
  return (
    <div className="FiltersContainer">
        <h3 className="text-center">Purchase Report</h3>

        <div className="filters">
            <h4 className="filterComponents">Filters: </h4>

            <div className="filterComponentsContainer">
            <h5 className="filterComponents headings">Min Purchase Amount:</h5>
            <input 
            onChange={onMinBalanceChangeHandler}
            type="number" 
            placeholder="min purchase amount"
            className="filterComponents"/>


            <h5 className="filterComponents headings">Vendor Id:</h5>
            <input 
            onChange={onVendorChangeHandler}
            type="number" 
            placeholder="enter vendor Id"
            className="filterComponents"/>
            </div>
            </div>

    </div>
  );
}

export default Filters;