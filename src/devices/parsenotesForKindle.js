
    import {
      trim,
      trimLinesInArray,
      removeEmptyLinesInArray
    } from "../stringhelpers.js"

function splitIntoNotes(completeString){
  const notesStringArray = completeString.split(/^={4,}/mu); //split big text into parts, each containing a note
  return notesStringArray
}

function extractTitle(note){
  //title is the first line
  const noteLineSplitArray = note.split("\n");
  const title = noteLineSplitArray[0];
  return title; 
}


function extractDate(note){
  //date is at the end of the 2nd line
  const noteLineSplitArray = note.split("\n");
  const dateMatches = /(\d{1,2}). (\w+) (\d\d\d\d) (\d\d:\d\d:\d\d)/.exec(noteLineSplitArray[1]) //first line
  const date = dateMatches[3] + "-" + dateMatches[2] + "-" + dateMatches[1] + " " + dateMatches[4];
  return date; 
}

function extractType(note){
  const noteLineSplitArray = note.split("\n");
  const type = /- \w+\s*(\w+)/.exec(noteLineSplitArray[1])[1]
  return type;
}

function extractPage(note) {
  const noteLineSplitArray = note.split("\n");
  let page = noteLineSplitArray[1].match(/\d+-?\d*/u);
  return page;
}

function extractContent(note) {
  const noteLineSplitArray = note.split("\n");
  const noLinebreaksArray = removeEmptyLinesInArray(noteLineSplitArray);
  let content = ""
  if (noLinebreaksArray.length>2){
    content = noLinebreaksArray.slice(2).join(":")
  }   
  return content;
}

function notesparseKindle(notesstring){
      //Kindle notes have either highlight OR note saved they don't do both. 
      const notesStringArrayUntrimmed = splitIntoNotes(notesstring);      
    
      
      const  notesStringArray = trimLinesInArray(notesStringArrayUntrimmed); //get rid of empty lines
      
      let structuredNotes = [];// to store structured notes
      

        //iterate through the notes
        for(var i=0; i<notesStringArray.length;i++) //for-loop since we cant break from Array.prototype.each
        {
          if(notesStringArray[i].length < 1){break;}
          
          let currentNoteString = notesStringArray[i]

          let currentNote = {}
          currentNote.title = extractTitle(currentNoteString);
          currentNote.date = extractDate(currentNoteString);
          currentNote.type = extractType(currentNoteString);
          currentNote.page = extractPage(currentNoteString);
          currentNote.content = extractContent(currentNoteString);
          
          structuredNotes.push(currentNote);
          
        }

        return structuredNotes;
    };

export default notesparseKindle
export {splitIntoNotes, extractContent, extractDate, extractPage, extractTitle, extractType}