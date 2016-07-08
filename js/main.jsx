(function(Simon, document, window){

    Simon.View = React.createClass({
        getInitialState: function () {
            return {
                hiScore: 0,
                score: 0,
                firstActive: false
            };
        },

        playSequence: function(sequenceArray){
            var root = this;
            var index = 0;
            var interval = window.setInterval(function(){
                /* Start sequence loop */
                var corner = sequenceArray[index];
                root.setState({activeCorner: corner});
                window.setTimeout(function(){
                    root.setState({activeCorner: null});
                }, 400);
                if(index >= sequenceArray.length - 1){
                    /* Exit loop */
                    window.clearInterval(interval);
                    root.isActive = true;
                }
                ++index;
            }, 500);
        },

        render: function () {
            return <div className="wrap">
                <div className="wizard-main" id="main">
                    <Simon.Corner colour="red"    number="0" active={(this.state.activeCorner === 0)} />
                    <Simon.Corner colour="blue"   number="1" active={(this.state.activeCorner === 1)} />
                    <Simon.Corner colour="yellow" number="2" active={(this.state.activeCorner === 2)} />
                    <Simon.Corner colour="green"  number="3" active={(this.state.activeCorner === 3)} />
                </div>
                <div className="scores">
                    <p>Score: <span id="score">{this.state.score}</span></p>
                    <p>Hi-score: <span id="hi-score">{this.state.hiScore}</span></p>
                </div>
            </div>
        }

    });

    Simon.Corner = React.createClass({
        render: function (active) {
            var className = "corner corner-" + this.props.number;
            className += (this.props.active === true) ? ' highlight' : '';
            return <a href="javascript:void(0)"
                className={className}
                onClick={this.clickCorner.bind(this, this.props.number)}>{this.props.colour}</a>
        },

        clickCorner: function (corner) {
            Simon.Game.clickCorner(corner);
        },

        componentDidUpdate: function () {
            this.render();
        }
    });



    Simon.Game = {
        initialize: function(){
            this.reset();
        },

        reset: function () {
            this.sequence = [];
            this.index = 0;
            this.next();
        },

        fail: function(){
            /* Demonstrate player's failure and reset board */
            var root = this;
            //this.$main.classList.add('fail');
            window.setTimeout(function(){
                //root.$main.classList.remove('fail');
            }, 500);
            this.reset();
        },

        clickCorner: function(evt){
            if(this.sequence[this.index] == evt){
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
        },

        updateScores: function(){
            var score = this.sequence.length - 1;
            Simon.view.setState({ score: score });
            if(score > this.hiScore){
                this.hiScore = score;
                Simon.view.setState({ hiScore: this.hiScore });
            }
        },

        next: function(){
            /* Add one more to sequence and play it */
            this.index = 0;
            this.sequence.push( Math.floor( Math.random() * 4 ) );
            this.isActive = false;

            Simon.view.playSequence(this.sequence);
        }
    };

    Simon.view = ReactDOM.render(
        <Simon.View />,
        document.getElementById('simon')
    );

    Simon.Game.initialize();

})(Simon, document, window);
