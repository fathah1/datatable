import { useEffect, useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io";
import '../../styles/MainTable.css';
import {motion, AnimatePresence} from 'framer-motion';




function MainTable(props) {

    const [user, setUser] = useState([]); 

    const [innerTableVisibility,setinnerTableVisibility] = useState(false);
    const [innerInnerTableVisibility,setInnerInnerTableVisibility] = useState(false);

    const [currentItemId,SetcurrentItemId] = useState(0);
    const [currentPurchaseDetails, setCurrentPurchaseDetails] = useState([]); 

    const [currentPurchaseDetailsId, setCurrentPurchaseDetailsId] = useState(0);
    const [selectedPurchaseDetailsIndex,setselectedPurchaseDetailsIndex] = useState(0);

    const [warehouseDetails,setWareHouseDetails] = useState([]);
    const [serialNoDetails,setSerialNoDetails] = useState([]); 


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



//Displaying functions
  const DisplayPurchaseDetails = ((value)=>{
    SetcurrentItemId(value);
    let obj = findObj(value)[0]
    setCurrentPurchaseDetails(obj.purchaseDetails);
    console.log("purchase Details in dpd", currentPurchaseDetails);
      //change to extra details function after knowing abouut new api 
      setWareHouseDetails(obj.wareHouseStockDetails)
      setSerialNoDetails(obj.serialNoDetails) 
      console.log("warehouseDetails", warehouseDetails);
      console.log("serialNo details", serialNoDetails)


    if(innerTableVisibility){
      setinnerTableVisibility(false)
    }else{
      setinnerTableVisibility(true)
    }   

  

  })

   const DisplayExtraDetails = ((value)=>{
    setCurrentPurchaseDetailsId(value);

    console.log("current purchase details",currentPurchaseDetails)
    console.log("value", value)
    
    const index = currentPurchaseDetails.map(object => object.purchaseDetailsId).indexOf(value);
    setselectedPurchaseDetailsIndex(index);
    console.log("index",index)



    if(innerInnerTableVisibility){
      setInnerInnerTableVisibility(false)
    }else{
      setInnerInnerTableVisibility(true)
    }
    console.log("inner inner data ", innerInnerTableVisibility);   




  })

   


//renderingFunctions
    const renderTableRows = () =>{
        return filteredData.map(item =>{
            return(

              <tbody className="table">
              <tr key={item.id} >
                <td>{item.purchaseNo || "N/A"}</td> 
                <td>{item.purchaseDate.slice(0, 10).split("-").reverse().join("-") || "N/A"}</td>
                <td>{item.purchasedBy || "N/A"}</td>
                <td>{item.ledgerId || "N/A"}</td>
                <td>{item.wareHouseId || "N/A"}</td>
                <td>{item.purchaseTotal || "N/A"}</td>
                <td>{item.balanceAmount || "N/A"}</td>
                <td>{item.status || "N/A" }</td>
                <td className=""> 
                  <button 
                  className = "btn "   
                  onClick = {() => {DisplayPurchaseDetails(item.id);}} 
                  > 
                  {innerTableVisibility && item.id === currentItemId ? <IoIosArrowDropup/>  : <IoIosArrowDropdown  /> }
                    </button>
                </td>
              </tr>         

                
               {innerTableVisibility && item.id === currentItemId ? <motion.td colSpan="9" 
               initial={{y: -10}}
               animate={{y:0}}
               >
               <h6 className="purchaseHeading">Purchase Details</h6>
               </motion.td> : "" }   
               {innerTableVisibility && item.id === currentItemId ? <RenderPurchaseDetailsHeader/> : "" }   
               {innerTableVisibility && item.id === currentItemId ? <RenderPurchaseDetailsData/> : "" }   
               
               
             
        
          
              </tbody>

         
            )
        })
    }

//finding
    function findObj(value) {

      let obj = user.filter(item => item.id === value);
      console.log("found Obj ", obj);
      setCurrentPurchaseDetails(obj.purchaseDetails);
      return  obj;
    }

    // function findcurrentDetailsObj(value) {

    //   let obj = currentPurchaseDetails.filter(item => item.id === value);
    //   console.log("found currenct detials Obj ", obj);
    //   setCurrentlySelectedPurchaseDetails(obj.purchaseDetails);
    //   return  obj;
    // }

    const RenderPurchaseDetailsHeader = () =>{
     
          return(   
            <motion.tr
            colSpan="9"
            initial={{y: -10}}
            animate={{y:0}}>
              <th colSpan="2" scope="col">Serial No</th>
              <th colSpan="2" scope="col">Transaction ID</th>
              <th colSpan="2" scope="col">Transaction Type</th>
              <th colSpan="2" scope="col" >Company ID</th>
              <th> More Details</th>
           </motion.tr>         
          )
  }

  const RenderExtraDetails = () =>{
    
        return(   
          <motion.tr
          initial={{y: -10}}
          animate={{y:0}}
           >
          <div className="bg-success"> <h6>this</h6></div>
          </motion.tr>     
        )
      
    
    
  }
  
  



  const RenderPurchaseDetailsData = () =>{
    
   
    return currentPurchaseDetails.map(item =>{
        return(   

          <tbody colspan="9">
          <motion.tr
          initial={{y: -10}}
          animate={{y:0}}
          key={item.purchaseDetailsId }>
          <td colSpan="2" >{item.purchaseDetailsId || "N/A"}</td> 
          <td colSpan="2">{item.transactionId  || "N/A" }</td>
          <td colSpan="2">{item.transactionType || "N/A"}</td>
          <td colSpan="2">{item.companyId || "N/A"}</td>
          <td>
          <button 
           className = "btn "   
           onClick = {() => {DisplayExtraDetails(item.purchaseDetailsId);}}> 
          {innerInnerTableVisibility && item.purchaseDetailsId === currentPurchaseDetailsId ? <IoIosArrowDropup/>  : <IoIosArrowDropdown  /> }
          </button>
          </td>
         
          </motion.tr>   

           {innerInnerTableVisibility && item.purchaseDetailsId === currentPurchaseDetailsId ? <RenderExtraDetails/> :"" }  

          </tbody>
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