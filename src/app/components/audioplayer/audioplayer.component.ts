import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})
export class AudioplayerComponent {
  audio :boolean = false;
  selectButton : boolean = false;
  browseButton : boolean = true;

  files: any[] = [];

  audioSrc!: SafeUrl;
  videoSrc!: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

 

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = URL.createObjectURL(file);
      if (type === 'audio') {
        this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(url);
      } else if (type === 'video') {
        this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(url);
      }
      
      else {
        window.alert("invalid file")
      }

    };
    reader.readAsDataURL(file);
    this.audio = true;
    this.selectButton = true;
    this.browseButton = false;
  }

  selectAnotherfile(){
    this.browseButton = true;
    this.audio = false;
    this.selectButton = false;
    
  }



// Drag and drop down code

 /**
   * on file drop handler
   */
 onFileDropped($event: any) {
  this.prepareFilesList($event);
}

/**
 * handle file from browsing
 */
fileBrowseHandler(files: any[]):void {
  this.prepareFilesList(files);
}

/**
 * Delete file from files list
 * @param index (File index)
 */
deleteFile(index: number) {
  this.files.splice(index, 1);
}

/**
 * Simulate the upload process
 */
uploadFilesSimulator(index: number) {
  setTimeout(() => {
    if (index === this.files.length) {
      return;
    } else {
      const progressInterval = setInterval(() => {
        if (this.files[index].progress === 100) {
          clearInterval(progressInterval);
          this.uploadFilesSimulator(index + 1);
        } else {
          this.files[index].progress += 5;
        }
      }, 200);
    }
  }, 1000);
}

/**
 * Convert Files list to normal array list
 * @param files (Files List)
 */
prepareFilesList(files: Array<any>) {
  for (const item of files) {
    item.progress = 0;
    this.files.push(item);
  }
  this.uploadFilesSimulator(0);
}

/**
 * format bytes
 * @param bytes (File size in bytes)
 * @param decimals (Decimals point)
 */
formatBytes(bytes:any, decimals:any) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



}
