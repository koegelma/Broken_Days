namespace Template {
    export async function Inventory_Test(): ƒS.SceneReturn {

        await ƒS.Location.show(locations.room);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);

        await ƒS.Speech.tell(characters.mainCharacter, "Nanu, schon so spät?!");
        await ƒS.Speech.tell(characters.mainCharacter, "Ich muss dringend los zur Vorlesung, aber wo ist denn jetzt mein Handy?");

        let phoneSearchOptions = {
            iSayTable: "Auf meinem Schreibtisch?",
            iSayBed: "Auf meinem Bett?"
        };

        let phoneSearchElement = await ƒS.Menu.getInput(phoneSearchOptions, "individualCSSclass");

        switch (phoneSearchElement) {
            case phoneSearchOptions.iSayTable:
                await ƒS.Speech.tell(characters.mainCharacter, "Ah stimmt, ich habe es auf dem Schreibtisch abgelegt!");
                break;
            case phoneSearchOptions.iSayBed:
                await ƒS.Speech.tell(characters.mainCharacter, "Richtig, es liegt auf meinem Bett!");
                break;
        }
        ƒS.Character.hide(characters.mainCharacter);
        ƒS.Speech.clear();
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positionPercent(25, 100));
        ƒS.Inventory.add(items.handy);
        await ƒS.update();

        await ƒS.Speech.tell(characters.mainCharacter, "Und meinen Laptop darf ich auch nicht vergessen.");
        ƒS.Inventory.add(items.laptop);

        await ƒS.Speech.tell(characters.mainCharacter, "Ich nehm mir mal lieber noch ein paar Äpfel mit, sonst hab ich später wieder so nen Hunger.");

        for (let i: number = 0; i < 3; i++) {
            ƒS.Inventory.add(items.apple);
        }

        await ƒS.Speech.tell(characters.mainCharacter, "Jetzt kann ich aber endlich losgehen!");
        ƒS.Speech.clear();


        //return Introduction;  	// nächste Szene die abgespielt wird
    }
}