import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    @property
    spawnRate: number = 0.5;

    private timer: number = 0;
    start() {

    }

    update(deltaTime: number) {
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
}


