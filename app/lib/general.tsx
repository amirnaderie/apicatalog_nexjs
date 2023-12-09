export function search_Allitems_in_Allobjects_Ofarray(myArray:Array<any>, value:string) {
    let items:Array<any> = [];
    let retArray:Array<any> = [];
  
    if (value === "") return myArray;
  
    for (var i = 0; i < myArray.length; i++) {
      items = Object.getOwnPropertyNames(myArray[i]); // Object.keys(myArray[i]).length;
      for (var j = 0; j < items.length; j++) {
        if (typeof myArray[i][items[j]] === "string") {
          if (
            myArray[i][items[j]].toLowerCase().indexOf(value.toLowerCase()) !== -1
          ) {
            retArray.push(myArray[i]);
            break;
          }
        } else if (typeof myArray[i][items[j]] === "number" ) {
          if (myArray[i][items[j]] === Number(value)) {
            retArray.push(myArray[i]);
            break;
          }
        }
      }
    }
    return retArray;
  }