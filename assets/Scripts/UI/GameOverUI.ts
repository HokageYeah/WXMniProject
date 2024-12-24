import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    curScoreLabel: Label = null
    @property(Label)
    bestScoreLabel: Label = null
    @property(Node)
    newSprite: Node = null

    @property([Node])
    medalArray: Node[] = []

    start() {

    }

    update(deltaTime: number) {
        
    }
    public show(curScore: number, bestScore: number) {
        this.node.active = true;
        this.curScoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();
        if(curScore > bestScore) {
            this.newSprite.active = true;
        }else {
            this.newSprite.active = false;
        }  
        // 0-9 第一个
        const index = curScore/10;
        let indexInt = Math.floor(index);
        if(indexInt > this.medalArray.length) {
            indexInt = this.medalArray.length - 1;
        }
        this.medalArray[indexInt].active = true;
    }
    public hide() {
        this.node.active = false;
    }
    public onPlayButtonClick() {
        // 重新开始游戏 
        // 重新加载当前场景游戏
        director.loadScene(director.getScene().name);
    }
}


