"use strict";
var Broken_Days;
(function (Broken_Days) {
    async function ApartmentEnd() {
        console.log("ApartmentEnd Scene starting");
    }
    Broken_Days.ApartmentEnd = ApartmentEnd;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    Broken_Days.ƒ = FudgeCore;
    Broken_Days.ƒS = FudgeStory;
    console.log("Visual Novel starting");
    let DayTime;
    (function (DayTime) {
        DayTime[DayTime["MORNING"] = 0] = "MORNING";
        DayTime[DayTime["AFTERNOON"] = 1] = "AFTERNOON";
        DayTime[DayTime["EVENING"] = 2] = "EVENING";
    })(DayTime = Broken_Days.DayTime || (Broken_Days.DayTime = {}));
    //export let dayTimes = ["morning", "afternoon", "evening"];
    // transitions
    Broken_Days.transitions = {
        puzzle: {
            duration: 1,
            alpha: "./FreeTransitions/5.jpg",
            edge: 1
        }
    };
    // Alles was über Szenen hinaus gespeichert werden soll, Speicher-/Ladepunkt immer zu Beginn der Szene
    Broken_Days.dataForSave = {
        nameProtagonist: "",
        DayTime: DayTime.MORNING,
        daysPassed: 0,
        locations: {
            laundryUnlocked: true,
            onsenUnlocked: true,
            shopUnlocked: true,
            parkUnlocked: true,
            psychologistUnlocked: true,
            templeUnlocked: true
        }
    };
    async function UpdateDayTime() {
        switch (Broken_Days.dataForSave.DayTime) {
            case DayTime.MORNING:
                Broken_Days.dataForSave.DayTime = DayTime.AFTERNOON;
                break;
            case DayTime.AFTERNOON:
                Broken_Days.dataForSave.DayTime = DayTime.EVENING;
                break;
            case DayTime.EVENING:
                Broken_Days.dataForSave.DayTime = DayTime.MORNING;
                Broken_Days.dataForSave.daysPassed++;
                console.log("New day! " + Broken_Days.dataForSave.daysPassed + " days passed.");
                // start new day
                break;
        }
    }
    Broken_Days.UpdateDayTime = UpdateDayTime;
    // items
    Broken_Days.items = {
        handy: {
            name: "Handy",
            description: "Dein eigenes Handy, wow.",
            image: "./Images/Items/phone.png",
            static: true
        },
        laptop: {
            name: "Laptop",
            description: "Dein eigener Laptop, wow.",
            image: "./Images/Items/laptop.png",
            static: true
        },
        apple: {
            name: "Apfel",
            description: "Lecker, Apfel.",
            image: "./Images/Items/apple.png"
        }
    };
    function showCredits() {
        Broken_Days.ƒS.Text.setClass("credtis"); //addClass; setClass überschreibt
        Broken_Days.ƒS.Text.print("Credits here");
    }
    Broken_Days.showCredits = showCredits;
    function getAnimation() {
        return {
            start: { translation: Broken_Days.ƒS.positions.bottomleft, rotation: -20, scaling: new Broken_Days.ƒS.Position(0.5, 1.5), color: Broken_Days.ƒS.Color.CSS("white", 0.3) },
            end: { translation: Broken_Days.ƒS.positions.bottomright, rotation: 20, scaling: new Broken_Days.ƒS.Position(1.5, 0.5), color: Broken_Days.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Broken_Days.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Broken_Days.getAnimation = getAnimation;
    function getTrainAnimation() {
        return {
            start: { translation: Broken_Days.ƒS.positionPercent(75, 100) },
            end: { translation: Broken_Days.ƒS.positionPercent(73, 100) },
            duration: 0.75,
            playmode: Broken_Days.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Broken_Days.getTrainAnimation = getTrainAnimation;
    async function trainTransition() {
        await fadeScene();
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.train);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        Broken_Days.ƒS.update();
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.trainAmbience, 1);
        await Broken_Days.ƒS.Progress.delay(5);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        Broken_Days.ƒS.Character.animate(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.surprised, getTrainAnimation());
        await Broken_Days.ƒS.Progress.delay(3);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(73, 100));
        Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Progress.delay(2);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.trainAmbience, 0, 1);
        await fadeScene(2);
        /* console.log(_scene);
        return _scene; */
    }
    Broken_Days.trainTransition = trainTransition;
    async function fadeScene(_duration = 1) {
        Broken_Days.ƒS.Location.show(Broken_Days.locations.blackscreen);
        Broken_Days.ƒS.Character.hideAll();
        Broken_Days.ƒS.Speech.hide();
        await Broken_Days.ƒS.update(_duration);
    }
    Broken_Days.fadeScene = fadeScene;
    async function hndNextLocation() {
        if (Broken_Days.dataForSave.DayTime != DayTime.EVENING) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich sollte meine Suche jetzt besser fortsetzen.");
            UpdateDayTime();
            await fadeScene();
            return "LocationDecision";
        }
        // Evening
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Es ist schon so spät... Ich sollte jetzt besser nach Hause gehen und morgen weiter suchen.");
        UpdateDayTime();
        await fadeScene();
        return "EndDay";
    }
    Broken_Days.hndNextLocation = hndNextLocation;
    // Menu
    //buttons
    let inGameMenuButttons = {
        save: "Save",
        load: "Load",
        //volume
        close: "Close",
        credits: "Credits"
    };
    let gameMenu;
    let menuIsOpen = true;
    async function buttonFunctionalities(_option) {
        console.log(_option);
        switch (_option) {
            case inGameMenuButttons.save:
                await Broken_Days.ƒS.Progress.save();
                break;
            case inGameMenuButttons.load:
                await Broken_Days.ƒS.Progress.load();
                break;
            case inGameMenuButttons.close:
                gameMenu.close();
                menuIsOpen = false;
                break;
            case inGameMenuButttons.credits:
                showCredits();
                break;
        }
    }
    // shortcuts fürs menu
    document.addEventListener("keydown", hndKeyPress);
    let inventoryIsOpen = false;
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case Broken_Days.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Broken_Days.ƒS.Progress.save();
                break;
            case Broken_Days.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Broken_Days.ƒS.Progress.load();
                break;
            case Broken_Days.ƒ.KEYBOARD_CODE.M:
                // menuIsOpen = !menuIsOpen;
                if (menuIsOpen) {
                    console.log("Menu close");
                    gameMenu.close();
                    menuIsOpen = false;
                }
                else {
                    console.log("Menu open");
                    gameMenu.open();
                    menuIsOpen = true;
                }
                break;
            case Broken_Days.ƒ.KEYBOARD_CODE.I:
                inventoryIsOpen = !inventoryIsOpen;
                if (inventoryIsOpen) {
                    Broken_Days.ƒS.Inventory.open();
                }
                else {
                    Broken_Days.ƒS.Inventory.close();
                }
                break;
        }
    }
    window.addEventListener("load", start);
    function start(_event) {
        gameMenu = Broken_Days.ƒS.Menu.create(inGameMenuButttons, buttonFunctionalities, "gameMenuCSSclass");
        buttonFunctionalities("Close");
        let scenes = [
            //{ scene: Scene, name: "Scene" },
            { scene: Broken_Days.Introduction, name: "Introduction" },
            //{ scene: Inventory_Test, name: "Inventory_Test" }
            //{id: "", scene: Scene, name: "Scene" , next:""}, --> next mit id ansprechen
            { id: "LocationDecision", scene: Broken_Days.LocationDecision, name: "LocationDecision" },
            { id: "Neighbour", scene: Broken_Days.Neighbour, name: "Neighbour" },
            { id: "School", scene: Broken_Days.School, name: "School" },
            { id: "Friend", scene: Broken_Days.Friend, name: "Friend" },
            { id: "EndDay", scene: Broken_Days.EndDay, name: "EndDay" },
            { id: "NewDay", scene: Broken_Days.NewDay, name: "NewDay" },
            { id: "Laundry", scene: Broken_Days.Laundry, name: "Laundry" },
            { id: "Onsen", scene: Broken_Days.Onsen, name: "Onsen" },
            { id: "Shop", scene: Broken_Days.Shop, name: "Shop" },
            { id: "Park", scene: Broken_Days.Park, name: "Park" },
            { id: "Psychologist", scene: Broken_Days.Psychologist, name: "Psychologist" },
            { id: "Temple", scene: Broken_Days.Temple, name: "Temple" },
            { id: "Restaurant", scene: Broken_Days.Restaurant, name: "Restaurant" },
            { id: "ApartmentEnd", scene: Broken_Days.ApartmentEnd, name: "ApartmentEnd" },
            { id: "Ending", scene: Broken_Days.Ending, name: "Ending" },
            { id: "Epilogue", scene: Broken_Days.Epilogue, name: "Epilogue" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Broken_Days.dataForSave = Broken_Days.ƒS.Progress.setData(Broken_Days.dataForSave, uiElement);
        // start the sequence
        Broken_Days.ƒS.Progress.go(scenes);
        Broken_Days.ƒS.Speech.hide();
    }
})(Broken_Days || (Broken_Days = {}));
///<reference path="./Main.ts"/>
var Broken_Days;
///<reference path="./Main.ts"/>
(function (Broken_Days) {
    //import * as Main from "./Main";
    Broken_Days.characters = {
        narrator: {
            name: "Erzähler",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },
        mainCharacter: {
            name: Broken_Days.dataForSave.nameProtagonist,
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "./Images/Characters/Main/Angry.png",
                happy: "./Images/Characters/Main/Happy.png",
                neutral: "./Images/Characters/Main/Neutral.png",
                sad: "./Images/Characters/Main/Sad.png",
                shoked: "./Images/Characters/Main/Shocked.png",
                surprised: "./Images/Characters/Main/Surprised.png",
                tired: "./Images/Characters/Main/Tired.png",
                asleep: "./Images/Characters/Main/Asleep.png"
            }
        }
        /* ,
        secondCharacter: {
          name: "Second",
          origin: ƒS.ORIGIN.BOTTOMCENTER,   // Ankerpunkt: Anfangsposition im Canvas, kann in der Szene umpositioniert werden
          pose: {
            angry: "Pfad.png",
            happy: "Pfad.png",
            neutral: "Pfad.png"
          }
        } */
    };
    async function UpdateName() {
        Broken_Days.characters.mainCharacter.name = Broken_Days.dataForSave.nameProtagonist;
    }
    Broken_Days.UpdateName = UpdateName;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function EndDay() {
        console.log("EndDay Scene starting");
        let text = {
            mainCharacter: {
                T0000: "Ich kann nicht glauben, dass ich dich nicht gefunden habe!",
                T0001: "Du kannst doch nicht einfach so wie vom Erdboden verschluckt sein!",
                T0002: "Ich habe Mama und Papa doch damals versprochen, dass ich immer auf dich aufpassen werde!",
                T0003: "Ich vermisse sie so sehr...",
                T0004: "Irgendwie habe ich ein ganz komisches Gefühl bei der ganzen Sache...",
                T0005: "Und jetzt bin ich auch noch sooo müde...",
                T0006: "Vielleicht sollte ich schlafen gehen, in meinem jetzigen Zustand kann ich eh nicht mehr klar denken...",
                T0007: "Morgen werde ich dich finden...",
                T0008: "Ich verspreche es dir..."
            }
        };
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.night);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.tired, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0000);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0001);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0002);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0003);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0004);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0005);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0006);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0007);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.asleep, Broken_Days.ƒS.positionPercent(25, 100));
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.yawn, 0, 2);
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T0008);
        //await ƒS.Location.show(locations.room.night);
        //await ƒS.update(4);
        await Broken_Days.fadeScene(3);
        return "NewDay";
    }
    Broken_Days.EndDay = EndDay;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Ending() {
        console.log("Ending Scene starting");
    }
    Broken_Days.Ending = Ending;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Epilogue() {
        console.log("Epilogue Scene starting");
    }
    Broken_Days.Epilogue = Epilogue;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Friend() {
        console.log("Friend Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.urbanAmbience, 1, true);
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.friend.morning);
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.friend.afternoon);
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.friend.evening);
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Freundin, wie gehts?");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Friend = Friend;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Introduction() {
        console.log("Introduction Scene starting");
        let text = {
            Narrator: {
                T001: "Hallo!",
                T002: "Willkommen zu Broken Days!",
                T003: "Bevor wir anfangen, möchte ich dich fragen, wie dein Name lautet.",
                T004: "Wie möchtest du heißen? " + "\u00A0".repeat(5)
            },
            mainCharacter: {
                T001: "<Insert Gähnen Here> Guten Morgen!",
                T002: "Oh, es ist schon 9 Uhr?! Ich muss schnell aufstehen und meine Schwester wecken!",
                T003: "Ich hoffe, sie hat heute keine schlechte Laune...",
                T004: "Nanu, wo ist sie denn?",
                T005: "Ich glaube, ich habe sie gehört. Sie ist in der Küche.",
                T006: "Hanna?!",
                T007: "Hanna, wo bist du?!",
                T008: "Das kann doch nicht sein, sie würde doch nicht einfach verschwinden ohne etwas zu sagen!"
                // -> Hanna suchen
                // -> Im Restaurant Bescheid geben, dass ich nicht zur Arbeit kommen kann - Hinweis auf Wochentag
                // -> 3 Möglichkeiten: Bei Nachbarin, in der Schule, bei ihrer Freundin
            }
        };
        //ƒS.Sound.play();
        // Bedroom
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.day);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.narrator, text.Narrator.T001);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.narrator, text.Narrator.T002);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.narrator, text.Narrator.T003);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.narrator, text.Narrator.T004);
        Broken_Days.dataForSave.nameProtagonist = await Broken_Days.ƒS.Speech.getInput();
        await Broken_Days.ƒS.update(1);
        await Broken_Days.UpdateName();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.narrator, `Hallo ${Broken_Days.characters.mainCharacter.name}!`);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T001);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T002);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T003);
        //ƒS.Speech.clear(); // blendet Text aus, Textfeld ist noch da
        //ƒS.Speech.hide(); 
        await Broken_Days.ƒS.update();
        await Broken_Days.fadeScene();
        // Hanna's Bedroom
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.hannaBedroom.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T004);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T005);
        await Broken_Days.fadeScene();
        // Kitchen
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.kitchen.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.shoked, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T006);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T007);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text.mainCharacter.T008);
        await Broken_Days.fadeScene();
        return "LocationDecision";
    }
    Broken_Days.Introduction = Introduction;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Inventory_Test() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.night);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        // await ƒS.update();
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.update();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Nanu, schon so spät?!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich muss dringend los zur Vorlesung, aber wo ist denn jetzt mein Handy?");
        let phoneSearchOptions = {
            iSayTable: "Auf meinem Schreibtisch?",
            iSayBed: "Auf meinem Bett?"
        };
        let phoneSearchElement = await Broken_Days.ƒS.Menu.getInput(phoneSearchOptions, "decision");
        switch (phoneSearchElement) {
            case phoneSearchOptions.iSayTable:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ah stimmt, ich habe es auf dem Schreibtisch abgelegt!");
                break;
            case phoneSearchOptions.iSayBed:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Richtig, es liegt auf meinem Bett!");
                break;
        }
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.mainCharacter);
        Broken_Days.ƒS.Speech.clear();
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        Broken_Days.ƒS.Inventory.add(Broken_Days.items.handy);
        await Broken_Days.ƒS.update();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Und meinen Laptop darf ich auch nicht vergessen.");
        Broken_Days.ƒS.Inventory.add(Broken_Days.items.laptop);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich nehm mir mal lieber noch ein paar Äpfel mit, sonst hab ich später wieder so nen Hunger.");
        for (let i = 0; i < 3; i++) {
            Broken_Days.ƒS.Inventory.add(Broken_Days.items.apple);
        }
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Jetzt kann ich aber endlich losgehen!");
        Broken_Days.ƒS.Speech.clear();
        //return Introduction;  	// nächste Szene die abgespielt wird
    }
    Broken_Days.Inventory_Test = Inventory_Test;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Laundry() {
        console.log("Laundry Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.landryAmbience, 0.7, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.laundry);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Waschsalon, wie gehts?");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.landryAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Laundry = Laundry;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function LocationDecision() {
        console.log("LocationDecision Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.urbanAmbience, 1, true);
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await MorningRoutine();
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await AfternoonRoutine();
                break;
            case Broken_Days.DayTime.EVENING:
                await EveningRoutine();
                break;
        }
        // check available locations (if they have been searched already, they are not available, or if they are already unlocked)
        let nextLocationAnswers = {
            iSayNeighbour: "Nachbarin",
            iSaySchool: "Schule",
            iSayFriend: "Beste Freundin"
        };
        updateLocationAnswers(nextLocationAnswers);
        let nextLocation = await Broken_Days.ƒS.Menu.getInput(nextLocationAnswers, "decision");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        switch (nextLocation) {
            case nextLocationAnswers.iSayNeighbour:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zu meiner Nachbarin.");
                await Broken_Days.trainTransition();
                return "Neighbour";
            case nextLocationAnswers.iSaySchool:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zur Schule.");
                await Broken_Days.trainTransition();
                return "School";
            case nextLocationAnswers.iSayFriend:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zu Hannas Freundin.");
                await Broken_Days.trainTransition();
                return "Friend";
            case "Waschsalon":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zum Waschsalon.");
                await Broken_Days.trainTransition();
                return "Laundry";
            case "Onsen":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zum Onsen.");
                await Broken_Days.trainTransition();
                return "Onsen";
            case "Laden":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zum Laden.");
                await Broken_Days.trainTransition();
                return "Shop";
            case "Park":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zum Park.");
                await Broken_Days.trainTransition();
                return "Park";
            case "Psychologe":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zum Psychologen.");
                await Broken_Days.trainTransition();
                return "Psychologist";
            case "Tempel":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zum Tempel.");
                await Broken_Days.trainTransition();
                return "Temple";
        }
    }
    Broken_Days.LocationDecision = LocationDecision;
    async function MorningRoutine() {
        console.log("Morning");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.morning);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Wo soll ich nur zuerst suchen?");
    }
    async function AfternoonRoutine() {
        console.log("Afternoon");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.afternoon);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Mhh, es ist schon Mittag. Wo soll ich als nächstes suchen?");
    }
    async function EveningRoutine() {
        console.log("Evening");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.evening);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Der Tag neigt sich dem Ende zu... Wo soll ich jetzt noch suchen?");
    }
    function updateLocationAnswers(nextLocationAnswers) {
        if (Broken_Days.dataForSave.locations.laundryUnlocked)
            nextLocationAnswers.iSayLaundry = "Waschsalon";
        if (Broken_Days.dataForSave.locations.onsenUnlocked)
            nextLocationAnswers.iSayOnsen = "Onsen";
        if (Broken_Days.dataForSave.locations.shopUnlocked)
            nextLocationAnswers.iSayShop = "Laden";
        if (Broken_Days.dataForSave.locations.parkUnlocked)
            nextLocationAnswers.iSayPark = "Park";
        if (Broken_Days.dataForSave.locations.psychologistUnlocked)
            nextLocationAnswers.iSayPsychologist = "Psychologe";
        if (Broken_Days.dataForSave.locations.templeUnlocked)
            nextLocationAnswers.iSayTemple = "Tempel";
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    Broken_Days.locations = {
        // room of the protagonist
        room: {
            day: {
                name: "RoomDay",
                background: "./Images/Backgrounds/Bedroom_Day.png"
            },
            evening: {
                name: "RoomEvening",
                background: "./Images/Backgrounds/Bedroom_Evening.png"
            },
            night: {
                name: "RoomNight",
                background: "./Images/Backgrounds/Bedroom_Night.png"
            }
        },
        // room of the protagonist's sister hanna
        hannaBedroom: {
            day: {
                name: "HannaBedroomDay",
                background: "./Images/Backgrounds/Bedroom_Hanna_Day.png"
            },
            night: {
                name: "HannaBedroomNight",
                background: "./Images/Backgrounds/Bedroom_Hanna_Night.png"
            }
        },
        // kitchen
        kitchen: {
            day: {
                name: "KitchenDay",
                background: "./Images/Backgrounds/Kitchen_Day.png"
            },
            night: {
                name: "KitchenNight",
                background: "./Images/Backgrounds/Kitchen_Night.png"
            }
        },
        // black screen for scene changes
        blackscreen: {
            name: "BlackScreen",
            background: "./Images/Backgrounds/blackscreen.jpg"
        },
        // train
        train: {
            name: "Train",
            background: "./Images/Backgrounds/Train.png"
        },
        // city - player decides where to go next here
        city: {
            morning: {
                name: "CityMorning",
                background: "./Images/Backgrounds/City_Morning.png"
            },
            afternoon: {
                name: "CityAfternoon",
                background: "./Images/Backgrounds/City_Afternoon.png"
            },
            evening: {
                name: "CityEvening",
                background: "./Images/Backgrounds/City_Night.png"
            }
        },
        // neighbour living room
        neighbour: {
            morning: {
                name: "NeighbourMorning",
                background: "./Images/Backgrounds/Neighbour_Morning.png",
                visited: false
            },
            afternoon: {
                name: "NeighbourAfternoon",
                background: "./Images/Backgrounds/Neighbour_Afternoon.png",
                visited: false
            },
            evening: {
                name: "NeighbourEvening",
                background: "./Images/Backgrounds/Neighbour_Evening.png",
                visited: false
            }
        },
        // school
        school: {
            morning: {
                name: "SchoolMorning",
                background: "./Images/Backgrounds/School_Morning.png"
            },
            afternoon: {
                name: "SchoolAfternoon",
                background: "./Images/Backgrounds/School_Afternoon.png"
            },
            evening: {
                name: "SchoolEvening",
                background: "./Images/Backgrounds/School_Evening.png"
            }
        },
        // friends house
        friend: {
            morning: {
                name: "FriendMorning",
                background: "./Images/Backgrounds/Friend_Morning.png"
            },
            afternoon: {
                name: "FriendAfternoon",
                background: "./Images/Backgrounds/Friend_Afternoon.png"
            },
            evening: {
                name: "FriendEvening",
                background: "./Images/Backgrounds/Friend_Evening.png"
            }
        },
        // laundromat
        laundry: {
            name: "Laundry",
            background: "./Images/Backgrounds/Laundromat.png"
        },
        // onsen
        onsen: {
            day: {
                name: "OnsenDay",
                background: "./Images/Backgrounds/Onsen_Day.png"
            },
            evening: {
                name: "OnsenEvening",
                background: "./Images/Backgrounds/Onsen_Evening.png"
            }
        },
        // shop
        shop: {
            morning: {
                name: "ShopMorning",
                background: "./Images/Backgrounds/Shop_Morning.png"
            },
            afternoon: {
                name: "ShopAfternoon",
                background: "./Images/Backgrounds/Shop_Afternoon.png"
            },
            evening: {
                name: "ShopEvening",
                background: "./Images/Backgrounds/Shop_Evening.png"
            }
        },
        // park
        park: {
            morning: {
                name: "ParkMorning",
                background: "./Images/Backgrounds/Park_Morning.png"
            },
            afternoon: {
                name: "ParkAfternoon",
                background: "./Images/Backgrounds/Park_Afternoon.png"
            },
            evening: {
                name: "ParkEvening",
                background: "./Images/Backgrounds/Park_Evening.png"
            }
        },
        // psychologist
        psychologist: {
            day: {
                name: "PsychologistDay",
                background: "./Images/Backgrounds/Psychologist_Day.png"
            },
            evening: {
                name: "PsychologistEvening",
                background: "./Images/Backgrounds/Psychologist_Evening.png"
            }
        },
        // temple
        temple: {
            morning: {
                name: "TempleMorning",
                background: "./Images/Backgrounds/Temple_Morning.png"
            },
            afternoon: {
                name: "TempleAfternoon",
                background: "./Images/Backgrounds/Temple_Afternoon.png"
            },
            evening: {
                name: "TempleEvening",
                background: "./Images/Backgrounds/Temple_Evening.png"
            }
        }
    };
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Neighbour() {
        console.log("Neighbour Scene starting");
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.neighbour.morning);
                console.log("Morning");
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.neighbour.afternoon);
                console.log("Afternoon");
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.neighbour.evening);
                console.log("Evening");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Nachbar, wie gehts?");
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Neighbour = Neighbour;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    /* async function MorningRoutine(): Promise<void> {


    } */
    async function NewDay() {
        console.log("NewDay Scene starting");
        let textDayOne = [
            "Oh man, das hat sich alles wie ein schlechter Traum angefühlt...",
            "Vielleicht war es ja wirklich nur ein Traum?"
        ];
        /* let textDayOne = {
            mainCharacter: {
                T0000: "Oh man, das hat sich alles wie ein schlechter Traum angefühlt...",
                T0001: "",
                T0002: ""
            }
        }; */
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        let text;
        if (Broken_Days.dataForSave.daysPassed == 1) {
            text = textDayOne;
        }
        for (let i = 0; i < text.length; i++) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, text[i]);
        }
    }
    Broken_Days.NewDay = NewDay;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Onsen() {
        console.log("Onsen Scene starting");
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.onsen.day);
                console.log("Day");
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.onsen.day);
                console.log("Day");
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.onsen.evening);
                console.log("Evening");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Onsen, wie gehts?");
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Onsen = Onsen;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Park() {
        console.log("Park Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.urbanAmbience, 1, true);
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.park.morning);
                console.log("Morning");
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.park.afternoon);
                console.log("Afternoon");
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.park.evening);
                console.log("Evening");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Park, wie gehts?");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Park = Park;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Psychologist() {
        console.log("Psychologist Scene starting");
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.psychologist.day);
                console.log("Day");
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.psychologist.day);
                console.log("Day");
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.psychologist.evening);
                console.log("Evening");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Psychologe, wie gehts?");
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Psychologist = Psychologist;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Restaurant() {
        console.log("Restaurant Scene starting");
    }
    Broken_Days.Restaurant = Restaurant;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function School() {
        console.log("School Scene starting");
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.morning);
                Broken_Days.ƒS.Sound.play(Broken_Days.sound.schoolAmbience, 0.7, true);
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.afternoon);
                Broken_Days.ƒS.Sound.play(Broken_Days.sound.schoolAmbience, 0.7, true);
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.evening);
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Schule, wie gehts?");
        if (Broken_Days.dataForSave.DayTime != Broken_Days.DayTime.EVENING)
            Broken_Days.ƒS.Sound.fade(Broken_Days.sound.schoolAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.School = School;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Shop() {
        console.log("Shop Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.urbanAmbience, 1, true);
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.shop.morning);
                console.log("Day");
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.shop.afternoon);
                console.log("Day");
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.shop.evening);
                console.log("Evening");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Laden, wie gehts?");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Shop = Shop;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    // sounds
    Broken_Days.sound = {
        // themes
        // SFX
        yawn: "./Audio/HumanYawn_S08HU.2522.wav",
        // ambience
        trainAmbience: "./Audio/TRAIN_MELBOURNE_PASSENGER_XTRAPOLIS_100_INTERIOR_2_STOPS_STEREO_.wav",
        templeAmbience: "./Audio/0110_JapaneseWinter_Full_MZ.wav",
        urbanAmbience: "./Audio/Traffic_amb_park_grg.wav",
        landryAmbience: "./Audio/AMB_INT_Laundry_Washer_Running_BTM00033.mp3",
        schoolAmbience: "./Audio/HighSchoolHallway_BWU.12.wav" // source: prosoundeffects.com
    };
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Temple() {
        console.log("Temple Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.templeAmbience, 1, true);
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.temple.morning);
                console.log("Day");
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.temple.afternoon);
                console.log("Day");
                break;
            case Broken_Days.DayTime.EVENING:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.temple.evening);
                console.log("Evening");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Tempel, wie gehts?");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.templeAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Temple = Temple;
})(Broken_Days || (Broken_Days = {}));
//# sourceMappingURL=Template.js.map