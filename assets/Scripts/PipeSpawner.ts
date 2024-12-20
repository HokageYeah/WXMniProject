import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { Pipe } from './Pipe';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    @property
    spawnRate: number = 0.5;

    private timer: number = 0;
    private _isSpawning: boolean = false;
    start() {

    }

    update(deltaTime: number) {
        if(!this._isSpawning) return
        this.timer += deltaTime;
        if(this.timer > this.spawnRate) {
            this.timer = 0;
            const pipInst = instantiate(this.pipePrefab)
            this.node.addChild(pipInst)
            // pipInst.setPosition(this.node.getPosition())
            const p = this.node.getWorldPosition();
            pipInst.setWorldPosition(p);
            const y = math.randomRangeInt(-100, 200);  
            const pLoca = pipInst.getPosition();
            pipInst.setPosition(pLoca.x,y)
        }
    }
    public pause() {
        this._isSpawning = false;
        this.node.children.forEach(child => {
            const pipe =  child.getComponent(Pipe);
            if(pipe) {
                pipe.enabled = false;
            }
        });
    }
    public resume() {
        this._isSpawning = true;
    }
}


