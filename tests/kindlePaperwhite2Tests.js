import parseKindle from '../src/devices/parsenotesForKindle.js'
import { extractContent, extractType, extractDate, extractTitle, extractPage } from '../src/devices/parsenotesForKindle.js'

const kindleNoteAll = `MyComplexBook
- Ihre Notiz bei Position 2796 | Hinzugefügt am Mittwoch, 28. Februar 2018 14:57:12

testnotiz "zitat"
nocheins`

const kindleNoteBookmark = `Im Tal des Fuchses: Roman (German Edition) (Link, Charlotte)
- Ihr Lesezeichen auf Seite 117 | Position 1335 | Hinzugefügt am Freitag, 8. August 2014 16:22:17`

describe('kindle', function () {
    describe("extractionFunctions", function (){
        it("extractsTheType", function () {
            chai.expect(extractType(kindleNoteAll)).to.match(/\s*Notiz\s*/)
        });
        it("extractsTheTitle", function () {
            chai.expect(extractTitle(kindleNoteAll)).to.match(/\s*MyComplexBook\s*/)
        });
        it("extractsTheDate", function () {
            chai.expect(extractDate(kindleNoteAll)).to.match(/28/)
        });
        it("extractsThePage", function(){
            chai.expect(extractPage(kindleNoteAll)).to.match(/\s*2796\s*/)
        })
        it("extractsTheContent", function () {
            chai.expect(extractContent(kindleNoteAll)).to.match(/\s*testnotiz\s*/)
        });
    });
});