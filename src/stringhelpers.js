export function trim(stringToTrim){
    if(typeof stringToTrim !== "string"){
        console.log("not a string. can't be trimmed")
        return undefined;
    }

    return stringToTrim.trim();    
}

export function trimLinesInArray(arrayOfStrings){
    var noBreaksNotesArray =  arrayOfStrings.map(function(value){
        return value.trim(value);//TODO: a whole library for this… Bad. Fix with something else.
      })
  
      return noBreaksNotesArray;
}