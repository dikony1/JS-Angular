function runA1() {
    console.clear();
    console.log("Running A1 — Prototypes");

    // 1) Base "class"
    function Shape() {}
    Shape.prototype.getArea = function () { return 0; };
    Shape.prototype.describe = function () { return "Shape"; };

    // 2) Rectangle
    // TODO(a): Make Rectangle a constructor that calls the parent (Shape) and
    //          stores width/height on the instance.
    function Rectangle(width, height) { 
        Shape.call(this);
        this.width = width
        this.height = height
     }
     
     Rectangle.prototype = Object.create(Shape.prototype)
     Rectangle.prototype.constructor = Rectangle;

// some changes 

    Rectangle.prototype.getArea = function(){ 
        return this.width * this.height
     };

    Rectangle.prototype.describe = function(){
        const parent = Shape.prototype.describe.call(this);
        return parent + "Rectangle " + this.width + "x" + this.height
     };

    // 3) Square
    // TODO(e): Square(side) should call Rectangle with width=height=side.
    function Square(side) { 
        Rectangle.call(this, side, side);
        this.side = side
     }

    Square.prototype = Object.create(Rectangle.prototype)
    Square.prototype.constructor = Square;
    
    Square.prototype.describe = function(){ 
        const rectangle = Rectangle.prototype.describe.call(this);
        return rectangle + "Square side=" + this.side
     };

    // ─────────────────────────────────────────────────────────────────────
    // Self-checks (leave these as-is; adjust only when implementing)
    try {
        const r1 = new Rectangle(3, 4);
        const r2 = new Rectangle(5, 6);
        const sq = new Square(4);

        console.log("r1 area =", r1.getArea(), "(expect 12)");
        console.log("r2 area =", r2.getArea(), "(expect 30)");
        console.log("sq area =", sq.getArea(), "(expect 16)");

        // Method sharing: both rectangles should reference the SAME function
        console.log("shared getArea on Rectangle:", r1.getArea === r2.getArea, "(expect true)");

        // Prototype chain checks
        console.log("Shape in chain (sq):", Shape.prototype.isPrototypeOf(sq), "(expect true)");
        console.log("Rectangle in chain (sq):", Rectangle.prototype.isPrototypeOf(sq), "(expect true)");

        // Constructor pointers must be correct
        console.log("sq.constructor === Square:", sq.constructor === Square, "(expect true)");
        console.log("r1.constructor === Rectangle:", r1.constructor === Rectangle, "(expect true)");


        // Describe strings should compose parent+child info
        console.log("r1.describe():", r1.describe(), '(expect includes "Shape" and "Rectangle 3x4")');
        console.log("sq.describe():", sq.describe(), '(expect includes "Rectangle 4x4" and "Square side=4")');

    } catch (e) {
        console.log("Runtime error:", e.message);
    }
}