import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {
  video : boolean = false;
  selectButton : boolean = false;
  browseButton : boolean = true;
  videoUrl: string = '';
  videoUrlTag : boolean = false;
  audioSrc!: SafeUrl;
  videoSrc!: SafeUrl;
  files: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  }
  // onFileSelected(event: any, type: string) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const url = URL.createObjectURL(file);
  //     if (type === 'audio') {
  //       this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(url);
  //     } else if (type === 'video') {
  //       this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(url);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  //   this.video = true
  //   this.selectButton = true
  //   this.browseButton = false
  // }

  selectAnotherfile(){
    this.browseButton = true;
    this.video = false;
    this.selectButton = false;
    
  }

  onVideoUrlChange(event: any) {
    this.videoUrl = event.target.value;
    this.videoUrlTag = true;
  }

  onVideoFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    if (allowedTypes.includes(file.type)) {
      alert("file uploaded successfully")
    }

    else if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only video files are allowed.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = URL.createObjectURL(file);
      this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(url);
    };
    reader.readAsDataURL(file);

    this.video = true
    this.selectButton = true
    this.browseButton = false
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
formatBytes(bytes: number,decimals: number) {
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
