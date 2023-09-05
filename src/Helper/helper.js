import moment from "moment";
export function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
  
    return id;
  }




  // Genrate Random id with time stapm 
  
//   function generateTimestamp() {
//     return Date.now().toString();
//   }
  
//     const generateId = () => {
//       const timestamp = generateTimestamp();
//       const randomId = generateRandomId(5); // You can adjust the length of the random part
//       const id = `${randomId}${timestamp}`;
//       console.log(id)
//     };
    
//     generateId()




export function getFormatedDate(date) {
    if(date){
      let formatedDateTime = moment(date).format('MMM Do YYYY');
      return formatedDateTime;
    }
    else {
      return "NA"
    }   
}

export function getDateWithDay(date) {
  if(date){
    let formatedDateTime = moment(date).format('ddd, DD MMMM YYYY hh:mm A');
    return formatedDateTime;
  }
  else {
    return "NA"
  }
}

export function setFormatDate(date) {
  if(date){
    let formatedDateTime = moment(date).format('DD/MM/YYYY');
    return formatedDateTime;
  }
   else {
    return "NA"
   }
}
export function setReportFormatDate(date) {
  if(date){
    let formatedDateTime = moment(date).format('YYYY-MM-DD');
    return formatedDateTime;
  }
   else {
    return ""
   }
}


export function phoneNumberAutoFormat(data){
  const number = data.trim().replace(/[^0-9]/g, "");

  if (number.length < 3) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 11) return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

  