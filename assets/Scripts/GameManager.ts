import { _decorator, CCInteger, Component, instantiate, Label, Node, Prefab, Vec3 } from 'cc';
import { BLOCK_SCALE, PlayerController } from './PlayerController'
const { ccclass, property } = _decorator;

enum BlockType{
    BT_NONE, // 坑
    BT_STONE, // 方块
};

enum GameState{
    GS_INIT, // 初始化
    GS_PLAYING, // 游戏中
    GS_END, // 结束
};

@ccclass('GameManager')
export class GameManager extends Component {

    @property({type: Prefab})
    public boxPrefab: Prefab|null = null;
    // 初始化道路的长度
    @property({type: CCInteger})
    public roadLength: number = 50;
    private _road: BlockType[] = [];

    @property({type: Node})
    public startMenu: Node|null = null; //最开始的UI
    @property({type: PlayerController})
    public playerCtrl: PlayerController|null = null; // 玩家控制器
    @property({type: Label})
    public stepsLabel: Label|null = null; // 计步器
    start() {
        this.setCurState(GameState.GS_INIT); // 第一初始化要在 start 里面调用
        this.playerCtrl?.node.on('JumpEnd', this.onPlayerJumpEnd, this);
        // this.startGame();
    }

    update(deltaTime: number) {
        
    }

    // 初始化
    init() {
        if(this.startMenu) {
            this.startMenu.active = true;
        }
        this.generateRoad();
        if(this.playerCtrl) {
            this.playerCtrl.setInputActive(false);
            this.playerCtrl.node.setPosition(Vec3.ZERO);
            this.playerCtrl.reset();
        }
    }
    // 开始游戏
    startGame() {
        if(this.startMenu) {
            this.startMenu.active = false;
        }
        if (this.stepsLabel) {
            this.stepsLabel.string = '0';   // 将步数重置为0
        }
        setTimeout(() => {      //直接设置active会直接开始监听鼠标事件，做了一下延迟处理
            if (this.playerCtrl) {
                this.playerCtrl.setInputActive(true);
            }
        }, 0.1);
    }

    // 生成地图的方法
    generateRoad() {
        this.node.removeAllChildren();
        this._road = [];

        // startPos
        this._road.push(BlockType.BT_STONE);
        for(let i = 1; i < this.roadLength; i++) {
            if(this._road[i - 1] === BlockType.BT_NONE) {
                this._road.push(BlockType.BT_STONE);
            } else {
                this._road.push(Math.floor(Math.random() * 2));
            }
        }
        console.log('this._road----', this._road);
        for (let j = 0; j < this._road.length; j++) {
            let block: Node | null = this.spawnBlockByType(this._road[j]);
            if(block) {
                this.node.addChild(block);
                block.setPosition(j * BLOCK_SCALE, 0, 0);
            }
        }
    }

    // 生成方块的方法
    spawnBlockByType(type: BlockType) {
        // 如果绑定的prefab不存在，返回null
        if(!this.boxPrefab) {
            return null;
        }
        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.boxPrefab);
                break;
        }
        return block;
    }
    setCurState(value: GameState) {
        switch (value) {
            case GameState.GS_INIT:
                this.init();
                break;

            case GameState.GS_PLAYING:
                this.startGame();
                break;

            case GameState.GS_END:
                break;
        
            default:
                break;
        }
    }
    // 响应 Play 按钮按下的事件：
    onStartButtonClicked() {    
        this.setCurState(GameState.GS_PLAYING);
    }
    onPlayerJumpEnd(moveIndex: number) {
        if(this.stepsLabel) {
            this.stepsLabel.string = '' + (moveIndex >= this.roadLength ? this.roadLength : moveIndex);
        }
        this.checkResult(moveIndex)
    }

    checkResult(moveIndex: number) {
        if(moveIndex < this.roadLength) {
            if(this._road[moveIndex] === BlockType.BT_NONE) { //跳到了空方块上
                this.setCurState(GameState.GS_INIT);
            }
        }else{ // 到了终点
            this.setCurState(GameState.GS_INIT);
        }
    }
}

