import { _decorator, Component, Label, Node } from 'cc';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

// 游戏状态
enum GameState {
    Ready,
    Gameing,
    GameOver
}

@ccclass('FlappyGameManager')
export class FlappyGameManager extends Component {

    private static _inst: FlappyGameManager = null

    @property
    moveSpeed:number = 100;    

    @property(MoveBg)
    bgMoving: MoveBg = null;
    @property(MoveBg)
    landMoving: MoveBg = null;
    @property(PipeSpawner)
    pipeSpawner: PipeSpawner = null
    @property(GameReadyUI)
    gameReadyUI: GameReadyUI = null
    @property(Node)
    gameingUI: Node = null
    @property(Label)
    scoreLabel: Label = null

    @property(Bird)
    bird: Bird = null

    curGS: GameState = GameState.Ready;


    public static inst() {
        return this._inst
    }
    protected onLoad(): void {
        FlappyGameManager._inst = this
    }
    start() {
        this.transitionToReadyState();
    }

    update(deltaTime: number) {
        
    }

    transitionToReadyState() {
        this.curGS = GameState.Ready;
        this.bird.disableControl();
        this.bgMoving.disableMove();
        this.landMoving.disableMove();
        this.pipeSpawner.pause();
        this.gameReadyUI.node.active = true;
        this.gameingUI.active = false;
    }
    transitionToGameingState() {
        this.curGS = GameState.Gameing;
        this.bird.enableControl();
        this.bgMoving.enableMove();
        this.landMoving.enableMove();
        this.pipeSpawner.resume();
        this.gameReadyUI.node.active = false;
        this.gameingUI.active = true;
    }
    transitionToGameOverState() {
        this.curGS = GameState.GameOver;
        this.bird.disableControl();
        this.bgMoving.disableMove();
        this.landMoving.disableMove();
        this.pipeSpawner.pause();
    }
    addScore(count: number=1) {
        GameData.addScore(count);
        this.scoreLabel.string = GameData.getScore().toString();
    }
    getScore() {
        return GameData.getScore();
    }
}


