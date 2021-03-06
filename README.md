# **IT2810 - Prosjekt 4 - Gruppe 02**


## Spisested Advisor

### Hvordan installere og kjøre applikasjonen
For å kjøre applikasjonen, må man være koblet til NTNU nettet: enten være på campus eller bruke vpn. 
*   Først må prosjektet klones. Tast følgende i terminalen for å klone prosjektet: `git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-2/project-4.git`
*   Gå deretter inn i den klonede mappen ved å skrive følgende i terminalen: `cd project-4`
*   Installer [Expo](https://expo.io/learn) (hvis du ikke har det fra før): `npm install expo-cli --global`
*   Installer nødvendige filer ved å taste følgende: `npm install`
*   For å starte applikasjonen, bruk kommandoen: `expo start`

## React komponentstruktur

### Hierarki diagram
![Hierarki](/uploads/481fcc15360fc945eeeec1dc4c747ebe/Hierarkki.PNG)

## Funksjonalitet og innhold

Dette prosjektet er en videreføring av prosjekt 3. For dette prosjektet har vi laget en mobilapp med [React Native](https://facebook.github.io/react-native/). Prosjektet baserer seg på mattilsynets [smilefjesdatabase](https://data.norge.no/data/mattilsynet/smilefjestilsyn-p%C3%A5-serveringssteder), som inneholder alle restaurantinspeksjoner gjort av mattilsynet siden smilefjesordningens oppstart i 2016. Applikasjonen vår, som er en prototype i henhold til oppgavebeskrivelsen, gjør det mulig å søke gjennom denne databasen og få vist resultatet av søket i liste- og kartform. I tillegg er det mulig for brukerne av applikasjonen å gi deres egne vurderinger av restaurantene, fra 1-5 stjerner.

Søkefunksjonen fungerer slik at man kan skrive fritekst for å søke på navnene til restaurantene. I tillegg har man ulike filtrering- og sorteringsmuligheter. Man kan velge å filtrere på by, her kan flere byer velges og man kan filtrere på fjes, feks kun sur fjes og nøytral fjes. Det er også mulig å sorter søkeresultatet etter alfabetisk rekkefølge og etter smilefjesgrad. Resultatsettet lastes inn dynamisk ved scrolling, og det er brukt AsyncStorage for å kunne lagre *mine* vurderinger lokalt. I tillegg blir alle vurderinger lagret i databasen, for å regne ut gjennomsnittlig vurdering.


### Datasett
Datasettet er hentet fra [mattilsynet](https://data.norge.no/data/mattilsynet/smilefjestilsyn-p%C3%A5-serveringssteder). Denne har vi tilpasset til vår prototype ved å bruke et pythonscript. For å mappe addresser til koordinater (geocoding), brukte vi apiet fra [nominatim](https://nominatim.org). Ettersom adressene til restaurantene i datasettet ikke helt stemmer med de fysiske adressene (feks vegen istedenfor veien), ble det utfordrende å finne koordinater til alle restauranter. Derfor er det ikke alle restauranter som har koordinater i datasettet og har da ikke en plassering på kartet. 
 

## Teknologi
Teknologien baserer seg mye på arbeidet fra prosjekt 3, men den største forskjellen er bruk av React Native istedenfor React. I tillegg har vi valgt å gå vekk fra redux, ettersom vi følte at det gjorde koden vår vanskelig å forstå og lese, samtidig som vi mente at redux ikke er helt nyttig i et prosjekt av denne størrelsen med så få states.

### React Native og Expo
React Native er et rammeverk utviklet av facebook, som vi har brukt til å utvikle mobilappen for Android og iOS. I tillegg har vi brukt [expo](https://expo.io) som utviklingsmiljø fordi det er plattformuavhengig, og det lar oss raskt komme i gang med programmeringen. 

### Express - REST API
Backend til prosjektet er implementert ved hjelp av Express, som er et Node.js web-rammeverk. For at klienten og serveren skal kunne kommunisere med hverandre, har vi valgt å bruke REST APIs, og når de brukes sammen får vi en RESTful server. I Express settes det opp routes for å kunne bruke slike RESTful APIs. REST i seg selv er en protokoll som tar i bruk HTTP metoder for å kunne utføre CRUD operasjoner. CRUD operasjoner er create, read, update og delete operasjoner.

##### Endepunkter
| HTTP-METODE | ENDEPUNKT     | BESKRIVELSE |
| ----------- | ------------- | ----------- |
| GET         | /companies    | Søk etter bedrifter (restauranter). Endepunktet bruker ulike parameter for å bygge en query, og de er listet under        |
| GET         | /companies/?id=:id    | Hent en spesifikk bedrift (restaurant)        |
| GET         | /companies/locations    | Henter navn og koordinater til alle bedrifter (restauranter)         |
| GET         | /companies/cities    | Henter navn til alle steder        |
| PUT         | /companies/giverating    | Gi rating til en spesifikk bedrift (restaurant). Id og stjerner gitt gis i body til request        | 

###### Endepunkt: /companies
| Query parameter | Format     | Beskrivelse |
| ----------- | ------------- | ----------- |
| name        | Fritekst    | Restaurant navn        | 
| orderby     | NAME_AZ, NAME_ZA, <br> SMILEY_ASC, SMILEY_DESC    | Sortere etter kun en av mulige sorteringsmuligheter        | 
| cities      | Bindestrek separert list med stedsnavn    | Stedsnavn         | 
| smileys     | Bindestrek separert list med tall fra 0 til 4.<br> 0 og 1 er for smil, 2 er for nøytral og 3 er for sur fjes.    | Filtrere etter smileys som i databasen er representert med tall.        | 
| page        | Tall (int)    | Sidenummer        | 

Vi har valgt disse endepunktene fordi vi mener disse er naturlig og enkel å bruke. Første endepunkt brukes for selve resultatet, mens /locations og /cities brukes henholdsvis for citySelector- og map-komponent. En spesifikk restaurant med id som parameter endepunkt, /companies/?id=:id,  brukes for å hente mer informasjon om den (de) resturant(er) som er lagret med asyncstorage; det lagres ikke all data og derfor må vi hente mer data. Siste endepunkt brukes for å oppdatere vurderinger. Gruppen har valgt å bruke restAPI istedenfor graphql fordi gruppen hadde noe erfaring med det fra før, og ville fortsette å bruke det.

### MongoDB
Applikasjonen bruker MongoDB fordi vi mente at MongoDB er svært nyttig å lære seg ettersom det blir mye brukt i dag, og at det er enkelt og raskt å komme i gang med. For å kunne hente nødvendig data, gjøres det spørringer til databasen. Disse inkluderer også pagination spørringer. Siden vi ikke hadde noe behov for relasjoner så passet mongoDb databasen bra.  

### AsyncStorage
Gruppen har brukt AsyncStorage fra react-native og ikke react-native-community. Gruppen er klar over at AysyncStorage fra react-native library er deprecated, men det viser seg at det er kun denne som fungerer med expo cli. AsyncStorage brukes til å sette vurderinger gitt til hver enkel restaurant. Det sjekkes om det har blitt gitt vurdering til en spesifikk restaurant fra før av eller ikke, dersom det er gitt så gis det ikke vurdering på nytt. På denne måten unngår vi duplikate vurderinger. I denne prototypen har vi ikke implementert sletting av vurderinger, det vil si at etter det er gitt vurdering er det ikke mulig å oppdatere vurderingen. 

## InHouse utviklet komponenter

#### List
Her følte vi behovet for å utvikle egen komponent som skulle visualisere liste av resultaten. Grunnen til det var at vi ønsket med flexibilitet og det skulle tilnærme initiell skysse av appen.
Mange komponenter hadde flere constrains, så vi endet opp i å lage det selv. Det er basert på React Native Flatlist og det det gjør er å rendre en liste av rad komponenter og gi dem noe ekstra funksjonalitet som onPress.
I tillegg lager det separatorer for hver rad og håndtere logikken for loading feedback.

### ListRow og ReducedListRow
Disse er radkomponenter, det ene visualisere mer informasjon enn den andre. Reduced versjonen blir brukt under mine vurderinger for å vise de vurderinger brukeren har gitt som er lagra lokalt, så vi ville ikke visualisere verken siste inspeksjon eller global vurdering siden denne kunne ha blitt opdatert siden vurderingen ble gitt.

### Smiley
En enkel komponent som render en smilefjes og dato og tar inn dato og verdi som props. Vi synes det skulle være enklere og mer effektiv å hådtere det som komponent siden det blir rendret veldig mange ganger.

## Tredjepartskomponenter og APIer

#### React-native-maps
Det har vært mye fram og tilbake med map-komponenten. Først implementerte vi en kart som brukte tredjepartskomponenten [react-native-webview-leaflet](https://github.com/reggie3/react-native-webview-leaflet) som lar oss bruke [Open Street Map](https://www.openstreetmap.org/) som er open source. Men ettersom dette ikke fungerte på android i development build av expo, gikk vi over til å bruke [react-native-maps](https://github.com/react-native-community/react-native-maps). Denne bruker mobilens innebyggde kart, som er Google Maps for android og Kart for iPhone. Men utfordringen her er at Google Maps krever en api-key for å fungere, men slik det er nå fungerer kartet selv uten nøkkelen. Vi har prøvd å se etter forklaringer på hvorfor det fungerer, men vi har ikke klart å finne noen gode begrunnelser. Ettersom react-native-webview-leaflet ikke fungerte, falt valget på å bruke react-native-maps.

#### Mongoose 
Mongoose er en library for MongoDB og Nodejs som gjør det enklere å kunne jobbe med MongoDB. Vi har brukt mongoose for å definere Schemas, noe som hjelper med å definere spesifikke strukturer med forhandsdefinerte data types for dokumenter som hentes og gis til MongoDB. I dette prosjektet brukes det også Validation gjennom mongoose for å kunne validere datatyper. Mongoose gjør det også generelt mye enklere å kunne holde Schemas konsistent når det gjøres operasjoner på databasen (MongoDB). 

#### React Star Component
[React Star component](https://github.com/voronianski/react-star-rating-component#readme) brukes til å gi vurderinger for en gitt restaurant. Denne ble valgt fordi den gir oss funksjonaliteten som trengs.  

#### Nominatim
For å mappe restaurantadresser (geocoding), har vi brukt apiet fra [nominatim](https://nominatim.org), ettersom det er open source og ga oss relativt gode resultater for geocoding.  

#### Select2
React Native port of Jquery Select2. Denne komponenten blir brukt i searchscreen for å kunne velge by-er, smileys og sorteringskriteria. Grunnet at vi har valgt å bruke denne komponenten er fordi den gir gode mulighet til å kunne personalisere den.
I denne prosjekt ble det brukt 3 ganger i tre forskjellige konfigurasjoner: 
-Liste av alternativer, velg en, en default valg.
-Liste av alternativer, velge en eller flere.
-Liste av alternativer, velge en eller flere, søk blant alternativene.

#### React Navigation
Denne modulen oppretter en blank canvas for våre appen. Vi har to tabs med en stack på hver, mer forklart øverst.
Grunnet til bruk av denne modulen er fordi det er veldig kjent i comunity og er veldig godt dokumentert.


## Testing
Dette prosjektet hadde ingen krav om automatisert testing, men vi har kontinuerlig testet manuelt under utviklingen, og sørget for at alt fungerte slik det skal, før vi pushet til dev og master.

## Git-konvensjoner

### Branches
*   master: oppdateres ved deployment
*   dev: utviklings-branch. Denne oppdateres jevnlig, hver gang en feature er ferdig
*   feat/feature-name: en branch som brukes for å lage forbedret funksjonalitet av en feature

## Kjente bugs
Når man kjøerer NPM INSTALL det kan feile integrity check av en fork av react leaflet. Slett package-lock.json filen og kjør NPM INSTALL på nytt og det vil fikse feilen.
## Inspirasjon og kilder
Backend koden er inspirert og delvis hentet fra: Carnes, Beau: Learn the MERN stack by building an exercise tracker — MERN Tutorial. Fra: https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1. [15.10.2019]

Fetching av data med react er inspirert av guiden fra: Claus, Markus: Fetching data from an api using React/Redux. Fra: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao [20.10.2019]



