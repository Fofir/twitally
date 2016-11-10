import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

class Tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: props.q
    }
  }

  onInputChange = (evt) => {
    this.setState({ q: evt.target.value });
  } 

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.updateQuery( this.state.q );
  }

  componentDidMount() {
    const { fetchTweets, q, resultType } = this.props;
    fetchTweets(q, resultType);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.q !== nextProps.q) {
      this.props.fetchTweets(nextProps.q, nextProps.resultType);
    }
  }
 
  render() {
    const { tally, q } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Twitally <small>tallying vote for {q}</small></h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onSubmit} className="form-inline">
              <div className="form-group">
              <label htmlFor="q">Query:</label>
              <input
                type="text"
                onChange={this.onInputChange}
                value={this.state.q}
                className="form-control"
                style={{ marginLeft: '5px'}}
                name="q"
                />
              </div>
              <button className="btn btn-primary" style={{ marginLeft: '5px'}}>update</button>
            </form>
          </div>
        </div>
        <hr />
        {tally.length < 1 && <div className="well well-sm">Sorry, no latest tweets with with {q}</div>}
        <div className="row">
          <div className="col-md-12"> 
            {tally.length > 0 && 
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>term</th>
                  <th>votes</th>
                </tr>
              </thead>
              <tbody>
                {tally.map(({ key, votes }) => <tr key={key}><td>{key}</td><td>{votes}</td></tr>)}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    );
  }
}

Tweets.propTypes = {
  tally: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchTweets: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
};

const sortTally = tally => {
  return Object.keys(tally).sort((a,b) => {
    if (tally[a] > tally[b]) {
      return -1;
    } else if (tally[b] > tally[a]) {
      return 1;
    }

    return 0;
  }).map(key => ({ votes: tally[key], key }));
}

const tallyTweets = (tweets, q) => tweets.reduce((tally, tweet) => {
  const update = { ...tally };
  const words = tweet.text.split(' ');
  const indexOfVote = words.indexOf(q) + 1;
  const vote = words.slice(indexOfVote, words.length).join(' ');

  if (vote) {
    if (!update[vote]) {
      update[vote] = 0;
    }

    update[vote] += 1;
  }

  return update;
}, {});

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  q: state.q,
  resultType: state.resultType,
  tally: sortTally(tallyTweets(state.data, state.q)),
});

export default connect(mapStateToProps, actions)(Tweets);
