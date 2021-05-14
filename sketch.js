let pendulum, PIDCheckbox, leftForceButton, rightForceButton, forceAmplitudeSlider;

setup = _ => {
  createCanvas(800, 800);
  angleMode(DEGREES);

  pendulum = new Pendulum;
  
  addPIDCheckbox();
  addForceAmplitudeSlider();
  addForceButtons();
};

draw = _ => {
  background(220);
  
  pendulum.update();
  pendulum.show();

  drawForceAmplitudeSliderValue();
  drawThetaValue();
};

const addPIDCheckbox = _ => {
  PIDCheckbox = createCheckbox('PID', pendulum.isPIDEnabled);
  PIDCheckbox.position(10, 10);
  PIDCheckbox.changed(_ => { pendulum.isPIDEnabled = PIDCheckbox.checked(); });
};

const addForceAmplitudeSlider = _ => {
  forceAmplitudeSlider = createSlider(1, 10, 2);
  forceAmplitudeSlider.position(10, 40);
};

const drawForceAmplitudeSliderValue = _ => {
  noStroke();
  fill(0)
  textSize(20);
  text("Force Amplitude: " + forceAmplitudeSlider.value(), 150, 57.5);
};

const addForceButtons = _ => {
  const position = { x: 10, y: 70 };
  leftForceButton = createButton('Left Force');
  leftForceButton.position(position.x, position.y);
  leftForceButton.mousePressed(_ => { pendulum.applyForce(forceAmplitudeSlider.value()); });
  
  rightForceButton = createButton('Right Force');
  rightForceButton.position(position.x + 90, position.y);
  rightForceButton.mousePressed(_ => { pendulum.applyForce(-forceAmplitudeSlider.value()); });
};

const drawThetaValue = _ => {
  noStroke();
  fill(0)
  textSize(20);
  const theta = pendulum.theta.toFixed(1);
  if (theta >= 0) {
    text("Angle:  " + theta, 10, 120);
  } else {
    text("Angle: " + theta, 10, 120);
  }
};
