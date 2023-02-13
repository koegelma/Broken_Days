namespace Broken_Days {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  export let despairMeter: HTMLElement;
  export let despair: HTMLElement;

  export function openMeter(): void {
    if (despairMeter != null && despair != null) {
      despairMeter.hidden = false;
      despair.hidden = false;
    }
  }

  export function closeMeter(): void {
    if (despairMeter != null && despair != null) {
      despairMeter.hidden = true;
      despair.hidden = true;
    }
  }

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

  export async function UpdateDayTime(): Promise<void> {
    dataForSave.dayTimeIndex = (dataForSave.dayTimeIndex + 1) % dayTimes.length;
    if (dataForSave.dayTimeIndex === 0) {
      dataForSave.daysPassed++;
      console.log("New day! " + dataForSave.daysPassed + " days passed.");
      increaseDespair(20);
    }
    dataForSave.DayTime = dayTimes[dataForSave.dayTimeIndex];
  }

  export async function increaseDespair(_amount: number): Promise<void> {
    dataForSave.despair += _amount;
    if (dataForSave.despair > 100) dataForSave.despair = 100;
    dataForSave.yourDespair = dataForSave.despair + " Verzweiflung";
  }


  export function decreaseDespair(_amount: number): void {
    dataForSave.despair -= _amount;
    if (dataForSave.despair < 0) dataForSave.despair = 0;
    dataForSave.yourDespair = dataForSave.despair + " Verzweiflung";
  }

  export async function triggerBadEnding(): Promise<void> {
    fadeScene(5);
    await ƒS.Speech.tell(characters.Protagonist, "Das hat doch alles keinen Sinn mehr...");
    await ƒS.Speech.tell(characters.Protagonist, "Ich werde Hanna nie finden...");
    await ƒS.Speech.tell(characters.Narrator, "Du hast das Ende der Geschichte erreicht.");
    await ƒS.Speech.tell(characters.Narrator, "Du hast Hanna nicht rechtzeitig gefunden und hast dich selbst aufgegeben.");
    await ƒS.Progress.delay(9999);
  }

  export function showCredits(): void {
    ƒS.Text.setClass("credits");
    ƒS.Text.print(
      "Credits: <br/> <br/>" +
      "Character sheets: https://shatteredreality.itch.io/sutemo<br/> <br/>" +
      "Backgrounds: https://noranekogames.itch.io/yumebackground <br/> <br/>" +
      "Theme Music:https://freesound.org/people/zagi2/sounds/391828/ <br/> <br/>" +
      "Additional Sounds: prosoundeffects.com <br/> <br/>"
    );
  }

  export function getIntroAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(150, 100) },
      end: { translation: ƒS.positionPercent(75, 100) },
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
    await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(75, 100));
    ƒS.update();
    ƒS.Sound.play(sound.trainAmbience, 1);
    await ƒS.Progress.delay(5);
    ƒS.Character.hide(characters.Protagonist);
    ƒS.Character.animate(characters.Protagonist, characters.Protagonist.pose.surprised, getTrainAnimation());
    await ƒS.Progress.delay(3);
    ƒS.Character.hide(characters.Protagonist);
    await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(73, 100));
    ƒS.update(1);
    await ƒS.Progress.delay(2);
    ƒS.Sound.fade(sound.trainAmbience, 0, 1);
    await fadeScene(2);
  }

  export async function hndTransition(): Promise<void> {
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(25, 100));
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
      await ƒS.Speech.tell(characters.Protagonist, "Ich sollte meine Suche jetzt besser fortsetzen.");
      UpdateDayTime();
      await fadeScene();
      return "LocationDecision";
    }
    // Evening
    await ƒS.Speech.tell(characters.Protagonist, "Es ist schon so spät... Ich sollte jetzt besser nach Hause gehen und dort schauen.");
    UpdateDayTime();
    await fadeScene();
    return "EndDay";
  }

  export function allPiecesRecieved(): boolean {
    if (dataForSave.puzzlePieces.puzzle1Unlocked && dataForSave.puzzlePieces.puzzle2Unlocked && dataForSave.puzzlePieces.puzzle3Unlocked) {
      console.log("All pieces recieved! Piece1: " + dataForSave.puzzlePieces.puzzle1Unlocked + " Piece2: " + dataForSave.puzzlePieces.puzzle2Unlocked + " Piece3: " + dataForSave.puzzlePieces.puzzle3Unlocked);
      return true;
    }
    console.log("Not all pieces recieved!Piece1: " + dataForSave.puzzlePieces.puzzle1Unlocked + " Piece2: " + dataForSave.puzzlePieces.puzzle2Unlocked + " Piece3: " + dataForSave.puzzlePieces.puzzle3Unlocked);
    return false;
  }

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

  export async function openInventory(): Promise<void> {
    const selectedItems: string[] = await ƒS.Inventory.open();
    if (selectedItems && selectedItems.length > 0) {
      selectedItems.forEach((s) => {
        Object.keys(items).forEach((i) => {
          const item = items[i];
          if (item.name === s) {
            showHannasMessages(item.number);
            ƒS.Inventory.add(item);
          }
        });
      });
    }
  }

  let volume: number = 1;

  export function VolumeUp(): void {
    volume += 0.1;
    if (volume > 2) {
      volume = 2;
      return;
    }
    ƒS.Sound.setMasterVolume(volume);
  }

  export function VolumeDown(): void {
    volume -= 0.1;
    if (volume < 0) {
      volume = 0;
      return;
    }
    ƒS.Sound.setMasterVolume(volume);
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
          await openInventory();
          break;
        }
    }
  }

  window.addEventListener("load", start);
  function start(_event: Event): void {
    despairMeter = document.getElementById("despair");
    despair = document.getElementById("yourDespair");
    gameMenu = ƒS.Menu.create(inGameMenuButttons, buttonFunctionalities, "gameMenu");
    buttonFunctionalities("Close");
    ƒS.Sound.setMasterVolume(volume);
    let scenes: ƒS.Scenes = [
      { scene: Introduction, name: "Introduction" },
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
      { id: "Ending", scene: Ending, name: "Ending" },
      { id: "Epilogue", scene: Epilogue, name: "Epilogue" }
    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
    ƒS.Speech.hide();
    closeMeter();
  }
}


