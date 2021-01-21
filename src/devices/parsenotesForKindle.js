

    import {
      trim,
      trimLinesInArray
    } from "../stringhelpers.js"

function splitIntoNotes(completeString){
  const notesStringArray = notesstring.split(/^={4,}\n/mu); //split big text into parts, each containing a note
  return notesStringArray
}

function extractDate(note){}

function extractType(note){
  
}



function notesparseKindle(notesstring){
      //Kindle notes have either highlight OR note saved they don't do both. 
      notesStringArrayUntrimmed = splitIntoNotes(notesstring);      
      

      // var notesStringArray = trimEmptyNoteLines(notesStringArray);//get rid of empty lines
      
      var notesStringArray = trimLinesInArray(notesStringArray); //get rid of empty lines
      
      var structuredNotes = [];// to store structured notes
      

        //iterate through the notes
        for(var i=0; i<notesStringArray.length;i++) //for-loop since we cant break from Array.prototype.each
        {
          if(notesStringArray[i].length < 1){break;}
          
          let currentNoteString = notesStringArray[i]
          let noteLineSplitArray = currentNoteString.split("\n");// create array of single lines
          let currentNote={};
  
          currentNote.title = noteLineSplitArray[0];
          let dateMatches = /(\d{1,2}). (\w+) (\d\d\d\d) (\d\d:\d\d:\d\d)/.exec(noteLineSplitArray[1]) //first line
          
          //possibly replace month-names with numbers?

                  /*
          Split line 1 along the |
          If length of resulting array = 3: There is PAGE (0th element) and POSTION (1st element). Text of first is … auf Seite, Text of second is bei Position… 
          If lenth of resulting array = 2 There is only POSITION (0th element) and Text is "Bei Position"
         */

          currentNote.date = dateMatches[3] + "-" + dateMatches[2] + "-" + dateMatches[1] + " " +dateMatches[4]+":"+dateMatches[5];
          
          //TODO: does not work yet:  
          currentNote.type = noteLineSplitArray[1].match(/– \w+/u)[0];
          
          
          let page = noteLineSplitArray[1].match(/\d+-?\d*/u);
          if (page.length !== undefined){
            currentNote.page = parseInt(page[0])
          }
          currentNote.content = getNoteContentKindle(currentNoteString);
          
  
          structuredNotes.push(currentNote);
          
        }

        return structuredNotes;
    };


    //WORK IN PROGRESS; COPIED FROM TOLINO VERSION
    function getNoteContentKindle(note) {
      var noteLineSplitArray = note.split("\n");
      var contentlines = noteLineSplitArray.slice(2); //remove first two lines

      if (contentlines.length>0) { //if first line in array contains an ":", execute if
        var content = contentlines.join(" – ");
      } else {
        content = "NOT FOUND"
      }

      return content
    }
	
export default notesparseKindle