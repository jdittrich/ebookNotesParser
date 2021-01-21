# ebookNotesParser

Webapp to show the notes from your ebook-reader. 

Tested eReader Models: 

* Tolino Shine 2
* Kindle Paperwhite 2

(Possibly, other readers by the same companies using the same format for notes) 

**Use:** 

* "Upload" a file with notes. If you attach your reader and it appears as mass storage device, the file with the annotations is usually in the device’s root folder and is called `notes.txt` or `kindleMyClippings.txt`. 
* See the notes as a table
* if you want to copy your notes somewhere, e.g. a literature management app, it might be useful to only copy content and page number – which is turned on and off by the checkbox on top.
* If you want to display another file: Scroll at the very bottom of the table with the notes – the upload form is still there and will flush the old table and show the new content. You can also just reload. 

The "Upload" never uploads anything to a sever, it only makes the file accessible to the locally running script that parses and shows the file.

**Expand compatibility with other readers**

* The simplest way to "extend" is just finding out that the file format of the two supported readers is the same for other models by the same companies. Open an issue, tell which model you use. Ideally attach a file including some bookmarks, highlights and annotations.
* If you want to write a new parser, you should do 3 things: 
  * Write a parser turning the file’s string in an array of objects with the properties title,type,date,page,content. The parser should be in the [devices](https://github.com/jdittrich/ebookNotesParser/tree/main/src/devices) folder and export as default the parsing function and as named exports the functions extracting title,type,date,page,content from a single note. See the [kindle parser](https://github.com/jdittrich/ebookNotesParser/blob/main/src/devices/parsenotesForKindle.js) for an example of that.
  * Write a recognition heuristic for the format in the [parsenotes.js](https://github.com/jdittrich/ebookNotesParser/blob/main/src/parsenotes.js). parsenotes.js guesses the right parser and passes it the file content. 
  * Write a mocha/chai test and add it to [tests](https://github.com/jdittrich/ebookNotesParser/tree/main/tests) and the [tests/index.html](https://github.com/jdittrich/ebookNotesParser/blob/main/tests/index.html)

License: [MIT](https://github.com/jdittrich/ebookNotesParser/blob/main/LICENSE.md)
