(function (app, document, window) {

  var Simon = React.createClass({
    displayName: "Simon",

    getInitialState: function () {
      return {
        hiScore: 0,
        score: 0,
        firstActive: false
      };
    },

    playSequence: function (sequenceArray) {
      var root = this;
      var index = 0;
      var interval = window.setInterval(function () {
        /* Start sequence loop */
        var corner = sequenceArray[index];
        root.setState({ activeCorner: corner });
        window.setTimeout(function () {
          root.setState({ activeCorner: null });
        }, 400);
        if (index >= sequenceArray.length - 1) {
          /* Exit loop */
          window.clearInterval(interval);
          root.isActive = true;
        }
        ++index;
      }, 500);
    },

    clickCorner: function () {
      console.log('ok');
    },

    render: function () {
      return React.createElement(
        "div",
        { className: "wrap" },
        React.createElement(
          "div",
          { className: "wizard-main", id: "main" },
          React.createElement(Corner, { colour: "red", number: "0", active: this.state.activeCorner === 0, onClick: this.clickCorner.bind(this, 0) }),
          React.createElement(Corner, { colour: "blue", number: "1", active: this.state.activeCorner === 1 }),
          React.createElement(Corner, { colour: "yellow", number: "2", active: this.state.activeCorner === 2 }),
          React.createElement(Corner, { colour: "green", number: "3", active: this.state.activeCorner === 3 })
        ),
        React.createElement(
          "div",
          { className: "scores" },
          React.createElement(
            "p",
            null,
            "Score: ",
            React.createElement(
              "span",
              { id: "score" },
              this.state.score
            )
          ),
          React.createElement(
            "p",
            null,
            "Hi-score: ",
            React.createElement(
              "span",
              { id: "hi-score" },
              this.state.hiScore
            )
          )
        )
      );
    }

  });

  var Corner = React.createClass({
    displayName: "Corner",

    render: function (active) {
      var className = "corner corner-" + this.props.number;
      className += this.props.active === true ? ' highlight' : '';
      return React.createElement(
        "a",
        { href: "javascript:void(0)",
          className: className,
          onClick: this.clickCorner.bind(this, this.props.number) },
        this.props.colour
      );
    },

    clickCorner: function (corner) {
      app.wizard.clickCorner(corner);
    },

    componentDidUpdate: function () {
      this.render();
    }
  });

  var simon = ReactDOM.render(React.createElement(Simon, null), document.getElementById('simon'));

  var Wizard = function () {

    this.init = function () {
      this.reset = function () {
        this.sequence = [];
        this.index = 0;
        this.next();
      };

      this.fail = function () {
        /* Demonstrate player's failure and reset board */
        var root = this;
        //this.$main.classList.add('fail');
        window.setTimeout(function () {
          //root.$main.classList.remove('fail');
        }, 500);
        this.reset();
      };

      this.clickCorner = function (evt) {
        if (this.sequence[this.index] == evt) {
          /* Correct! */
          if (this.index !== this.sequence.length - 1) {
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

      this.updateScores = function () {
        var score = this.sequence.length - 1;
        simon.setState({ score: score });
        if (score > this.hiScore) {
          this.hiScore = score;
          simon.setState({ hiScore: this.hiScore });
        }
      }, this.next = function () {
        /* Add one more to sequence and play it */
        this.index = 0;
        this.sequence.push(Math.floor(Math.random() * 4));
        this.isActive = false;

        simon.playSequence(this.sequence);
      };

      this.reset();
    };

    this.init();
  };

  app.wizard = new Wizard();
})(app, document, window);