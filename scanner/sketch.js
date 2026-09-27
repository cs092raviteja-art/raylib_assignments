const r = require("raylib");

const scanner = require('./scanner');

const WIDTH = 600;
const HEIGHT = 400;

const hS1_width = 50;
let hS1_start = 0;
let hS1_speed = 1;
hS1_speed = -hS1_speed;

const hS2_width = 50;
let hS2_start = WIDTH / 2;
let hS2_speed = 2;
hS2_speed = -hS2_speed;

const vS1_height = 20;
let vS1_start = 0;
let vS1_speed = 2;
vS1_speed = -vS1_speed

const vF1_start = 200;
const vF1_end = 250;

const hF1_start = 100;
const hF1_end = 201;

const hF2_start = 400;
const hF2_end = 410;

let hS1_color = r.WHITE;
let hS2_color = r.WHITE;
let vS1_color = r.WHITE;

function drawHorizScanners() {
  r.DrawRectangle(hS1_start, 0, hS1_width, HEIGHT, hS1_color); //Scanner1
  r.DrawRectangle(hS2_start, 0, hS2_width, HEIGHT, hS2_color); //Scanner2
}

function drawHorizFields() {
  const hF1_width = hF1_end - hF1_start;
  const hF2_width = hF2_end - hF2_start;

  r.DrawRectangle(hF1_start, 0, hF1_width, HEIGHT, r.BLUE); //Field1
  r.DrawRectangle(hF2_start, 0, hF2_width, HEIGHT, r.BLUE); //Field2
}

function horizDetector(scanStart, scanEnd) {
  if (scanner.doFieldsOverlap(hF1_start, hF1_end, scanStart, scanEnd)) {
    return true;
  }
  return (scanner.doFieldsOverlap(hF2_start, hF2_end, scanStart, scanEnd));
}

function drawVertScanners() {
  r.DrawRectangle(0, vS1_start, WIDTH, vS1_height, vS1_color)
}

function drawVertFields() {
  const vF1_height = vF1_end - vF1_start;

  r.DrawRectangle(0, vF1_start, WIDTH, vF1_height, r.BLUE)
}

function vertDetector(scanStart, scanEnd) {
  return (scanner.doFieldsOverlap(scanStart, scanEnd, vF1_start, vF1_end));
}



function running() {
  return !r.WindowShouldClose();
}

function setup() {
  const FPS = 60;

  r.InitWindow(WIDTH, HEIGHT, "Scanner.");
  r.SetTargetFPS(FPS);
}

function update() {
  const leftEnd = scanner.calcEnd(WIDTH / 2, 0, hS1_width, hS1_speed);
  const rightEnd = scanner.calcEnd(WIDTH, WIDTH / 2, hS2_width, hS2_speed);

  const vEnd = scanner.calcEnd(HEIGHT, 0, vS1_height, vS1_speed);


  //Decides if scanner needs to move (right or left) and (up or down), and scanner's speed.
  hS1_speed = scanner.changeSign(hS1_start, 0, leftEnd, hS1_speed);
  hS2_speed = scanner.changeSign(hS2_start, (WIDTH / 2), rightEnd, hS2_speed);

  vS1_speed = scanner.changeSign(vS1_start, 0, vEnd, vS1_speed)


  //Moves scanner according speed and direction.
  //Direction is included in speed with '+' and '-'.
  hS1_start += hS1_speed;
  hS2_start += hS2_speed;

  vS1_start += vS1_speed;


  //Detects the fields of scanners.
  const hS1_end = hS1_start + hS1_width;
  hS1_color = horizDetector(hS1_start, hS1_end) ? r.RED : r.WHITE;
  const hS2_end = hS2_start + hS2_width;
  hS2_color = horizDetector(hS2_start, hS2_end) ? r.RED : r.WHITE;

  const vS1_end = vS1_start + vS1_height;
  vS1_color = vertDetector(vS1_start, vS1_end) ? r.RED : r.WHITE;

}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  drawHorizFields();
  drawVertFields();

  drawHorizScanners();
  drawVertScanners();

  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};