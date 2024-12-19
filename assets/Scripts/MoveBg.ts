import { _decorator, Component, Node } from 'cc';
import { FlappyGameManager } from './FlappyGameManager';
const { ccclass, property } = _decorator;

@ccclass('MoveBg')
export class MoveBg extends Component {
    @property(Node)
    target1ToMove: Node = null
    @property(Node)
    target2ToMove: Node = null
    
    private  moveSpeed: number = 100
    private _canMoveing: boolean = false;
    start() {
        this.moveSpeed = FlappyGameManager.inst().moveSpeed;
    }

    update(deltaTime: number) {
        if(!this._canMoveing) return
        const moveDistance = this.moveSpeed * deltaTime
        let p1 = this.target1ToMove.getPosition()
        this.target1ToMove.setPosition(p1.x - moveDistance, p1.y)
        let p2 = this.target2ToMove.getPosition()
        this.target2ToMove.setPosition(p2.x - moveDistance, p2.y)
        if(p1.x < -730){
            p2 = this.target2ToMove.getPosition();
            this.target1ToMove.setPosition(p2.x + 728, p2.y)
        }
        if(p2.x < -730){
            p1 = this.target1ToMove.getPosition();
            this.target2ToMove.setPosition(p1.x + 728, p1.y)
        }
    }
    public enableMove() {
        this._canMoveing = true;
    }
    public disableMove() {
        this._canMoveing = false;
    }
}


