namespace BulletinBoardApi.Models
{
    public class Ad
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Creator { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Phone { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
