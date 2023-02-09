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
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu meiner Nachbarin.");
                await trainTransition();
                return "Neighbour";

            case nextLocationAnswers.iSaySchool:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zur Schule.");
                await trainTransition();
                return "School";

            case nextLocationAnswers.iSayFriend:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu Hannas Freundin.");
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