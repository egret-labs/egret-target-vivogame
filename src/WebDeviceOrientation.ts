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
            qg.subscribeAccelerometer(this.onChange.bind(this))
        }

        /**
         * @private
         * 
         */
        stop() {
            qg.unsubscribeAccelerometer();
        }

        /**
         * @private
         */
        protected onChange = (e: any) => {
            let event = new OrientationEvent(Event.CHANGE);
            event.beta = e.y;
            event.gamma = e.z;
            event.alpha = e.x;
            this.dispatchEvent(event);
        }
    }
}

egret.DeviceOrientation = egret.vivogame.WebDeviceOrientation;
