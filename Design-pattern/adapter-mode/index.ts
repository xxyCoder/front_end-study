interface MediaPlayer {
    play(audioType: string, filename: string): void;
}

interface AdvancedMediaPlayer {
    playVlc(filename: string): void;
    playMp4(filename: string): void;
}

class VlcPlayer implements AdvancedMediaPlayer {
    playVlc(filename: string): void {
        console.log(`Playing vlc file ${filename}`)
    }
    playMp4(filename: string): void {
        // 什么也不做
    }
}
class Mp4Player implements AdvancedMediaPlayer {
    playVlc(filename: string): void {
        // 什么也不做
    }
    playMp4(filename: string): void {
        console.log(`Playing mp4 file ${filename}`)
    }
}

class MediaAdapter implements MediaPlayer {
    advancedMusicPlayer: AdvancedMediaPlayer;
    constructor(audioType: string) {
        if (audioType === "vlc") {
            this.advancedMusicPlayer = new VlcPlayer();
        } else {
            this.advancedMusicPlayer = new Mp4Player();
        }
    }
    play(audioType: string, filename: string): void {
        if (audioType === "vlc") {
            this.advancedMusicPlayer.playVlc(filename);
        } else {
            this.advancedMusicPlayer.playMp4(filename);
        }
    }
}


class LinuxUtils {
    linuxMethod() {
        console.log("linux method");
    }
}

interface IAdapter {
    adapterMethod(): void;
}

class WindowsAdapter extends LinuxUtils implements IAdapter {
    adapterMethod(): void {
        console.log("linux ---> windows method");
        super.linuxMethod();
    }
}