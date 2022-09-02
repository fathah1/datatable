import { useEffect, useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io";
import '../../styles/MainTable.css';
import {motion, AnimatePresence} from 'framer-motion';




function MainTable(props) {

    const [user, setUser] = useState([]); 
    const [innerTableVisibility,setinnerTableVisibility] = useState(false);
    const [currentItemId,SetcurrentItemId] = useState(0);
    const [currentPurchaseDetails, setCurrentPurchaseDetails] = useState([]); 
    const sampleData = require("../Resources/samples.json");
    const [filteredData,setFilteredData] = useState([]);


    // useEffect(()=>{
    //     fetch('../resources/data.JSON'
    //     // ,{
    //     //   method:'GET',
    //     //   headers: new Heaffders({
    //     //     'dbName':'mysaledb39574400450'
    //     //   })
    //     // }
    //     ).then(response =>{
    //         if(response.ok){
             
    //             return response.json()
    //         }
    //         throw response;
    //     })
    //     .then(data => {
    //       console.log(data);
    //         setUser(data);
    //     })
    //     .catch(error => {
    //         console.error("Error Fetching Data: ", error);
    //     })
    // },[])





  useEffect(() => {
    setUser(sampleData);
  },[sampleData]);

  useEffect(() => {
    setFilteredData(user);
  }, [user]);








  // filter handlers
  const minBalanceFilterHandler = () => {
    const minBalance = props.minBalanceFilter;

    if (minBalance !== '' )  {
      const results =user.filter((thisuser) => {
        return thisuser.balanceAmount > minBalance;
      });
      setFilteredData(results);

    } else {
      setFilteredData(sampleData);
    }

  };



  const VendorFilterHandler = () => {
    const vendor = props.vendorFilter;
    if (vendor !== '' )  {
      const results =user.filter((thisuser) => {
        return thisuser.ledgerId === vendor;
      });
      setFilteredData(results);

    } else {
      setFilteredData(sampleData);
    }
  };



  //filter Calls 
  useEffect(()=>{
    minBalanceFilterHandler(props.minBalanceFilter);
  },[props.minBalanceFilter]);

  useEffect(()=>{
    VendorFilterHandler(props.vendorFilter);
  },[props.vendorFilter]);




  const DisplayPurchaseDetails = ((value)=>{

    SetcurrentItemId(value);
    
    setCurrentPurchaseDetails(findObj(value)[0].purchaseDetails);
    console.log("purchase Details in dpd", currentPurchaseDetails);

    RenderPurchaseDetailsHeader();
    RenderPurchaseDetailsData();

    if(innerTableVisibility){
      setinnerTableVisibility(false)
    }else{
      setinnerTableVisibility(true)
    }

   
   
  })

   

    const renderTableRows = () =>{
        return filteredData.map(item =>{
            return(

              <tbody className="table">
              <tr key={item.id}>
                <td>{item.purchaseNo || "N/A"}</td> 
                <td>{item.purchaseDate.slice(0, 10).split("-").reverse().join("-") || "N/A"}</td>
                <td>{item.purchasedBy || "N/A"}</td>
                <td>{item.ledgerId || "N/A"}</td>
                <td>{item.wareHouseId || "N/A"}</td>
                <td>{item.purchaseTotal || "N/A"}</td>
                <td>{item.balanceAmount || "N/A"}</td>
                <td>{item.status || "N/A" }</td>
                <td> 
                  <button 
                  className = "btn "   
                  onClick = {() => {DisplayPurchaseDetails(item.id);}} 
                  > 
                  {innerTableVisibility && item.id === currentItemId ? <IoIosArrowDropup/>  : <IoIosArrowDropdown  /> }
                    </button>
                </td>
              </tr>         

                
               {innerTableVisibility && item.id === currentItemId ? <motion.th colSpan="9" 
               initial={{y: -10}}
               animate={{y:0}}ß
               >
               <h6 className="purchaseHeading">Purchase Details</h6>
               </motion.th> : "" }   
               {innerTableVisibility && item.id === currentItemId ? <RenderPurchaseDetailsHeader/> : "" }   
               {innerTableVisibility && item.id === currentItemId ? <RenderPurchaseDetailsData/> : "" }   
        
          
              </tbody>

         
            )
        })
    }

    function findObj(value) {

      let obj = user.filter(item => item.id === value);
      console.log("found Obj ", obj);
      setCurrentPurchaseDetails(obj.purchaseDetails);
      return  obj;
    }

    const RenderPurchaseDetailsHeader = () =>{
     
          return(   
            <motion.tr
            colSpan="9"
            initial={{y: -10}}
            animate={{y:0}}>
              <th colSpan="3" scope="col">Serial No</th>
              <th colSpan="2" scope="col">Transaction ID</th>
              <th colSpan="2" scope="col">Transaction Type</th>
              <th colSpan="2" scope="col" >Company ID</th>
           </motion.tr>         
          )
  }

  const RenderPurchaseDetailsData = () =>{
    
   
    return currentPurchaseDetails.map(item =>{
        return(   
          <motion.tr
          initial={{y: -10}}
          animate={{y:0}}
          key={item.sno }>
          <td colSpan="3" >{item.purchaseDetailsId || "N/A"}</td> 
          <td colSpan="2">{item.transactionId  || "N/A" }</td>
          <td colSpan="2">{item.transactionType || "N/A"}</td>
          <td colSpan="2">{item.companyId || "N/A"}</td>
          </motion.tr>     
        )
      
    }
    )
}




  return (
    <div className="MainTable">
       <table className="table">

  <thead>

    <tr>
      <th >Purchase Number</th>
      <th >Purchase Date</th>
      <th >Purchased By</th>
      <th >Vendor </th>
      <th >Warehouse</th>
      <th >Purchase Amount</th>
      <th >Balance Amount</th>
      <th >Status</th>
      <th> Purchase Details</th>
    </tr>

  </thead>

  {renderTableRows()}

    
           
 
</table>
    </div>
  );

}

export default MainTable;