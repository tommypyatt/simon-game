(function(app, document, window){
  var Wizard = function(){
    this.init = function(){
      this.hiScore = 0; /* One day we will get this from a cookie */

      /* Cache DOM lookups. Because performance is very important, obvs */
      this.$hiScore = document.getElementById('hi-score');
      this.$score = document.getElementById('score');
      this.$main = document.getElementById('main');

      this.reset = function(){
        this.$score.innerHTML = 0;
        this.sequence = [];
        this.index = 0;
        this.next();
      };

      this.fail = function(){
        /* Demonstrate player's failure and reset board */
        var root = this;
        this.$main.classList.add('fail');
        window.setTimeout(function(){
          root.$main.classList.remove('fail');
        }, 500);
        this.reset();
      };

      this.clickCorner = function(evt){
        if(!this.isActive){
          /* Wait for sequence to finish playing */
          return;
        }
        if(this.sequence[this.index] === evt){
          /* Correct! */
          if(this.index !== this.sequence.length - 1){
            /* There are more */
            ++this.index;
          } else {
            /* You got them all right */
            this.next();
          }
          this.updateScores();
        } else {
          /* You failed */
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
        var index = 0;
        var interval = window.setInterval(function(){
          /* Start sequence loop */
          var corner = root.sequence[index];
          var element = document.getElementById('corner-' + corner);
          element.classList.add('highlight');
          window.setTimeout(function(){
            element.classList.remove('highlight');
          }, 400);
          if(index >= root.sequence.length - 1){
            /* Exit loop */
            window.clearInterval(interval);
            root.isActive = true;
          }
          ++index;
        }, 500);
      };

      this.next = function(){
        /* Add one more to sequence and play it */
        this.index = 0;
        this.sequence.push( Math.floor( Math.random() * 4 ) );
        this.isActive = false;

        this.playSequence();
      };

      this.reset();
    };

    this.init();
  };


  app.wizard = new Wizard();
})(app, document, window);
