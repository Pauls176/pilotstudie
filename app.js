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


/* Teilnehmer-ID erzeugen, beim Prototypen noch randomisert, später durch SoSci erzeugt */

const participantId =
    "TEST-" +
    crypto.randomUUID();

console.log(
    "Participant ID:",
    participantId
);


/* ==========================================================
   Taskgruppen (5 Themen à 5 Varianten)
   ==========================================================

   Jede Gruppe enthält die gruppenweiten Angaben (Frage,
   Instruktionstext, Antwortoptionen) und 5 Varianten mit
   den eigentlichen Daten (u.a. der richtigen Antwort). */

const taskGroups = [

    /* Taskgruppe: Speed-Dating-Partner (Tabelle) */
    {
        groupId: "speed_dating",

        groupLabel: "Speed-Dating-Partner",

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
                variantId: "speed_dating_01",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "21", "31"],
                        ["Studium", "Jura", "Betriebswirtschaftslehre"],
                        ["Freizeitaktivitäten", "mehrmals/Woche", "mehrmals/Woche"],
                        ["Attraktivitätsbewertung (der/s Partner/in)", "7", "7"],
                        ["Aufrichtigkeitsbewertung (der/s Partner/in)", "5", "10"],
                        ["Intelligenzbewertung (der/s Partner/in)", "7", "10"],
                        ["Unterhaltsamkeitsbewertung (der/s Partner/in)", "7", "2"],
                        ["Ambitionsbewertung (der/s Partner/in)", "7", "8"],
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
                        ["Attraktivitätsbewertung (der/s Partner/in)", "7", "9"],
                        ["Aufrichtigkeitsbewertung (der/s Partner/in)", "7", "8"],
                        ["Intelligenzbewertung (der/s Partner/in)", "7", "7"],
                        ["Unterhaltsamkeitsbewertung (der/s Partner/in)", "8", "8"],
                        ["Ambitionsbewertung (der/s Partner/in)", "7", "5"],
                        ["Interessenähnlichkeit", "57%", "57%"]
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
                        ["Alter", "28", "32"],
                        ["Studium", "Internationale Beziehungen/Betriebswirtschaftslehre", "Psychologie"],
                        ["Freizeitaktivitäten", "zweimal/Woche", "zweimal/Monat"],
                        ["Attraktivitätsbewertung (der/s Partner/in)", "5", "7"],
                        ["Aufrichtigkeitsbewertung (der/s Partner/in)", "8", "7"],
                        ["Intelligenzbewertung (der/s Partner/in)", "6", "10"],
                        ["Unterhaltsamkeitsbewertung (der/s Partner/in)", "7", "—"],
                        ["Ambitionsbewertung (der/s Partner/in)", "7", "8"],
                        ["Interessenähnlichkeit", "58%", "58%"]
                    ]
                },
                correctAnswer: "Nein, kein zweites Date",
            },
            {
                variantId: "speed_dating_04",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "25", "24"],
                        ["Studium", "Soziale Arbeit", "Biomedizinisch/Technik"],
                        ["Freizeitaktivitäten", "einmal/Woche", "einmal/Woche"],
                        ["Attraktivitätsbewertung (der/s Partner/in)", "8", "4"],
                        ["Aufrichtigkeitsbewertung (der/s Partner/in)", "6", "8"],
                        ["Intelligenzbewertung (der/s Partner/in)", "7", "7"],
                        ["Unterhaltsamkeitsbewertung (der/s Partner/in)", "7", "6"],
                        ["Ambitionsbewertung (der/s Partner/in)", "6", "6"],
                        ["Interessenähnlichkeit", "59.5%", "59.5%"]
                    ]
                },
                correctAnswer: "Nein, kein zweites Date",
            },
            {
                variantId: "speed_dating_05",
                table: {
                    headers: ["Merkmal", "Person A", "Person B"],
                    rows: [
                        ["Geschlecht", "Frau", "Mann"],
                        ["Alter", "25", "28"],
                        ["Studium", "Internationale Beziehungen/Betriebswirtschaftslehre", "Biomedizin"],
                        ["Freizeitaktivitäten", "zweimal/Woche", "einmal/Woche"],
                        ["Attraktivitätsbewertung (der/s Partner/in)", "8", "7"],
                        ["Aufrichtigkeitsbewertung (der/s Partner/in)", "8", "10"],
                        ["Intelligenzbewertung (der/s Partner/in)", "6", "8"],
                        ["Unterhaltsamkeitsbewertung (der/s Partner/in)", "6", "9"],
                        ["Ambitionsbewertung (der/s Partner/in)", "6", "—"],
                        ["Interessenähnlichkeit", "66%", "66%"]
                    ]
                },
                correctAnswer: "Ja, zum zweiten Date",
            }
        ]
    },

    /* Taskgruppe: Hotelrezension (Text) */
    {
        groupId: "hotel_review",

        groupLabel: "Hotelrezension",

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
                variantId: "hotel_review_01",
                information:
                    "Positiv:\n\n" +
                    "Tolles Appartement im Herzen von Trastevere, mitten in einem charmanten Gässchen! " +
                    "Die Zimmer sind modern ausgestattet, die Betten super bequem! " +
                    "Angela war eine zuvorkommende Gastgeberin! Wir kommen gerne wieder!",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_02",
                information:
                    "Positiv:\n\n" +
                    "Große Zimmer modern eingerichtet. 10-15min zu Fuß beim Weißen Haus. " +
                    "Supermarkt nur 1 Straße weiter entfernt.",
                correctAnswer: "von einem Menschen",
            },
            {
                variantId: "hotel_review_03",
                information:
                    "Positiv:\n\n" +
                    "Entgegen der Kritik, bin ich auf Mitarbeiter getroffen, die tatsächlich Englisch sprachen " +
                    "und auch bemüht waren bei Problemen zu helfen.\n\n" +
                    "Negativ:\n\n" +
                    "Das Zimmer war dreckig, der Teppich fleckig und der Roomservice sehr unzuverlässig...",
                correctAnswer: "KI-generiert",
            },
            {
                variantId: "hotel_review_04",
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
                variantId: "hotel_review_05",
                information:
                    "Positiv:\n\n" +
                    "Hervorragende Lage, in der Nähe vieler Sehenswürdigkeiten. Der Service war ausgezeichnet, " +
                    "und das Frühstück war vielfältig und lecker.\n\n" +
                    "Negativ:\n\n" +
                    "Die Zimmer zur Straße hin können etwas laut sein, aber mit Ohrenstöpsel ist es in Ordnung.",
                correctAnswer: "KI-generiert",
            }
        ]
    },

    /* Taskgruppe: Emotionserkennung (Foto) */
    {
        groupId: "emotion",

        groupLabel: "Emotionserkennung",

        type: "photo",

        prompt:
            "Betrachten Sie das folgende Foto. " +
            "Welche Emotion drückt das Gesicht der Person primär aus?",

        instruction:
            "Bitte geben Sie Ihre Einschätzung " +
            "zu der abgebildeten Emotion ein.",

        options: [
            "Überraschung",
            "Besorgnis"
        ],

        variants: [
            {
                variantId: "emotion_01",
                image: "images/placeholder.jpg",
                correctAnswer: "Überraschung",
            },
            /* TODO: Platzhalter-Varianten durch echte Fotos/Inhalte ersetzen */
            {
                variantId: "emotion_02",
                image: "images/placeholder.jpg",
                correctAnswer: "Überraschung",
            },
            {
                variantId: "emotion_03",
                image: "images/placeholder.jpg",
                correctAnswer: "Besorgnis",
            },
            {
                variantId: "emotion_04",
                image: "images/placeholder.jpg",
                correctAnswer: "Überraschung",
            },
            {
                variantId: "emotion_05",
                image: "images/placeholder.jpg",
                correctAnswer: "Besorgnis",
            }
        ]
    },

    /* Taskgruppe: Immobilienwerte (Foto + Tabelle) */
    {
        groupId: "real_estate",

        groupLabel: "Immobilienbewertung",

        type: "table",

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
                variantId: "real_estate_04",
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
                variantId: "real_estate_05",
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
            }
        ]
    },

    /* Taskgruppe: Regenvorhersage (Tabelle) */
    {
        groupId: "rain_forecast",

        groupLabel: "Regenvorhersage",

        type: "table",

        prompt:
            "Betrachten Sie die folgenden Wetterdaten aus Hamburg (Fuhlsbüttel). " +
            "Hat es an diesem Tag dort geregnet?",

        instruction:
            "Bitte geben Sie eine Prognose " +
            "zur Regenwahrscheinlichkeit ein.",

        options: [
            "Regen",
            "Kein Regen"
        ],

        variants: [
            {
                variantId: "rain_forecast_01",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "18.03.2026"],
                        ["Ø Temperatur", "8,0 °C"],
                        ["Sonnenstunden", "11,1 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "3,4 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            },
            {
                variantId: "rain_forecast_02",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "10.08.2026"],
                        ["Ø Temperatur", "18,7 °C"],
                        ["Sonnenstunden", "4,4 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "0,0 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_03",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "29.06.2026"],
                        ["Ø Temperatur", "21,5 °C"],
                        ["Sonnenstunden", "7,6 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "20,9 mm"]
                    ]
                },
                correctAnswer: "Regen",
            },
            {
                variantId: "rain_forecast_04",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "24.07.2026"],
                        ["Ø Temperatur", "16,4 °C"],
                        ["Sonnenstunden", "1,1 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "2,1 mm"]
                    ]
                },
                correctAnswer: "Kein Regen",
            },
            {
                variantId: "rain_forecast_05",
                table: {
                    headers: ["", ""],
                    rows: [
                        ["Datum", "30.07.2026"],
                        ["Ø Temperatur", "25,4 °C"],
                        ["Sonnenstunden", "10,2 h"],
                        ["Niederschlag (der vorigen 3 Tage)", "7,2 mm"]
                    ]
                },
                correctAnswer: "Regen",
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
   - Reihenfolge der 5 Varianten je Gruppe wird randomisiert
   - groupOrder hält fest, an welcher Stelle eine Gruppe in
     der randomisierten Reihenfolge durchlaufen wurde
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
                isLastInGroup:
                    groupPosition === group.variants.length,

                type: group.type,
                prompt: group.prompt,
                instruction: group.instruction,
                options: group.options,

                image: variant.image,
                table: variant.table,
                information: variant.information,

                correctAnswer: variant.correctAnswer
            });
        });
    });

    return sessionTasks;
}

const tasks = buildSessionTasks(taskGroups);

/* Experiment-Zustand */

let currentTask = 0;

let pendingRatingTask = null;

/* Aufgabe laden */

function loadTask() {

    const task =
        tasks[currentTask];

    /* Aufgabenansicht zeigen, Rating-Ansicht ausblenden */

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
        `Aufgabe ${currentTask + 1} von ${tasks.length}`;


    /* Titel */

    document.getElementById(
        "task-title"
    ).textContent =
        `Aufgabe ${currentTask + 1}`;

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
            "task-table";


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
    }

    /* Text */

     if (task.information) {

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
                answerCorrect
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
        "rating-submit"
    ).disabled =
        true;

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
            "rating-submit"
        ).disabled =
            false;
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


    if (
        currentTask >=
        tasks.length
    ) {

        showCompletion();

        return;
    }


    loadTask();
}


/* Abschluss */

function showCompletion() {

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
        "Vielen Dank für Ihre Teilnahme.";


    document.querySelector(
        ".answer-area"
    ).style.display =
        "none";
}


/* START */

loadTask();
