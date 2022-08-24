import { useEffect, useState } from 'react';
import { IoIosArrowDropdown} from "react-icons/io";
import '../../styles/MainTable.css';





function MainTable(props) {

    const [user, setUser] = useState([]); 
    const [innerTableVisiblity,setInnerTableVisiblity] = useState(false);
    const [currentItemId,SetcurrentItemId] = useState(0);
    const [currentPurchaseDetails, setCurrentPurchaseDetails] = useState([]); 
    const sampleData = require("../Resources/samples.json")

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
  }, []);


  const DisplayPurchaseDetails = ((value)=>{

    SetcurrentItemId(value);
    
    setCurrentPurchaseDetails(findObj(value)[0].purchaseDetails);
    console.log("purchase Details in dpd", currentPurchaseDetails);

    RenderPurchaseDetailsHeader();
    RenderPurchaseDetailsData();

    if(innerTableVisiblity){
      setInnerTableVisiblity(false)
    }else{
      setInnerTableVisiblity(true)
    }

   
   
  })

   

    const renderTableRows = () =>{
        return user.map(item =>{
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
                <td> <button onClick={() => {DisplayPurchaseDetails(item.id);}} > <IoIosArrowDropdown  />  </button></td>
              </tr>         

               
               {innerTableVisiblity && item.id === currentItemId ? <td colSpan="9" > <h6 className="purchaseHeading">Purchase Details</h6> </td> : "" }   
               {innerTableVisiblity && item.id === currentItemId ? <RenderPurchaseDetailsHeader/> : "" }   
               {innerTableVisiblity && item.id === currentItemId ? <RenderPurchaseDetailsData/> : "" }   
           
          
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
     
      return currentPurchaseDetails.map(item =>{
          return(   
            <tr key = {item.purchaseDetailsId}>
              <th colSpan="3" scope="col">Serial No</th>
              <th colSpan="2" scope="col">Transaction ID</th>
              <th colSpan="2" scope="col">Transaction Type</th>
              <th colSpan="2" scope="col" >Company ID</th>
           </tr>         
          )
        
      }
      )
  }

  const RenderPurchaseDetailsData = () =>{
    
   
    return currentPurchaseDetails.map(item =>{
        return(   
          <tr key={item.sno }>
          <td colSpan="3" >{item.purchaseDetailsId || "N/A"}</td> 
          <td colSpan="2">{item.transactionId  || "N/A" }</td>
          <td colSpan="2">{item.transactionType || "N/A"}</td>
          <td colSpan="2">{item.companyId || "N/A"}</td>
          </tr>     
        )
      
    }
    )
}


  return (
    <div className="MainTable">
       <table className="table ">

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