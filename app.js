/* SupaBase Einbindung */

const SUPABASE_URL =
    "https://dbxprmomuaodvvowqnkj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_bOlEBBNgq-QQ-lwZhp1Log_YfpDwnyz";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* LimeSurvey-Anbindung: Rückleitungs-Umfrage nach Abschluss des Prototyps */

const EXIT_SURVEY_URL =
    "https://studentische-umfragen.uni-hamburg.de/index.php/832672";

const EXIT_REDIRECT_DELAY_MS =
    2000;


/* Teilnehmer-ID: im Echtbetrieb kommt sie per ?id=... von LimeSurvey.
   Testmodus (lokal, file://, oder ?test=1) erlaubt den Durchlauf ohne
   LimeSurvey und erzeugt stattdessen eine zufällige Test-ID. */

const urlParams =
    new URLSearchParams(window.location.search);

const idFromUrl =
    urlParams.get("id");

const isTestMode =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:" ||
    urlParams.get("test") === "1";

const hasValidSession =
    isTestMode ||
    Boolean(idFromUrl);

const participantId =
    isTestMode ?
        ("TEST-" + crypto.randomUUID()) :
        idFromUrl;

console.log(
    "Participant ID:",
    participantId,
    isTestMode ? "(Testmodus, keine echte Studiensitzung)" : ""
);


/* ==========================================================
   Taskgruppen (5 Themen à 5-10 Varianten)
   ==========================================================

   Jede Gruppe enthält die gruppenweiten Angaben (Frage,
   Instruktionstext, Antwortoptionen) und ihren Varianten mit
   den eigentlichen Daten (u.a. der richtigen Antwort). */

