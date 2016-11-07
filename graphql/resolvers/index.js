import Twit from 'twit';

const T = new Twit({
  consumer_key: 'FGCbh8elO9ewgCKe5k2XJ2i9I',
  consumer_secret: 'RUGZaGQXQeRWQEkU5JgXresoAYgDSKaD8EoMqYjnejmEsLahHk',
  access_token: '17119618-tNtPOKxZJsJxacnliftsgnrvAkepgNM17Nh4tUMzo',
  access_token_secret: 'oE2z20DvdoItf0RSQXCaIALGpKqX5sAiZMg0IweIji4U7',
});

const getTweets = ({ q, resultType }) => new Promise((resolve, reject) => {
  T.get('search/tweets', { q, result_type: resultType, count: 100 }, (err, res) => {
    if (!err) {
      resolve(res.statuses);
    }

    reject(err);
  });
});

export default getTweets;
