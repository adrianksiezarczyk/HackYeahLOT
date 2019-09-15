import { requestBase } from '../../utils/api';

class LotApi {
  static async testFetch() {
    // const userData = await requestBase
    //     .url('/v2/admin/auth')
    //     .post({ email, password })
    //     .json()
    return 'TEST';
  }
  static async getAirportsNames() {
    return await requestBase
      .url('Airport')
      .get()
      .json();
  }
}

export default LotApi;
