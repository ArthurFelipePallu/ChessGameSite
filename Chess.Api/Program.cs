var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Optional but recommended
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();