var Vex = require("vexflow")
var Vue = require("vue")



new Vue({
  el: "main",
  template: `
    <div id="score"></div>
    <button v-for="note in notes" @click="redraw(note)">{{note}}</button>
  `,
  data: {
    notes: [
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B"
    ]
  },
  methods: {
    redraw: function(note){
      document.querySelector("#score").innerHTML = "";
      var vf = new Vex.Flow.Factory({
        renderer: {selector: 'score', width: 200, height: 200}
      });

      var score = vf.EasyScore();
      var system = vf.System();

      system.addStave({
        voices: [
          score.voice(score.notes(note + '5/1', {stem: 'up'})),
        ]
      }).addClef('treble').addTimeSignature('4/4');

      vf.draw();
    }
  },
  ready: function(){
    this.redraw("C");
  }
})