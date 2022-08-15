import { useEffect, useState } from 'react';
import { IoIosArrowDropdown} from "react-icons/io";
import '../../styles/MainTable.css';





function MainTable() {

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
    console.log(sampleData);
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

   
  useEffect(() => {
    console.log('currentItemId', currentItemId);
  }, [currentItemId])

  useEffect(() => {
    console.log('currentPurchaseDetails', currentPurchaseDetails);
  }, [currentPurchaseDetails])

    const renderTableRows = () =>{
        return user.map(item =>{
            return(

              <tbody className="table">
              <tr key={item.id}>
                <td scope="row">{item.id}</td> 
                <td scope="row">{item.purchaseNoAuto}</td>
                <td scope="row">{item.phoneNumber}</td>
                <td scope="row">{item.companyId}</td>
                <td scope="row"> <button onClick={() => {DisplayPurchaseDetails(item.id);}} > <IoIosArrowDropdown  />  </button></td>
              </tr>         

               
               {innerTableVisiblity && item.id == currentItemId ? <td colspan="5" > <h6 className="purchaseHeading">Purchase Details</h6> </td> : "" }   
               {innerTableVisiblity && item.id == currentItemId ? <RenderPurchaseDetailsHeader/> : "" }   
               {innerTableVisiblity && item.id == currentItemId ? <RenderPurchaseDetailsData/> : "" }   
           
          
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
      console.log("purchaseDetails", currentPurchaseDetails)
     
      return currentPurchaseDetails.map(item =>{
          return(   
            <tr>
              <th scope="col">Purchase Details Id</th>
              <th scope="col">Purchase Id</th>
              <th scope="col">Serial no</th>
              <th scope="col" colspan="2">Item Id</th>
           </tr>         
          )
        
      }
      )
  }

  const RenderPurchaseDetailsData = () =>{
    console.log("purchaseDetails", currentPurchaseDetails)
   
    return currentPurchaseDetails.map(item =>{
        return(   
          <tr key={item.id}>
          <td >{item.purchaseDetailsId}</td> 
          <td>{item.purchaseId }</td>
          <td>{item.sno}</td>
          <td colspan="2">{item.itemId}</td>
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
      <th >Id</th>
      <th >Purchase Number</th>
      <th >Phone Number</th>
      <th >Company Id</th>
      <th >Purchase Details</th>
    </tr>

  </thead>

  {renderTableRows()}

    
           
 
</table>
    </div>
  );

}

export default MainTable;