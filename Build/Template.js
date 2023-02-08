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
    async function Cemetery() {
        console.log("Cemetery Scene starting");
    }
    Broken_Days.Cemetery = Cemetery;
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
    Broken_Days.dataForSave = {
        nameProtagonist: "",
        DayTime: DayTime.MORNING
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
    async function fadeScene() {
        Broken_Days.ƒS.Location.show(Broken_Days.locations.blackscreen);
        Broken_Days.ƒS.Character.hideAll();
        Broken_Days.ƒS.Speech.hide();
        await Broken_Days.ƒS.update(1);
    }
    Broken_Days.fadeScene = fadeScene;
    async function hndLocationDecision(_scene) {
        await fadeScene();
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.train);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        Broken_Days.ƒS.update();
        // train sound
        //ƒS.Character.animate(characters.mainCharacter, characters.mainCharacter.pose.neutral, getTrainAnimation());
        await Broken_Days.ƒS.Progress.delay(5);
        await fadeScene();
        return _scene;
    }
    Broken_Days.hndLocationDecision = hndLocationDecision;
    async function hndNextLocation() {
        if (Broken_Days.dataForSave.DayTime != DayTime.EVENING) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich sollte meine Suche jetzt besser fortsetzen.");
            UpdateDayTime();
            await fadeScene();
            return "LocationDecision";
        }
        // Evening
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Es ist schon spät... Ich sollte jetzt besser nach Hause gehen.");
        UpdateDayTime();
        await fadeScene();
        return "EndDay";
    }
    Broken_Days.hndNextLocation = hndNextLocation;
    function getTrainAnimation() {
        return {
            start: { translation: Broken_Days.ƒS.positionPercent(75, 90), rotation: 0, scaling: new Broken_Days.ƒS.Position(1, 1) },
            end: { translation: Broken_Days.ƒS.positionPercent(75, 100), rotation: 0, scaling: new Broken_Days.ƒS.Position(1, 1) },
            duration: 0.5,
            playmode: Broken_Days.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Broken_Days.getTrainAnimation = getTrainAnimation;
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
            { id: "Friend", scene: Broken_Days.Friend, name: "Friend" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Broken_Days.dataForSave = Broken_Days.ƒS.Progress.setData(Broken_Days.dataForSave, uiElement);
        // start the sequence
        Broken_Days.ƒS.Progress.go(scenes);
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
                shoked: "./Images/Characters/Main/Shoked.png",
                surprised: "./Images/Characters/Main/Surprised.png",
                tired: "./Images/Characters/Main/Tired.png"
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
                T002: "Oh, es ist schon 9 Uhr?! Ich muss schnell aufstehen und meine Schwester wecken!"
            }
        };
        //ƒS.Sound.play();
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
        //await ƒS.Speech.tell(characters.mainCharacter, "Test");
        //ƒS.Speech.clear(); // blendet Text aus, Textfeld ist noch da
        Broken_Days.ƒS.Speech.hide(); // blendet Textfeld aus
        //ƒS.Character.hide(characters.mainCharacter);
        //await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positions.bottomcenter);
        await Broken_Days.ƒS.update();
        /* await ƒS.Speech.tell(characters.mainCharacter, "Soll es jetzt weiter gehen?");
    
        let firstDialogueElementAnswers = {
          iSayOk: "Okay.",
          iSayYes: "Ja gerne!",
          iSayNo: "Nö."
        };
    
        let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementAnswers, "decision");
    
        switch (firstDialogueElement) {
          case firstDialogueElementAnswers.iSayOk:
            // continue path here
            await ƒS.Speech.tell(characters.mainCharacter, "Alles klar.");
            ƒS.Speech.clear();
            break;
          case firstDialogueElementAnswers.iSayYes:
            // continue path here
            await ƒS.Speech.tell(characters.mainCharacter, "Super!");
            break;
          case firstDialogueElementAnswers.iSayNo:
            // continue path here
            await ƒS.Speech.tell(characters.mainCharacter, "Schade.");
            ƒS.Character.hide(characters.mainCharacter);
            await ƒS.Character.animate(characters.mainCharacter, characters.mainCharacter.pose.neutral, getAnimation());
            break;
        } */
        // continue story after decision here
        //ƒS.Speech.setTickerDelays();
        //ƒS.Inventory.add();
        /*  ƒS.Character.hide(characters.mainCharacter);
         // show black screen for transition
         ƒS.update(); */
        // put in a scene for changing location and handling the daytime transition
        await Broken_Days.fadeScene();
        //await ƒS.update(1);
        /* await ƒS.Location.show(locations.city.morning);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update();
        await ƒS.Speech.tell(characters.mainCharacter, "Wo soll ich nur zuerst suchen?");
    
        let nextLocationAnswers = {
          iSayNeighbour: "Nachbarin",
          iSaySchool: "Schule",
          iSayFriend: "Beste Freundin"
        };
    
        let nextLocation = await ƒS.Menu.getInput(nextLocationAnswers, "decision");
    
        switch (nextLocation) {
          case nextLocationAnswers.iSayNeighbour:
            await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu meiner Nachbarin.");
            await fadeScene();
            return "Neighbour";
          case nextLocationAnswers.iSaySchool:
            await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zur Schule.");
            await fadeScene();
            return "School";
          case nextLocationAnswers.iSayFriend:
            await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu meiner besten Freundin.");
            await fadeScene();
            return "Friend";
        }
      } */
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
    async function Laundromat() {
        console.log("Laundromat Scene starting");
    }
    Broken_Days.Laundromat = Laundromat;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
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
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Wo soll ich als nächstes suchen?");
    }
    async function EveningRoutine() {
        console.log("Evening");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.evening);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Der Tag neigt sich dem Ende zu... Wo soll ich jetzt noch suchen?");
    }
    async function LocationDecision() {
        console.log("LocationDecision Scene starting");
        switch (Broken_Days.dataForSave.DayTime) {
            case Broken_Days.DayTime.MORNING:
                //await ƒS.Location.show(locations.city.morning);
                await MorningRoutine();
                break;
            case Broken_Days.DayTime.AFTERNOON:
                //await ƒS.Location.show(locations.city.afternoon);
                await AfternoonRoutine();
                break;
            case Broken_Days.DayTime.EVENING:
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
        let nextLocation = await Broken_Days.ƒS.Menu.getInput(nextLocationAnswers, "decision");
        switch (nextLocation) {
            case nextLocationAnswers.iSayNeighbour:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zu meiner Nachbarin.");
                //await fadeScene();
                //return "Neighbour";
                await Broken_Days.hndLocationDecision("Neighbour");
                break;
            case nextLocationAnswers.iSaySchool:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zur Schule.");
                //await fadeScene();
                //return "School";
                await Broken_Days.hndLocationDecision("School");
                break;
            case nextLocationAnswers.iSayFriend:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Ich gehe zu Hannas Freundin.");
                //await fadeScene();
                //return "Friend";
                await Broken_Days.hndLocationDecision("Friend");
                break;
        }
    }
    Broken_Days.LocationDecision = LocationDecision;
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
                background: "./Images/Backgrounds/City_Evening.png"
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
                background: "./Images/Backgrounds/School_Morning.png",
                visited: false
            },
            afternoon: {
                name: "SchoolAfternoon",
                background: "./Images/Backgrounds/School_Afternoon.png",
                visited: false
            }
        },
        // friends house
        friend: {
            morning: {
                name: "FriendMorning",
                background: "./Images/Backgrounds/Friend_Morning.png",
                visited: false
            },
            afternoon: {
                name: "FriendAfternoon",
                background: "./Images/Backgrounds/Friend_Afternoon.png",
                visited: false
            },
            evening: {
                name: "FriendEvening",
                background: "./Images/Backgrounds/Friend_Evening.png",
                visited: false
            }
        },
        // laundromat
        laundromat: {
            name: "Laundromat",
            background: "./Images/Backgrounds/Laundromat.png"
        }
    };
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function MusicSchool() {
        console.log("MusicSchool Scene starting");
    }
    Broken_Days.MusicSchool = MusicSchool;
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
    async function NewDay() {
        console.log("NewDay Scene starting");
    }
    Broken_Days.NewDay = NewDay;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Psychologist() {
        console.log("Psychologist Scene starting");
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
                break;
            case Broken_Days.DayTime.AFTERNOON:
                await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.afternoon);
                break;
            case Broken_Days.DayTime.EVENING:
                //await ƒS.Location.show(locations.school.evening);
                console.log("Evening not implemented yet");
                break;
        }
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.mainCharacter, Broken_Days.characters.mainCharacter.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.mainCharacter, "Hallo Schule, wie gehts?");
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.School = School;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Shop() {
        console.log("Shop Scene starting");
    }
    Broken_Days.Shop = Shop;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    // sounds
    Broken_Days.sound = {
        // themes
        backgroundTheme: "Pfad",
        // SFX
        click: "Pfad"
    };
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Temple() {
        console.log("Temple Scene starting");
    }
    Broken_Days.Temple = Temple;
})(Broken_Days || (Broken_Days = {}));
//# sourceMappingURL=Template.js.map