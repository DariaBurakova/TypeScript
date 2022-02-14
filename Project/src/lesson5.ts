abstract class MyGraphicsPrimitive2D {  
    leftPoint:number
    rightPoint:number
    constructor( leftPoint:number,
        rightPoint:number){
            this.leftPoint=leftPoint
            this.rightPoint=rightPoint
        }
   abstract description():number
}

abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D{
   abstract square():number
}

class MyCirle extends MyAreaPrimitive2D{
    private center:number=3.14
    radius:number=0
    constructor(center:number,radius:number,leftPoint:number,rightPoint:number){
        super(leftPoint,rightPoint)
        this.center=center
        this.radius=radius
    }
    description():number {
        return this.leftPoint +1 && this.rightPoint+2
    }
    square():number{
        return this.center*(this.radius*this.radius)
    }
}
class  MyRectangle extends MyAreaPrimitive2D {
    width:number=0
    height:number=0
    constructor(width:number,height:number,leftPoint:number,rightPoint:number){
        super(leftPoint,rightPoint)
        this.width=width
        this.height=height
    }
    description():number {
        return this.leftPoint +1 && this.rightPoint+2
    }
    square():number{
        return this.width*this.height
}
}