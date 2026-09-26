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
  const end = WIDTH - recW;

  curSign = curSign * scanner.direction(x, 0, end);
  x = x + curSign;
}

const recW = 50;
let x = 0;
let curSign = -1;

function draw() {

  const fieldStart = 100;
  const fieldEnd = 150;
  const fieldW = fieldEnd - fieldStart;

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawRectangle(fieldStart, 0, fieldW, HEIGHT, r.BLUE);
  r.DrawRectangle(x, 0, recW, HEIGHT, r.WHITE);

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