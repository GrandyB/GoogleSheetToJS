//  This file is part of GoogleSheetToJS.
//
//  GoogleSheetToJS is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  GoogleSheetToJS is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with GoogleSheetToJS. If not, see <https://www.gnu.org/licenses/>.

class GoogleSheetToJS {

    /* 
     * Constructor; creates initial state and begins the update loop.
     * @param sheetId
     *          the ID of the Google sheet.
     * @param tabNum
     *          the # of the tab (left to right, beginning at index 1)
     * @param freq
     *          the looping interval (in milliseconds)
     */
    constructor(sheetId, tabNum, freq) {
        this.url = "https://spreadsheets.google.com/feeds/cells/" + sheetId + "/" + tabNum + "/public/values?alt=json";
        this.freq = freq;
        console.log("Querying '" + this.url + "' every '" + this.freq + "ms'");

        // 'cellValues' is our cache of cell ids to their content, e.g. "C3" => "Test value"
        this.cellValues = new Map();

        // Begin looping!
        this.updateLoop();
    }

    /*
     * updateLoop - our main timer and update function.
     * Fetching the json, drilling down into its cells and setting document elements
     * based on their tag names.
     */
    updateLoop() {
        fetch(this.url)
            .then(this.handleErrors)
            .then(res => res.json())
            .then((data) => {
                var entry = data.feed.entry;

                let that = this;
                entry.forEach(function(e, i){
                    let cellRef = e.title.$t;
                    let cellContent = e.content.$t;

                    let existing = that.cellValues.get(cellRef);
                    if (existing == null || existing !== cellContent) {
                        // Only update document content if cells have changed values
                        console.log(cellRef + " has changed; '" + existing + "' -> '" + cellContent + "'");
                        that.cellValues.set(cellRef, cellContent);

                        // Set the element
                        var outputElement = document.getElementById(cellRef);
                        if (outputElement != null) {
                            if (outputElement.nodeName.toLowerCase() === 'img') {
                                outputElement.src = cellContent;
                            } else {
                                outputElement.innerHTML = cellContent;
                            }
                        }
                    }
                });

                console.log("Ping");

            }).catch(error => console.log(error));

        /*
         * "Google Sheets API has a limit of 500 requests per 100 seconds per project, and 100 requests per 100 seconds per user."
         * I imagine there'd be multiple pages using this, some of which will need quicker update times than others.
         * Every 2-3 seconds is probably a safe bet..?
         */
        setTimeout(this.updateLoop.bind(this), this.freq);
    };

    /*
     * handleErrors - used to help diagnose any 404-esque errors during the fetch in updateLoop.
     */
    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}