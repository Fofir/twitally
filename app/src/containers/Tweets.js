import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

class Tweets extends Component {
  componentDidMount() {
    const { fetchTweets, q, resultType } = this.props;
    fetchTweets(q, resultType);
  }

  render() {
    const { tally, q } = this.props;

    const tallyKeys = Object.keys(tally);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Twitally <small>tallying vote for {q}</small></h1>
          </div>
        </div>
        {tallyKeys.length < 1 && <div className="well well-sm">Sorry, no latest tweets with with {q}</div>}
        <div className="row">
          <div className="col-md-12"> 
            {tallyKeys.length > 0 && 
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>term</th>
                  <th>votes</th>
                </tr>
              </thead>
              <tbody>
                {tallyKeys.map(vote => <tr key={vote}><td>{vote}</td><td>{tally[vote]}</td></tr>)}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    );
  }
}

Tweets.propTypes = {
  tally: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  fetchTweets: PropTypes.func.isRequired,
};

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
  tally: tallyTweets(state.data, state.q),
});

export default connect(mapStateToProps, actions)(Tweets);
