namespace Broken_Days {
    export async function Epilogue(): ƒS.SceneReturn {
        console.log("Epilogue Scene starting");

        ƒS.Sound.play(sound.kotoTheme, 1, true);
        ƒS.Sound.fade(sound.kotoTheme, 0, 1);

    }
}