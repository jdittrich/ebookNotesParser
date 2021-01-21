import parserTolino from "./devices/parsenotesForTolino.js"

import parserKindle from "./devices/parsenotesForKindle.js"

import {trim} from "./stringhelpers.js"

export default parseNotes



//TODO: Wrap in promise?

function parseNotes(rawstringNotes){
    var resultObject = {
        error: null,
        result: null
    }

    const matchNotesType = { //this might be better in the parsenotes files, so anything concerning a reader is in the same file
        'kindleRegex':/====+$/g, //last line ends with ===
        'tolinoRegex':/---------+\s*$/g //last line ends with  ------ , optional whitespace at end
    }

    let parserfunction = null; 
    let notes = null; 

    const stringNotesNoEmptyLines = trim(rawstringNotes);

    // Put the correct parserfunction in the variable depending on the *guessed* type of the notes.
    if(matchNotesType.tolinoRegex.test(stringNotesNoEmptyLines)){
        parserfunction = parserTolino;
    } else if (matchNotesType.kindleRegex.test(stringNotesNoEmptyLines)){
        parserfunction = parserKindle;      
    } else {
        //mock function returning noting, but in the right type in case there is no match of notes type. 
        resultObject.error = "no filetype recognized"
    }

    //execute parserfunction
    if(!resultObject.error){
        notes = parserfunction(rawstringNotes);
    }

    if (Array.isArray(notes)) {
        resultObject.result = notes;
    } else {
        resultObject.error = "parsing failed"
    }
    return resultObject;
};



