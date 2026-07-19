```javascript
// -------------------------------------
// Funebra 1982 furia Scene
// Mathematical BN-Point Representation
// DOM points already exist as ringa0...ringaN
// -------------------------------------

const number1982 = [
119, 32, 32, 117, 0, 0, 113, -32, -32, 108, 0, 0, 102, 32, 32, 95, 0, 0, 86, -32, -32, 77, 0, 0, 67, 32, 32, 55, 0, 0, 43, -32, -32, 31, 0, 0, 18, 32, 32, 5, 0, 0, -8, -32, -32, -21, 0, 0, -33, 32, 32, -46, 0, 0, -57, -32, -32, -69, 0, 0, -79, 32, 32, -88, 0, 0, -97, -32, -32, -104, 0, 0, -110, 32, 32, -115, 0, 0, -118, -32, -32, -120, 0, 0, -120, 32, 32, -120, 0, 0, -117, -32, -32, -114, 0, 0, -109, 32, 32, -103, 0, 0, -95, -32, -32, -87, 0, 0, -77, 32, 32, -66, 0, 0, -55, -32, -32, -43, 0, 0, -31, 32, 32, -18, 0, 0, -5, -32, -32, 8, 0, 0, 21, 32, 32, 34, 0, 0, 46, -32, -32, 58, 0, 0, 69, 32, 32, 79, 0, 0, 88, -32, -32, 96, 0, 0, 103, 32, 32, 109, 0, 0, 114, -32, -32, 117, 0, 0, 119, 32, 32, 119, 0, 0, 118, -32, -32, 116, 0, 0, 112, 32, 32, 107, 0, 0, 0, 0, 0, 0, 0, 0];

let a = 0;
const spd = 0.006;

function ani(){

    a += spd;

    for(let p=0; p<number1982.length; p++){

        //-----------------------------------
        // Read BN point
        //-----------------------------------

        let x = number1982[p*3];
        let y = -number1982[p*3+1];
        let z = number1982[p*3+2];

        //-----------------------------------
        // Scene scale
        //-----------------------------------

        let objectScale = 4;

        x *= objectScale;
        y *= objectScale;
        z *= objectScale;

        //-----------------------------------
        // Funebra depth deformation
        //-----------------------------------

        z +=
            Math.sin(
                p * 0.035 + a * 2
            ) * 5;

        //-----------------------------------
        // Rotate Y
        //-----------------------------------

        let rx =
              x * Math.cos(a)
            - z * Math.sin(a);

        let rz =
              x * Math.sin(a)
            + z * Math.cos(a);

        //-----------------------------------
        // Rotate X
        //-----------------------------------

        let tilt = -0.12;

        let ry =
              y * Math.cos(tilt)
            - rz * Math.sin(tilt);

        rz =
              y * Math.sin(tilt)
            + rz * Math.cos(tilt);

        //-----------------------------------
        // Perspective
        //-----------------------------------

        let depth = 700;
        let scale = depth / (depth + rz);

        let sx = 400 + rx * scale;
        let sy = 300 + ry * scale;

        //-----------------------------------
        // Light
        //-----------------------------------

        let nx = rx;
        let ny = ry;
        let nz = rz;

        let len =
            Math.sqrt(
                nx*nx +
                ny*ny +
                nz*nz
            ) || 1;

        nx /= len;
        ny /= len;
        nz /= len;

        let lx = -0.4;
        let ly = -0.6;
        let lz = 1;

        let llen =
            Math.sqrt(
                lx*lx +
                ly*ly +
                lz*lz
            );

        lx /= llen;
        ly /= llen;
        lz /= llen;

        let light =
              nx * lx
            + ny * ly
            + nz * lz;

        light = Math.max(0, light);
        light = 0.25 + light * 0.75;

        //-----------------------------------
        // Funebra color
        //-----------------------------------

        let pulse =
            0.5 +
            Math.sin(
                a * 2.5 -
                p * 0.02
            ) * 0.5;

        let red =
            (80 + pulse * 175) * light;

        let green =
            (120 + pulse * 120) * light;

        let blue =
            (40 + pulse * 90) * light;

        //-----------------------------------
        // Draw BN point
        //-----------------------------------

        let dot =
            document.getElementById(
                "left" + p
            );

        if(dot){

            dot.style.left =
                sx + "px";

            dot.style.top =
                sy + "px";

            dot.style.transform =
                "translate(-50%,-50%) scale(" +
                scale +
                ")";

            dot.style.color =
                `rgb(${red},${green},${blue})`;

            dot.style.opacity =
                0.2 + scale * 0.8;

            dot.style.textShadow =
                `0 0 ${4 + pulse*8}px ` +
                `rgb(${red},${green},${blue})`;
        }
    }

    requestAnimationFrame(ani);
}

ani();

```javascript
