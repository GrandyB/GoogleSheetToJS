//  This file is part of GoogleSheetToOBS.
//
//  GoogleSheetToOBS is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  GoogleSheetToOBS is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with GoogleSheetToOBS. If not, see <https://www.gnu.org/licenses/>.

class GoogleSheetToOBS {
    /* Tabs are 1 to X from left to right, freq = interval in ms. */
    constructor(sheetId, tabNum, freq) {
        let spreadsheetId = sheetId;
        this.url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetId + "/" + tabNum + "/public/values?alt=json";
        this.freq = freq;
        this.updateLoop();
    }

    updateLoop() {
        fetch(this.url)
            .then(res => res.json())
            .then((data) => {
                var entry = data.feed.entry;
                var cellValues = new Map();

                entry.forEach(function(e, i){
                    let cellRef = e.title.$t;
                    let cellContent = e.content.$t;

                    cellValues.set(cellRef, cellContent);
                    var outputElement = document.getElementById(cellRef);
                    if (outputElement != null) {
                        if (outputElement.nodeName.toLowerCase() === 'img') {
                            outputElement.src = cellContent;
                        } else {
                            outputElement.innerHTML = cellContent;
                        }
                    }
                });

                console.log(cellValues);
            });

        /*
         * "Google Sheets API has a limit of 500 requests per 100 seconds per project, and 100 requests per 100 seconds per user."
         * I imagine there'd be multiple pages using this, some of which will need quicker update times than others.
         * Every 2-3 seconds is probably a safe bet..?
         */
        setTimeout(this.updateLoop.bind(this), this.freq);
    };
}