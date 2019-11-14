# **IT2810 - Prosjekt 4 - Gruppe 02**

Andreas Rimolsrønning, Emanuele Caprioli, Harkamaljit Singh

## Spisested Advisor

### Hvordan installere og kjøre applikasjonen
Husk du må være koblet til NTNU nett: enten være på campus eller bruke vpn. 
*   Først må prosjektet klones. Tast følgende i terminalen for å klone prosjektet: `git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-2/project-4.git`
*   Gå deretter inn i den klonede mappen ved å skrive følgende i terminalen: `cd project-4`
*   Installer [Expo](https://expo.io/learn): `npm install expo-cli --global`
*   Installer nødvendige filer: I den klonede mappen tast følgende: `npm install`
*   For å starte applikasjonen, bruk kommandoen: `expo start`

## React komponentstruktur

### Hierarki diagram
![Hierarkki](/uploads/481fcc15360fc945eeeec1dc4c747ebe/Hierarkki.PNG)

### Funksjonalitet og innhold

Videreføring av prosjekt 3 til mobilapp med react nativ. Prosjektet baserer seg på mattilsynets [smilefjesdatabase](https://data.norge.no/data/mattilsynet/smilefjestilsyn-p%C3%A5-serveringssteder), som inneholder alle restaurantinspeksjoner gjort av mattilsynet siden smilefjesordningens oppstart i 2016. Applikasjonen vår, som er en prototype i henhold til oppgavebeskrivelsen, gjør det mulig å søke gjennom denne databasen og få vist resultatet av søket i liste- og kartform. I tillegg er det mulig for brukerne av applikasjonen å gi deres egne vurderinger av restaurantene, fra 1-5 stjerner.

Søkefunksjonen fungerer slik at man kan skrive fritekst for å søke på navnene til restaurantene. I tillegg har man ulike filtrering- og sorteringsmuligheter. Man kan velge å filtrere på by, her kan flere byer velges og man kan filtrere på fjes, feks kun sur fjes og nøytral fjes. Det er også mulig å sorter søkeresultatet etter alfabetiskrekkefølge og etter smilefjesgrad. Resultatsettet lastes inn dynamisk ved scrolling, og det er brukt AsyncStorage for å kunne lagre *mine* vurderinger lokalt. Totalt vurderinger er lagret i databasen. 


### Datasett
Datasettet er hentet fra [mattilsynet](https://data.norge.no/data/mattilsynet/smilefjestilsyn-p%C3%A5-serveringssteder). Denne har vi tilpasset til vår prototype ved å bruke et pythonscript. Ettersom adressene til restaurantene i datasettet ikke helt stemmer med de fysiske adressene (feks vegen istedenfor veien), ble det utfordrende å finne koordinater til alle restauranter. Derfor er det ikke alle restauranter som har koordinater i datasettet. 
![datasett](/uploads/aefe229a0435c1b1c212c63661759990/datasett.png)
 

## Teknologi
Teknologien baserer seg mye på arbeidet fra prosjekt 3, men den forskjellen er bruk av react-native istedenfor react. I tillegg har vi valgt å gå vekk fra redux, ettersom vi følte at det gjorde koden vår vanskelig å forstå og lese samtidig som redux ikke er helt nyttig i et så lite prosjekt der eneste states vi har er fetching av data.


### Express - REST API
Backend av prosjektet er implementert ved hjelp av Express. Express er et Node.js web rammeverk. For at klienten og serveren skal kunne kommuniserer med hverandre har vi valgt å bruke REST APIs, og når de brukes sammen får vi en RESTful server. I Express settes det opp routes for å kunne bruke slike RESTful APIs. REST i seg selv er en protokoll som tar i bruk HTTP metoder for å kunne utføre CRUD operasjoner. CRUD operasjoner er create, read, update og delete operasjoner.

##### Endepunkter
| HTTP-METODE | ENDEPUNKT     | BESKRIVELSE |
| ----------- | ------------- | ----------- |
| GET         | /companies    | Søk etter bedrifter (restauranter)        |
| GET         | /companies/?id=:id    | Hent en spesifikk bedrift (restaurant)        |
| GET         | /companies/locations    | Henter navn og koordinater til alle bedrifter (restauranter)         |
| GET         | /companies/cities    | Henter navn til alle steder        |
| PUT         | /companies/giverating    | Gi rating til en spesifikk bedrift (restaurant). Id og stjerner gitt gis i body til request        | 

Vi har valgt disse endepunktene fordi vi mener disse er naturlig og enkel å bruke. 

### MongoDB
Gruppen tar i bruk MongoDB som er installert på den virtuelle maskinen. For å kunne hente nødvendig data må det gjøres spørringer til databasen. Disse inkluderer også pagination spørringer.

### AsyncStorage
Gruppen har brukt AsyncStorage fra react-native og ikke react-native-community. Gruppen er klar over at AysyncStorage fra react-native library er deprecated, men det viser seg at det er kun denne som fungere med expo cli. AsyncStorage brukes til å sette vurderinger gitt til hver enkel restaurant. Det sjekkes om det har blitt gitt vurdering til en spesifikk restaurant fra før av eller ikke, dersom det er gitt så gis det ikke vurdering på nytt. På denne måten unngår vi duplikater vurderinger. I denne prototypen har vi ikke implementert sletting av vurderinger, det vil si at etter det er gitt vurdering er det ikke mulig å oppdatere vurderingen. 

## Tredjepartskomponenter og APIer

#### React-native-maps
Det har vært mye fram og tilbake med map-komponenten. Først implementerte vi en kart som bruker tredjepartskompnenten react-native-webview-leaflet. Men ettersom dette ikke fungerte på android i development build av expo, gikk vi over til å bruke react-native-maps. Denne bruker mobilens innebyggde kart, som er Google Maps for android og Kart for iPhone. Men utfordringen her er at Google Maps krever en api-key for å fungere, men slik det er nå fungerer den uten nøkkelen. Vi har gjort reaserch etter hvorfor det fungerer uten api-key, men vi har ikke klart å funne noen begrunnelse. Derfor har vi valgt å fortsette å bruke react-native-maps.

#### Mongoose 
Mongoose er en library for MongoDB og Nodejs som gjør det enklere å kunne jobbe med MongoDB. Vi har brukt mongoose for å definere Schemas, noe som hjelper med å definere spesifikke strukturer med forhandsdefinerte data types for dokumenter som hentes og gis til MongoDB. I dette prosjektet brukes det også Validation gjennom mongoose for å kunne validere data typer. Mongoose gjør det også generelt mye enklere å kunne holde Schemas konsistent når det gjøres operasjoner på databasen (MongoDB). 

#### React Star Component
React start komponent er rendered under hver List row komponent for å kunne gi vurdering for en gitt restaurant.

#### Nominatim
For å mappe restaurantadresser (geocoding), har vi brukt apiet fra [nominatim](https://nominatim.org).

## Testing
Dette prosjektet hadde ingen krav for testing, men vi har kontinuerlig testet manuelt under utviklingen, og sørget for at alt fungerte slik det skal, før vi pushet til dev.

## Git-konvensjoner

### Branches
*   master: oppdateres ved deployment
*   dev: utviklings-branch. Denne oppdateres jevnlig, hver gang en feature er ferdig
*   feat/feature-name: en branch som brukes for å lage forbedret funksjonalitet av en feature

## Inspirasjon og kilder
Backend koden er inspirert og delvis hentet fra: Carnes, Beau: Learn the MERN stack by building an exercise tracker — MERN Tutorial. Fra: https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1. [15.10.2019]

Fetching av data med react er inspirert av guiden fra: Claus, Markus: Fetching data from an api using React/Redux. Fra: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao [20.10.2019]



