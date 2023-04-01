const generateCode = () => {
    const length: number = 4;
    const charset = "1234567890";
    let retVal = "";
  
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal.toUpperCase();
  };
  
export { generateCode };
  