using BulletinBoardApi.Models;
using BulletinBoardApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoardApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController : ControllerBase
    {
        private readonly AdsService _adsService;
        private readonly IConfiguration _config;

        public AdsController(IConfiguration config)
        {
            _adsService = new AdsService();
            _config = config;
        }

        [HttpGet]
        public ActionResult<List<Ad>> GetAll() => _adsService.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Ad?> Get(int id)
        {
            var ad = _adsService.GetById(id);
            if (ad == null) return NotFound();
            return ad;
        }

        [HttpPost]
        public ActionResult<Ad> Create(Ad ad)
        {
            var newAd = _adsService.Add(ad);
            return CreatedAtAction(nameof(Get), new { id = newAd.Id }, newAd);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Ad ad)
        {
            var success = _adsService.Update(id, ad);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _adsService.Delete(id);
            if (!success) return NotFound();
            return NoContent();
        }


        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string fileName)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            if (!Directory.Exists(imagesFolder))
                Directory.CreateDirectory(imagesFolder);

            if (string.IsNullOrEmpty(fileName))
            {
                var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmssfff");
                fileName = $"image_{timestamp}{Path.GetExtension(file.FileName)}";
            }

            var filePath = Path.Combine(imagesFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { imageUrl = fileName });
        }



    }
}
