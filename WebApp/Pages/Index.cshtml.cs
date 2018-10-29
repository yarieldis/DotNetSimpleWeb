using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApp.Email;
using WebApp.Models;
using WebApp.Razor;

namespace WebApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IEmailService _emailService;
        private readonly IRazorRenderService _renderService;

        public string Section { get; set; } = "#header";

        [BindProperty]
        public ContactModel ContactModel { get; set; }

        public IndexModel(IEmailService emailService, IRazorRenderService renderService)
        {
            _emailService = emailService;
            _renderService = renderService;
        }
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                Section = "#contact";
                return Page();
            }

            var body = await _renderService.RenderToStringAsync("ContactView", ContactModel);
            await _emailService.SendEmailAsync("", "", body);

            return RedirectToPage("Index");
        }
    }
}
