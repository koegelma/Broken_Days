namespace Broken_Days {

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

    export async function LocationDecision(): ƒS.SceneReturn {
        console.log("LocationDecision Scene starting");

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                //await ƒS.Location.show(locations.city.morning);
                await MorningRoutine();
                break;
            case DayTime.AFTERNOON:
                //await ƒS.Location.show(locations.city.afternoon);
                await AfternoonRoutine();
                break;
            case DayTime.EVENING:
                //await ƒS.Location.show(locations.city.evening);
                await EveningRoutine();
                break;
        }

        /* await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Wo soll ich nur zuerst suchen?"); */

        // check available locations (if they have been searched already, they are not available, or if they are already unlocked)
        let nextLocationAnswers = {
            iSayNeighbour: "Nachbarin",
            iSaySchool: "Schule",
            iSayFriend: "Beste Freundin"
        };

        let nextLocation = await ƒS.Menu.getInput(nextLocationAnswers, "decision");

        switch (nextLocation) {
            case nextLocationAnswers.iSayNeighbour:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu meiner Nachbarin.");
                //await fadeScene();
                //return "Neighbour";
                await trainTransition();
                return "Neighbour";

            case nextLocationAnswers.iSaySchool:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zur Schule.");
                //await fadeScene();
                //return "School";
                await trainTransition();
                return "School";

            case nextLocationAnswers.iSayFriend:
                await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu Hannas Freundin.");
                //await fadeScene();
                //return "Friend";
                await trainTransition();
                return "Friend";

        }


    }
}