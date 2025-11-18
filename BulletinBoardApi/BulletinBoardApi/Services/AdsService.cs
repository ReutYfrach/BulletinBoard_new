using System.Text.Json;
using BulletinBoardApi.Models;

namespace BulletinBoardApi.Services
{
    public class AdsService
    {
        private readonly string _filePath = "ads.json";

        private List<Ad> LoadAds()
        {
            if (!File.Exists(_filePath))
                return new List<Ad>();

            string json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Ad>>(json) ?? new List<Ad>();
        }

        private void SaveAds(List<Ad> ads)
        {
            string json = JsonSerializer.Serialize(ads, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        public List<Ad> GetAll() => LoadAds();

        public Ad? GetById(int id) => LoadAds().FirstOrDefault(a => a.Id == id);

        public Ad Add(Ad ad)
        {
            var ads = LoadAds();
            ad.Id = ads.Count == 0 ? 1 : ads.Max(a => a.Id) + 1;
            ad.CreatedAt = DateTime.Now;
            ads.Add(ad);
            SaveAds(ads);
            return ad;
        }

        public bool Update(int id, Ad updated)
        {
            var ads = LoadAds();
            var ad = ads.FirstOrDefault(a => a.Id == id);
            if (ad == null)
                return false;

            ad.Title = updated.Title;
            ad.Description = updated.Description;
            ad.Category = updated.Category;
            ad.Phone = updated.Phone;
            SaveAds(ads);
            return true;
        }

        public bool Delete(int id)
        {
            var ads = LoadAds();
            var ad = ads.FirstOrDefault(a => a.Id == id);
            if (ad == null)
                return false;

            ads.Remove(ad);
            SaveAds(ads);
            return true;
        }
    }
}


