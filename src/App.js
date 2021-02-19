import './App.css';

import React from 'react';
import Controlbar from "./Components/Toolbars/Controlbar";
import Algorithmbar from "./Components/Toolbars/Algorithmbar";
import Graph from "./Components/Visualiser/Graph/Graph";


import Bubblesort from "./Algorithms/Bubblesort";
import SelectionSort from "./Algorithms/Selectionsort";
import Heapsort from "./Algorithms/Heapsort"
import Insertionsort from "./Algorithms/Insertionsort";



import Bottombar from "./Components/Toolbars/Bottombar";
import Radixsort from "./Algorithms/Radixsort";
import MergeSortDriver from "./Algorithms/Mergesort";
import Quicksort from "./Algorithms/Quicksort";


import Visualiser from "./Components/Visualiser/Visualiser";

export default class App extends React.Component {


    constructor() {
        super();
        this.state = {
            data: [],
            sort: false,
            algorithms: [],
            speed: 75,
            decoration: "bars",
            graphID: 0, //Keeps track of latest graph ID which has been assigned
            reset : false,
            stopCounter: 0, //Keeps track of when an algorithm has finished (used in stopSort())
            resetCounter: 0,
            pause: false,
        }
    }

    componentDidMount() {
        this.generateData();
    }



    generateData = () =>{
        this.setState({sort: false})

        if (this.state.algorithms.length > 0){
            this.setState({reset: true})
        }

        let data = [];
        for (let i = 0; i < 100; i++){
            data.push(Math.floor(Math.random() * 100)+1);
        }

        this.setState({data: data});

        this.state.algorithms.forEach(i=>{
            //i.steps = this.getSteps(i.algorithm, this.state.data)
           // temp.push({algorithm: algorithm, steps: this.getSteps(algorithm, [...this.state.data]), graphID: this.state.graphID+1})

            let [...steps] = this.getSteps(i.algorithm, data);
            console.log("NEW STEPS: " + steps + " with len: " + steps.length);
            i.steps = steps;
            //TODO for temp fix, change above line to: i.steps = this.getSteps(i.algorithm, data) but does not work properly
        })


        /*
        console.log("data: " + data)


        if (this.state.algorithms.length > 0){
            this.reset();
        }
*/
    }

    resetCompleted = () =>{
        let tempResetCounter = this.state.resetCounter + 1;
        this.setState({resetCounter: tempResetCounter})
        console.log("reset complete func: " + tempResetCounter)

        if (this.state.resetCounter >= this.state.algorithms.length){
            this.setState({reset: false})
        }
    }

    startSort = () =>{
        this.setState({sort: true})
    }

    stopSort = () =>{

        console.log("stopping sort")

        let temp = this.state.stopCounter + 1;
        console.log("lenght: " + this.state.algorithms.length)
        this.setState({sort: false})

    }


    clear = () => {
        this.setState({algorithms: []})
    }
    addAlgorithm = (algorithm) =>{
        let temp = this.state.algorithms;
        temp.push({algorithm: algorithm, steps: this.getSteps(algorithm, [...this.state.data]), graphID: this.state.graphID+1})
        this.setState({
            algorithms: temp,
            graphID: this.state.graphID+1

        });
    }


    removeAlgorithm = (graphID) =>{
        console.log("remove algorithm")
        let temp = [];
        for (let i = 0; i < this.state.algorithms.length; i++){
            console.log("here graphID: " + graphID)
            if (this.state.algorithms[i].graphID !== graphID) {
                temp.push(this.state.algorithms[i]);
            }
        }
        this.setState({algorithms: temp});
    }



    getSteps = (algorithm, data) =>{
        console.log("getsteps data: " + data);
        switch (algorithm) {
            case "Bubble Sort":
                return Bubblesort(data);
            case "Heap Sort":
                return Heapsort(data);
            case "Insertion Sort":
                console.log("steps to return: " + Insertionsort(data))
                let steps = Insertionsort(data)
                return steps;
            case "Selection Sort":
                return SelectionSort(data);
            case "Radix Sort":
                return Radixsort(data);
            case "Merge Sort":
                return MergeSortDriver(data);
            case "Quick Sort":
                return Quicksort(data);
        }
    }



    updateSpeed = (newSpeed) =>{
        this.setState({speed: newSpeed});
    }

    changeDecoration = () =>{
        if (this.state.decoration == "bars"){
            this.setState({decoration: "numerics"})
        }else if (this.state.decoration == "numerics"){
            this.setState({decoration: "bars"})
        }
    }

    drawGraphs = () =>{

        {this.setState({reset: false})}
    }

    skip = (direction) =>{

    }

    togglePlayPause = () =>{
        if (this.state.pause == true){
            this.setState({pause: false})
        }else{
            if (this.state.sort == false){
                this.setState({sort: true})
            }
            this.setState({pause: true})
        }
    }

    render() {

        return(
            <div>
                <Controlbar generateDataCallback = {this.generateData} startSortCallback = {this.startSort} clearCallback = {this.clear}/>


                <Algorithmbar onAddAlgorithm={this.addAlgorithm}/>

                {/*<h1>Data: {this.state.data}</h1>*/}


                {/*<h2>Graph:</h2>*/}
                <h3>{"reset state of app: " + this.state.reset}</h3>
                <h3>{"sort state of app scope: " + this.state.sort}</h3>
                <div id={"sorting-area"}>
                    {(this.state.algorithms.map(i => (

                        <div id ={i.graphID}>
                            {console.log("DATA FOR ALGORITHM LOOP: " + this.state.data)}
                            <h1>{"sort state: " + this.state.sort}</h1>
                            <h2>{i.algorithm}</h2>
                            <Visualiser startData = {this.state.data} steps = {[i][0].steps} sort = {this.state.sort} stopSort = {this.stopSort} removeAlgorithm = {this.removeAlgorithm} title = {i.algorithm} speed = {this.state.speed} decoration ={this.state.decoration} graphID = {i.graphID} reset={this.state.reset} resetCompletedCallback = {this.resetCompleted} pause = {this.state.pause}/>
                            {/*/*index 0 being the starting step (unsorted array) so then when animating should be: [i][0][j]*/}
                        </div>
                    )))}
                </div>



                <Bottombar updateSpeedCallback = {this.updateSpeed} toggleDecoration = {this.changeDecoration} playPauseCallback = {this.togglePlayPause} skip = {() => this.skip()}/>
            </div>
        );

    }
}
