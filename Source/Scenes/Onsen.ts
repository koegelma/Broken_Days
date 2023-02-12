namespace Broken_Days {
    export async function Onsen(): ƒS.SceneReturn {
        console.log("Onsen Scene starting");

        ƒS.Sound.play(sound.onsenAmbience, 1, true);

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

        // --> recieve puzzle piece 2
        await ƒS.Speech.tell(characters.Protagonist, "Mhh, Hanna scheint hier nicht zu sein...");
        await ƒS.Speech.tell(characters.Protagonist, "Moment mal, was ist denn das?");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Das sieht nach Hannas Handschrift aus!");
        ƒS.Inventory.add(items.puzzlePiece2);
        dataForSave.puzzlePieces.puzzle2Unlocked = true;
        dataForSave.locations.psychologistUnlocked = false;
        dataForSave.locations.onsenUnlocked = false;
        showHannasMessages(2);
        await ƒS.Speech.tell(characters.Blank, "");
        decreaseDespair(35);
        openMeter();
        await ƒS.Speech.tell(characters.Protagonist, "Die Nachricht ist wirklich von Hanna!");
        await ƒS.Speech.tell(characters.Protagonist, "Aber was will sie mir damit nur sagen?");
        await ƒS.Speech.tell(characters.Protagonist, "Ich werde daraus nicht so wirklich schlau... Ich sollte einfach weiter suchen...");
        // check if all puzzle pieces are collected -> restaurant scene
        closeMeter();
        ƒS.Sound.fade(sound.onsenAmbience, 0, 1);
        if (allPiecesRecieved()) {
            return "Restaurant";
        }
        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.onsen.day);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.onsen.day);
        hndTransition();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.onsen.evening);
        hndTransition();
    }
}