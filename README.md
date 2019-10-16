# Google Sheet to OBS
A simple Javascript program designed to allow broadcasters to input data into local browser sources for use with OBS.

# Usage
1. Create a **Google Sheet**.

1. Go to _File -> Publish to the web_ and publish the whole spreadsheet.

1. Take the regular spreadsheet's url (e.g. _https://docs.google.com/spreadsheets/d/**1DSvf4p1kgdMMqpjLpLnxGsSsb122i2XsgqMdHRAnPBE**/edit#gid=0_) and copy out the middle identifying sectiion (highlighted in bold).

1. Go to the Creds.js javascript file and put in your spreadsheet ID. This file uses spreadsheet cell identifiers as IDs for document manipulation using Javascript.

1. Populate your HTML pages and spreadsheet! Anything using an <img> tag will try to set the source to be whatever is referenced by the ID of the element, while anything else it tries to set the innerHTML.


# FAQ

- **Can I edit this or use this elsewhere?**

   Sure can! Just be aware that it's licensed under the **GNU GPLv3** - give the _LICENSE_ file a read!

- **The A column and number 1 row don't sync?!** 

   Correct. A limitation of using the Google API in this way - it treats the first row and column as header rows. It'll happily retrieve any other cell.

# Licensing
Licensed under the GNU GPLv3 - see LICENSE.

# TODO

1. More examples

1. Triggers - show/hide things based on spreadsheet content?
