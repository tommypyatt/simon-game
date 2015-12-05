(function(){
  var Wizard = function(){
    this.init = function(){
      this.hiScore = 0;
      this.$hiScore = document.getElementById('hi-score');

      this.reset = function(){
        this.combo = [];
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
        if(this.combo[this.index] === evt){
          if(this.index >= this.combo.length - 1){
            this.next();
          } else {
            ++this.index;
          }
          this.$hiScore.innerHTML = this.combo.length - 1;
        } else {
          this.fail();
        }
      };

      this.showCombo = function(){
        var root = this;
        var showIndex = 0;
        var interval = setInterval(function(){
          var indexToShow = root.combo[showIndex];
          var element = document.getElementById('corner-' + indexToShow);
          element.classList.add('highlight');
          window.setTimeout(function(){
            element.classList.remove('highlight');
          }, 400);
          if(showIndex >= root.combo.length - 1){
            window.clearInterval(interval);
          }
          ++showIndex;
        }, 500);
      };

      this.next = function(){
        this.index = 0;
        this.combo.push( Math.floor( Math.random() * 4 ) );

        this.showCombo();
      };

      this.reset();
    };

    this.init();
  };


  document.wizard = new Wizard();
})();
