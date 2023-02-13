namespace Broken_Days {
    export async function Park(): ƒS.SceneReturn {
        console.log("Park Scene starting");

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
        // --> recieve puzzle piece 1
        await ƒS.Speech.tell(characters.Protagonist, "Mhh, Hanna scheint hier nicht zu sein...");
        await ƒS.Speech.tell(characters.Protagonist, "Moment mal, was ist denn das?");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Das sieht nach Hannas Handschrift aus!");
        ƒS.Inventory.add(items.puzzlePiece1);
        dataForSave.puzzlePieces.puzzle1Unlocked = true;
        dataForSave.locations.laundryUnlocked = false;
        dataForSave.locations.parkUnlocked = false;
        showHannasMessages(1);
        await ƒS.Speech.tell(characters.Blank, "");
        decreaseDespair(35);
        openMeter();
        await ƒS.Speech.tell(characters.Protagonist, "Die Nachricht ist wirklich von Hanna!");
        await ƒS.Speech.tell(characters.Protagonist, "Aber was will sie mir damit nur sagen?");
        await ƒS.Speech.tell(characters.Protagonist, "Ich werde daraus nicht so wirklich schlau... Ich sollte einfach weiter suchen...");
        closeMeter();
        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);
        if (allPiecesRecieved()) {
            return "Restaurant";
        }
        
        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.park.morning);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.park.afternoon);
        hndTransition();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.park.evening);
        hndTransition();
    }
}