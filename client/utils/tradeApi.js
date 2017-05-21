import axios from 'axios';

const tradeApi = {
  // this function will remove a request that the user initiated
  cancelRequest(title) {
    return axios.post('/cancelrequest', { title })
      .then(({ data }) => {
        if (data.error) {
          return data.error;
        } 
        return data.message;
      });
  },
  acceptTrade(title) {
    return axios.post('/accepttrade', { title })
      .then(({ data }) => {
        if (data.error) {
          return data.error;
        }
        return data.message;
      });
  }
};

export default tradeApi;
