using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LOT.Services
{
    public class BaseService
    {
        public async Task<T> GetMockData<T>(string fileName) =>
            JsonConvert.DeserializeObject<T>(await File.ReadAllTextAsync(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), $"Mock/{fileName}.json")));
    }
}
