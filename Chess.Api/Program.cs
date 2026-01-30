using System.Text.Json.Serialization;
using Chess.Api.SchemaFilters;

var builder = WebApplication.CreateBuilder(args);

// // Add controllers
// builder.Services.AddControllers();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });


//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddOpenApi();




// Optional but recommended
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    //c.UseInlineDefinitionsForEnums();
    c.SchemaFilter<StringEnumSchemaFilter>();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowFrontend");
// Map controllers
app.MapControllers();

app.Run();