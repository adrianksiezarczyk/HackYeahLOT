import { requestBase } from '../../utils/api';
import qs from 'qs';

class LotApi {
  static async testFetch() {
    // const userData = await requestBase
    //     .url('/v2/admin/auth')
    //     .post({ email, password })
    //     .json()
  }
  static async getAirportsNames() {
    return await requestBase
      .url('Airport')
      .get()
      .json();
  }
  static async getFlightDetails({
    DepartueDate,
    ReturnDate,
    OriginCode,
    DestinationCode,
    NumberOfAdults
  }) {
    const query = qs.stringify(
      {
        DepartueDate,
        ReturnDate,
        OriginCode,
        DestinationCode,
        NumberOfAdults
      },
      { allowDots: true }
    );

    return await requestBase
      .url('Flight/details')
      .query(query)
      .get()
      .json();
  }
}

export default LotApi;
