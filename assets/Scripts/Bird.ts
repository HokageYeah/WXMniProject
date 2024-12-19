import { _decorator, Animation, Collider2D, Component, Contact2DType, Input, input, IPhysics2DContact, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { Tags } from './Tags';
import { FlappyGameManager } from './FlappyGameManager';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    // 缸体组件
    private rgd2D: RigidBody2D = null;

    @property
    rotateSpeed: number = 30;

    // 是否可以控制
    private _canControl: boolean = false;

    start() {
    }
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)

        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this)

        }
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    protected onDestroy(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        let collider = this.getComponent(Collider2D);
        if(collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this)
        }
    }
    update(deltaTime: number) {
        if(!this._canControl) return
        if(this.node.angle >= -60) {
            this.node.angle -= this.rotateSpeed * deltaTime
        }
    }
    onTouchStart() {
        if(!this._canControl) return
        this.rgd2D.linearVelocity = new Vec2(0, 8)
        // this.node.setRotationFromEuler(new Vec3(0, 0, 30))
        this.node.angle = 30
    }
    public enableControl() {
        this.rgd2D.enabled = true;
        this._canControl = true;
        // 启用小鸟动画
        this.node.getComponent(Animation).enabled = true;
    }
    public disableControl() {
        this.rgd2D.enabled = false;
        this._canControl = false;
        // 禁用小鸟动画
        this.node.getComponent(Animation).enabled = false;
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.tag)
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.tag)
        if(otherCollider.tag == Tags.PIPE_MIDDLE) {
            FlappyGameManager.inst().addScore();
        }
    }
}


