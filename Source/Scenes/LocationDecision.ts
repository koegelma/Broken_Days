namespace Broken_Days {

    export async function LocationDecision(): ƒS.SceneReturn {
        console.log("LocationDecision Scene starting");

        ƒS.Sound.play(sound.urbanAmbience, 1, true);

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await MorningRoutine();
                break;
            case DayTime.AFTERNOON:
                await AfternoonRoutine();
                break;
            case DayTime.EVENING:
                await EveningRoutine();
                break;
        }

        let nextLocationAnswers = {
            iSayNeighbour: "Nachbarin",
            iSaySchool: "Schule",
            iSayFriend: "Beste Freundin"
        };

        updateLocationAnswers(nextLocationAnswers);

        let nextLocation = await ƒS.Menu.getInput(nextLocationAnswers, "decision");

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        switch (nextLocation) {
            case nextLocationAnswers.iSayNeighbour:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu Etsuko.");
                await trainTransition();
                return "Neighbour";

            case nextLocationAnswers.iSaySchool:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zur Schule.");
                await trainTransition();
                return "School";

            case nextLocationAnswers.iSayFriend:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu Hannas Freundin Kana.");
                await trainTransition();
                return "Friend";

            case "Waschsalon":
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zum Waschsalon.");
                await trainTransition();
                return "Laundry";

            case "Onsen":
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zum Onsen.");
                await trainTransition();
                return "Onsen";

            case "Laden":
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zum Laden.");
                await trainTransition();
                return "Shop";

            case "Park":
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zum Park.");
                await trainTransition();
                return "Park";

            case "Psychologe":
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zum Psychologen.");
                await trainTransition();
                return "Psychologist";

            case "Tempel":
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zum Tempel.");
                await trainTransition();
                return "Temple";
        }
    }

    async function MorningRoutine(): Promise<void> {
        console.log("Morning");
        await ƒS.Location.show(locations.city.morning);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Wo soll ich nur zuerst suchen?");
    }

    async function AfternoonRoutine(): Promise<void> {
        console.log("Afternoon");
        await ƒS.Location.show(locations.city.afternoon);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        if (dataForSave.daysPassed == 0 && !dataForSave.decisions.calledWork) {
            await TakashisCall();
        }
        await ƒS.Speech.tell(characters.mainCharacter, "Mhh, es ist schon Mittag. Wo soll ich als nächstes suchen?");
    }

    async function EveningRoutine(): Promise<void> {
        console.log("Evening");
        await ƒS.Location.show(locations.city.evening);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Der Tag neigt sich dem Ende zu... Wo soll ich jetzt noch suchen?");
    }

    async function TakashisCall(): Promise<void> {
        ƒS.Sound.play(sound.phoneVibrate, 1, false);
        ƒS.Character.hide(characters.mainCharacter);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Oh, wer ruft mich denn jetzt an, könnte das Hanna sein?");
        await ƒS.Progress.delay(4);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo?");
        await ƒS.Speech.tell(characters.Takashi, dataForSave.nameProtagonist + "?! Wo bist du denn? Du hättest doch schon längst bei der Arbeit sein müssen!");
        await ƒS.Speech.tell(characters.mainCharacter, "Oh, Takashi!? Es tut mir leid, ich habe vergessen anzurufen...");
        await ƒS.Speech.tell(characters.mainCharacter, "Meine kleine Schwester ist verschwunden und ich kann sie nicht erreichen!");
        await ƒS.Speech.tell(characters.mainCharacter, "Ich versuche sie gerade zu finden...");
        await ƒS.Speech.tell(characters.Takashi, "Oh, das tut mir natürlich leid, aber du hättest dich auch einfach kurz melden können und Bescheid geben!");
        await ƒS.Speech.tell(characters.Takashi, "Wir haben uns schon Sorgen gemacht, dass dir etwas passiert ist!");
        await ƒS.Speech.tell(characters.mainCharacter, "Ich weiß, ich weiß, es tut mir wirklich leid, aber ich hatte vorhin keinen Kopf dafür, ich muss Hanna schnellstmöglich finden!");
        await ƒS.Speech.tell(characters.Takashi, "Ok, ich werde dich jetzt nicht weiter aufhalten, ich wünsche dir viel Glück bei der Suche!");
        await ƒS.Speech.tell(characters.Takashi, "Bitte melde dich wenn du sie gefunden hast.");
        await ƒS.Speech.tell(characters.mainCharacter, "Danke Takashi...");
        ƒS.Character.hide(characters.mainCharacter);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        ƒS.Sound.play(sound.phoneTurnedOff, 1);
        ƒS.Sound.fade(sound.phoneTurnedOff, 0, 3);
        await ƒS.Progress.delay(3);
    }

    function updateLocationAnswers(_nextLocationAnswers: {
        iSayNeighbour: string;
        iSaySchool: string;
        iSayFriend: string;
        iSayLaundry?: string;
        iSayOnsen?: string;
        iSayShop?: string;
        iSayPark?: string;
        iSayPsychologist?: string;
        iSayTemple?: string;
    }): void {

        if (dataForSave.locations.laundryUnlocked) _nextLocationAnswers.iSayLaundry = "Waschsalon";

        if (dataForSave.locations.onsenUnlocked) _nextLocationAnswers.iSayOnsen = "Onsen";

        if (dataForSave.locations.shopUnlocked) _nextLocationAnswers.iSayShop = "Laden";

        if (dataForSave.locations.parkUnlocked) _nextLocationAnswers.iSayPark = "Park";

        if (dataForSave.locations.psychologistUnlocked) _nextLocationAnswers.iSayPsychologist = "Psychologe";

        if (dataForSave.locations.templeUnlocked) _nextLocationAnswers.iSayTemple = "Tempel";
    }
}