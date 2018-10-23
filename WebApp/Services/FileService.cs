using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Services
{
    public class FileService : IFileService
    {
        public List<string> GetFileList(string path)
        {
            var dir = new DirectoryInfo(@path);
            var files = dir.GetFiles();
            return files.Select(f => f.Name).ToList();
        }
    }
}
