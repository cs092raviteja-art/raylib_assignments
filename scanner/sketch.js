const r = require("raylib");

const scanner = require('./scanner');

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

  curSign = curSign * scanner.direction(scanStart, 0, end);
  scanStart = scanStart + curSign;

  const scanEnd = scanStart + scanW;
  color = scanner.doFieldsOverlap(fieldStart, fieldEnd, scanStart, scanEnd) ? r.RED : r.WHITE;
}

const scanW = 50;
let scanStart = 0;
let curSign = -1;

const fieldStart = 300;
const fieldEnd = 400;
const fieldW = fieldEnd - fieldStart;

let color = r.WHITE;
function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawRectangle(fieldStart, 0, fieldW, HEIGHT, r.BLUE); //Field
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