// -------------------------------------
// Funebra Sphere Engine
// Mathematical Point Cloud
// -------------------------------------

const rows = 8;
const cols = 8;
const radius = 60;

let a = 0;
const spd = 0.01;

function ani(){

    a += spd;

    let p = 0;

    for(let i=0;i<rows;i++){

        // latitude
        let theta = i/(rows-1)*Math.PI;

        for(let j=0;j<cols;j++){

            // longitude
            let phi = j/cols*Math.PI*2;

            //-----------------------------------
            // Generate sphere mathematically
            //-----------------------------------

            let x = radius*Math.sin(theta)*Math.cos(phi);
            let y = radius*Math.cos(theta);
            let z = radius*Math.sin(theta)*Math.sin(phi);

            //-----------------------------------
            // Funebra deformation
            //-----------------------------------

            let wave =
                  Math.sin(theta*8+a)
                * Math.cos(phi*6+a);

            let r = radius;// + wave*20;

            x = r*Math.sin(theta)*Math.cos(phi);
            y = r*Math.cos(theta);
            z = r*Math.sin(theta)*Math.sin(phi);

            //-----------------------------------
            // Rotate Y
            //-----------------------------------

            let rx = x*Math.cos(a)-z*Math.sin(a);
            let rz = x*Math.sin(a)+z*Math.cos(a);

            //-----------------------------------
            // Rotate X
            //-----------------------------------

            let ry = y*Math.cos(a*0.6)-rz*Math.sin(a*0.6);
            rz     = y*Math.sin(a*0.6)+rz*Math.cos(a*0.6);


            //-----------------------------------
            // Perspective
            //-----------------------------------

            let depth = 500;
            let scale = depth/(depth+rz);

            let sx = 400 + rx*scale;
            let sy = 300 + ry*scale;

            //-----------------------------------
            // Draw point
            //-----------------------------------

            let dot = document.getElementById("ringa"+p);

            if(dot){

                dot.style.left = sx+"px";
                dot.style.top = sy+"px";
                dot.style.transform =
                    "translate(-50%,-50%) scale("+scale+")";
dot.style.color="rgb("+((phi+p)*a%32)/32*255+", 255, 0 )";
                dot.style.opacity = scale;

            }

            p++;

        }

    }

    requestAnimationFrame(ani);

}

ani();
