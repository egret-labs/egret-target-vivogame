declare class qg {
    /** 同步获取系统信息 */
    static getSystemInfoSync(): qg.ISysInfo;
    /** 键盘事件 */
    static showKeyboard(info: any): void;
    static onKeyboardConfirm(callback: Function): void;
    static onKeyboardComplete(callback: Function): void;
    static onKeyboardInput(callback: Function): void;
    static offKeyboardComplete(): void;
    static offKeyboardConfirm(): void;
    static offKeyboardInput(): void;
    static hideKeyboard(obj: any): void;
    /** 罗盘事件 */
    /** 生命周期 */
    static onShow(callback: Function): void;
    static onHide(callback: Function): void;
    /** 设置渲染帧率 */
    static setPreferredFramesPerSecond(fps: number): void;
    /** 罗盘 */
    static subscribeAccelerometer({callback: Function}): void;
    static unsubscribeAccelerometer(): void;
    /** 创建音频*/
    static createInnerAudioContext(): qg.InnerAudioContext;
    /**异步读取文件 */
    static readFile(obj: qg.IFileObj): void;
    /**触摸相关 */
    static onTouchStart(callback: Function): void;
    static onTouchMove(callback: Function): void;
    static onTouchCancel(callback: Function): void;
    static onTouchEnd(callback: Function): void;
    /**下载 */
    static download(obj: qg.IDownload): void;
}

declare namespace qg {
    interface ISysInfo {
        language: string;
    }
    interface IFileObj {
        uri: string;//文件路径
        encoding?: string;//默认为 utf8
        success: Function;
        fail: Function;
    }
    /** 下载的参数独享 */
    interface IDownload {
        url: string;
        header?: Object;
        success?: Function;
        fail?: Function;
        complete?: Function;
    }
    interface InnerAudioContext {
        play();
        pause();
        stop();
        onCanplay(callback: Function);
        offCanplay(callback: Function);
        onEnded(callback: Function);
        offEnded(callback: Function);
        seek(position: number);//跳转的时间，单位 s
        duration: number;//当前音频的长度 单位 s
        src: string;//音频资源的地址
        volume: number;//音量。范围 0~1，默认是 1
        /**
         * 当前音频的播放位置,read only
         */
        currentTime: number;
    }
}
