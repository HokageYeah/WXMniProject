import { _decorator, Component, EventMouse, Input, input, Node, Vec3, Animation, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

// 添加一个放大比
export const BLOCK_SCALE = 40;
@ccclass('PlayerController')
export class PlayerController extends Component {

    @property(Animation)
    BodyAnim:Animation = null;
    @property(Node)
    leftTouch: Node = null;
    @property(Node)
    rightTouch: Node = null;
    private _startJump: boolean = false; // 是否开始跳跃
    private _jumpStep: number = 0; // 跳跃步数
    private _curJumpTime: number = 0; // 当前跳跃时间
    private _jumpTime: number = 0.1; // 跳跃时间
    private _curJumpSpeed: number = 0; // 移动速度
    private _curPos: Vec3 = new Vec3(); // 当前位置
    private _deltaPos: Vec3 = new Vec3(0, 0, 0); // 位移
    private _targetPos: Vec3 = new Vec3(); // 目标位置
    private _curMoveIndex: number = 0; // 记录角色当前为多少步
    start() {
        // input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }
    reset() {
        this._curMoveIndex = 0;
        this.node.getPosition(this._curPos);
        this._targetPos.set(0,0,0);
    }

    // 通过 input.on 的方式监听，这种方式会监听屏幕上所有的触摸
    // 通过 node.on 的方式监听时，可以监听某个范围内的触摸事件
    setInputActive(active: boolean) {
        if(active) {
            // input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
            this.leftTouch.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.rightTouch.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        } else {
            // input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
            this.leftTouch.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.rightTouch.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }
    }
    // 根据每次的更新来计算角色最新的位置：
    update(deltaTime: number) {
        if(this._startJump) {
            this._curJumpTime += deltaTime; // 累计总的跳跃时间
            if(this._curJumpTime > this._jumpTime) { // 当跳跃时间是否结束
                // 结束
                this.node.setPosition(this._targetPos) // 强制位置到终点
                this._startJump = false; // 标记结束
                this.onOnceJumpEnd();  
            } else {
                this.node.getPosition(this._curPos); // 获取当前位置
                this._deltaPos.x = this._curJumpSpeed * deltaTime; //每一帧根据速度和时间计算位移
                Vec3.add(this._curPos, this._curPos, this._deltaPos); // 应用这个位移
                this.node.setPosition(this._curPos); // 设置新的位置
            }
        }
    }
    // 监听鼠标输入
    onMouseUp(event: EventMouse) {
        console.log('onMouseUp----', event);
        if(event.getButton() == 0) {
            console.log('鼠标左键');
            this.jumpByStep(1);
        } else if(event.getButton() == 2) {
            console.log('鼠标右键');
            this.jumpByStep(2);
        }
    }
    // 添加响应触摸的回调
    onTouchStart(event: EventTouch) {
        console.log('onTouchStart----', event);
        const target = event.target as Node;
        console.log('onTouchStart----target', target.name);
        if(target.name == 'LeftTouch') {
            this.jumpByStep(1);
        } else if(target.name == 'RightTouch') {
            this.jumpByStep(2);
        }
    }
    // 根据步数跳跃：
    jumpByStep(step: number) {
        if(this._startJump) {
            return;
        }
        this._startJump = true; // 标记开始跳跃
        this._jumpStep = step; // 跳跃的步数 1 或者 2
        this._curJumpTime = 0; // 重置开始跳跃时间

        const clipName = step == 1 ? 'oneStep' : 'twoStep';
        const state = this.BodyAnim.getState(clipName);
        this._jumpTime = state.duration;

        this._curJumpSpeed = this._jumpStep * BLOCK_SCALE / this._jumpTime; // // 根据时间计算出速度
        this.node.getPosition(this._curPos); // 获取当前位置
        // 计算出目标位置
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep * BLOCK_SCALE, 0, 0));
        if(this.BodyAnim) {
            if(step === 1) {
                this.BodyAnim.play('oneStep');
            }else if(step === 2) {
                this.BodyAnim.play('twoStep');
            }
        }
        this._curMoveIndex += step;
    }
    onOnceJumpEnd() {
        this.node.emit('JumpEnd', this._curMoveIndex);
    }
    
}

