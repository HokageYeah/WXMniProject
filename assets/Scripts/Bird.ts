import { _decorator, Collider2D, Component, Contact2DType, Input, input, IPhysics2DContact, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    // 缸体组件
    private rgd2D: RigidBody2D = null;

    @property
    rotateSpeed: number = 30;

    start() {
        this.rgd2D = this.getComponent(RigidBody2D);
    }
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)

        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this)

        }
    }

    protected onDestroy(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }
    update(deltaTime: number) {
        if(this.node.angle >= -60) {
            this.node.angle -= this.rotateSpeed * deltaTime
        }
    }
    onTouchStart() {
        this.rgd2D.linearVelocity = new Vec2(0, 8)
        // this.node.setRotationFromEuler(new Vec3(0, 0, 30))
        this.node.angle = 30
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.tag)
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }
}


