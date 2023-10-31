using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfigController : ControllerBase
{
    private readonly ILogger<ConfigController> _logger;
    private readonly BlobServiceClient _blobServiceClient;


    public ConfigController(ILogger<ConfigController> logger, BlobServiceClient blobServiceClient)
    {
        _logger = logger;
        _blobServiceClient = blobServiceClient;
    }

    [HttpGet("{fileName}")]
    public async Task<Stream> Get([FromRoute] string fileName)
    {
        Response.Headers.Add("Content-type", "application/json");

        var client = _blobServiceClient.GetBlobContainerClient("public").GetBlobClient($"{fileName}.json");
        BlobDownloadResult downloadResult = await client.DownloadContentAsync();
        return downloadResult.Content.ToStream();
    }
}
