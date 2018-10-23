using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.FileProviders;

namespace WebApp.Pages
{
    public class AboutModel : PageModel
    {
        private readonly IFileProvider _fileProvider;
        public IDirectoryContents DirectoryContents { get; private set; }
        public string Message { get; set; }

        public AboutModel(IFileProvider fileProvider)
        {
            _fileProvider = fileProvider;
        }
        public void OnGet()
        {
            Message = "Your application description page.";
            DirectoryContents = _fileProvider.GetDirectoryContents("images");
        }
    }
}
