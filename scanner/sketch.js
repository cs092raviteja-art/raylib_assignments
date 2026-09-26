const r = require("raylib");

const scanner = require('./scanner');

function doFieldsOverlap(f1_start, f1_end, f2_start, f2_end) {
  if (f2_start <= f1_start <= f2_end) {
    return true;
  }
  if (f2_start >= f1_end >= f2_end) {
    return true;
  }
  return false;
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
  const scanEnd = WIDTH - recW;

  curSign = curSign * scanner.direction(scanStart, 0, scanEnd);
  scanStart = scanStart + curSign;

  color = doFieldsOverlap(scanStart, scanEnd, fieldStart, fieldEnd) ? r.RED : r.WHITE;
}

const recW = 50;
let scanStart = 0;
let curSign = -1;

let color = r.WHITE;
function draw() {

  const fieldStart = 100;
  const fieldEnd = 150;
  const fieldW = fieldEnd - fieldStart;

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawRectangle(fieldStart, 0, fieldW, HEIGHT, r.BLUE); //Field
  r.DrawRectangle(scanStart, 0, recW, HEIGHT, color); //Scanner

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