# **IT2810 - Prosjekt 4 - Gruppe 02**

Andreas Rimolsrønning, Emanuele Caprioli, Harkamaljit Singh

## Spisested Advisor

### Hvordan installere og kjøre applikasjonen
*   Først må prosjektet klones. Tast følgende i terminalen for å klone prosjektet: `git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-2/project-3.git`
*   Gå deretter inn i den klonede mappen ved å skrive følgende i terminalen: `cd project-3`
*   Installer nødvendige filer:
    * I den klonede mappen tast følgende: `npm install`
    * Gå deretter inn i client mappen og tast: `npm install`
    * Gå deretter inn i backend mappen og tast: `npm install`
    * Tilslutt tast følgende kommando i terminalen, uavhengig av hvilken mappe du befinner deg i: `npm install -g nodemon concurrently` 
*   Gå tilslutt i den første klonede mappen, project-3 og tast: `npm start`

Husk du må være koblet til NTNU nett: enten være på campus eller bruke vpn. 

### Funksjonalitet og innhold

Videreføring av prosjekt 3 til mobilapp med react nativ. Prosjektet baserer seg på mattilsynets [smilefjesdatabase](https://data.norge.no/data/mattilsynet/smilefjestilsyn-p%C3%A5-serveringssteder), som inneholder alle restaurantinspeksjoner gjort av mattilsynet siden smilefjesordningens oppstart i 2016. Applikasjonen vår, som er en prototype i henhold til oppgavebeskrivelsen, gjør det mulig å søke gjennom denne databasen og få vist resultatet av søket i liste- og kartform. I tillegg er det mulig for brukerne av applikasjonen å gi deres egne vurderinger av restaurantene, fra 1-5 stjerner.

Link til published expo project: --- insert link here ---
Søkefunksjonen fungerer slik at man kan skrive fritekst for å søke på navnene til restaurantene. I tillegg har man ulike filtrering- og sorteringsmuligheter. Man kan velge å filtrere på by, her kan flere byer velges og man kan filtrere på fjes, feks kun sur fjes og nøytral fjes. Det  er også mulig å sorter søkeresultatet etter alfabetiskrekkefølge og etter smilefjesgrad. 


## Datasett
Datasettet er hentet fra [mattilsynet](https://data.norge.no/data/mattilsynet/smilefjestilsyn-p%C3%A5-serveringssteder). Denne har vi tilpasset til vår prototype ved å bruke et pythonscript. Ettersom adressene til restaurantene i datasettet ikke helt stemmer med de fysiske adressene (feks vegen istedenfor veien), ble det utfordrende å finne koordinater til alle restauranter. Derfor er det ikke alle restauranter som har koordinater i datasettet. 
![datasett](/uploads/aefe229a0435c1b1c212c63661759990/datasett.png)

## Testing
Prosjektet er systematisk testet med unittesting og end-to-end testing. Unittestene tester om redux sine actions blir opprettet på en riktig måte av action creators. [Enzyme](https://airbnb.io/enzyme/) blir brukt til å sjekke om komponentene blir riktig rendret. For end-to-end testing, brukes [Cypress](https://www.cypress.io/). Her har vi flere tester, som blant annet tester søkefunksjonaliteten, at mer data blir fetchet ved scroll (pagination) og at ratingsystemet fungerer slik det skal. 

I tillegg har vi kontinuerlig testet manuelt under utviklingen, og sørget for at alt fungerte slik det skal, før vi pushet til dev.

## Inspirasjon og kilder
Backend koden er inspirert og delvis hentet fra: Carnes, Beau: Learn the MERN stack by building an exercise tracker — MERN Tutorial. Fra: https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1. [15.10.2019]

Fetching av data med react og redux er inspirert av guiden fra: Claus, Markus: Fetching data from an api using React/Redux. Fra: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao [20.10.2019]
 

### Teknologi
Teknologien baserer seg mye på arbeidet fra prosjekt 3, men den forskjellen er bruk av react-native istedenfor react. I tillegg har vi valgt å gå vekk fra redux, ettersom vi følte gjorde koden vår vanskelig å forstå og lese samtidig som redux ikke er helt nyttig i et så lite prosjekt der eneste states vi har er fetching av data.



#### React-Native



#### Express - REST API
Backend av prosjektet er implementert ved hjelp av Express. Express er et Node.js web rammeverk. For at klienten og serveren skal kunne kommuniserer med hverandre har vi valgt å bruke REST APIs, og når de brukes sammen får vi en RESTful server. I Express settes det opp routes for å kunne bruke slike RESTful APIs. REST i seg selv er en protokoll som tar i bruk HTTP metoder for å kunne utføre CRUD operasjoner. CRUD operasjoner er create, read, update og delete operasjoner.

#### MongoDB
Gruppen tar i bruk MongoDB som er installert på den virtuelle maskinen. For å kunne hente nødvendig data må det gjøres spørringer til databasen. Disse inkluderer også pagination spørringer.

## Tredjepartskomponenter

## Leaflet
For kartet brukes biblioteket [leaflet](https://leafletjs.com/), mens kart data blir hentet fra [Open street Map](https://www.openstreetmap.org/). Tredjepartkomponenten [react-leaflet](https://react-leaflet.js.org/) brukes til å  gjøre leaflet til en react komponent. For gruppering av markers, brukes [react-leaflet-markercluser](https://www.npmjs.com/package/react-leaflet-markercluster)
For å mappe restaurantadresser (geocoding), har vi brukt apiet fra [nominatim](https://nominatim.org).

## react-native-maps

## Mongoose 
Mongoose er en library for MongoDB og Nodejs som gjør det enklere å kunne jobbe med MongoDB. Vi har brukt mongoose for å definere Schemas, noe som hjelper med å definere spesifikke strukturer med forhandsdefinerte data types for dokumenter som hentes og gis til MongoDB. I dette prosjektet brukes det også Validation gjennom mongoose for å kunne validere data typer. Mongoose gjør det også generelt mye enklere å kunne holde Schemas konsistent når det gjøres operasjoner på databasen (MongoDB). 

#### React Star Component
React start komponent er rendered under hver List row komponent for å kunne gi vurdering for en gitt restaurant.

## React komponentstruktur

### Hierarki diagram
![Diagram](/uploads/f395e1197c0c68d0785cf00e45631c80/Diagram.PNG)

## Forhåndskrav
For å kjøre prosjektet lokalt, trengs Node.js og NPM. NPM følger med når en laster ned [Node.js](https://nodejs.org/en/download/)


## Git-konvensjoner

### Branches
*   master: oppdateres ved deployment
*   dev: utviklings-branch. Denne oppdateres jevnlig, hver gang en feature er ferdig
*   feat/feature-name: en branch som brukes for å lage forbedret funksjonalitet av en feature



