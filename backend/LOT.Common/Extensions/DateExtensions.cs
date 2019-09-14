using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace LOT.Common.Extensions
{
    public static class DateExtensions
    {
        public static string ToLotFormat(this DateTime date)
        {
            return date.ToString("ddMMyyyy", CultureInfo.InvariantCulture);
        }
    }
}
