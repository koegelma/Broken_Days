declare namespace Template {
    function Introduction(): ƒS.SceneReturn;
}
declare namespace Template {
    function Inventory_Test(): ƒS.SceneReturn;
}
declare namespace Template {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transitions: {
        puzzle: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let sound: {
        backgroundTheme: string;
        click: string;
    };
    let locations: {
        room: {
            name: string;
            background: string;
        };
        park: {
            name: string;
            background: string;
        };
    };
    let characters: {
        narrator: {
            name: string;
        };
        mainCharacter: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                angry: string;
                happy: string;
                neutral: string;
            };
        };
    };
    let items: {
        handy: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
        laptop: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
        apple: {
            name: string;
            description: string;
            image: string;
        };
    };
    let dataForSave: {
        nameProtagonist: string;
        score: number;
    };
    function showCredits(): void;
    function getAnimation(): ƒS.AnimationDefinition;
}
declare namespace Template {
    function Scene(): ƒS.SceneReturn;
}
