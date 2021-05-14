class Pendulum {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.constantPosition = { x: width/2, y: height/2 };
        this.theta = 10.0;
        this.angularVelocity = 0.0;
        this.angularAcceleration = 0.0;
        this.length = 200;
        this.radius = 50;
        this.gravity = 9.8;
        this.mass = 10.0;
        this.realLength = 10.0;
        this.friction = 0.9;
        this.force = 0.0;
        this.isPIDEnabled = true;
        this.pidForce = 0.0;
        this.pid = new PID(0.02, 0.0001, 0.05);
    }

    show() {
        const { constantPosition, position, radius } = this;

        stroke(255, 100, 100);
        strokeWeight(40);
        line(constantPosition.x, constantPosition.y, position.x, position.y);

        // Special thanks to: Talha the Intern Bender 
        fill(255, 100, 100);
        strokeWeight(7);
        stroke(0);
        circle(constantPosition.x, constantPosition.y, radius);
        stroke(255);
        circle(position.x, position.y, radius);    
    }

    update() {
        if (this.theta > 180) {
            this.theta -= 360;
        } else if (this.theta < -180) {
            this.theta += 360;
        }

        this.applyPID();
        this.angularAcceleration = sin(this.theta)*this.gravity/this.realLength - this.friction*this.angularVelocity/(this.mass*this.realLength) + this.force + this.pidForce;
        this.angularVelocity += this.angularAcceleration;
        this.theta += this.angularVelocity;
        this.force = 0.0;
        this.pidForce = 0.0;
        this.position.x = this.constantPosition.x + this.length*sin(this.theta);
        this.position.y = this.constantPosition.y - this.length*cos(this.theta);
    }

    applyPID() {
        if (!this.isPIDEnabled) return;
        const pidError = this.pid.apply(0, this.theta);
        this.applyPIDForce(pidError);
    }

    applyForce(force) {
        this.force = force;
    }

    applyPIDForce(force) {
        this.pidForce = force;
    }
}