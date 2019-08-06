//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

namespace egret.vivogame {

    /**
     * @private
     * @inheritDoc
     */
    export class HtmlSound extends egret.EventDispatcher implements egret.Sound {
        /**
         * Background music
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 背景音乐
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static MUSIC: string = "music";

        /**
         * EFFECT
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 音效
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static EFFECT: string = "effect";
        /**
         * @private
         */
        public type: string;

        /**
         * @private
         */
        private url: string;
        /**
         * @private
         */
        private originAudio: qg.InnerAudioContext;
        /**
         * @private
         */
        private loaded: boolean = false;

        /**
         * @private
         * @inheritDoc
         */
        constructor() {
            super();
        }

        public get length(): number {
            if (this.originAudio) {
                return this.originAudio.duration;
            }

            throw new Error("sound not loaded!");

            //return 0;
        }

        /**
         * @inheritDoc
         */
        public load(url: string): void {
            let self = this;

            this.url = url;

            if (!url) {
                egret.$warn(3002);
            }
            let audio: qg.InnerAudioContext = qg.createInnerAudioContext();

            this.originAudio = audio;
            
            if (this.isNetUrl(url)) {
                qg.download({
                    url: this.url,
                    success:(e)=>{
                        audio.src = e.tempFilePath;
                        onAudioLoaded();
                    }
                })

            } else {
                audio.src = url
                audio.volume = 0;
                audio.play();
                let idx = setInterval(() => {
                    if (audio.duration > 0) {
                        audio.pause();
                        audio.seek(0);
                        audio.volume = 1;
                        clearInterval(idx)
                        onAudioLoaded();
                    }
                }, 100)
            }

            function onAudioLoaded(): void {
                self.loaded = true;
                self.dispatchEventWith(egret.Event.COMPLETE);
            }
        }

        /**
         * @inheritDoc
         */
        public play(startTime?: number, loops?: number): SoundChannel {
            startTime = +startTime || 0;
            loops = +loops || 0;

            if (this.loaded == false) {
                egret.$warn(1049);
            }

            let channel = new HtmlSoundChannel(this.originAudio);
            channel.$url = this.url;
            channel.$loops = loops;
            channel.$startTime = startTime;
            channel.$play();

            sys.$pushSoundChannel(channel);

            return channel;
        }

        /**
         * @inheritDoc
         */
        public close() {
            if (this.originAudio)
                this.originAudio = null;
        } 
        /**
         * 是否是网络地址
         * @param url
         * @returns {boolean}
         */
        private isNetUrl(url: string): boolean {
            return url.indexOf("http://") != -1 || url.indexOf("HTTP://") != -1 || url.indexOf("https://") != -1 || url.indexOf("HTTPS://") != -1;
        }

    }
}
