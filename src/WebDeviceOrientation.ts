namespace egret.vivogame {

    /**
     * @private
     */
    export class WebDeviceOrientation extends EventDispatcher implements DeviceOrientation {

        /**
         * @private
         * 
         */
        start() {
            qg.subscribeAccelerometer({
                callback: (data) => {
                    let event = new OrientationEvent(Event.CHANGE);
                    event.beta = data.y;
                    event.gamma = data.z;
                    event.alpha = data.x;
                    this.dispatchEvent(event);
                }
            })
        }

        /**
         * @private
         * 
         */
        stop() {
            qg.unsubscribeAccelerometer();
        }
    }
}

egret.DeviceOrientation = egret.vivogame.WebDeviceOrientation;
