# Google Sheet to JS
A simple Javascript program designed to allow broadcasters to input data into local browser sources for use with programs such as OBS.

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

# Acknowledgements/Ramble
I'll be the first to admit I didn't come up with the idea of using Google Sheets to drive a broadcast!

I first saw a spreadsheet-driven system while spending a brief time on Big Betty, the Allied Esports/HyperX Esports truck, in late July 2019 as Esports Scotland had partnered with Lenovo to bring the truck to the Resonate Total Gaming Festival in Glasgow.
I didn't think all too much of the system at the time, but it seemed like an interesting alternative to using text sources and file-based systems.

Way before this while broadcasting once or twice for Rewind Gaming, a european Rocket League tournament organisation, I was introduced to MTS. MTS is a long discontinued tiny wee program that had basic text fields such as 'player one', 'player two', a timer and slots for team scores and a few misc ones. It was a very simple program with an update button that then saved each of the fields to individual text files that could then be read into OBS. I used this for a good couple of years on multiple projects as it was just so simple to use and easy to teach others.

In August of 2019 I became re-interested in broadcasting for Rewind, and got to take a look at their modern approach to their stream assets made by Bucketman (@bucketman21). They had now moved to a (_very_ slick looking) browser-based asset set, using a google sheet as a backend. I had always had assumed it would be tricky to implement this kind of backend link, but all it had was a single small JS file for querying the json from a spreadsheet. Bucket made something small but really quite simple and elegant - better than what I've done, although there are many parallels in common areas such as setting up classes (in order to share between files), getting data (using fetch) and setting element content (with DOM manipulation).

In October of 2019 I attended epicLAN and saw spreadsheets being used as part of their CSGO streaming setup as well, credit there to Frazer (@FrozenFrazer) for the great show using vMix as a base. vMix can use google sheets natively as an external data source, which is nice.

Now it's later in October and some friends of mine begin talking production amongst themselves and I feel like I could improve their lives by creating something open source that they may use at their own risk. So here it is, a slightly bodged but otherwise working google sheet -> javascript base that people can build browser sources from.

So all said and done - biggest acknowledgement certainly goes to Bucketman for what he made - seeing his solution made it feel that doing it myself might not be such a mountain to climb.


# TODO

1. More examples

1. Triggers - show/hide things based on spreadsheet content?
