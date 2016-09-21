var Vex = require("vexflow")
var Vue = require("vue")

new Vue({
  el: "main",
  template: `
    <div class="card">
      <div id="score"></div>
      <div>
        <button class="btn btn-primary" v-for="note in notes" @click="clicked(note)">{{note}}</button>
      </div>
      <div>{{message}}</div>
      <div>{{countCorrect}} / {{countAll}} 正解</div>
      <div><a href="{{tweet}}" target="_blank">この結果をツイート</a></div>
    </div>
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
    ],
    message: "該当する音名をクリック",
    answer: "C",
    countCorrect: 0,
    countAll: 0
  },
  computed: {
    tweet: function () {
      var div_tweet = document.getElementById('div-tweet');
      var base_url = 'https://twitter.com/intent/tweet';
      // パラメータ
      var text = '今日は ' + this.countAll + "問 学習しました(正答率 " + Math.round(this.countCorrect / this.countAll * 100) + "%)";
      var url = 'https://hashrock.github.io/score-quiz/';
      // 指定したユーザーがおすすめユーザーとして2アカウントまで表示
      //var related = 'hashedrock';
      var tweetid = 0;

      var tweetLink = base_url +
        '?text=' + encodeURIComponent(text) +
        '&url=' + url +
        //'&via=' + via +
        //'&hashtags=' + hashtags +
        //'&related=' + related +
        // '&in-reply-to=' + tweetid +
        '';
      return tweetLink;
    }

  },
  methods: {
    redrawNote: function (note) {
      document.querySelector("#score").innerHTML = "";
      var vf = new Vex.Flow.Factory({
        renderer: { selector: 'score', width: 200, height: 200 }
      });

      var score = vf.EasyScore();
      var system = vf.System();

      system.addStave({
        voices: [
          score.voice(score.notes(note + '/1', { stem: 'up' })),
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf.draw();
    },
    redraw: function (note) {
      var octave = Math.floor(Math.random() * 2) + 4
      this.redrawNote(note + octave);
    },
    clicked: function (note) {
      this.countAll = this.countAll + 1
      if (this.answer === note) {
        this.message = "正解"
        this.countCorrect = this.countCorrect + 1;
      } else {
        this.message = "不正解。答えは" + this.answer;
      }
      this.next();
    },
    next: function () {
      //C - B
      var index = Math.floor(Math.random() * this.notes.length)

      //o4 - o5
      this.answer = this.notes[index]
      this.redraw(this.notes[index])
    }
  },
  ready: function () {
    this.redraw("C");
  }
})