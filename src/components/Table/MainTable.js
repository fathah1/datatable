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
                <td className=""> <button  className = "btn " onClick = {() => {DisplayPurchaseDetails(item.id);}}> 
                                     {innerTableVisibility && item.id === currentItemId ? <IoIosArrowDropup/>  : <IoIosArrowDropdown  /> }
                                 </button>
                </td>
              </tr>         

              { innerTableVisibility && item.id === currentItemId ?
              <tr>  
              <td colspan="100%">
               <tr>
               {<motion.h6  initial={{y: -10}} animate={{y:0}} className="purchaseHeading w-100">Purchase Details</motion.h6>}   
               </tr>

               {<RenderPurchaseDetailsHeader className="purchaseTableElems"/>}   
                  
              </td>
              </tr>:   ""}

          
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

    const RenderPurchaseDetailsHeader = () =>{
     
          return(   
            <table className="purchaseTable">
            <thead className="bg-success Purchaseheading">
            <motion.tr  initial={{y: -10}} animate={{y:0}}>
              <th colSpan="2" scope="col">Serial No</th>
              <th colSpan="2" scope="col">Transaction ID</th>
              <th colSpan="2" scope="col">Transaction Type</th>
              <th colSpan="2" scope="col" >Company ID</th>
              <th colSpan="1" scope="col"> More Details</th>
           </motion.tr>         
           </thead>

            <tbody>
           {<RenderPurchaseDetailsData className="purchaseTableElems"/>}   

           </tbody>



           </table>
          )
  }

  const RenderPurchaseDetailsData = () =>{   
    return currentPurchaseDetails.map(item =>{
        return(   
          <div className="PurchaseDetailsDataDiv">
          <motion.tr
          initial={{y: -10}}
          animate={{y:0}}
          key={item.purchaseDetailsId }>


          <td className="purchaseDetailsTD" colSpan="2" >{item.purchaseDetailsId || "N/A"}</td> 
          <td className="purchaseDetailsTD" colSpan="2">{item.transactionId  || "N/A" }</td>
          <td className="purchaseDetailsTD" colSpan="2">{item.transactionType || "N/A"}</td>
          <td className="purchaseDetailsTD" colSpan="2">{item.companyId || "N/A"}</td>
          <td className="purchaseDetailsTD" colspan="1">
          <button  
           className = "btn purchaseDetailsTD "   
           onClick = {() => {DisplayExtraDetails(item.purchaseDetailsId);}}> 
          {innerInnerTableVisibility && item.purchaseDetailsId === currentPurchaseDetailsId ? <IoIosArrowDropup/>  : <IoIosArrowDropdown  /> }
          </button>
          </td> 
          </motion.tr>  

          
          <tr>
            <td colspan="100%">

          {innerInnerTableVisibility && item.purchaseDetailsId === currentPurchaseDetailsId ? <RenderExtraDetails/>  : "" }

            </td>

          </tr>
          </div>

        )
      
    }
    )
}


const RenderExtraDetails = () =>{
    
  return(   
    <motion.td colspan="9" initial={{y: -10}} animate={{y:0}} className="innerInnerTablesDiv">

      <motion.h7  initial={{y: -10}} animate={{y:0}} className="purchaseHeading w-100">Serial Number Details</motion.h7>
      <table border="2" border-color="black" className="innerInnerTables">
      
        <thead className="bg-info">
          <th>Serial No</th>
          <th>Transaction ID</th>
          <th>Transaction Type</th>
          <th>Company ID</th>
        </thead>

        <RenderSerialNoDetailsData/>

      </table>

 
      <motion.h7  initial={{y: -10}} animate={{y:0}} className="purchaseHeading w-100">Ware-House Details</motion.h7>
      <table border="2" border-color="black" className="innerInnerTables">
      
        <thead className="bg-info">
          <th>WareHouse Name</th>
          <th>Qty</th>
          <th>WareHouse ID</th>
          <th>Location</th>
        </thead>

        <RenderWareHouseDetailsData/>

      </table>

     
    </motion.td>     
  )    
}

const RenderSerialNoDetailsData = () =>{   
  return serialNoDetails.map(item =>{
      return(   
        <tbody >
        <motion.tr initial={{y: -10}} animate={{y:0}}key={item.purchaseDetailsId }>
        <td>{item.serialNo || "N/A"}</td> 
        <td>{item.transactionId  || "N/A" }</td>
        <td>{item.transactionType|| "N/A"}</td>
        <td>{item.companyId|| "N/A"}</td>
        </motion.tr>  
        </tbody>
      )
  }
  )
}


const RenderWareHouseDetailsData = () =>{   
  return warehouseDetails.map(item =>{
      return(   
        <tbody >
        <motion.tr initial={{y: -10}} animate={{y:0}}key={item.purchaseDetailsId }>
        <td>{item.warehouseName || "N/A"}</td> 
        <td>{item.qty  || "N/A" }</td>
        <td>{item.warehouseId || "N/A"}</td>
        <td>{item.location || "N/A"}</td>
        </motion.tr>  
        </tbody>
      )
  }
  )
}




  return (
    <div className="MainTable">

      
       <table className="table" >

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