const taskGroups = [

    /* Taskgruppe: Speed-Dating-Partner (Tabelle) */
    {
        groupId: "speed_dating",

        groupLabel: "Speed-Dating-Partner",

        groupIntro:
            "In diesem Aufgabenblock sehen Sie jeweils zwei Teilnehmer eines " +
            "Speed-Dating-Events. Es handelt sich um heterosexuelle Paarungen. Sie erhalten eine Tabelle " +
            "mit den Angaben beider Dating-Partner. Die Teilnehmer wurden unter anderem darum gebeten, " +
            "ihr Gegenüber auf einer Skala von 1-10 zu bewerten, hinsichtlich Attraktivität, Intelligenz " +
            "und weiteren Dimensionen. Aus dem Abgleich ihrer persönlichen Interessen wurde für diese Paarung " +
            "zudem eine prozentuale Interessenähnlichkeit berechnet. \n\n" +
            "Ihre Aufgabe besteht darin, anhand dieser Informationen einzuschätzen, " +
            "ob die beiden auf ein zweites Date gehen werden. Ein zweites Date " +
            "kommt nur zustande, wenn beide Partner sich dafür entschieden haben.",

        type: "table",

        prompt:
            "Betrachten Sie die folgenden Informationen zu einem " +
            "Speed-Dating-Paar. Haben die beiden Personen " +
            "sich für ein zweites Date entschieden?",

        instruction:
            "Was glauben Sie? Wird dieses Paar ein zweites Date haben?",

        options: [
            "Ja, zum zweiten Date",
            "Nein, kein zweites Date"
        ],

        variants: [
            {
                variantId: "speed_dating_04",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "21", "31"],
                        ["Studium", "Jura", "Betriebswirtschaftslehre"],
                        ["Freizeitaktivitäten", "mehrmals/Woche", "mehrmals/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "7", "7"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "5", "10"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "7", "10"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "7", "2"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "7", "8"],
                        ["Interessenähnlichkeit", "73.5%", "73.5%"]
                    ]
                },
                correctAnswer: "Ja, zum zweiten Date",
            },
            {
                variantId: "speed_dating_02",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "22", "27"],
                        ["Studium", "Kommunikationswissenschaften", "Chemie"],
                        ["Freizeitaktivitäten", "mehrmals/Woche", "einmal/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "7", "9"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "7", "8"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "7", "7"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "8", "8"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "7", "5"],
                        ["Interessenähnlichkeit", "57%", "57%"]
                    ]
                },
                correctAnswer: "Ja, zum zweiten Date",
            },
            {
                variantId: "speed_dating_06",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "28", "32"],
                        ["Studium", "Internationale Beziehungen/ Betriebswirtschaftslehre", "Psychologie"],
                        ["Freizeitaktivitäten", "zweimal/Woche", "zweimal/Monat"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "5", "7"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "8", "7"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "6", "10"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "7", "—"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "7", "8"],
                        ["Interessenähnlichkeit", "58%", "58%"]
                    ]
                },
                correctAnswer: "Nein, kein zweites Date",
            },
            {
                variantId: "speed_dating_09",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "25", "24"],
                        ["Studium", "Soziale Arbeit", "Biomedizin/ Technik"],
                        ["Freizeitaktivitäten", "einmal/Woche", "einmal/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "8", "4"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "6", "8"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "7", "7"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "7", "6"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "6", "6"],
                        ["Interessenähnlichkeit", "59.5%", "59.5%"]
                    ]
                },
                correctAnswer: "Nein, kein zweites Date",
            },
            {
                variantId: "speed_dating_01",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "25", "28"],
                        ["Studium", "Internationale Beziehungen/ Betriebswirtschaftslehre", "Biomedizin"],
                        ["Freizeitaktivitäten", "zweimal/Woche", "einmal/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "8", "7"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "8", "10"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "6", "8"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "6", "9"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "6", "—"],
                        ["Interessenähnlichkeit", "66%", "66%"]
                    ]
                },
                correctAnswer: "Ja, zum zweiten Date",
            },
            {
                variantId: "speed_dating_03",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "25", "27"],
                        ["Studium", "Bildung/ Wissenschaft", "Wirtschaft/ Finanzen"],
                        ["Freizeitaktivitäten", "mehrmals/Woche", "zweimal/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "7", "6"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "7", "10"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "7", "9"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "9", "9"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "—", "4"],
                        ["Interessenähnlichkeit", "63%", "63%"]
                    ]
                },
                correctAnswer: "Ja, zum zweiten Date",
            },
            {
                variantId: "speed_dating_07",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "24", "27"],
                        ["Studium", "Sprache/ Journalismus", "Wirtschaft/ Finanzen"],
                        ["Freizeitaktivitäten", "zweimal/Woche", "zweimal/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "4", "5"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "2", "8"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "3", "8"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "3", "8"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "1", "8"],
                        ["Interessenähnlichkeit", "69.5%", "69.5%"]
                    ]
                },
                correctAnswer: "Nein, zum zweiten Date",
            },
            {
                variantId: "speed_dating_10",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "21", "25"],
                        ["Studium", "Jura", "Wirtschaft/ Finanzen"],
                        ["Freizeitaktivitäten", "mehrmals/Woche", "mehrmals/Woche"],
                        ["Vergebene Attraktivitäts-Bewertung (für den/die Partner/in)", "7", "4"],
                        ["Vergebene Aufrichtigkeits-Bewertung (für den/die Partner/in)", "7", "9"],
                        ["Vergebene Intelligenz-Bewertung (für den/die Partner/in)", "8", "7"],
                        ["Vergebene Unterhaltsamkeits-Bewertung (für den/die Partner/in)", "8", "4"],
                        ["Vergebene Ambitions-Bewertung (für den/die Partner/in)", "7", "6"],
                        ["Interessenähnlichkeit", "62.5%", "62.5%"]
                    ]
                },
                correctAnswer: "Nein, zum zweiten Date",
            }
        ]
    },

    /* Taskgruppe: Hotelrezension (Text) */
    {
        groupId: "hotel_review",

        groupLabel: "Hotelrezension",

        groupIntro:
            "In diesem Aufgabenblock lesen Sie Hotelrezensionen. " +
            "Jede Rezension ist in zwei Teile gegliedert: einen positiven " +
            "und einen negativen Teil, die die Bewertung des Hotelgastes widerspiegeln. " +
            "Eine Rezension muss nicht beide Teile enthalten, kann also auch ausschließlich positiv " +
            "oder ausschließlich negativ sein. \n\n" +
            "Ihre Aufgabe besteht darin, zu beurteilen, ob die Rezension von einem Menschen " +
            "verfasst wurde oder KI-generiert ist.",

        type: "text",

        prompt:
            "Lesen Sie den folgenden Text. " +
            "Wurde diese Hotelrezension von einem Menschen verfasst oder ist sie KI-generiert?",

        instruction:
            "Wurde diese Rezension von einem Menschen " +
            "verfasst oder ist sie KI-generiert?",

        options: [
            "von einem Menschen",
            "KI-generiert"
        ],

        variants: [
            {
                variantId: "hotel_review_03",
                hotelName: "Tree Charme",
                location: "Rom, Italien",
                information:
                    "Positiv:\n\n" +
                    "Tolles Appartement im Herzen von Trastevere, mitten in einem charmanten Gässchen! " +
                    "Die Zimmer sind modern ausgestattet, die Betten super bequem! " +
                    "Angela war eine zuvorkommende Gastgeberin! Wir kommen gerne wieder!",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_04",
                hotelName: "Holiday Inn Washington-Central/White House",
                location: "Washington D.C., USA",
                information:
                    "Positiv:\n\n" +
                    "Große Zimmer modern eingerichtet. 10-15min zu Fuß beim Weißen Haus. " +
                    "Supermarkt nur 1 Straße weiter entfernt.",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_05",
                hotelName: "Ankara HiltonSA",
                location: "Ankara, Türkei",
                information:
                    "Positiv:\n\n" +
                    "Entgegen der Kritik, bin ich auf Mitarbeiter getroffen, die tatsächlich Englisch sprachen " +
                    "und auch bemüht waren bei Problemen zu helfen.\n\n" +
                    "Negativ:\n\n" +
                    "Das Zimmer war dreckig, der Teppich fleckig und der Roomservice sehr unzuverlässig...",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_06",
                hotelName: "Hotel Passy Eiffel",
                location: "Paris, Frankreich",
                information:
                    "Positiv:\n\n" +
                    "Die Lage des Hotel Passy Eiffel in Paris ist hervorragend, nur wenige Gehminuten vom " +
                    "Eiffelturm entfernt. Das Personal ist höflich und die Zimmer sind sauber.\n\n" +
                    "Negativ:\n\n" +
                    "Leider war das Zimmer, in dem wir untergebracht waren, sehr klein und das Bad war veraltet. " +
                    "Außerdem war das Frühstück einfach und der Service war oft unterdurchschnittlich.",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_08",
                hotelName: "Hotel Transit Loft",
                location: "Berlin, Deutschland",
                information:
                    "Positiv:\n\n" +
                    "Hervorragende Lage, in der Nähe vieler Sehenswürdigkeiten. Der Service war ausgezeichnet, " +
                    "und das Frühstück war vielfältig und lecker.\n\n" +
                    "Negativ:\n\n" +
                    "Die Zimmer zur Straße hin können etwas laut sein, aber mit Ohrenstöpsel ist es in Ordnung.",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_01",
                hotelName: "Park Plaza Beijing Wangfujing",
                location: "Peking, China",
                information:
                    "Positiv:\n\n" +
                    "Lage direkt an einer U-Bahn-Station. Perfekt. Waschmaschinen und Trockner vorhanden. " +
                    "Gutes Frühstück, guter Concierge. Danke.",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_02",
                hotelName: "Hotel Passy Eiffel",
                location: "Paris, Frankreich",
                information:
                    "Positiv:\n\n" +
                    "Lage ausgezeichnet, Zimmerausstattung gut, Personal kompetent und freundlich.\n\n" +
                    "Negativ:\n\n" +
                    "Das Frühstücksbuffet ist marginal, da gibt es in der Umgebung günstigere und bessere Möglichkeiten.",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_07",
                hotelName: "B Montmartre",
                location: "Paris, Frankreich",
                information:
                    "Positiv:\n\n" +
                    "Das Hotel B Montmartre ist ein kleines Juwel in Paris... \n\n" +
                    "Negativ:\n\n" +
                    "Das Einzige, was uns nicht so gut gefallen hat, waren die relativ hohen Preise in der Hotelbar. " +
                    "Aber das ist Paris, es lohnt sich trotzdem, hier zu bleiben.",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_09",
                hotelName: "Hyatt Place Washington DC/US Capitol",
                location: "Washington D.C., USA",
                information:
                    "Positiv:\n\n" +
                    "Die Lage des Hotels ist ziemlich gut, leicht zu erreichen. Das Frühstück war in Ordnung. \n\n" +
                    "Negativ:\n\n" +
                    "Das Hotelzimmer war sehr alt und nicht gut gepflegt. Es gab viele Probleme mit der Elektrik im " +
                    "Zimmer. Das Badezimmer war schmutzig und es gab Probleme mit der Klimaanlage... ",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_10",
                hotelName: "New Park Hotel",
                location: "Ankara, Türkei",
                information:
                    "Positiv:\n\n" +
                    "Überaus freundliches Personal und sehr sauberes, geräumiges Zimmer in zentraler Lage. \n\n" +
                    "Negativ:\n\n" +
                    "Die Wände sind ein wenig dünn. Man hört das Nachbarzimmer.",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_11",
                hotelName: "Radisson Blu Ankara",
                location: "Ankara, Türkei",
                information:
                    "Positiv:\n\n" +
                    "Die Lage war traumhaft, viele Sehenswürdigkeiten waren zu Fuß zu erreichen. Die Mitarbeiterinnen " +
                    "der F&B Abteilung waren sehr freundlich und hilfsbereit. \n\n" +
                    "Negativ:\n\n" +
                    "Das Hotel ist schon etwas in die Jahre gekommen, das beeinträchtigt aber Service und Komfort keinesfalls.",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_12",
                hotelName: "Hotel Cinnah",
                location: "Ankara, Türkei",
                information:
                    "Positiv:\n\n" +
                    "Das Personal war sehr zuvorkommend, das Zimmer war sauber und modern eingerichtet " +
                    "und das Frühstück war reichlich. \n\n" +
                    "Negativ:\n\n" +
                    "Die Außenlärmbelastung war manchmal störend, insbesondere während der Stoßzeiten.",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_13",
                hotelName: "Hotel Cinnah",
                location: "Ankara, Türkei",
                information:
                    "Positiv:\n\n" +
                    "Das Personal ist sehr freundlich und zuvorkommend. Die Zimmer sind sauber und geschmackvoll " +
                    "eingerichtet. Die Lage ist ausgezeichnet, nahe zu vielen Sehenswürdigkeiten. \n\n" +
                    "Negativ:\n\n" +
                    "Leider war das WLAN im Zimmer nicht sehr zuverlässig und es gab nur wenige Parkmöglichkeiten.",
                correctAnswer: "KI-generiert",
            }
        ]
    },

    /* Taskgruppe: Emotionserkennung (Foto) */
    {
        groupId: "emotion",

        groupLabel: "Emotionserkennung",

        groupIntro:
            "In diesem Aufgabenblock sehen Sie jeweils ein Foto einer Person. " +
            "Es handelt sich um Standbilder realer Personen, die in einem emotionalen Moment " +
            "aufgenommen wurden. \n\n" +
            "Ihre Aufgabe besteht darin, die primäre Emotion der abgebildeten " +
            "Person zu erkennen.",

        type: "photo",

        prompt:
            "Betrachten Sie das folgende Foto. " +
            "Welche Emotion drückt das Gesicht der Person primär aus?",

        instruction:
            "Bitte geben Sie Ihre Einschätzung " +
            "zu der abgebildeten Emotion ein.",

        options: [
            "Überraschung",
            "Wut"
        ],

        variants: [
            {
                variantId: "emotion_01",
                image: "images/emot-1.png",
                correctAnswer: "Wut",
            },
            {
                variantId: "emotion_02",
                image: "images/emot-2.png",
                correctAnswer: "Wut",
            },
            {
                variantId: "emotion_03",
                image: "images/emot-3.png",
                correctAnswer: "Wut",
            },
            {
                variantId: "emotion_04",
                image: "images/emot-4.png",
                correctAnswer: "Wut",
            },
            {
                variantId: "emotion_05",
                image: "images/emot-5.png",
                correctAnswer: "Wut",
            },
            {
                variantId: "emotion_06",
                image: "images/emot-6.png",
                correctAnswer: "Überraschung",
            },
            {
                variantId: "emotion_07",
                image: "images/emot-7.png",
                correctAnswer: "Überraschung",
            },
            {
                variantId: "emotion_08",
                image: "images/emot-8.png",
                correctAnswer: "Überraschung",
            },
            {
                variantId: "emotion_09",
                image: "images/emot-9.png",
                correctAnswer: "Überraschung",
            }
        ]
    },

    /* Taskgruppe: Immobilienwerte (Foto + Tabelle) */
    {
        groupId: "real_estate",

        groupLabel: "Immobilienbewertung",

        groupIntro:
            "In diesem Aufgabenblock sehen Sie Eckdaten einer realen Immobilie. " +
            "Sie erhalten jeweils ein Foto der Immobilie, sowie zusätzliche Eckdaten, " +
            "u.a. Baujahr, Wohnfläche und Lage. \n\n" +
            "Ihre Aufgabe besteht darin, den gelisteten Kaufpreis der Immobilie einzuschätzen.",

        type: "photo_and_table",

        prompt:
            "Betrachten Sie die folgenden Informationen. " +
            "Wie viel ist diese Immobilie wert?",

        instruction:
            "Bitte geben Sie Ihre Schätzung " +
            "zum Immobilienwert ein.",

        options: [
            "weniger als 550.000€",
            "mehr als 550.000€"
        ],

        variants: [
            {
                variantId: "real_estate_01",
                image: "images/immo-1.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Wohnen mit Gartenidylle – Gepflegtes Ein-/Zweifamilienhaus in begehrter Lage von Hamburg-Stellingen!"],
                        ["Baujahr", "1957"],
                        ["Ort", "Stellingen, 22525 Hamburg"],
                        ["Zimmer", "4"],
                        ["Wohnfläche in m²", "123,38"],
                        ["Grundstücksfläche in m²", "513"]
                    ]
                },
                correctAnswer: "mehr als 550.000€",
            },
            {
                variantId: "real_estate_02",
                image: "images/immo-2.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Viel Platz für neue Ideen – freistehendes Ein- oder Zweifamilienhaus mit Doppelgarage und Carport"],
                        ["Baujahr", "1965"],
                        ["Ort", "Rosellen, 41470 Neuss"],
                        ["Zimmer", "7"],
                        ["Wohnfläche in m²", "177,28"],
                        ["Grundstücksfläche in m²", "716"]
                    ]
                },
                correctAnswer: "mehr als 550.000€",
            },
            {
                variantId: "real_estate_03",
                image: "images/immo-3.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "145m² Familienglück: Platz für die ganze Familie!"],
                        ["Baujahr", "2026"],
                        ["Ort", "Travemünde, 23570 Lübeck"],
                        ["Zimmer", "5"],
                        ["Wohnfläche in m²", "145"],
                        ["Grundstücksfläche in m²", "227"]
                    ]
                },
                correctAnswer: "weniger als 550.000€",
            },
            {
                variantId: "real_estate_06",
                image: "images/immo-6.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Exklusiv saniertes Wohnhaus mit Indoor-Pool, Wellnessbereich und hochwertiger Ausstattung"],
                        ["Baujahr", "1972"],
                        ["Ort", "Urdenbach, 40593 Düsseldorf"],
                        ["Zimmer", "5"],
                        ["Wohnfläche in m²", "276"],
                        ["Grundstücksfläche in m²", "321"]
                    ]
                },
                correctAnswer: "mehr als 550.000€",
            },
            {
                variantId: "real_estate_07",
                image: "images/immo-7.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Traumhaftes Altstadthaus mit dem ganz besonderen Flair in der Lübecker Altstadt"],
                        ["Baujahr", "1600"],
                        ["Ort", "Innenstadt, 23552 Lübeck"],
                        ["Zimmer", "4"],
                        ["Wohnfläche in m²", "93"],
                        ["Grundstücksfläche in m²", "36"]
                    ]
                },
                correctAnswer: "weniger als 550.000€",
            },
            {
                variantId: "real_estate_04",
                image: "images/immo-4.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Kleines Reihenmittelhaus nebst Garage in einer Seitenstraße"],
                        ["Baujahr", "1957"],
                        ["Ort", "Benrath, 40593 Düsseldorf"],
                        ["Zimmer", "4"],
                        ["Wohnfläche in m²", "84,01"],
                        ["Grundstücksfläche in m²", "290.04"]
                    ]
                },
                correctAnswer: "weniger als 550.000€",
            },
            {
                variantId: "real_estate_05",
                image: "images/immo-5.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Großzügiges Wohnen mit gehobener Ausstattung - Bungalow in Düsseldorf"],
                        ["Baujahr", "1972"],
                        ["Ort", "Urdenbach, 40593 Düsseldorf"],
                        ["Zimmer", "4"],
                        ["Wohnfläche in m²", "154,96"],
                        ["Grundstücksfläche in m²", "304"]
                    ]
                },
                correctAnswer: "mehr als 550.000€",
            },
            {
                variantId: "real_estate_08",
                image: "images/immo-8.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Mit malerischem Wasserblick! Stilvolles Altstadthaus in begehrter Wohnlage auf der Altstadtinsel!"],
                        ["Baujahr", "1600"],
                        ["Ort", "Innenstadt, 23552 Lübeck"],
                        ["Zimmer", "4"],
                        ["Wohnfläche in m²", "90"],
                        ["Grundstücksfläche in m²", "42"]
                    ]
                },
                correctAnswer: "weniger als 550.000€",
            },
            {
                variantId: "real_estate_09",
                image: "images/immo-9.webp",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Titel", "Bestes, ruhiges München Obermenzing S2, nh. Grandlschule, DHH, 3 Zi , Bad, Wc, Balk, Terr, Garten"],
                        ["Baujahr", "1982"],
                        ["Ort", "Obermenzing, 81247 München"],
                        ["Zimmer", "3"],
                        ["Wohnfläche in m²", "77"],
                        ["Grundstücksfläche in m²", "196"]
                    ]
                },
                correctAnswer: "mehr als 550.000€",
            }
        ]
    },

    /* Taskgruppe: Regenvorhersage (Tabelle) */
    {
        groupId: "rain_forecast",

        groupLabel: "Regenvorhersage",

        groupIntro:
            "In diesem Aufgabenblock sehen Sie jeweils Wetterdaten für " +
            "einen Tag in Hamburg (Fuhlsbüttel). Die Daten sind einer lokalen Wetterstation " +
            "entnommen und beinhalten u.a. Durchschnittstemperatur, Sonnenstunden und Niederschläge " +
            "der vorigen drei Tage. \n\n" +
            "Ihre Aufgabe besteht darin, eine Prognose abzugeben, ob es an diesem Tag " +
            "regnen wird oder nicht.",

        type: "table",

        prompt:
            "Betrachten Sie die folgenden Wetterdaten aus Hamburg (Fuhlsbüttel), Deutschland. " +
            "Hat es an diesem Tag dort geregnet?",

        instruction:
            "Bitte geben Sie eine Prognose " +
            "zur Regenwahrscheinlichkeit ein.",

        options: [
            "Kein Regen",
            "Regen"
        ],

        variants: [
            {
                variantId: "rain_forecast_01",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "08.01.2025"],
                        ["Ø Temperatur", "2,8 °C"],
                        ["Sonnenstunden", "4,2 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "16,1 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            },
            {
                variantId: "rain_forecast_02",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "05.02.2025"],
                        ["Ø Temperatur", "0,4 °C"],
                        ["Sonnenstunden", "0,0 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "8,5 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_03",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "09.04.2025"],
                        ["Ø Temperatur", "6,1 °C"],
                        ["Sonnenstunden", "0,5 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "0,0 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            },
            {
                variantId: "rain_forecast_04",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "13.04.2026"],
                        ["Ø Temperatur", "12,5 °C"],
                        ["Sonnenstunden", "2,7 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "0,0 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_05",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "22.05.2025"],
                        ["Ø Temperatur", "8,3 °C"],
                        ["Sonnenstunden", "5,8 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "0,0 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_06",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "11.06.2025"],
                        ["Ø Temperatur", "13,8 °C"],
                        ["Sonnenstunden", "13,6 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "14,2 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            },
            {
                variantId: "rain_forecast_07",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "03.05.2025"],
                        ["Ø Temperatur", "10,6 °C"],
                        ["Sonnenstunden", "7,6 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "0,0 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_08",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "29.06.2025"],
                        ["Ø Temperatur", "19,5 °C"],
                        ["Sonnenstunden", "10,7 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "10,1 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            },
            {
                variantId: "rain_forecast_09",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "16.07.2025"],
                        ["Ø Temperatur", "16,8 °C"],
                        ["Sonnenstunden", "7,2 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "1,6 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_10",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "12.09.2025"],
                        ["Ø Temperatur", "14,3 °C"],
                        ["Sonnenstunden", "7,5 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "2,0 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_11",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "27.09.2025"],
                        ["Ø Temperatur", "14,5 °C"],
                        ["Sonnenstunden", "1,3 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "0,0 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            }
        ]
    }

];

/* Fisher-Yates Shuffle (mischt eine Kopie des Arrays) */

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/* Session-Aufgabenliste aufbauen:
   - Reihenfolge der Taskgruppen wird randomisiert
   - Reihenfolge der Task Varianten je Gruppe wird randomisiert
   - groupOrder hält fest, an welcher Stelle eine Gruppe in
     der randomisierten Reihenfolge durchlaufen wurde
   - isFirstInGroup markiert die erste Aufgabe einer Gruppe,
     vor der der Gruppen-Einleitungsbildschirm gezeigt wird
   - isLastInGroup markiert die letzte Aufgabe einer Gruppe,
     nach der die Objektivitäts-/Subjektivitäts-Frage kommt */

function buildSessionTasks(groups) {

    const sessionTasks = [];

    shuffle(groups).forEach((group, groupIndex) => {

        const groupOrder = groupIndex + 1;

        shuffle(group.variants).forEach((variant, index) => {

            const groupPosition = index + 1;

            sessionTasks.push({

                id: variant.variantId,
                groupId: group.groupId,
                groupLabel: group.groupLabel,
                groupOrder: groupOrder,
                groupPosition: groupPosition,
                isFirstInGroup:
                    groupPosition === 1,
                isLastInGroup:
                    groupPosition === group.variants.length,

                groupIntro: group.groupIntro,

                type: group.type,
                prompt: group.prompt,
                instruction: group.instruction,
                options: group.options,

                image: variant.image,
                table: variant.table,
                information: variant.information,
                hotelName: variant.hotelName,
                location: variant.location,

                correctAnswer: variant.correctAnswer
            });
        });
    });

    return sessionTasks;
}

/* Fortschritt pro Teilnehmer-ID im localStorage sichern, damit ein
   einfacher Seiten-Reload (z. B. versehentlich F5) die Studie an der
   gleichen Stelle fortsetzt, statt Aufgaben doppelt zu stellen.
   Ein Hard-Refresh (Strg+Shift+R) sowie der Testmodus starten
   bewusst von vorne. */

const progressStorageKey =
    (!isTestMode && idFromUrl) ?
        ("abp_progress_" + idFromUrl) :
        null;

/* Erkennt einen Hard-Refresh anhand der Navigation-/Resource-Timing-Daten:
   Bei einem normalen Reload beantwortet der Server das HTML meist aus dem
   Cache oder per 304 (kleines transferSize). Ein Hard-Refresh erzwingt das
   Umgehen des Caches, wodurch die Seite vollständig neu übertragen wird. */

function isHardReload() {

    try {

        const [navigationEntry] =
            performance.getEntriesByType("navigation");

        if (!navigationEntry || navigationEntry.type !== "reload") {

            return false;
        }

        return (
            navigationEntry.transferSize > 0 &&
            navigationEntry.transferSize >= navigationEntry.encodedBodySize
        );

    } catch (error) {

        return false;
    }
}

function loadStoredProgress() {

    if (!progressStorageKey || isHardReload()) {

        return null;
    }

    try {

        const raw =
            localStorage.getItem(progressStorageKey);

        return raw ? JSON.parse(raw) : null;

    } catch (error) {

        console.warn(
            "Gespeicherter Fortschritt konnte nicht gelesen werden:",
            error
        );

        return null;
    }
}

function saveProgress() {

    if (!progressStorageKey) {

        return;
    }

    try {

        localStorage.setItem(
            progressStorageKey,
            JSON.stringify({
                tasks: tasks,
                currentTask: currentTask,
                awaitingRating: awaitingRating
            })
        );

    } catch (error) {

        console.warn(
            "Fortschritt konnte nicht gespeichert werden:",
            error
        );
    }
}

/* Experiment-Zustand */

let tasks;

let currentTask = 0;

let awaitingRating = false;

let pendingRatingTask = null;

let taskShownAt = null;

const storedProgress =
    loadStoredProgress();

const isFreshSession =
    !(
        storedProgress &&
        Array.isArray(storedProgress.tasks) &&
        storedProgress.tasks.length > 0
    );

if (!isFreshSession) {

    tasks = storedProgress.tasks;

    currentTask = storedProgress.currentTask || 0;

    awaitingRating = Boolean(storedProgress.awaitingRating);

} else {

    tasks = buildSessionTasks(taskGroups);

    currentTask = 0;

    awaitingRating = false;

    saveProgress();
}

/* Aktuelle Aufgabe anzeigen: ggf. zuerst Gruppen-Einleitung */

function goToCurrentTask() {

    const task =
        tasks[currentTask];

    if (task.isFirstInGroup) {

        showGroupIntro(
            task
        );

    } else {

        renderTask();
    }
}

/* Einleitungsbildschirm für den gesamten Aufgabenteil anzeigen */

function showStudyIntro() {

    document.getElementById(
        "task-section"
    ).hidden =
        true;

    document.getElementById(
        "rating-section"
    ).hidden =
        true;

    document.getElementById(
        "group-intro-section"
    ).hidden =
        true;

    document.getElementById(
        "study-intro-section"
    ).hidden =
        false;
}

/* Gruppen-Einleitungsbildschirm anzeigen */

function showGroupIntro(task) {

    document.getElementById(
        "task-counter"
    ).textContent =
        `Block ${task.groupOrder} von ${taskGroups.length}`;

    document.getElementById(
        "group-intro-title"
    ).textContent =
        task.groupLabel;

    document.getElementById(
        "group-intro-text"
    ).textContent =
        task.groupIntro || "";

    document.getElementById(
        "study-intro-section"
    ).hidden =
        true;

    document.getElementById(
        "task-section"
    ).hidden =
        true;

    document.getElementById(
        "rating-section"
    ).hidden =
        true;

    document.getElementById(
        "group-intro-section"
    ).hidden =
        false;
}

/* Aufgabe laden */

function renderTask() {

    const task =
        tasks[currentTask];

    taskShownAt =
        Date.now();

    /* Aufgabenansicht zeigen, andere Ansichten ausblenden */

    document.getElementById(
        "study-intro-section"
    ).hidden =
        true;

    document.getElementById(
        "group-intro-section"
    ).hidden =
        true;

    document.getElementById(
        "task-section"
    ).hidden =
        false;

    document.getElementById(
        "rating-section"
    ).hidden =
        true;

    /* Fortschrittsanzeige */

    document.getElementById(
        "task-counter"
    ).textContent =
        `Block ${task.groupOrder} von ${taskGroups.length}`;


    /* Titel */

    document.getElementById(
        "task-title"
    ).textContent =
        `Aufgabe ${task.groupPosition}`;

    /* Aufgabenbereich */

     const taskDescription =
        document.getElementById(
            "task-description"
        );

    // Inhalt zunächst leeren

    taskDescription.innerHTML = "";


    /* Aufgabentext */

    const prompt =
        document.createElement("p");

    prompt.textContent =
        task.prompt;

    taskDescription.appendChild(
        prompt
    );

    /* Foto (kann zusätzlich zu einer Tabelle auftreten, z.B. Immobilien) */

    if (task.image) {

        const image =
            document.createElement("img");

        image.src =
            task.image;

        image.alt =
            "Foto derzeit nicht verfügbar";

        image.className =
            "task-image";

        taskDescription.appendChild(
            image
        );
    }

    /* Tabelle */

    if (task.table) {

        const table =
            document.createElement("table");

        table.className =
            task.groupId === "speed_dating"
                ? "task-table task-table--speed-dating"
                : "task-table";


        // Tabellenkopf

        const thead =
            document.createElement("thead");

        const headerRow =
            document.createElement("tr");

        task.table.headers.forEach(
            header => {

                const th =
                    document.createElement("th");

                th.textContent =
                    header;

                headerRow.appendChild(
                    th
                );
            }
        );

        thead.appendChild(
            headerRow
        );

        table.appendChild(
            thead
        );


        // Tabellenkörper

        const tbody =
            document.createElement("tbody");

        task.table.rows.forEach(
            row => {

                const tr =
                    document.createElement("tr");

                row.forEach(
                    cell => {

                        const td =
                            document.createElement("td");

                        td.textContent =
                            cell;

                        tr.appendChild(
                            td
                        );
                    }
                );

                tbody.appendChild(
                    tr
                );
            }
        );

        table.appendChild(
            tbody
        );

        taskDescription.appendChild(
            table
        );

        // Hinweis unterhalb der Tabelle (nur Speed-Dating-Aufgaben)

        if (task.groupId === "speed_dating") {

            const tableNote =
                document.createElement("p");

            tableNote.className =
                "table-note";

            tableNote.textContent =
                "Die folgenden Werte zeigen, wie diese Person ihr Gegenüber eingeschätzt hat " +
                "(nicht, wie sie selbst von ihrem Gegenüber eingeschätzt wurde).";

            taskDescription.appendChild(
                tableNote
            );
        }
    }

    /* Text */

     if (task.information) {

        if (task.hotelName && task.location) {

            const hotelHeading =
                document.createElement("p");

            hotelHeading.className =
                "hotel-heading";

            hotelHeading.textContent =
                `Bewertung von ${task.hotelName} in ${task.location}`;

            taskDescription.appendChild(
                hotelHeading
            );
        }

        const informationBox =
            document.createElement("div");

        informationBox.className =
            "information-box";

        informationBox.textContent =
            task.information;

        taskDescription.appendChild(
            informationBox
        );
    }

    /* Instruktionstext (ehemals Chat-Einleitung) */

    document.getElementById(
        "task-instruction"
    ).textContent =
        task.instruction ||
        "Bitte geben Sie Ihre Antwort auf die Aufgabe ein.";

    /* Antwortbuttons erzeugen */

     createAnswerButtons(
        task.options
    );
}

/* Antwortbuttons erzeugen */
function createAnswerButtons(
    options
) {

    const answerArea =
        document.getElementById(
            "answer-options"
        );

    answerArea.innerHTML = "";


    options.forEach(
        option => {

            const button =
                document.createElement("button");

            button.className =
                "answer-button";

            button.textContent =
                option;

            button.dataset.answer =
                option;

            button.onclick =
                () => handleAnswer(option);

            answerArea.appendChild(
                button
            );
        }
    );
}

/* Nutzerantwort verarbeiten */

async function handleAnswer(
    answer
) {

    disableAnswerButtons();

    const task =
        tasks[currentTask];

    try {

        await saveTrial(
            task,
            answer
        );

        document.getElementById(
            "status-message"
        ).textContent = "";

        if (task.isLastInGroup) {

            awaitingRating = true;

            saveProgress();

            showRatingScreen(
                task
            );

        } else {

            advanceToNextTask();
        }

    } catch (error) {

        console.error(
            error
        );

        document
            .getElementById(
                "status-message"
            )
            .textContent =
            "Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.";

        enableAnswerButtons();
    }
}

/* Daten an Supabase senden */

async function saveTrial(task, answer) {

    const answerCorrect =
        answer === task.correctAnswer;

    const responseTimeSeconds =
        taskShownAt !== null ?
            Math.round(
                (Date.now() - taskShownAt) / 100
            ) / 10 :
            null;

    const {
        error
    } = await supabaseClient
        .from("trials")
        .insert({

            participant_id:
                participantId,

            task_number:
                currentTask + 1,

            task_id:
                task.id,

            task_type:
                task.type,

            group_id:
                task.groupId,

            group_position:
                task.groupPosition,

            first_answer:
                answer,

            correct_answer:
                task.correctAnswer,

            first_answer_correct:
                answerCorrect,

            response_time_seconds:
                responseTimeSeconds
        });


    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        throw error;
    }


    console.log(
        "Task gespeichert:",
        task.id
    );
}

/* Objektivitäts-/Subjektivitäts-Rating anzeigen */

function showRatingScreen(task) {

    pendingRatingTask =
        task;

    document.getElementById(
        "rating-group-name"
    ).textContent =
        task.groupLabel;

    document
        .querySelectorAll(
            'input[name="objectivity-rating"]'
        )
        .forEach(
            radio => {
                radio.checked = false;
            }
        );

    document.getElementById(
        "rating-error"
    ).hidden =
        true;

    document.getElementById(
        "rating-submit"
    ).disabled =
        false;

    document.getElementById(
        "task-section"
    ).hidden =
        true;

    document.getElementById(
        "rating-section"
    ).hidden =
        false;
}

/* Rating an Supabase senden */

async function saveGroupRating(task, rating) {

    const {
        error
    } = await supabaseClient
        .from("group_ratings")
        .insert({

            participant_id:
                participantId,

            group_id:
                task.groupId,

            group_order:
                task.groupOrder,

            rating:
                rating
        });


    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        throw error;
    }
}

/* Rating-Interaktion */

document.getElementById(
    "rating-options"
).addEventListener(
    "change",
    () => {

        document.getElementById(
            "rating-error"
        ).hidden =
            true;
    }
);

document.getElementById(
    "rating-submit"
).addEventListener(
    "click",
    async () => {

        const selected =
            document.querySelector(
                'input[name="objectivity-rating"]:checked'
            );

        if (!selected) {

            document.getElementById(
                "rating-error"
            ).hidden =
                false;

            return;
        }

        const submitButton =
            document.getElementById(
                "rating-submit"
            );

        submitButton.disabled =
            true;

        try {

            await saveGroupRating(
                pendingRatingTask,
                Number(selected.value)
            );

            document.getElementById(
                "status-message"
            ).textContent = "";

            advanceToNextTask();

        } catch (error) {

            console.error(
                error
            );

            document
                .getElementById(
                    "status-message"
                )
                .textContent =
                "Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.";

            submitButton.disabled =
                false;
        }
    }
);


/* Antwortbuttons aktivieren/deaktivieren */

function enableAnswerButtons() {

    document
        .querySelectorAll(
            "#answer-options .answer-button"
        )
        .forEach(
            button => {

                button.disabled =
                    false;
            }
        );
}

function disableAnswerButtons() {

    document
        .querySelectorAll(
            "#answer-options .answer-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;
            }
        );
}


/* Nächste Aufgabe */

function advanceToNextTask() {

    currentTask++;

    awaitingRating = false;

    saveProgress();


    if (
        currentTask >=
        tasks.length
    ) {

        showCompletion();

        return;
    }


    goToCurrentTask();
}


/* Abschluss */

function showCompletion() {

    document.getElementById(
        "group-intro-section"
    ).hidden =
        true;

    document.getElementById(
        "rating-section"
    ).hidden =
        true;

    document.getElementById(
        "task-section"
    ).hidden =
        false;

    document.getElementById(
        "task-counter"
    ).textContent =
        "Studie abgeschlossen";


    document.getElementById(
        "task-title"
    ).textContent =
        "Vielen Dank!";


    document.getElementById(
        "task-description"
    ).innerHTML = `

        <p>
            Sie haben alle ${tasks.length} Aufgaben
            erfolgreich bearbeitet.
        </p>

    `;


    document.getElementById(
        "task-instruction"
    ).textContent =
        isTestMode ?
            "Vielen Dank für Ihre Teilnahme. (Testmodus – keine Weiterleitung.)" :
            "Sie werden gleich zur Umfrage zurückgeleitet …";


    document.querySelector(
        ".answer-area"
    ).style.display =
        "none";


    if (!isTestMode) {

        setTimeout(
            () => {

                window.location.href =
                    EXIT_SURVEY_URL +
                    "?id=" +
                    encodeURIComponent(
                        participantId
                    );
            },
            EXIT_REDIRECT_DELAY_MS
        );
    }
}


/* Fehlerfall: Seite wurde ohne gültige Teilnehmer-ID aufgerufen
   (z. B. direkter Aufruf statt über den Studienlink) */

function showMissingIdError() {

    document.getElementById(
        "group-intro-section"
    ).hidden =
        true;

    document.getElementById(
        "rating-section"
    ).hidden =
        true;

    document.getElementById(
        "task-section"
    ).hidden =
        false;

    document.getElementById(
        "task-counter"
    ).textContent =
        "Fehler";

    document.getElementById(
        "task-title"
    ).textContent =
        "Diese Seite kann nicht direkt aufgerufen werden";

    document.getElementById(
        "task-description"
    ).innerHTML = `

        <p>
            Für die Studie fehlt eine gültige Teilnehmer-Kennung.
            Bitte starten Sie die Studie über den Ihnen zugesandten
            Umfrage-Link.
        </p>

    `;

    document.getElementById(
        "task-instruction"
    ).textContent =
        "";

    document.querySelector(
        ".answer-area"
    ).style.display =
        "none";
}


/* Studien-Einleitung: Weiter-Button */

document.getElementById(
    "study-intro-continue"
).addEventListener(
    "click",
    () => {

        goToCurrentTask();
    }
);


/* Gruppen-Einleitung: Weiter-Button */

document.getElementById(
    "group-intro-continue"
).addEventListener(
    "click",
    () => {

        renderTask();
    }
);


/* START */

if (hasValidSession) {

    if (isFreshSession) {

        showStudyIntro();

    } else if (currentTask >= tasks.length) {

        showCompletion();

    } else if (awaitingRating) {

        showRatingScreen(
            tasks[currentTask]
        );

    } else {

        goToCurrentTask();
    }

} else {

    showMissingIdError();
}
