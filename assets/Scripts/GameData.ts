import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export class GameData {
    private static _score: number = 0;
    private static readonly SCORE: string = "score";
    private static readonly BEST_SCORE: string = "bestScore";
    public static addScore(count: number) {
        this._score += count;
    }
    public static getScore(): number {
        return this._score;
    }

    public static getBestScore(): number {
       let bestScore = localStorage.getItem(this.BEST_SCORE);
       if(bestScore) {
        return parseInt(bestScore);
       }
       return 0;
    }
    public static saveScore() {
        let curScore = this.getScore();
        if(curScore > this.getBestScore()) {
            localStorage.setItem(this.BEST_SCORE, curScore.toString());
        }
    }
}


