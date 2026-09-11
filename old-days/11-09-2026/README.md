// Forked from old-days/17-12-2025 on 11-09-2026
// Local PNG assets still live in ../17-12-2025/ (copy them here if you want a fully standalone snapshot).

// 1) eye0256 setup
steps.value = 1; stpStart.value = 0; stpEnd.value = 16 * 16-1; shape.value = "smileGrid"; initsobj(shape.value); const cols = 16; const cellSize = 20; scodeX.value = "(o % " + 16 + ") * " + 20 + " + window.innerWidth/2 - (" + 16 + " * " + 20 + ")/2-10"; scodeY.value = "Math.floor(o / " + 16 + ") * " + 20 + " + 220"; clor.value = '"rgb(" + (Math.cos(((15 - (o % 16)) - Math.floor(o / 16)) / 2) * 120 + 135) + ", 120, 120)"';
// 1) Text
const gamez = funebraText("GAMEZ", { step: 12 }); console.log("GAMEZ points:", gamez.length / 3); // number of points

// 2) Image sprite
(async () => { window.fpHead = await funebraPixelsFromImage( "../17-12-2025/2025-11-14_134226_.png", // or "../17-12-2025/2025-10-21_061658.png" { targetHeight: 150, threshold: 210, step: 1, } ); console.log("fpHead points:", fpHead.length / 3); })();
