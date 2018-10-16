using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebApp.Email
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfig _config;

        public EmailService(IOptions<EmailConfig> emailConfig)
        {
            _config = emailConfig.Value;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                var emailMessage = new MimeMessage();

                emailMessage.From.Add(new MailboxAddress(_config.FromName, _config.FromAddress));
                emailMessage.To.Add(new MailboxAddress("", email));
                emailMessage.Subject = subject;
                emailMessage.Body = new TextPart(TextFormat.Html) { Text = message };

                using (var client = new SmtpClient())
                {
                    client.LocalDomain = _config.LocalDomain;

                    await client.ConnectAsync(_config.MailServerAddress, Convert.ToInt32(_config.MailServerPort), SecureSocketOptions.Auto).ConfigureAwait(false);
                    await client.AuthenticateAsync(new NetworkCredential(_config.UserId, _config.UserPassword));
                    await client.SendAsync(emailMessage).ConfigureAwait(false);
                    await client.DisconnectAsync(true).ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
