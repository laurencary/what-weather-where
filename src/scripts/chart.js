import Chart from 'chart.js/auto'

class myChart {
    static chartColors = {
        darkBlue: "#5d89a1",
        medBlue: "#88adc2",
        lightBlue: "#c5dfed",
        lightGreen: "#9dd4a4",
        lightOrange: "#dec29e",
        medOrange: "#e6b06a",
        darkOrange: "#d68533"
    }

    constructor(weather, id) {
        this.id = id
        this.label = weather["time"]
        
    }
}

