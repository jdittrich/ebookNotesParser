export function trim(stringToTrim){
    if(typeof stringToTrim !== "string"){
        console.log("not a string. can't be trimmed")
        return undefined;
    }

    return stringToTrim.trim();    
}

export function trimLinesInArray(arrayOfStrings){
    var noBreaksNotesArray =  arrayOfStrings.map(function(value){
        return value.trim(value);
      })
  
      return noBreaksNotesArray;
}

export function removeEmptyLinesInArray(arrayOfStrings) {
    let cleanedArray = []
    arrayOfStrings.forEach(function (value) {
        if(typeof value != "string"){return}
        if(value==""){return}
        if(value.match(/^\r|\n$/)){return}
        cleanedArray.push(value);
    })

    return cleanedArray;
}