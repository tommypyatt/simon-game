(function(app, document, window){
  var Wizard = function(){
    this.init = function(){
      this.hiScore = 0;
      this.$hiScore = document.getElementById('hi-score');
      this.$score = document.getElementById('score');

      this.reset = function(){
        this.$score.innerHTML = 0;
        this.sequence = [];
        this.index = 0;
        this.next();
      };

      this.fail = function(){
        var main = document.getElementById('main');
        main.classList.add('fail');
        window.setTimeout(function(){
          main.classList.remove('fail');
        }, 500);
        this.reset();
      };

      this.clickCorner = function(evt){
        if(this.sequence[this.index] === evt){
          if(this.index >= this.sequence.length - 1){
            this.next();
          } else {
            ++this.index;
          }
          this.updateScores();
        } else {
          this.fail();
        }
      };

      this.updateScores = function(){
        var score = this.sequence.length - 1;
        this.$score.innerHTML = score;
        if(score > this.hiScore){
          this.hiScore = score;
          this.$hiScore.innerHTML = this.sequence.length - 1;
        }
      },

      this.playSequence = function(){
        var root = this;
        var showIndex = 0;
        var interval = window.setInterval(function(){
          var indexToShow = root.sequence[showIndex];
          var element = document.getElementById('corner-' + indexToShow);
          element.classList.add('highlight');
          window.setTimeout(function(){
            element.classList.remove('highlight');
          }, 400);
          if(showIndex >= root.sequence.length - 1){
            window.clearInterval(interval);
          }
          ++showIndex;
        }, 500);
      };

      this.next = function(){
        this.index = 0;
        this.sequence.push( Math.floor( Math.random() * 4 ) );

        this.playSequence();
      };

      this.reset();
    };

    this.init();
  };


  app.wizard = new Wizard();
})(app, document, window);
