namespace Broken_Days {
    export async function Friend(): ƒS.SceneReturn {
        console.log("Friend Scene starting");

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

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.friend.morning);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Kana scheint nicht zuhause zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.friend.afternoon);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Kana scheint nicht zuhause zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }

    async function EveningRoutine(): Promise<void> {
        // --> unlock shop
        await ƒS.Location.show(locations.friend.evening);
        hndTransition();
        if (!dataForSave.locations.shopUnlocked) await FirstVisit();
        else await RecurringVisit();
    }

    async function FirstVisit(): Promise<void> {
        await ƒS.Character.show(characters.Kana, characters.Kana.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Kana, "Hey, " + dataForSave.nameProtagonist + ". Was machst du denn hier?");
        await ƒS.Speech.tell(characters.Protagonist, "Kana, hast du Hanna gesehen?");
        await ƒS.Speech.tell(characters.Protagonist, "Ich habe sie schon überall gesucht, aber ich finde sie nicht.");
        ƒS.Character.hide(characters.Kana);
        await ƒS.Character.show(characters.Kana, characters.Kana.pose.surprised, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Kana, "Hanna? Was ist denn mit ihr? Geht es ihr wieder nicht gut?");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Wieso denn wieder nicht gut?!");
        await ƒS.Speech.tell(characters.Protagonist, "Aber nein, sie ist nicht krank. Ich kann sie nur nicht erreichen.");
        await ƒS.Speech.tell(characters.Kana, "Oh, nein. Ich habe sie leider schon länger nicht gesehen.");
        await ƒS.Speech.tell(characters.Protagonist, "Hast du eine Ahnung wo sie sein könnte?");
        await ƒS.Speech.tell(characters.Kana, "Mhh...");
        ƒS.Character.hide(characters.Kana);
        await ƒS.Character.show(characters.Kana, characters.Kana.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Kana, "Wir gehen oft zusammen in den Gemischtwarenladen von Herrn Yamamoto, vielleicht findest du sie dort?");
        await ƒS.Speech.tell(characters.Kana, "Hanna und ich kaufen uns dort oft Süßigkeiten und Snacks.");
        await ƒS.Speech.tell(characters.Kana, "Wir sprechen oft mit Herrn Yamamoto und er ist sehr freundlich, manchmal schenkt er uns sogar Dinge oder lässt uns etwas neues ausprobieren.");
        await ƒS.Speech.tell(characters.Protagonist, "Danke Kana, ich werde dort mal schauen.");
        dataForSave.locations.shopUnlocked = true;
    }

    async function RecurringVisit(): Promise<void> {
        await ƒS.Character.show(characters.Kana, characters.Kana.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Kana, "Hey, du bist ja schon wieder da. Hast du Hanna gefunden?");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, leider noch nicht.");
        await ƒS.Speech.tell(characters.Kana, "Oh schade... Aber wenn sie sich bei mir meldet, dann sag ich dir Bescheid.");
        if (!dataForSave.locations.templeUnlocked) await ƒS.Speech.tell(characters.Kana, "Du solltest aber mal im Gemischtwarenladen von Herrn Yamamoto vorbeischauen. Vielleicht war sie dort.");
        await ƒS.Speech.tell(characters.Protagonist, "Ok, danke Kana.");
    }
}