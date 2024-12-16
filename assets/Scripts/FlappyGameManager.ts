import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FlappyGameManager')
export class FlappyGameManager extends Component {

    private static _inst: FlappyGameManager = null

    @property
    moveSpeed:number = 100;

    public static inst() {
        return this._inst
    }
    protected onLoad(): void {
        FlappyGameManager._inst = this
    }
    start() {
    }

    update(deltaTime: number) {
        
    }
}


