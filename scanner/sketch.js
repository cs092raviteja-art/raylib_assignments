const r = require("raylib");

const scanner = require('./scanner');

const WIDTH = 500;
const HEIGHT = 500;

const s1_width = 50;
let s1_start = 0;
let speed1 = 1;
speed1 = -speed1;

const s2_width = 50;
let s2_start = WIDTH / 2;
let speed2 = 3;
speed2 = -speed2;

const f1_start = 100;
const f1_end = 200;
const f1_width = f1_end - f1_start;

const f2_start = 400;
const f2_end = 410;
const f2_width = f2_end - f2_start;

let s1_color = r.WHITE;
let s2_color = r.WHITE;

function isDetected(scanStart, scanEnd) {
  if (scanner.doFieldsOverlap(f1_start, f1_end, scanStart, scanEnd)) {
    return true;
  }
  return (scanner.doFieldsOverlap(f2_start, f2_end, scanStart, scanEnd));
}

function drawScanners() {
  r.DrawRectangle(s1_start, 0, s1_width, HEIGHT, s1_color); //Scanner1
  r.DrawRectangle(s2_start, 0, s2_width, HEIGHT, s2_color); //Scanner2
}

function drawFields() {
  r.DrawRectangle(f1_start, 0, f1_width, HEIGHT, r.BLUE); //Field1
  r.DrawRectangle(f2_start, 0, f2_width, HEIGHT, r.BLUE); //Field2
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
  const leftEnd = ((WIDTH / 2) - (WIDTH / 2) % speed1) - s1_width;
  const rightEnd = (WIDTH - (WIDTH % speed2)) - s2_width;

  speed1 = scanner.changeSign(s1_start, 0, leftEnd, speed1);
  speed2 = scanner.changeSign(s2_start, (WIDTH / 2), rightEnd, speed2);

  s1_start += speed1;
  s2_start += speed2;

  const s1_end = s1_start + s1_width;
  s1_color = isDetected(s1_start, s1_end) ? r.RED : r.WHITE;

  const s2_end = s2_start + s2_width;
  s2_color = isDetected(s2_start, s2_end) ? r.RED : r.WHITE;
}



function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  drawFields();
  drawScanners();

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