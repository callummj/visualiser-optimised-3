

import {useState, useEffect} from 'react';

import Graph from "./Graph/Graph";



export default function Visualiser(props) {

    /*
    let [ready, setReady] = useState(false)
    let [ctx, setCtx] = useState();




    useEffect(() => {
        const canvas = document.getElementById('canvas');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const ctx = canvas.getContext("2d");
        setCtx(ctx);
        setReady(true);

        if (ready) {
            const randomArray = props.startData;
            const arrayMembers = randomArray.map((v, i) => {
                return new Bar(10 * i + i, 0, 10, v * 5, ctx);
            });

            const drawAll = () => arrayMembers.forEach((m) => m.draw());
            drawAll()
        }
    });

    if (props.sort == true) {
        Sorter(props)
    }*/

    let data = props.startData;
    const draw = (ctx, frameCount) => {


        /*
        const arrayMembers = data.map((v, i) => {
            return new ArrayMember(ctx.canvas.width * i + i, 0, ctx.canvas.width, v * ctx.canvas.height, ctx);
        });

        const drawAll = () => arrayMembers.forEach((m) => m.draw());

        drawAll();
*/
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        let pos = 10;
        data.forEach(i=>{
            //ctx.arc(pos*i, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
            ctx.rect(pos*i, 100, 50, -data[i])
        })

        ctx.fill()


    }

    return <Graph draw={draw} />
}

