declare namespace Broken_Days {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let despairMeter: HTMLElement;
    let despair: HTMLElement;
    function openMeter(): void;
    function closeMeter(): void;
    enum DayTime {
        MORNING = 0,
        AFTERNOON = 1,
        EVENING = 2
    }
    let dataForSave: {
        nameProtagonist: string;
        DayTime: DayTime;
        daysPassed: number;
        dayTimeIndex: number;
        despair: number;
        yourDespair: string;
        decisions: {
            calledWork: boolean;
        };
        locations: {
            laundryUnlocked: boolean;
            onsenUnlocked: boolean;
            shopUnlocked: boolean;
            parkUnlocked: boolean;
            psychologistUnlocked: boolean;
            templeUnlocked: boolean;
        };
        puzzlePieces: {
            puzzle1Unlocked: boolean;
            puzzle2Unlocked: boolean;
            puzzle3Unlocked: boolean;
        };
        endingDecisions: {
            ending1: boolean;
            ending2: boolean;
        };
    };
    function UpdateDayTime(): Promise<void>;
    function increaseDespair(_amount: number): Promise<void>;
    function decreaseDespair(_amount: number): void;
    function triggerBadEnding(): Promise<void>;
    function showCredits(): void;
    function getIntroAnimation(): ƒS.AnimationDefinition;
    function getTrainAnimation(): ƒS.AnimationDefinition;
    let transitions: {
        puzzle: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    function trainTransition(): Promise<void>;
    function hndTransition(): Promise<void>;
    function fadeScene(_duration?: number): Promise<void>;
    function hndNextLocation(): Promise<string>;
    function allPiecesRecieved(): boolean;
    function openInventory(): Promise<void>;
    function VolumeUp(): void;
    function VolumeDown(): void;
}
declare namespace Broken_Days {
    let characters: {
        Narrator: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {};
        };
        Blank: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {};
        };
        Protagonist: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                angry: string;
                happy: string;
                neutral: string;
                sad: string;
                shocked: string;
                surprised: string;
                tired: string;
                asleep: string;
            };
        };
        Hanna: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
                happy: string;
            };
        };
        Takashi: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
            };
        };
        Etsuko: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
                optimistic: string;
                sad: string;
                surprised: string;
            };
        };
        Kana: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
                surprised: string;
            };
        };
        Saito: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
                sad: string;
            };
        };
        Yamato: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
            };
        };
        Kenzo: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                happy: string;
                neutral: string;
                surprised: string;
                sad: string;
            };
        };
        DrKimura: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                neutral: string;
            };
        };
    };
    function UpdateName(): void;
}
declare namespace Broken_Days {
    let locations: {
        room: {
            day: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
            night: {
                name: string;
                background: string;
            };
        };
        hannaBedroom: {
            day: {
                name: string;
                background: string;
            };
            night: {
                name: string;
                background: string;
            };
        };
        kitchen: {
            day: {
                name: string;
                background: string;
            };
            night: {
                name: string;
                background: string;
            };
        };
        blackscreen: {
            name: string;
            background: string;
        };
        train: {
            name: string;
            background: string;
        };
        city: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        neighbour: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        school: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        friend: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        laundry: {
            name: string;
            background: string;
        };
        onsen: {
            day: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        shop: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        park: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        psychologist: {
            day: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        temple: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        restaurant: {
            name: string;
            background: string;
        };
    };
}
declare namespace Broken_Days {
    let items: {
        puzzlePiece1: {
            name: string;
            description: string;
            image: string;
            number: number;
        };
        puzzlePiece2: {
            name: string;
            description: string;
            image: string;
            number: number;
        };
        puzzlePiece3: {
            name: string;
            description: string;
            image: string;
            number: number;
        };
        puzzlePiece4: {
            name: string;
            description: string;
            image: string;
            number: number;
        };
    };
    let puzzleMessages: {
        puzzle1text: string;
        puzzle2text: string;
        puzzle3text: string;
        puzzle4text: string;
    };
    function showHannasMessages(_number: number): void;
}
declare namespace Broken_Days {
    let sound: {
        kotoTheme: string;
        yawn: string;
        phoneVibrate: string;
        phoneOutgoing: string;
        phoneTurnedOff: string;
        trainAmbience: string;
        templeAmbience: string;
        urbanAmbience: string;
        landryAmbience: string;
        schoolAmbience: string;
        onsenAmbience: string;
        restaurantAmbience: string;
        finalAmbience: string;
    };
}
declare namespace Broken_Days {
    function ApartmentEnd(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function EndDay(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Ending(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Epilogue(): ƒS.SceneReturn;
    function Ending1(): Promise<void>;
    function Ending2(): Promise<void>;
}
declare namespace Broken_Days {
    function Friend(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Introduction(): ƒS.SceneReturn;
    function CallWorkDecision(): Promise<void>;
}
declare namespace Broken_Days {
    function Laundry(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function LocationDecision(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Neighbour(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function NewDay(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Onsen(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Park(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Psychologist(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Restaurant(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function School(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Shop(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Temple(): ƒS.SceneReturn;
}
