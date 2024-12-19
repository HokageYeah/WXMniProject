import { _decorator, Component, Input, input, Node } from 'cc';
import { FlappyGameManager } from '../FlappyGameManager';
const { ccclass, property } = _decorator;

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {
    start() {

    }
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
    update(deltaTime: number) {
        
    }
    onTouchStart() {
        FlappyGameManager.inst().transitionToGameingState();
    }
}


