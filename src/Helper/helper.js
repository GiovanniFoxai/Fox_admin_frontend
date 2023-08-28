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
  