using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace LOT.Common.Extensions
{
    public static class ObjectExtensions
    {
        private static readonly JsonSerializerSettings settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };

        public static StringContent AsJson(this object o)
        {
            return new StringContent(JsonConvert.SerializeObject(o, settings), Encoding.UTF8, "application/json");
        }
        public static JContainer AsJContainer(this object o)
        {
            if (o is IEnumerable)
                return JArray.FromObject(o, GetJsonSerializer());

            return JObject.FromObject(o, GetJsonSerializer());
        }
        public static string Stringify(this object obj)
        {
            return JsonConvert.SerializeObject(obj, settings);
        }
        private static JsonSerializer GetJsonSerializer()
        {
            return new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

        }
    }
}
