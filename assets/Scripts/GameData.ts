import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export class GameData {
    private static _score: number = 0;
    public static addScore(count: number) {
        this._score += count;
    }
    public static getScore(): number {
        return this._score;
    }
}


