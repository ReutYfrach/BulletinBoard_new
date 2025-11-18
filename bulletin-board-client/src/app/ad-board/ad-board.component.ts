import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdsService, Ad } from '../ads.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ad-board',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './ad-board.component.html',
  styleUrls: ['./ad-board.component.css']
})
export class AdBoardComponent implements OnInit {
  ads: Ad[] = [];
  searchText: string = '';
  showModal = false;
  modalAd: Ad = { id: 0, title: '', description: '', phone: '', createdAt: '', imageUrl: '', category: '', creator: '' };
  selectedAd: Ad | null = null;
  selectedFile: File | null = null;


  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
    this.adsService.getAds().subscribe(data => {
      this.ads = data.map(ad => ({
        ...ad,
        imageUrl: ad.imageUrl ? `${environment.apiBaseUrl}/images/${ad.imageUrl}` : undefined
      }));

      console.log('Mapped ads with server image URLs:', this.ads);
    });
  }

  filterAds(): Ad[] {
    if (!this.searchText) return this.ads;
    return this.ads.filter(ad =>
      ad.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteAd(id: number) {
      if (confirm('Are you sure you want to delete this ad?')) {
        this.adsService.deleteAd(id).subscribe(() => {
          this.ads = this.ads.filter(a => a.id !== id);
        });
      }
    }

    openAddModal() {
      this.selectedAd = null;
      this.modalAd = { id: 0, title: '', description: '', phone: '', createdAt: '', imageUrl: '', category: '', creator: '' };
      this.showModal = true;
    }

    editAd(ad: Ad) {
      this.selectedAd = ad;
      this.modalAd = { ...ad };
      this.showModal = true;
    }

  saveModalAd() {
    if (this.selectedAd) {
      const imageFileName = this.modalAd.imageUrl
        ? this.modalAd.imageUrl.split('/').pop()
        : 'default.png';

      const updatedAd: Ad = {
        ...this.modalAd,
        id: this.selectedAd.id,
        createdAt: this.selectedAd.createdAt,
        imageUrl: imageFileName
      };

      this.adsService.updateAd(updatedAd).subscribe({
        next: (res) => {
          const index = this.ads.findIndex(a => a.id === updatedAd.id);
          if (index !== -1) this.ads[index] = {
            ...updatedAd,
            imageUrl: `${environment.apiBaseUrl}/images/${updatedAd.imageUrl}`
          };
          this.showModal = false;
        },
        error: (err) => console.error(err)
      });
    } else {
      const imageFileName = this.modalAd.imageUrl
        ? this.modalAd.imageUrl.split('/').pop()
        : 'default.png';

      const newAd: Ad = {
        ...this.modalAd,
        id: this.ads.length + 1,
        createdAt: new Date().toISOString(),
        imageUrl: imageFileName
      };
      this.adsService.addAd(newAd).subscribe({
        next: (created) => {
          this.ads.push({
            ...created,
            imageUrl: `${environment.apiBaseUrl}/images/${created.imageUrl}`
          });
          this.showModal = false;
        },
        error: (err) => console.error(err)
      });
    }
  }

    closeModal() {
      this.showModal = false;
    }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const fileExtension = file.name.split('.').pop();
      const fileName = `image_${timestamp}.${fileExtension}`;
      formData.append('fileName', fileName);

      this.adsService.uploadImage(formData).subscribe({
        next: (response: any) => {
          this.modalAd.imageUrl = `${environment.apiBaseUrl}/images/${response.imageUrl}`;
        },
        error: (err) => console.error('Image upload failed:', err)
      });
    }
  }
}
