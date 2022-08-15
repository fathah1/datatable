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

    RenderPurchaseDetails();

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

              <tbody className="table-striped">
              <tr key={item.id}>
                <td>{item.id}</td> 
                <td>{item.purchaseNoAuto}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.companyId}</td>
                <td> <button onClick={() => {DisplayPurchaseDetails(item.id);}} > <IoIosArrowDropdown  />  </button></td>
              </tr>         

           
               {innerTableVisiblity && item.id == currentItemId ? <RenderPurchaseDetails/> : "" }   
           
          
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

    const RenderPurchaseDetails = () =>{
      console.log("purchaseDetails", currentPurchaseDetails)
     
      return currentPurchaseDetails.map(item =>{
          return(   
            <tr key={item.id}>
              <td>{item.purchaseDetailsId}</td> 
              <td>{item.purchaseId }</td>
              <td>{item.sno}</td>
              <td>{item.itemId}</td>
            </tr>
          )
        
      }
      )
  }






  return (
    <div className="MainTable">
       <table className="table table-striped">

  <thead>

    <tr>
      <th scope="col">Id</th>
      <th scope="col">Purchase Number</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Company Id</th>
      <th scope="col">Purchase Details</th>
    </tr>

  </thead>

  {renderTableRows()}

    
           
 
</table>
    </div>
  );

}

export default MainTable;