const r = require("raylib");

const scanner = require('./scanner');

function isDetected(scanEnd) {
  if (scanner.doFieldsOverlap(f1_start, f1_end, scanStart, scanEnd)) {
    return true;
  }
  return (scanner.doFieldsOverlap(f2_start, f2_end, scanStart, scanEnd));
}

const speed = 5;
function move(end) {
  curSign = curSign * scanner.direction(scanStart, 0, end);
  scanStart = (scanStart + curSign) * speed;
}

function running() {
  return !r.WindowShouldClose();
}

const WIDTH = 500;
const HEIGHT = 500;

function setup() {
  const FPS = 60;

  r.InitWindow(WIDTH, HEIGHT, "Scanner.");
  r.SetTargetFPS(FPS);
}

function update() {
  const end = WIDTH - scanW;

  move(end);

  const scanEnd = scanStart + scanW;
  color = isDetected(scanEnd) ? r.RED : r.WHITE;
}

const scanW = 50;
let scanStart = 0;
let curSign = -1;

const f1_start = 100;
const f1_end = 200;
const f1_width = f1_end - f1_start;

const f2_start = 400;
const f2_end = 410;
const f2_width = f2_end - f2_start;

let color = r.WHITE;
function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawRectangle(f1_start, 0, f1_width, HEIGHT, r.BLUE); //Field1
  r.DrawRectangle(f2_start, 0, f2_width, HEIGHT, r.BLUE); //Field2

  r.DrawRectangle(scanStart, 0, scanW, HEIGHT, color); //Scanner

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