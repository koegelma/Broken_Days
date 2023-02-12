"use strict";
var Broken_Days;
(function (Broken_Days) {
    Broken_Days.ƒ = FudgeCore;
    Broken_Days.ƒS = FudgeStory;
    function openMeter() {
        if (Broken_Days.despairMeter != null && Broken_Days.despair != null) {
            Broken_Days.despairMeter.hidden = false;
            Broken_Days.despair.hidden = false;
        }
    }
    Broken_Days.openMeter = openMeter;
    function closeMeter() {
        if (Broken_Days.despairMeter != null && Broken_Days.despair != null) {
            Broken_Days.despairMeter.hidden = true;
            Broken_Days.despair.hidden = true;
        }
    }
    Broken_Days.closeMeter = closeMeter;
    let DayTime;
    (function (DayTime) {
        DayTime[DayTime["MORNING"] = 0] = "MORNING";
        DayTime[DayTime["AFTERNOON"] = 1] = "AFTERNOON";
        DayTime[DayTime["EVENING"] = 2] = "EVENING";
    })(DayTime = Broken_Days.DayTime || (Broken_Days.DayTime = {}));
    const dayTimes = [DayTime.MORNING, DayTime.AFTERNOON, DayTime.EVENING];
    Broken_Days.dataForSave = {
        nameProtagonist: "",
        DayTime: DayTime.MORNING,
        daysPassed: 0,
        dayTimeIndex: 0,
        despair: 0,
        yourDespair: "0 Verzweiflung",
        decisions: {
            calledWork: false
        },
        locations: {
            laundryUnlocked: false,
            onsenUnlocked: false,
            shopUnlocked: false,
            parkUnlocked: false,
            psychologistUnlocked: false,
            templeUnlocked: false
        },
        puzzlePieces: {
            puzzle1Unlocked: false,
            puzzle2Unlocked: false,
            puzzle3Unlocked: false
        },
        endingDecisions: {
            ending1: false,
            ending2: false
        }
    };
    async function UpdateDayTime() {
        Broken_Days.dataForSave.dayTimeIndex = (Broken_Days.dataForSave.dayTimeIndex + 1) % dayTimes.length;
        if (Broken_Days.dataForSave.dayTimeIndex === 0) {
            Broken_Days.dataForSave.daysPassed++;
            console.log("New day! " + Broken_Days.dataForSave.daysPassed + " days passed.");
            increaseDespair(20);
        }
        Broken_Days.dataForSave.DayTime = dayTimes[Broken_Days.dataForSave.dayTimeIndex];
    }
    Broken_Days.UpdateDayTime = UpdateDayTime;
    async function increaseDespair(_amount) {
        Broken_Days.dataForSave.despair += _amount;
        if (Broken_Days.dataForSave.despair > 100)
            Broken_Days.dataForSave.despair = 100;
        Broken_Days.dataForSave.yourDespair = Broken_Days.dataForSave.despair + " Verzweiflung";
    }
    Broken_Days.increaseDespair = increaseDespair;
    function decreaseDespair(_amount) {
        Broken_Days.dataForSave.despair -= _amount;
        if (Broken_Days.dataForSave.despair < 0)
            Broken_Days.dataForSave.despair = 0;
        Broken_Days.dataForSave.yourDespair = Broken_Days.dataForSave.despair + " Verzweiflung";
    }
    Broken_Days.decreaseDespair = decreaseDespair;
    async function triggerBadEnding() {
        fadeScene(5);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das hat doch alles keinen Sinn mehr...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich werde Hanna nie finden...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, "Du hast das Ende der Geschichte erreicht.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, "Du hast Hanna nicht rechtzeitig gefunden und hast dich selbst aufgegeben.");
        await Broken_Days.ƒS.Progress.delay(9999);
    }
    Broken_Days.triggerBadEnding = triggerBadEnding;
    function showCredits() {
        Broken_Days.ƒS.Text.setClass("credits"); //addClass; setClass überschreibt
        Broken_Days.ƒS.Text.print("Credits: <br/> <br/>" +
            "Character sheets: https://shatteredreality.itch.io/sutemo<br/> <br/>" +
            "Backgrounds: https://noranekogames.itch.io/yumebackground <br/> <br/>" +
            "Theme Music:https://freesound.org/people/zagi2/sounds/391828/ <br/> <br/>" +
            "Additional Sounds: prosoundeffects.com <br/> <br/>");
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
    // transitions
    Broken_Days.transitions = {
        puzzle: {
            duration: 1,
            alpha: "./FreeTransitions/5.jpg",
            edge: 1
        }
    };
    async function trainTransition() {
        await fadeScene();
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.train);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        Broken_Days.ƒS.update();
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.trainAmbience, 1);
        await Broken_Days.ƒS.Progress.delay(5);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        Broken_Days.ƒS.Character.animate(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, getTrainAnimation());
        await Broken_Days.ƒS.Progress.delay(3);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(73, 100));
        Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Progress.delay(2);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.trainAmbience, 0, 1);
        await fadeScene(2);
    }
    Broken_Days.trainTransition = trainTransition;
    async function hndTransition() {
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
    }
    Broken_Days.hndTransition = hndTransition;
    async function fadeScene(_duration = 1) {
        Broken_Days.ƒS.Location.show(Broken_Days.locations.blackscreen);
        Broken_Days.ƒS.Character.hideAll();
        Broken_Days.ƒS.Speech.hide();
        await Broken_Days.ƒS.update(_duration);
    }
    Broken_Days.fadeScene = fadeScene;
    async function hndNextLocation() {
        if (Broken_Days.dataForSave.DayTime != DayTime.EVENING) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich sollte meine Suche jetzt besser fortsetzen.");
            UpdateDayTime();
            await fadeScene();
            return "LocationDecision";
        }
        // Evening
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Es ist schon so spät... Ich sollte jetzt besser nach Hause gehen und dort schauen.");
        UpdateDayTime();
        await fadeScene();
        return "EndDay";
    }
    Broken_Days.hndNextLocation = hndNextLocation;
    function allPiecesRecieved() {
        if (Broken_Days.dataForSave.puzzlePieces.puzzle1Unlocked && Broken_Days.dataForSave.puzzlePieces.puzzle2Unlocked && Broken_Days.dataForSave.puzzlePieces.puzzle3Unlocked) {
            console.log("All pieces recieved! Piece1: " + Broken_Days.dataForSave.puzzlePieces.puzzle1Unlocked + " Piece2: " + Broken_Days.dataForSave.puzzlePieces.puzzle2Unlocked + " Piece3: " + Broken_Days.dataForSave.puzzlePieces.puzzle3Unlocked);
            return true;
        }
        console.log("Not all pieces recieved!Piece1: " + Broken_Days.dataForSave.puzzlePieces.puzzle1Unlocked + " Piece2: " + Broken_Days.dataForSave.puzzlePieces.puzzle2Unlocked + " Piece3: " + Broken_Days.dataForSave.puzzlePieces.puzzle3Unlocked);
        return false;
    }
    Broken_Days.allPiecesRecieved = allPiecesRecieved;
    // menu
    // buttons
    let inGameMenuButttons = {
        save: "Speichern",
        load: "Laden",
        volumeUp: "Vol +",
        volumeDown: "Vol -",
        credits: "Credits",
        inventory: "Inventar",
        close: "Schließen"
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
            case inGameMenuButttons.volumeUp:
                VolumeUp();
                break;
            case inGameMenuButttons.volumeDown:
                VolumeDown();
                break;
            case inGameMenuButttons.credits:
                showCredits();
                break;
            case inGameMenuButttons.inventory:
                await openInventory();
                break;
            case inGameMenuButttons.close:
                gameMenu.close();
                menuIsOpen = false;
                break;
        }
    }
    async function openInventory() {
        const selectedItems = await Broken_Days.ƒS.Inventory.open();
        if (selectedItems && selectedItems.length > 0) {
            selectedItems.forEach((s) => {
                Object.keys(Broken_Days.items).forEach((i) => {
                    const item = Broken_Days.items[i];
                    if (item.name === s) {
                        Broken_Days.showHannasMessages(item.number);
                        Broken_Days.ƒS.Inventory.add(item);
                    }
                });
            });
        }
    }
    Broken_Days.openInventory = openInventory;
    let volume = 1;
    function VolumeUp() {
        volume += 0.1;
        if (volume > 2) {
            volume = 2;
            return;
        }
        Broken_Days.ƒS.Sound.setMasterVolume(volume);
    }
    Broken_Days.VolumeUp = VolumeUp;
    function VolumeDown() {
        volume -= 0.1;
        if (volume < 0) {
            volume = 0;
            return;
        }
        Broken_Days.ƒS.Sound.setMasterVolume(volume);
    }
    Broken_Days.VolumeDown = VolumeDown;
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
                    //ƒS.Inventory.open();
                    await openInventory();
                    break;
                }
        }
    }
    window.addEventListener("load", start);
    function start(_event) {
        Broken_Days.despairMeter = document.getElementById("despair");
        Broken_Days.despair = document.getElementById("yourDespair");
        gameMenu = Broken_Days.ƒS.Menu.create(inGameMenuButttons, buttonFunctionalities, "gameMenu");
        buttonFunctionalities("Close");
        Broken_Days.ƒS.Sound.setMasterVolume(volume);
        let scenes = [
            { scene: Broken_Days.Introduction, name: "Introduction" },
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
            { id: "Ending", scene: Broken_Days.Ending, name: "Ending" },
            { id: "Epilogue", scene: Broken_Days.Epilogue, name: "Epilogue" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Broken_Days.dataForSave = Broken_Days.ƒS.Progress.setData(Broken_Days.dataForSave, uiElement);
        // start the sequence
        Broken_Days.ƒS.Progress.go(scenes);
        Broken_Days.ƒS.Speech.hide();
        closeMeter();
    }
})(Broken_Days || (Broken_Days = {}));
///<reference path="./Main.ts"/>
var Broken_Days;
///<reference path="./Main.ts"/>
(function (Broken_Days) {
    Broken_Days.characters = {
        Narrator: {
            name: "Erzähler",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },
        Blank: {
            name: " ",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },
        Protagonist: {
            name: Broken_Days.dataForSave.nameProtagonist,
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "./Images/Characters/Protagonist/Angry.png",
                happy: "./Images/Characters/Protagonist/Happy.png",
                neutral: "./Images/Characters/Protagonist/Neutral.png",
                sad: "./Images/Characters/Protagonist/Sad.png",
                shocked: "./Images/Characters/Protagonist/Shocked.png",
                surprised: "./Images/Characters/Protagonist/Surprised.png",
                tired: "./Images/Characters/Protagonist/Tired.png",
                asleep: "./Images/Characters/Protagonist/Asleep.png"
            }
        },
        Hanna: {
            name: "Hanna",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Hanna/Neutral.png",
                happy: "./Images/Characters/Hanna/Happy.png"
            }
        },
        Takashi: {
            name: "Takashi",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Takashi/Neutral.png"
            }
        },
        Etsuko: {
            name: "Etsuko",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Etsuko/Neutral.png",
                optimistic: "./Images/Characters/Etsuko/Optimistic.png",
                sad: "./Images/Characters/Etsuko/Sad.png",
                surprised: "./Images/Characters/Etsuko/Surprised.png"
            }
        },
        Kana: {
            name: "Kana",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Kana/Neutral.png",
                surprised: "./Images/Characters/Kana/Surprised.png"
            }
        },
        Saito: {
            name: "Herr Saito",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Saito/Neutral.png",
                sad: "./Images/Characters/Saito/Sad.png"
            }
        },
        Yamato: {
            name: "Herr Yamato",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Yamato/Neutral.png"
            }
        },
        Kenzo: {
            name: "Kenzo",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                happy: "./Images/Characters/Kenzo/Happy.png",
                neutral: "./Images/Characters/Kenzo/Neutral.png",
                surprised: "./Images/Characters/Kenzo/Surprised.png",
                sad: "./Images/Characters/Kenzo/Sad.png"
            }
        },
        DrKimura: {
            name: "Dr. Kimura",
            origin: Broken_Days.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/DrKimura/Neutral.png"
            }
        }
    };
    function UpdateName() {
        Broken_Days.characters.Protagonist.name = Broken_Days.dataForSave.nameProtagonist;
    }
    Broken_Days.UpdateName = UpdateName;
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
                background: "./Images/Backgrounds/Neighbour_Morning.png"
            },
            afternoon: {
                name: "NeighbourAfternoon",
                background: "./Images/Backgrounds/Neighbour_Afternoon.png"
            },
            evening: {
                name: "NeighbourEvening",
                background: "./Images/Backgrounds/Neighbour_Evening.png"
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
        // laundry
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
        },
        // restaurant
        restaurant: {
            name: "Restaurant",
            background: "./Images/Backgrounds/Restaurant.png"
        }
    };
})(Broken_Days || (Broken_Days = {}));
///<reference path="./Main.ts"/>
var Broken_Days;
///<reference path="./Main.ts"/>
(function (Broken_Days) {
    // items
    Broken_Days.items = {
        puzzlePiece1: {
            name: "Puzzlestück 1",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 1
        },
        puzzlePiece2: {
            name: "Puzzlestück 2",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 2
        },
        puzzlePiece3: {
            name: "Puzzlestück 3",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 3
        },
        puzzlePiece4: {
            name: "Puzzlestück 4",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 4
        }
    };
    Broken_Days.puzzleMessages = {
        puzzle1text: "Weißt du noch, als wir als Kinder immer im Park herumgetollt haben? Ich denke oft an diese Zeit zurück. Es tut mir leid, dass wir uns nicht sehen können, aber ich bin immer bei dir. Pass auf dich auf, Hanna.",
        puzzle2text: "Ich war heute Morgen im Onsen und dachte an dich. Du hast mir einmal gesagt, dass das Wasser heilende Kräfte hat. Dieser Gedanke gibt mir Kraft. Du musst jetzt stark bleiben und dich um dich selbst kümmern, für uns beide, Hanna.",
        puzzle3text: "Ich bin gerade im Tempel und denke an unsere Kindheit. Erinnerst du dich noch an die Geschichten, die unser Vater immer erzählt hat? Ich hoffe, dass sie dich trösten, wenn du an mich denkst, Hanna.",
        puzzle4text: "Ich hoffe du machst dir nicht zu große Sorgen. Ich weiß, dass du immer noch nach mir suchst und ich danke dir dafür. Es ist nun aber an der Zeit, dass du die Wahrheit verstehst. Komm zu meinem Zimmer, ich warte auf dich. In Liebe, Hanna."
    };
    function showHannasMessages(_number) {
        Broken_Days.ƒS.Text.setClass("hannaMessage");
        let text;
        switch (_number) {
            case 1:
                text = Broken_Days.puzzleMessages.puzzle1text;
                break;
            case 2:
                text = Broken_Days.puzzleMessages.puzzle2text;
                break;
            case 3:
                text = Broken_Days.puzzleMessages.puzzle3text;
                break;
            case 4:
                text = Broken_Days.puzzleMessages.puzzle4text;
                break;
        }
        Broken_Days.ƒS.Text.print(text);
        console.log("showHannasMessages");
    }
    Broken_Days.showHannasMessages = showHannasMessages;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    Broken_Days.sound = {
        // themes
        kotoTheme: "./Audio/391828__zagi2__koto-theme.wav",
        // SFX
        yawn: "./Audio/HumanYawn_S08HU.2522.wav",
        phoneVibrate: "./Audio/CellPhoneVibrate_BWU.554.wav",
        phoneOutgoing: "./Audio/CellPhoneRing_short.wav",
        phoneTurnedOff: "./Audio/Phone,Speaker,OffTheHook.wav",
        // ambience
        trainAmbience: "./Audio/TRAIN_MELBOURNE_PASSENGER_XTRAPOLIS_100_INTERIOR_2_STOPS_STEREO_.wav",
        templeAmbience: "./Audio/0110_JapaneseWinter_Full_MZ.wav",
        urbanAmbience: "./Audio/Traffic_amb_park_grg.wav",
        landryAmbience: "./Audio/AMB_INT_Laundry_Washer_Running_BTM00033.mp3",
        schoolAmbience: "./Audio/HighSchoolHallway_BWU.12.wav",
        onsenAmbience: "./Audio/SwimmingPoolAmb_S08SP.864.wav",
        restaurantAmbience: "./Audio/RestaurantCrowd_S08AM.55.wav",
        finalAmbience: "./Audio/Ambience_Blue_Mountains_Early_morning01_Stereo.wav" // source: prosoundeffects.com
    };
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function ApartmentEnd() {
        console.log("ApartmentEnd Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 1);
    }
    Broken_Days.ApartmentEnd = ApartmentEnd;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function EndDay() {
        console.log("EndDay Scene starting");
        let textDayOne = [
            "Hier ist sie auch nicht!",
            "...",
            "Ich kann nicht glauben, dass ich dich nicht gefunden habe!",
            "Du kannst doch nicht einfach so wie vom Erdboden verschluckt sein!",
            "Ich habe Mama und Papa doch damals versprochen, dass ich immer auf dich aufpassen werde!",
            "Ich vermisse die beiden so sehr...",
            "Irgendwie habe ich ein ganz komisches Gefühl bei der ganzen Sache...",
            "Und jetzt bin ich auch noch sooo müde...",
            "Ich sollte wach bleiben für den Fall, dass Hanna noch auftaucht...",
            "Moment mal, wieso fühle ich mich plötzlich so komisch?",
            "Irgendwas passiert hier gerade..."
        ];
        let textDayRepeating = [
            "Ich habe sie schon wieder nicht gefunden!",
            "Das kann doch nicht wahr sein!",
            "Und jetzt fängt es schon wieder an...",
            "Bitte nicht noch einmal..."
        ];
        let text;
        if (Broken_Days.dataForSave.daysPassed === 1)
            text = textDayOne;
        else
            text = textDayRepeating;
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.night);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.tired, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        for (let i = 0; i < text.length; i++) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text[i]);
        }
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.asleep, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Egal, was auch passiert...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich werde dich finden, Hanna...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich verspreche es dir...");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 1);
        await Broken_Days.fadeScene(3);
        return "NewDay";
    }
    Broken_Days.EndDay = EndDay;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Ending() {
        console.log("Ending Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.hannaBedroom.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna? Hanna? Bist du da?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna?!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "...");
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Hanna, Broken_Days.characters.Hanna.pose.happy, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Hey " + Broken_Days.dataForSave.nameProtagonist + ", du bist ja wieder da!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna! Bist du es wirklich? Was ist hier los? Wo warst du denn?");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Hanna);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Hanna, Broken_Days.characters.Hanna.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, Broken_Days.dataForSave.nameProtagonist + ", du willst es noch immer nicht glauben, oder?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Was soll ich denn glauben? Ich bin doch in deinem Zimmer! Du bist doch hier! Was soll ich denn da nicht glauben?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, Broken_Days.dataForSave.nameProtagonist + ", du bist in einem Traum. Alles, was du hier erlebst, ist nicht real.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Aber es hilft dir, mit meinem Tod umzugehen.");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.shocked, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Aber wie kann das sein? Warum bist du gestorben?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Das ist jetzt nicht wichtig. Was wichtig ist, ist, dass du weißt, dass ich immer bei dir sein werde, egal was passiert. Und dass du weißt, dass du weiterleben und glücklich sein kannst!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "...");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.sad, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich weiß nicht, ob ich das kann.");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Hanna);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Hanna, Broken_Days.characters.Hanna.pose.happy, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Natürlich kannst du das. Du bist stark und tapfer. Und ich bin hier, um dir zu helfen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Du hast so viel zu bieten und so viele Möglichkeiten. Denk an all die Träume und Ziele, die du verfolgen wolltest bevor unsere Eltern verstorben sind.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "...");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.tired, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Was passiert jetzt?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Jetzt hast du die Wahl. Du kannst hier in der Stadt bleiben und dein Leben wie gewohnt weiterleben oder du kannst deinem Traum folgen und für ein Studium wegziehen. Die Entscheidung liegt ganz bei dir.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich weiß nicht, was ich tun soll.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Das ist okay. Du hast Zeit, um darüber nachzudenken. Aber denke daran, dass ich immer bei dir bin, egal was du tust. Und dass ich stolz auf dich bin, ganz egal wie du dich entscheidest.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich danke dir Hanna...");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich denke, ich weiß jetzt, was ich tun muss.");
        let nextFinalDecisionAnswers = {
            stay: "Ich bleibe hier und lebe mein Leben wie gewohnt.",
            go: "Ich folge meinem Traum und ziehe weg."
        };
        let finalDecision = await Broken_Days.ƒS.Menu.getInput(nextFinalDecisionAnswers, "decision");
        switch (finalDecision) {
            case nextFinalDecisionAnswers.stay:
                Broken_Days.dataForSave.endingDecisions.ending1 = true;
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich bleibe hier und lebe mein Leben wie gewohnt.");
                break;
            case nextFinalDecisionAnswers.go:
                Broken_Days.dataForSave.endingDecisions.ending2 = true;
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich folge meinem Traum und ziehe weg.");
                break;
        }
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Das freut mich zu hören. Und jetzt ist es an der Zeit Abschied zu nehmen. Denke daran, dass ich dich immer lieben werde und ich immer bei dir bin.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Hanna, "Und jetzt wach endlich auf und lebe dein Leben!");
        await Broken_Days.ƒS.Character.hide(Broken_Days.characters.Hanna);
        await Broken_Days.ƒS.update(3);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 5);
        await Broken_Days.fadeScene(5);
        return "Epilogue";
    }
    Broken_Days.Ending = Ending;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Epilogue() {
        console.log("Epilogue Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.finalAmbience, 1, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.day);
        if (Broken_Days.dataForSave.endingDecisions.ending1)
            await Ending1();
        else
            await Ending2();
    }
    Broken_Days.Epilogue = Epilogue;
    async function Ending1() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich kann einfach nicht fortgehen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hier habe ich meine Vergangenheit, meine Wurzeln.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hier habe ich das Restaurant, in dem ich arbeite, und hier kann ich das Grab meiner Eltern und meiner Schwester besuchen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich kann ihnen nicht den Rücken kehren.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich weiß, dass ich irgendwann weiterziehen muss, aber jetzt noch nicht.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich bin noch nicht bereit dafür.");
        await Broken_Days.fadeScene(3);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, "Ende.");
        await Broken_Days.ƒS.Progress.delay(9999);
    }
    Broken_Days.Ending1 = Ending1;
    async function Ending2() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich kann es kaum glauben, aber ich bin bereit für einen Neuanfang.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich bin bereit endlich loszulassen und meinen eigenen Träumen zu folgen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Es wird nicht einfach, aber ich weiß, dass Hanna und meine Eltern immer bei mir sein werden.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich bin bereit, die Stadt zu verlassen und mein neues Leben zu beginnen.");
        await Broken_Days.fadeScene(3);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, "Ende.");
        await Broken_Days.ƒS.Progress.delay(9999);
    }
    Broken_Days.Ending2 = Ending2;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Friend() {
        console.log("Friend Scene starting");
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
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Friend = Friend;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.friend.morning);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Kana scheint nicht zuhause zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }
    async function AfternoonRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.friend.afternoon);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Kana scheint nicht zuhause zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }
    async function EveningRoutine() {
        // --> unlock shop
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.friend.evening);
        Broken_Days.hndTransition();
        if (!Broken_Days.dataForSave.locations.shopUnlocked)
            await FirstVisit();
        else
            await RecurringVisit();
    }
    async function FirstVisit() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kana, Broken_Days.characters.Kana.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Hey, " + Broken_Days.dataForSave.nameProtagonist + ". Was machst du denn hier?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Kana, hast du Hanna gesehen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich habe sie schon überall gesucht, aber ich finde sie nicht.");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Kana);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kana, Broken_Days.characters.Kana.pose.surprised, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Hanna? Was ist denn mit ihr? Geht es ihr wieder nicht gut?");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Wieso denn wieder nicht gut?!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Aber nein, sie ist nicht krank. Ich kann sie nur nicht erreichen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Oh, nein. Ich habe sie leider schon länger nicht gesehen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hast du eine Ahnung wo sie sein könnte?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Mhh...");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Kana);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kana, Broken_Days.characters.Kana.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Wir gehen oft zusammen in den Gemischtwarenladen von Herrn Yamamoto, vielleicht findest du sie dort?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Hanna und ich kaufen uns dort oft Süßigkeiten und Snacks.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Wir sprechen oft mit Herrn Yamamoto und er ist sehr freundlich, manchmal schenkt er uns sogar Dinge oder lässt uns etwas neues ausprobieren.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Danke Kana, ich werde dort mal schauen.");
        Broken_Days.dataForSave.locations.shopUnlocked = true;
    }
    async function RecurringVisit() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kana, Broken_Days.characters.Kana.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Hey, du bist ja schon wieder da. Hast du Hanna gefunden?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, leider noch nicht.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Oh schade... Aber wenn sie sich bei mir meldet, dann sag ich dir Bescheid.");
        if (!Broken_Days.dataForSave.locations.templeUnlocked)
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kana, "Du solltest aber mal im Gemischtwarenladen von Herrn Yamamoto vorbeischauen. Vielleicht war sie dort.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ok, danke Kana.");
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Introduction() {
        console.log("Introduction Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
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
                T003: "Ich hoffe, sie kommt nicht wieder zu spät zur Schule...",
                T004: "Nanu, wo ist sie denn?",
                T005: "Ich glaube, ich habe sie gehört. Sie ist in der Küche.",
                T006: "Hanna?!",
                T007: "Hanna, wo bist du?!",
                T008: "Das kann doch nicht sein, sie würde doch nicht einfach verschwinden ohne etwas zu sagen!",
                T009: "Ich sollte mal versuchen sie anzurufen...",
                T010: "Mist, sie hat ihr Telefon ausgeschaltet.",
                T011: "Ich muss sie schnell finden, in 2 Stunden muss ich zur Arbeit!",
                T012: "Vielleicht sollte ich lieber schon mal auf der Arbeit anrufen und Bescheid sagen, dass ich nicht kommen kann?",
                T013: "Mhh, wo könnte sie sein?",
                T014: "Sie könnte schon zur Schule gegangen sein?",
                T015: "Vielleicht ist sie aber auch bei unserer früheren Nachbarin Etsuko?",
                T016: "Oder sie ist bei ihrer Freundin Kana?",
                T017: "Ich sollte mich jetzt besser schnell auf die Suche machen."
            },
            blank: {
                T001: "..."
            }
        };
        // Bedroom
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.day);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, text.Narrator.T001);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, text.Narrator.T002);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, text.Narrator.T003);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, text.Narrator.T004);
        Broken_Days.dataForSave.nameProtagonist = await Broken_Days.ƒS.Speech.getInput();
        await Broken_Days.ƒS.update(1);
        Broken_Days.UpdateName();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Narrator, `Hallo ${Broken_Days.characters.Protagonist.name}!`);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.yawn, 0, 2);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T001);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T002);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T003);
        await Broken_Days.ƒS.update();
        await Broken_Days.fadeScene();
        // Hanna's Bedroom
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.hannaBedroom.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T004);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T005);
        await Broken_Days.fadeScene();
        // Kitchen
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.kitchen.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.shocked, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T006);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T007);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T008);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T009);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, text.blank.T001);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.phoneTurnedOff, 0, 4);
        await Broken_Days.ƒS.Progress.delay(4);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T010);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T011);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T012);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.angry, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        let callWorkAnswers = {
            iSayYes: "Ich rufe besser an",
            iSayNo: "Ich habe jetzt keine Zeit anzurufen"
        };
        let nextLocation = await Broken_Days.ƒS.Menu.getInput(callWorkAnswers, "decision");
        switch (nextLocation) {
            case callWorkAnswers.iSayYes:
                await CallWorkDecision();
                break;
            case callWorkAnswers.iSayNo:
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich habe jetzt keine Zeit dafür, ich muss sie finden!");
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Heute ist Montag, da ist normal eh nicht viel los. Es wird bestimmt kein Problem sein, wenn ich später komme.");
                break;
        }
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T013);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T014);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T015);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T016);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text.mainCharacter.T017);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 1);
        await Broken_Days.fadeScene();
        return "LocationDecision";
    }
    Broken_Days.Introduction = Introduction;
    async function CallWorkDecision() {
        Broken_Days.dataForSave.decisions.calledWork = true;
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich rufe besser an und sage Bescheid.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "...");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.phoneOutgoing, 1);
        await Broken_Days.ƒS.Progress.delay(10);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Hallo, Kamon Restaurant, was kann ich für Sie tun?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hallo Takashi? Ich bin es " + Broken_Days.dataForSave.nameProtagonist + ", ich habe ein Problem...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Meine kleine Schwester Hanna ist verschwunden und ich habe keine Ahnung wo sie ist.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Als ich aufgewacht bin war sie einfach weg und ihr Telefon ist ausgeschaltet.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich muss sie suchen, ich weiß deshalb nicht ob ich zur Arbeit kommen kann.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Oh nein, das ist ja schrecklich!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Ich werde für dich übernehmen, das ist kein Problem. Und du kannst dich um deine Schwester kümmern.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Heute ist Montag, es wird bestimmt wieder nicht viel los sein, mach dir also keine Sorgen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Ich wünsche dir viel Glück bei der Suche und hoffe du findest sie bald, wenn du Hilfe brauchst melde dich einfach bei mir.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Danke Takashi, du hast was gut bei mir. Ich werde versuchen sie zu finden...");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.phoneTurnedOff, 1);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.phoneTurnedOff, 0, 3);
        await Broken_Days.ƒS.Progress.delay(3);
    }
    Broken_Days.CallWorkDecision = CallWorkDecision;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Laundry() {
        console.log("Laundry Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.landryAmbience, 0.7, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.laundry);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
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
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.landryAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Laundry = Laundry;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hier scheint sie nicht zu sein. Vielleicht sollte ich später nochmal vorbeischauen.");
    }
    async function AfternoonRoutine() {
        // --> unlock park
        if (!Broken_Days.dataForSave.locations.parkUnlocked)
            await FirstVisit();
        else
            await RecurringVisit();
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hier scheint sie nicht zu sein. Vielleicht sollte ich später nochmal vorbeischauen.");
    }
    async function FirstVisit() {
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna scheint nicht hier zu sein...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "...");
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kenzo, Broken_Days.characters.Kenzo.pose.happy, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, Broken_Days.dataForSave.nameProtagonist + "!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Man, hab' ich dich schon lange nicht mehr gesehen!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Wie geht es dir? Arbeitest du noch immer im Kamon Restaurant als Bedienung?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Kenzo?!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ja, ich arbeite noch immer dort.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Dann hat sich ja nicht viel verändert! Ich habe mein Studium in Tokio beendet und bin gerade wieder in Stadt gezogen!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Ich habe einen Job als Programmierer bei einer Firma hier bekommen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Ich habe mir außerdem eine Wohnung in der Nähe des Parks gemietet. Ich weiß noch wie wir als Kinder damals immer zusammen dort mit Hanna gespielt haben!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Ich würde mich freuen, wenn du mal vorbeikommen würdest, du kannst Hanna auch gerne mitbringen!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Wie geht es ihr eigentlich? Ich habe sie auch schon lange nicht mehr gesehen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich weiß nicht, wo sie ist. Ich versuche sie gerade zu finden. Ich kann sie nicht erreichen und wollte deswegen schauen ob sie hier ist.");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Kenzo);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kenzo, Broken_Days.characters.Kenzo.pose.surprised, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Oh man, das tut mir leid. Ich hoffe, sie ist nicht in Schwierigkeiten geraten.");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Kenzo);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kenzo, Broken_Days.characters.Kenzo.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Hast du es schon mal im Park versucht? Ich weiß noch, dass sie es dort immer sehr gemocht hat.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, hab' ich noch nicht.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Dann solltest du mal vorbeischauen. Vielleicht hat sie dort ein paar Freunde getroffen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Ich muss jetzt los, ich habe noch ein paar Dinge zu erledigen. Ich hoffe, ich sehe dich bald wieder!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Bis bald Kenzo!");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Kenzo);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Kenzo, Broken_Days.characters.Kenzo.pose.happy, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Kenzo, "Ich freue mich schon!");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.happy, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich auch, danke für deine Hilfe!");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Kenzo);
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich sollte mal zum Park gehen und schauen ob ich Hanna dort finde.");
        Broken_Days.dataForSave.locations.parkUnlocked = true;
    }
    async function RecurringVisit() {
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna scheint nicht hier zu sein...");
        if (!Broken_Days.dataForSave.puzzlePieces.puzzle1Unlocked)
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich sollte mal zum Park gehen und schauen ob ich sie dort finde.");
        else
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich glaube nicht, dass ich sie hier finden werde.");
    }
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
        let nextLocationAnswers = {};
        updateLocationAnswers(nextLocationAnswers);
        let nextLocation = await Broken_Days.ƒS.Menu.getInput(nextLocationAnswers, "decision");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        switch (nextLocation) {
            case "Nachbarin":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zu Etsuko.");
                await Broken_Days.trainTransition();
                return "Neighbour";
            case "Schule":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zur Schule.");
                await Broken_Days.trainTransition();
                return "School";
            case "Freundin":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zu Hannas Freundin Kana.");
                await Broken_Days.trainTransition();
                return "Friend";
            case "Waschsalon":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zum Waschsalon.");
                await Broken_Days.trainTransition();
                return "Laundry";
            case "Onsen":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zum Onsen.");
                await Broken_Days.trainTransition();
                return "Onsen";
            case "Laden":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zum Laden.");
                await Broken_Days.trainTransition();
                return "Shop";
            case "Park":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zum Park.");
                await Broken_Days.trainTransition();
                return "Park";
            case "Psychologe":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zum Psychologen.");
                await Broken_Days.trainTransition();
                return "Psychologist";
            case "Tempel":
                await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich gehe zum Tempel.");
                await Broken_Days.trainTransition();
                return "Temple";
        }
    }
    Broken_Days.LocationDecision = LocationDecision;
    async function MorningRoutine() {
        console.log("Morning");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.morning);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Wo soll ich nur zuerst suchen?");
    }
    async function AfternoonRoutine() {
        console.log("Afternoon");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.afternoon);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        if (Broken_Days.dataForSave.daysPassed == 0 && !Broken_Days.dataForSave.decisions.calledWork) {
            await TakashisCall();
        }
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Mhh, es ist schon Mittag. Wo soll ich als nächstes suchen?");
    }
    async function EveningRoutine() {
        console.log("Evening");
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.city.evening);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Der Tag neigt sich dem Ende zu... Wo soll ich jetzt noch suchen?");
    }
    async function TakashisCall() {
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.phoneVibrate, 1, false);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Oh, wer ruft mich denn jetzt an, könnte das Hanna sein?");
        await Broken_Days.ƒS.Progress.delay(4);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hallo?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, Broken_Days.dataForSave.nameProtagonist + "?! Wo bist du denn? Du hättest doch schon längst bei der Arbeit sein müssen!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Oh, Takashi!? Es tut mir leid, ich habe vergessen anzurufen...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Meine kleine Schwester ist verschwunden und ich kann sie nicht erreichen!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich versuche sie gerade zu finden...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Oh, das tut mir natürlich leid, aber du hättest dich auch einfach kurz melden können und Bescheid geben!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Wir haben uns schon Sorgen gemacht, dass dir etwas passiert ist!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich weiß, ich weiß, es tut mir wirklich leid, aber ich hatte vorhin keinen Kopf dafür, ich muss Hanna schnellstmöglich finden!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Ok, ich werde dich jetzt nicht weiter aufhalten, ich wünsche dir viel Glück bei der Suche!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Bitte melde dich wenn du sie gefunden hast.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Danke Takashi...");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.phoneTurnedOff, 1);
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.phoneTurnedOff, 0, 3);
        await Broken_Days.ƒS.Progress.delay(3);
    }
    function updateLocationAnswers(_nextLocationAnswers) {
        if (!Broken_Days.dataForSave.puzzlePieces.puzzle1Unlocked)
            _nextLocationAnswers.iSayNeighbour = "Nachbarin";
        if (!Broken_Days.dataForSave.puzzlePieces.puzzle2Unlocked)
            _nextLocationAnswers.iSaySchool = "Schule";
        if (!Broken_Days.dataForSave.puzzlePieces.puzzle3Unlocked)
            _nextLocationAnswers.iSayFriend = "Freundin";
        if (Broken_Days.dataForSave.locations.laundryUnlocked)
            _nextLocationAnswers.iSayLaundry = "Waschsalon";
        if (Broken_Days.dataForSave.locations.onsenUnlocked)
            _nextLocationAnswers.iSayOnsen = "Onsen";
        if (Broken_Days.dataForSave.locations.shopUnlocked)
            _nextLocationAnswers.iSayShop = "Laden";
        if (Broken_Days.dataForSave.locations.parkUnlocked)
            _nextLocationAnswers.iSayPark = "Park";
        if (Broken_Days.dataForSave.locations.psychologistUnlocked)
            _nextLocationAnswers.iSayPsychologist = "Psychologe";
        if (Broken_Days.dataForSave.locations.templeUnlocked)
            _nextLocationAnswers.iSayTemple = "Tempel";
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Neighbour() {
        console.log("Neighbour Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
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
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Neighbour = Neighbour;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.neighbour.morning);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Etsuko scheint nicht hier zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }
    async function AfternoonRoutine() {
        // --> unlock laundry
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.neighbour.afternoon);
        Broken_Days.hndTransition();
        if (!Broken_Days.dataForSave.locations.laundryUnlocked)
            await FirstVisit();
        else
            await RecurringVisit();
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.neighbour.evening);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Etsuko scheint nicht hier zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }
    async function FirstVisit() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Etsuko, Broken_Days.characters.Etsuko.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Oh, hallo " + Broken_Days.dataForSave.nameProtagonist + "!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Wie schön dich zu sehen! Ich habe gerade etwas für dich gebacken.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hallo Etsuko... Das ist sehr nett von dir, aber ich habe leider keine Zeit.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna ist verschwunden, ich kann sie nicht erreichen und finde sie nirgends.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Weißt du vielleicht, wo sie sein könnte?");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Etsuko);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Etsuko, Broken_Days.characters.Etsuko.pose.surprised, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Oh nein, das ist ja schrecklich! Das tut mir sehr leid, aber ich habe sie auch nicht gesehen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Ich hoffe es geht ihr gut, sie hat in letzter Zeit einen sehr kränklichen Eindruck gemacht...");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Was meinst du damit? Das ist mir gar nicht aufgefallen?!");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Etsuko);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Etsuko, Broken_Days.characters.Etsuko.pose.sad, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Mhh, darüber solltest du vielleicht besser mit ihr sprechen...");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Etsuko);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Etsuko, Broken_Days.characters.Etsuko.pose.optimistic, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Hast du schon im Waschsalon nach ihr geschaut? Ich glaube sie wollte eure Wäsche waschen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Mach dir bitte keine all zu großen Sorgen, so wie ich sie kenne wird sie wahrscheinlich einfach vergessen haben dir Bescheid zu geben.");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das ist eine gute Idee. Danke für deine Hilfe Etsuko, ich werde dort mal nachsehen.");
        Broken_Days.dataForSave.locations.laundryUnlocked = true;
    }
    async function RecurringVisit() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Etsuko, Broken_Days.characters.Etsuko.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Oh, hallo " + Broken_Days.dataForSave.nameProtagonist + "!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Hast du Hanna schon gefunden?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, leider noch nicht.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Was machst du dann noch hier? Komm, geh sie lieber suchen, ich melde mich falls Hanna hier auftaucht.");
        if (!Broken_Days.dataForSave.locations.parkUnlocked)
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Etsuko, "Schau doch mal im Waschsalon, ich bin sicher, dass du dort etwas über sie herausfinden kannst.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Okay, vielen Dank Etsuko.");
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function NewDay() {
        console.log("NewDay Scene starting");
        let textDayOneRoom = [
            "Was ist denn jetzt passiert?!",
            "Es ist plötzlich wieder hell geworden!",
            "War das etwa alles nur ein Traum?",
            "Ich sollte schnell nach Hanna sehen!"
        ];
        let textDayOneHannaRoom = [
            "Hanna? Hanna? Bist du da?",
            "Hanna?!",
            "...",
            "Moment mal, es ist schon wieder Montag?!",
            "Erlebe ich den selben Tag etwa noch mal?!",
            "Das kann doch alles nicht wahr sein...",
            "Das fühlt sich alles so surreal an...",
            "Ich muss Hanna finden, nur so kann ich herausfinden, was hier wirklich los ist!"
        ];
        let textDayTwoRoom = [
            "Es ist schon wieder passiert!",
            "Ich sollte schnell nach Hanna sehen!"
        ];
        let textDayTwoHannaRoom = [
            "Hanna ist wieder nicht da...",
            "Ich muss sie finden, nur so kann ich herausfinden, was hier wirklich los ist!"
        ];
        Broken_Days.openMeter();
        if (Broken_Days.dataForSave.despair >= 100)
            await Broken_Days.triggerBadEnding();
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.room.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        let text;
        if (Broken_Days.dataForSave.daysPassed === 1)
            text = textDayOneRoom;
        else
            text = textDayTwoRoom;
        for (let i = 0; i < text.length; i++) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text[i]);
        }
        await Broken_Days.fadeScene();
        // hannas room
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.hannaBedroom.day);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.shocked, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        if (Broken_Days.dataForSave.daysPassed === 1)
            text = textDayOneHannaRoom;
        else
            text = textDayTwoHannaRoom;
        for (let i = 0; i < text.length; i++) {
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, text[i]);
        }
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 1);
        Broken_Days.closeMeter();
        await Broken_Days.fadeScene();
        return "LocationDecision";
    }
    Broken_Days.NewDay = NewDay;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Onsen() {
        console.log("Onsen Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.onsenAmbience, 1, true);
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
        // --> recieve puzzle piece 2
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Mhh, Hanna scheint hier nicht zu sein...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Moment mal, was ist denn das?");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das sieht nach Hannas Handschrift aus!");
        Broken_Days.ƒS.Inventory.add(Broken_Days.items.puzzlePiece2);
        Broken_Days.dataForSave.puzzlePieces.puzzle2Unlocked = true;
        Broken_Days.dataForSave.locations.psychologistUnlocked = false;
        Broken_Days.dataForSave.locations.onsenUnlocked = false;
        Broken_Days.showHannasMessages(2);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "");
        Broken_Days.decreaseDespair(35);
        Broken_Days.openMeter();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Die Nachricht ist wirklich von Hanna!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Aber was will sie mir damit nur sagen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich werde daraus nicht so wirklich schlau... Ich sollte einfach weiter suchen...");
        // check if all puzzle pieces are collected -> restaurant scene
        Broken_Days.closeMeter();
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.onsenAmbience, 0, 1);
        if (Broken_Days.allPiecesRecieved()) {
            return "Restaurant";
        }
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Onsen = Onsen;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.onsen.day);
        Broken_Days.hndTransition();
    }
    async function AfternoonRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.onsen.day);
        Broken_Days.hndTransition();
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.onsen.evening);
        Broken_Days.hndTransition();
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Park() {
        console.log("Park Scene starting");
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
        // --> recieve puzzle piece 1
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Mhh, Hanna scheint hier nicht zu sein...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Moment mal, was ist denn das?");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das sieht nach Hannas Handschrift aus!");
        Broken_Days.ƒS.Inventory.add(Broken_Days.items.puzzlePiece1);
        Broken_Days.dataForSave.puzzlePieces.puzzle1Unlocked = true;
        Broken_Days.dataForSave.locations.laundryUnlocked = false;
        Broken_Days.dataForSave.locations.parkUnlocked = false;
        Broken_Days.showHannasMessages(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "");
        Broken_Days.decreaseDespair(35);
        Broken_Days.openMeter();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Die Nachricht ist wirklich von Hanna!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Aber was will sie mir damit nur sagen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich werde daraus nicht so wirklich schlau... Ich sollte einfach weiter suchen...");
        // check if all puzzle pieces are collected -> restaurant scene
        Broken_Days.closeMeter();
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        if (Broken_Days.allPiecesRecieved()) {
            return "Restaurant";
        }
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Park = Park;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.park.morning);
        Broken_Days.hndTransition();
    }
    async function AfternoonRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.park.afternoon);
        Broken_Days.hndTransition();
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.park.evening);
        Broken_Days.hndTransition();
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Psychologist() {
        console.log("Psychologist Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.kotoTheme, 1, true);
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
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.kotoTheme, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Psychologist = Psychologist;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.psychologist.day);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Dr. Kimura ist noch nicht da. Ich sollte später nochmal vorbeischauen.");
    }
    async function AfternoonRoutine() {
        // --> unlock onsen
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.psychologist.day);
        Broken_Days.hndTransition();
        if (!Broken_Days.dataForSave.locations.onsenUnlocked)
            await FirstVisit();
        else
            await RecurringVisit();
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.psychologist.evening);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Dr. Kimura ist nicht da. Ich sollte später nochmal vorbeischauen.");
    }
    async function FirstVisit() {
        Broken_Days.ƒS.Character.show(Broken_Days.characters.DrKimura, Broken_Days.characters.DrKimura.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Hallo " + Broken_Days.dataForSave.nameProtagonist + ". Wie kann ich ihnen helfen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hallo Dr. Kimura, ich bin hier um Hanna zu finden.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich kann sie nicht finden und ich habe Angst, dass etwas schlimmes passiert ist!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Oh nein, das tut mir leid. Wie kann ich ihnen helfen sie zu finden?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Wissen sie wo sie hingegangen sein könnte?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Mhh...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Vielleicht ist sie im Onsen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Ich habe ihr geraten dort hin zu gehen, um sich zu entspannen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Die heißen Quellen dort sind sehr beruhigend!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Danke Dr. Kimura, ich werde es dort versuchen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Hanna hat mir erzählt, wie sehr sie sich um sie sorgen seit ihre Eltern gestorben sind.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Sie sind ein wirklich toller Bruder " + Broken_Days.dataForSave.nameProtagonist + ".");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Sie sagte auch, dass sie früher studieren wollten, aber nach dem Tod ihrer Eltern dann angefangen haben im Restaurant zu arbeiten?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ja, außer mir gab es niemanden der für Hanna sorgen konnte.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich hatte unseren Eltern versprochen auf sie aufzupassen...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Machen sie sich bitte keine Sorgen " + Broken_Days.dataForSave.nameProtagonist + ".");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Sie haben eine so starke und gutherzige Persönlichkeit, ich bin mir sicher, dass sie Hanna bald finden werden.");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Vielen Dank Dr. Kimura.");
        Broken_Days.dataForSave.locations.onsenUnlocked = true;
    }
    async function RecurringVisit() {
        Broken_Days.ƒS.Character.show(Broken_Days.characters.DrKimura, Broken_Days.characters.DrKimura.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Hallo " + Broken_Days.dataForSave.nameProtagonist + ". Haben sie Hanna schon gefunden?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, leider nicht.");
        if (!Broken_Days.dataForSave.puzzlePieces.puzzle2Unlocked)
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Sie sollten mal im Onsen schauen, Hanna war bestimmt dort.");
        else
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.DrKimura, "Schade, ich wünsche ihnen viel Glück bei der Suche. Ich bin mir sicher, dass sie sie bald finden werden.");
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Restaurant() {
        console.log("Restaurant Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.phoneVibrate, 1, false);
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Oh, wer ruft mich denn jetzt an, könnte das Hanna sein?");
        await Broken_Days.ƒS.Progress.delay(4);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hallo?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, Broken_Days.dataForSave.nameProtagonist + "! Du solltest schnell herkommen, ich habe hier eine Nachricht von Hanna für dich gefunden!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Was!? Ok ich komme sofort!");
        await Broken_Days.fadeScene();
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.restaurantAmbience, 1, true);
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.restaurant);
        await Broken_Days.ƒS.update(Broken_Days.transitions.puzzle.duration, Broken_Days.transitions.puzzle.alpha, Broken_Days.transitions.puzzle.edge);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.neutral, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Takashi?");
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Takashi, Broken_Days.characters.Takashi.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Ah, " + Broken_Days.dataForSave.nameProtagonist + "!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Was ist denn passiert?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Hanna hat hier eine Nachricht hinterlassen, ich habe sie eben gefunden! Hier, schau mal!");
        Broken_Days.showHannasMessages(4);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Was ist denn, was hat sie geschrieben?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Sie ist bei uns zu Hause...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Was? Was meinst du damit?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich habe irgendwie ein ganz schlechtes Gefühl dabei, ich glaube ich sollte schnellstens zu ihr fahren!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Takashi, "Ja, das ist wahrscheinlich eine gute Idee, du solltest schnellstens losfahren!");
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.restaurantAmbience, 0, 1);
        await Broken_Days.fadeScene();
        return "Ending";
    }
    Broken_Days.Restaurant = Restaurant;
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function School() {
        console.log("School Scene starting");
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
        if (Broken_Days.dataForSave.DayTime != Broken_Days.DayTime.EVENING)
            Broken_Days.ƒS.Sound.fade(Broken_Days.sound.schoolAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.School = School;
    async function MorningRoutine() {
        // --> unlock psychologist
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.morning);
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.schoolAmbience, 0.7, true);
        Broken_Days.hndTransition();
        if (!Broken_Days.dataForSave.locations.psychologistUnlocked)
            await FirstVisit();
        else
            await RecurringVisit();
    }
    async function AfternoonRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.afternoon);
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.schoolAmbience, 0.7, true);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hanna scheint nicht hier zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.school.evening);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Hier scheint niemand mehr zu sein.");
    }
    async function FirstVisit() {
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Saito, Broken_Days.characters.Saito.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Saito, "Oh, hallo " + Broken_Days.dataForSave.nameProtagonist + ". Wie kann ich ihnen helfen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ist Hanna heute in die Schule gekommen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Saito, "Nein, ich habe sie heute noch nicht gesehen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich suche sie schon überall, aber kann sie nicht finden.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Sie würde normal nicht einfach so verschwinden ohne mich zu informieren.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Saito, "Mhh, ich kann ihnen leider nicht weiterhelfen. Vielleicht sollten sie mal bei Hannas Psychologen Dr. Kimura vorbeischauen. Vielleicht kann er ihnen helfen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Oh stimmt, wieso habe ich daran nicht schon früher gedacht? Danke für den Tipp. Ich werde dort mal vorbeischauen.");
        Broken_Days.dataForSave.locations.psychologistUnlocked = true;
    }
    async function RecurringVisit() {
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Saito, "Hallo " + Broken_Days.dataForSave.nameProtagonist + ". Haben sie Hanna schon gefunden?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, leider nicht.");
        if (!Broken_Days.dataForSave.locations.parkUnlocked)
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Sie sollten mal bei Hannas Psychologen vorbeischauen. Vielleicht kann er ihnen helfen.");
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Shop() {
        console.log("Shop Scene starting");
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
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.urbanAmbience, 0, 1);
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Shop = Shop;
    async function MorningRoutine() {
        // --> unlock temple
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.shop.morning);
        Broken_Days.hndTransition();
        if (!Broken_Days.dataForSave.locations.templeUnlocked)
            await FirstVisit();
        else
            await RecurringVisit();
    }
    async function AfternoonRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.shop.afternoon);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das Geschäft scheint gerade geschlossen zu sein. Ich sollte später nochmal vorbeischauen.");
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.shop.evening);
        Broken_Days.hndTransition();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das Geschäft scheint gerade geschlossen zu sein. Ich sollte später nochmal vorbeischauen.");
    }
    async function FirstVisit() {
        Broken_Days.ƒS.Character.show(Broken_Days.characters.Yamato, Broken_Days.characters.Yamato.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Hallo, willkommen in meinem Geschäft. Wie kann ich Ihnen heute helfen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich suche meine kleine Schwester Hanna. Kana hat mir gesagt, dass sie oft zusammen hierher kommen. Haben Sie sie heute zufällig gesehen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Oh ja, Kana und Hanna sind hier oft zu Besuch. Aber ich muss zugeben, dass ich sie schon eine Weile nicht mehr gesehen habe. Ist alles in Ordnung mit ihr?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, ich kann sie nicht finden und ich mache mir große Sorgen. Haben Sie eine Idee, wo sie sein könnte?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Hmm, wissen Sie, ich habe gehört, dass sie manchmal in den Tempel geht, um ein wenig nachzudenken. Sie finden ihn ein paar Blocks von hier entfernt. Vielleicht ist sie dort.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Vielen Dank für die Hilfe. Ich werde es dort mal versuchen.");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Kein Problem, ich hoffe Sie finden sie sicher und gesund. Lassen Sie es mich wissen, wenn ich irgendwie helfen kann.");
        Broken_Days.dataForSave.locations.templeUnlocked = true;
    }
    async function RecurringVisit() {
        Broken_Days.ƒS.Character.show(Broken_Days.characters.Yamato, Broken_Days.characters.Yamato.pose.neutral, Broken_Days.ƒS.positionPercent(75, 100));
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Hallo! Da sind sie ja wieder. Konnten sie Hanna schon finden?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Nein, leider nicht. Ich habe sie noch nicht gefunden.");
        if (!Broken_Days.dataForSave.puzzlePieces.puzzle3Unlocked)
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Sie sollten vielleicht nochmal in den Tempel gehen. Vielleicht finden sie dort einen Hinweis?");
        else
            await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Yamato, "Oh, das tut mir leid. Ich hoffe sie finden sie bald.");
    }
})(Broken_Days || (Broken_Days = {}));
var Broken_Days;
(function (Broken_Days) {
    async function Temple() {
        console.log("Temple Scene starting");
        Broken_Days.ƒS.Sound.play(Broken_Days.sound.templeAmbience, 1, true);
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
        // --> recieve puzzle piece 3
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Mhh, Hanna scheint hier nicht zu sein...");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Moment mal, was ist denn das?");
        Broken_Days.ƒS.Character.hide(Broken_Days.characters.Protagonist);
        await Broken_Days.ƒS.Character.show(Broken_Days.characters.Protagonist, Broken_Days.characters.Protagonist.pose.surprised, Broken_Days.ƒS.positionPercent(25, 100));
        await Broken_Days.ƒS.update(1);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Das sieht nach Hannas Handschrift aus!");
        Broken_Days.ƒS.Inventory.add(Broken_Days.items.puzzlePiece3);
        Broken_Days.dataForSave.puzzlePieces.puzzle3Unlocked = true;
        Broken_Days.dataForSave.locations.shopUnlocked = false;
        Broken_Days.dataForSave.locations.templeUnlocked = false;
        Broken_Days.showHannasMessages(3);
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Blank, "");
        Broken_Days.decreaseDespair(35);
        Broken_Days.openMeter();
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Die Nachricht ist wirklich von Hanna!");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Aber was will sie mir damit nur sagen?");
        await Broken_Days.ƒS.Speech.tell(Broken_Days.characters.Protagonist, "Ich werde daraus nicht so wirklich schlau... Ich sollte einfach weiter suchen...");
        // check if all puzzle pieces are collected -> restaurant scene
        Broken_Days.ƒS.Sound.fade(Broken_Days.sound.templeAmbience, 0, 1);
        Broken_Days.closeMeter();
        if (Broken_Days.allPiecesRecieved()) {
            return "Restaurant";
        }
        return Broken_Days.hndNextLocation();
    }
    Broken_Days.Temple = Temple;
    async function MorningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.temple.morning);
        Broken_Days.hndTransition();
    }
    async function AfternoonRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.temple.afternoon);
        Broken_Days.hndTransition();
    }
    async function EveningRoutine() {
        await Broken_Days.ƒS.Location.show(Broken_Days.locations.temple.evening);
        Broken_Days.hndTransition();
    }
})(Broken_Days || (Broken_Days = {}));
//# sourceMappingURL=BrokenDays.js.map