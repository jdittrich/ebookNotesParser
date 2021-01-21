    import {
      trim,
      trimLinesInArray
    } from "../stringhelpers.js"

    //line: Line of the note. Array-Syntax: 1st line has 0 index, last line is -1
    var patterns_de = {
      title:{
        line:0,
        pattern:false
      },
      type: {
        line: 1,
        pattern:/^(\w+)/u
      },
      page:{
        line: 1,
        pattern:/(\d+-?\d*):/u
      },
      date:{
        line:-1,
        pattern: /[\d|:|.| ]+$/u
      }
    }

/**
	* @param {string} notesstring - the string read from the notes file from the ebook reader
  * @returns {}
  * @returns {object[]} results
  * @returns {string} results[].title - title of the ebook
  * @returns {string} results[].date - when the note was made
  * @returns {string} results[].page – page the note was made on
  * @returns {string} results[].content – content of the note. 
	* 
	*/
    function notesparseTolino(notesstring){
    
      var notesStringArray = notesstring.split(/^-{4,}\n/mu); //split big text into parts, each containing a note

      // var notesStringArray = trimEmptyNoteLines(notesStringArray);//get rid of empty lines
      
      var notesStringArray = trimLinesInArray(notesStringArray);//get rid of empty lines

      var structuredNotes = [];// to store structured notes

      //iterate through the notes
      for(var i=0; i<notesStringArray.length;i++) //for-loop since we cant break from Array.prototype.each
      {
        if(notesStringArray[i].length < 1){break;}
        
        let currentNoteString = notesStringArray[i]
        let noteLineSplitArray = currentNoteString.split("\n");// create array of single lines
        let currentNote={};

        currentNote.title = noteLineSplitArray[0];

        let dateMatches = /(\d\d).(\d\d).(\d\d\d\d) \| (\d+)\:(\d+)/.exec(noteLineSplitArray[noteLineSplitArray.length - 1])
    
        currentNote.date = dateMatches[3] + "-" + dateMatches[2] + "-" + dateMatches[1] + " " +dateMatches[4]+":"+dateMatches[5];

        currentNote.type = noteLineSplitArray[1].match(/^\w+/u)[0];
        let page = noteLineSplitArray[1].match(/\d+-?\d*/u);
        if (page.length !== undefined){
          currentNote.page = parseInt(page[0])
        }
        currentNote.content = getNoteContent(currentNoteString);
        

        structuredNotes.push(currentNote);
        
      }

      return structuredNotes;
    }

    
    function getNoteContent(note){
      var noteLineSplitArray = note.split("\n");
      var contentlines = noteLineSplitArray.slice(1,-1);//remove first and last line from array

      if (contentlines[0].search(/:/) !== -1) { //if first line in array contains an ":", execute if
      contentlines[0] = contentlines[0].match(/:(.*)/u)[1]
      var content = contentlines.join("\n");
      } else {content = "NOT FOUND"}
      
      return content 
    }
	

export default notesparseTolino;
