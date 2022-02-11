import axios from "axios";

const dividePastsByContent = async (pastes) =>{
    console.log(pastes.length);
      const pastsContentType = [
          { name: "Positive", value: 0 ,fill:"green"},
          { name: "Natural", value: 0 ,fill:"lightblue"},
          { name: "Nagitive", value: 0 ,fill:"red"},
          { name: "Unknown", value: 0 ,fill:"grey"},
        ]
      
      for(const paste of pastes){
        try {
          const santiment = await findSantiment(paste.content)
            switch (santiment) {
                case "positive":
                    // console.log(santiment, "positive");
                    pastsContentType[0].value += 1;
                    break;
                case "neutral":
                    // console.log(santiment, "neutral");
                    pastsContentType[1].value += 1;
                    break;
                case "negative":
                    // console.log(santiment, "negative");
                    pastsContentType[2].value += 1
                    break;
                default:
                    pastsContentType[3].value += 1
                    break;
            }
        } catch (error) {
          console.log("axios");
          continue;
        }
      }
      console.log(pastsContentType);
      return pastsContentType
  }
  
  const findSantiment = async (text) =>{
      try {
          const response = await axios.post("https://sentim-api.herokuapp.com/api/v1/", { 
              headers: {"Accept": "application/json", "Content-Type": "application/json"},
              text
          }); 
              return(response.data.result.type); 
      } catch (error) {
          console.log(error.message);
      }
  }