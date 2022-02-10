declare abstract class MyGraphicsPrimitive2D {
    leftPoint: number;
    rightPoint: number;
    abstract description(): number;
}
declare abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {
    abstract square(): number;
}
declare class MyCirle extends MyAreaPrimitive2D {
    private center;
    radius: number;
    constructor(center: number, radius: number, leftPoint: number, rightPoint: number);
    description(): number;
    square(): number;
}
declare class MyRectangle extends MyAreaPrimitive2D {
    leftPoint: number;
    rightPoint: number;
    width: number;
    height: number;
    constructor(width: number, height: number, leftPoint: number, rightPoint: number);
    description(): number;
    square(): number;
}
