"use strict";
var Template;
(function (Template) {
    async function Introduction() {
        console.log("Introduction Scene starting");
        let text = {
            Narrator: {
                T001: "",
                T002: ""
            },
            mainCharacter: {
                T001: "Hello World!",
                T002: "This is a test."
            }
        };
        //ƒS.Sound.play();
        await Template.ƒS.Location.show(Template.locations.park);
        await Template.ƒS.update(Template.transitions.puzzle.duration, Template.transitions.puzzle.alpha, Template.transitions.puzzle.edge);
        await Template.ƒS.Character.show(Template.characters.mainCharacter, Template.characters.mainCharacter.pose.neutral, Template.ƒS.positionPercent(25, 100));
        await Template.ƒS.update();
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, text.mainCharacter.T001);
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, text.mainCharacter.T002);
        //await ƒS.Speech.tell(characters.mainCharacter, "Test");
        //ƒS.Speech.clear(); // blendet Text aus, Textfeld ist noch da
        Template.ƒS.Speech.hide(); // blendet Textfeld aus
        Template.ƒS.Character.hide(Template.characters.mainCharacter);
        //await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positions.bottomcenter);
        await Template.ƒS.Character.show(Template.characters.mainCharacter, Template.characters.mainCharacter.pose.happy, Template.ƒS.positionPercent(25, 100));
        await Template.ƒS.update();
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Soll es jetzt weiter gehen?");
        let firstDialogueElementAnswers = {
            iSayOk: "Okay.",
            iSayYes: "Ja gerne!",
            iSayNo: "Nö."
        };
        let firstDialogueElement = await Template.ƒS.Menu.getInput(firstDialogueElementAnswers, "individualCSSclass");
        switch (firstDialogueElement) {
            case firstDialogueElementAnswers.iSayOk:
                // continue path here
                await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Alles klar.");
                Template.ƒS.Speech.clear();
                break;
            case firstDialogueElementAnswers.iSayYes:
                // continue path here
                await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Super!");
                break;
            case firstDialogueElementAnswers.iSayNo:
                // continue path here
                await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Schade.");
                Template.ƒS.Character.hide(Template.characters.mainCharacter);
                await Template.ƒS.Character.animate(Template.characters.mainCharacter, Template.characters.mainCharacter.pose.neutral, Template.getAnimation());
                break;
        }
        Template.dataForSave.nameProtagonist = await Template.ƒS.Speech.getInput();
        // continue story after decision here
        //ƒS.Speech.setTickerDelays();
        //ƒS.Inventory.add();
    }
    Template.Introduction = Introduction;
})(Template || (Template = {}));
var Template;
(function (Template) {
    async function Inventory_Test() {
        await Template.ƒS.Location.show(Template.locations.room);
        await Template.ƒS.Character.show(Template.characters.mainCharacter, Template.characters.mainCharacter.pose.neutral, Template.ƒS.positionPercent(25, 100));
        await Template.ƒS.update(Template.transitions.puzzle.duration, Template.transitions.puzzle.alpha, Template.transitions.puzzle.edge);
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Nanu, schon so spät?!");
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Ich muss dringend los zur Vorlesung, aber wo ist denn jetzt mein Handy?");
        let phoneSearchOptions = {
            iSayTable: "Auf meinem Schreibtisch?",
            iSayBed: "Auf meinem Bett?"
        };
        let phoneSearchElement = await Template.ƒS.Menu.getInput(phoneSearchOptions, "individualCSSclass");
        switch (phoneSearchElement) {
            case phoneSearchOptions.iSayTable:
                await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Ah stimmt, ich habe es auf dem Schreibtisch abgelegt!");
                break;
            case phoneSearchOptions.iSayBed:
                await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Richtig, es liegt auf meinem Bett!");
                break;
        }
        Template.ƒS.Character.hide(Template.characters.mainCharacter);
        Template.ƒS.Speech.clear();
        await Template.ƒS.Character.show(Template.characters.mainCharacter, Template.characters.mainCharacter.pose.happy, Template.ƒS.positionPercent(25, 100));
        Template.ƒS.Inventory.add(Template.items.handy);
        await Template.ƒS.update();
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Und meinen Laptop darf ich auch nicht vergessen.");
        Template.ƒS.Inventory.add(Template.items.laptop);
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Ich nehm mir mal lieber noch ein paar Äpfel mit, sonst hab ich später wieder so nen Hunger.");
        for (let i = 0; i < 3; i++) {
            Template.ƒS.Inventory.add(Template.items.apple);
        }
        await Template.ƒS.Speech.tell(Template.characters.mainCharacter, "Jetzt kann ich aber endlich losgehen!");
        Template.ƒS.Speech.clear();
        //return Introduction;  	// nächste Szene die abgespielt wird
    }
    Template.Inventory_Test = Inventory_Test;
})(Template || (Template = {}));
var Template;
(function (Template) {
    Template.ƒ = FudgeCore;
    Template.ƒS = FudgeStory;
    console.log("Visual Novel starting");
    // transitions
    Template.transitions = {
        puzzle: {
            duration: 1,
            alpha: "/FreeTransitions/5.jpg",
            edge: 1
        }
    };
    // sounds
    Template.sound = {
        // themes
        backgroundTheme: "Pfad",
        // SFX
        click: "Pfad"
    };
    // backgrounds
    Template.locations = {
        room: {
            name: "Room",
            background: "./Images/Backgrounds/Modern-Dormroom1.png"
        },
        park: {
            name: "Park",
            background: "./Images/Backgrounds/Modern-Street1.png"
        }
    };
    Template.characters = {
        narrator: {
            name: ""
        },
        mainCharacter: {
            name: "Protagonist",
            origin: Template.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "./Images/Characters/Test/Test_Angry.png",
                happy: "./Images/Characters/Test/Test_Happy_1.png",
                neutral: "./Images/Characters/Test/Test_Neutral_1.png"
            }
        } /* ,
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
    // items
    Template.items = {
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
    Template.dataForSave = {
        nameProtagonist: "",
        score: 0
    };
    function showCredits() {
        Template.ƒS.Text.setClass("credtis"); //addClass; setClass überschreibt
        Template.ƒS.Text.print("Credits here");
    }
    Template.showCredits = showCredits;
    function getAnimation() {
        return {
            start: { translation: Template.ƒS.positions.bottomleft, rotation: -20, scaling: new Template.ƒS.Position(0.5, 1.5), color: Template.ƒS.Color.CSS("white", 0.3) },
            end: { translation: Template.ƒS.positions.bottomright, rotation: 20, scaling: new Template.ƒS.Position(1.5, 0.5), color: Template.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Template.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Template.getAnimation = getAnimation;
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
                await Template.ƒS.Progress.save();
                break;
            case inGameMenuButttons.load:
                await Template.ƒS.Progress.load();
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
            case Template.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Template.ƒS.Progress.save();
                break;
            case Template.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Template.ƒS.Progress.load();
                break;
            case Template.ƒ.KEYBOARD_CODE.M:
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
            case Template.ƒ.KEYBOARD_CODE.I:
                inventoryIsOpen = !inventoryIsOpen;
                if (inventoryIsOpen) {
                    Template.ƒS.Inventory.open();
                }
                else {
                    Template.ƒS.Inventory.close();
                }
                break;
        }
    }
    window.addEventListener("load", start);
    function start(_event) {
        gameMenu = Template.ƒS.Menu.create(inGameMenuButttons, buttonFunctionalities, "gameMenuCSSclass");
        buttonFunctionalities("Close");
        let scenes = [
            //{ scene: Scene, name: "Scene" },
            //{ scene: Introduction, name: "Introduction" }
            { scene: Template.Inventory_Test, name: "Inventory_Test" }
            //{id: "", scene: Scene, name: "Scene" , next:""}, --> next mit id ansprechen
        ];
        let uiElement = document.querySelector("[type=interface]");
        Template.dataForSave = Template.ƒS.Progress.setData(Template.dataForSave, uiElement);
        // start the sequence
        Template.ƒS.Progress.go(scenes);
    }
})(Template || (Template = {}));
var Template;
(function (Template) {
    async function Scene() {
        console.log("FudgeStory Template Scene starting");
    }
    Template.Scene = Scene;
})(Template || (Template = {}));
//# sourceMappingURL=Template.js.map