namespace Broken_Days {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  export enum DayTime {
    MORNING,
    AFTERNOON,
    EVENING
  }

  const dayTimes = [DayTime.MORNING, DayTime.AFTERNOON, DayTime.EVENING];


  export let dataForSave = {
    nameProtagonist: "",
    DayTime: DayTime.MORNING,
    daysPassed: 0,
    dayTimeIndex: 0,
    locations: {
      laundryUnlocked: false,
      onsenUnlocked: false,
      shopUnlocked: false,
      parkUnlocked: false,
      psychologistUnlocked: false,
      templeUnlocked: false
    }
  };

  export async function UpdateDayTime(): Promise<void> {
    dataForSave.dayTimeIndex = (dataForSave.dayTimeIndex + 1) % dayTimes.length;
    if (dataForSave.dayTimeIndex === 0) {
      dataForSave.daysPassed++;
      console.log("New day! " + dataForSave.daysPassed + " days passed.");
    }
    dataForSave.DayTime = dayTimes[dataForSave.dayTimeIndex];
  }

  export function showCredits(): void {
    ƒS.Text.setClass("credtis"); //addClass; setClass überschreibt
    ƒS.Text.print("Credits here");
  }

  export function getAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0.3) },
      end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red") },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export function getTrainAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(75, 100) },
      end: { translation: ƒS.positionPercent(73, 100) },
      duration: 0.75,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  // transitions
  export let transitions = {
    puzzle: {
      duration: 1,
      alpha: "./FreeTransitions/5.jpg",
      edge: 1
    }
  };

  export async function trainTransition(): Promise<void> {
    await fadeScene();
    await ƒS.Location.show(locations.train);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(75, 100));
    ƒS.update();
    ƒS.Sound.play(sound.trainAmbience, 1);
    await ƒS.Progress.delay(5);
    ƒS.Character.hide(characters.mainCharacter);
    ƒS.Character.animate(characters.mainCharacter, characters.mainCharacter.pose.surprised, getTrainAnimation());
    await ƒS.Progress.delay(3);
    ƒS.Character.hide(characters.mainCharacter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(73, 100));
    ƒS.update(1);
    await ƒS.Progress.delay(2);
    ƒS.Sound.fade(sound.trainAmbience, 0, 1);
    await fadeScene(2);
  }

  export async function hndTransition(): Promise<void> {
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
  }

  export async function fadeScene(_duration: number = 1): Promise<void> {
    ƒS.Location.show(locations.blackscreen);
    ƒS.Character.hideAll();
    ƒS.Speech.hide();
    await ƒS.update(_duration);
  }

  export async function hndNextLocation(): Promise<string> {
    if (dataForSave.DayTime != DayTime.EVENING) {
      await ƒS.Speech.tell(characters.mainCharacter, "Ich sollte meine Suche jetzt besser fortsetzen.");
      UpdateDayTime();
      await fadeScene();
      return "LocationDecision";
    }
    // Evening
    await ƒS.Speech.tell(characters.mainCharacter, "Es ist schon so spät... Ich sollte jetzt besser nach Hause gehen und dort schauen.");
    UpdateDayTime();
    await fadeScene();
    return "EndDay";
  }

  // items
  export let items = {
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

  // menu
  // buttons
  let inGameMenuButttons = {
    save: "Save",
    load: "Load",
    //volume
    close: "Close",
    credits: "Credits"
  };

  let gameMenu: ƒS.Menu;

  let menuIsOpen: boolean = true;

  async function buttonFunctionalities(_option: string): Promise<void> {
    console.log(_option);
    switch (_option) {
      case inGameMenuButttons.save:
        await ƒS.Progress.save();
        break;
      case inGameMenuButttons.load:
        await ƒS.Progress.load();
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

  let inventoryIsOpen: boolean = false;

  async function hndKeyPress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.F8:
        console.log("Save");
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.F9:
        console.log("Load");
        await ƒS.Progress.load();
        break;
      case ƒ.KEYBOARD_CODE.M:
        // menuIsOpen = !menuIsOpen;
        if (menuIsOpen) {
          console.log("Menu close");
          gameMenu.close();
          menuIsOpen = false;
        } else {
          console.log("Menu open");
          gameMenu.open();
          menuIsOpen = true;
        }
        break;
      case ƒ.KEYBOARD_CODE.I:
        inventoryIsOpen = !inventoryIsOpen;
        if (inventoryIsOpen) {
          ƒS.Inventory.open();
        } else {
          ƒS.Inventory.close();
        }
        break;
    }
  }

  window.addEventListener("load", start);
  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuButttons, buttonFunctionalities, "gameMenuCSSclass");
    buttonFunctionalities("Close");
    let scenes: ƒS.Scenes = [
      //{ scene: Scene, name: "Scene" },
      { scene: Introduction, name: "Introduction" },
      //{ scene: Inventory_Test, name: "Inventory_Test" }
      //{id: "", scene: Scene, name: "Scene" , next:""}, --> next mit id ansprechen
      { id: "LocationDecision", scene: LocationDecision, name: "LocationDecision" },
      { id: "Neighbour", scene: Neighbour, name: "Neighbour" },
      { id: "School", scene: School, name: "School" },
      { id: "Friend", scene: Friend, name: "Friend" },
      { id: "EndDay", scene: EndDay, name: "EndDay" },
      { id: "NewDay", scene: NewDay, name: "NewDay" },
      { id: "Laundry", scene: Laundry, name: "Laundry" },
      { id: "Onsen", scene: Onsen, name: "Onsen" },
      { id: "Shop", scene: Shop, name: "Shop" },
      { id: "Park", scene: Park, name: "Park" },
      { id: "Psychologist", scene: Psychologist, name: "Psychologist" },
      { id: "Temple", scene: Temple, name: "Temple" },
      { id: "Restaurant", scene: Restaurant, name: "Restaurant" },
      { id: "ApartmentEnd", scene: ApartmentEnd, name: "ApartmentEnd" },
      { id: "Ending", scene: Ending, name: "Ending" },
      { id: "Epilogue", scene: Epilogue, name: "Epilogue" }
    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
    ƒS.Speech.hide();
  }
}


