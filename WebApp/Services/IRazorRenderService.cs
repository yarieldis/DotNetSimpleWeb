using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Razor
{
    public interface IRazorRenderService
    {
        Task<string> RenderToStringAsync(string viewName, object model);
    }
}
