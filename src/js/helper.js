import { TIMEOUT_SEC } from "./view/config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


///Fetching and getting Recipe JSON txt.
export const getJSON = async function(apiLink){
try{
    const Fetch_api = fetch(apiLink)
        const res = await Promise.race([Fetch_api,timeout(TIMEOUT_SEC)]);
        
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.message}, ${data.status}`);

        return data;
} 
catch(err){
    throw err;
}
}
export const sendJSON = async function(apiLink,uploadData){
  try{
      const FetchPro = fetch(apiLink,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(uploadData)
        })
          const res = await Promise.race([FetchPro,timeout(TIMEOUT_SEC)]);
          
          const data = await res.json();
  
          if(!res.ok) throw new Error(`${data.message}, ${data.status}`);
          console.log(data);
          return data;
  } 
  catch(err){
      throw err;
  }
  }

  //Efficient Way 
  /*
  
  */ 