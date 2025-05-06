using Microsoft.EntityFrameworkCore;
using CasaDeMateriasDeConstrucao;

var builder = WebApplication.CreateBuilder(args);
var connectionString = "server=localhost;port=3306;database=materiaisdotheo;user=Theo;password=2507Theo@";
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/produtos", async (AppDbContext db) =>
{
    var produtos = await db.produto.ToListAsync();
    return Results.Ok(produtos);
});

app.MapGet("/", async context =>
{
await context.Response.SendFileAsync("wwwroot/index.html");
});

app.Run();