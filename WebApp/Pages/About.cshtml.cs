using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApp.Services;

namespace WebApp.Pages
{
    public class AboutModel : PageModel
    {
        private readonly IFileService _fileService;
        public List<string> Files { get; set; }
        public string Message { get; set; }

        public AboutModel(IFileService fileService)
        {
            _fileService = fileService;
        }
        public void OnGet()
        {
            Message = "Your application description page.";
            Files = _fileService.GetFileList("wwwroot/images");
        }
    }
}
