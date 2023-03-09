import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

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
  iframeVideoUrlTag :boolean = false;
  playVideoButton :boolean = false;
  audioSrc!: SafeUrl;
  videoSrc!: SafeUrl;
  files: any[] = [];
  videoId : any;
  showError: boolean = false;
  fileName: any;
  playVideoFileButton: boolean = false;
  namedFile: boolean = false;
  formattedFileSize: any;


  constructor(private sanitizer: DomSanitizer, 
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }


  getVideoId() {
    let videoId = this.videoUrl.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    this.videoId = videoId;
  }

  onVideoUrlChange(){

    // if (this.validateNormalVideoUrl(this.videoUrl)) {
    //   this.messageService.add({severity:'success', summary: 'Success', detail: 'URL uploaded successfully'});
    //   this.iframeVideoUrlTag = true;
    //   this.playVideo()
  
   
    // } else if (this.validateYoutubeVideoUrl(this.videoUrl)) {
    //   this.messageService.add({severity:'success', summary: 'Success', detail: 'URL uploaded successfully'});
    //   this.iframeVideoUrlTag = true;
    //   this.playVideo()
     
      
    // } else {
    //   this.iframeVideoUrlTag = false;
    //   this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid video URL. Only valid video URL allowed !!!!.'});
    //   return;
    // }
   
    this.iframeVideoUrlTag = true;
    this.playVideoButton = true

    if(this.videoUrl === '') {
      this.iframeVideoUrlTag = false;
      this.playVideoButton = false
    }
    // this.playVideo()
    
    // this.videoUrlTag = true;
  }


  validateNormalVideoUrl(url: string) {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
  }

  validateYoutubeVideoUrl(url: string) {
    return url.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/);
  }



  playVideo() {
    if (this.isYouTubeVideo(this.videoUrl) && this.validateYoutubeVideoUrl(this.videoUrl) || this.validateNormalVideoUrl(this.videoUrl) ) {
      this.playYouTubeVideo(this.videoUrl);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'URL uploaded successfully'});
      this.iframeVideoUrlTag = true;
      this.playVideoButton = true
      
    } 
    
    else if (!this.isYouTubeVideo(this.videoUrl) && this.validateNormalVideoUrl(this.videoUrl)) {
      this.playYouTubeVideo(this.videoUrl);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'URL uploaded successfully'});
      this.iframeVideoUrlTag = true;
      this.playVideoButton = true
   
    }
    
    else {
      this.iframeVideoUrlTag = false;
      this.playVideoButton = false
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid video URL. Only valid video URL allowed !!!!.'});
      return;
    }

  
  }

  isYouTubeVideo(url: string) {
    return url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1;
  }

  playYouTubeVideo(url: string) {
    let videoId = this.videoUrl.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
    const videoPlayer = document.getElementById('video-player') as HTMLIFrameElement;
    videoPlayer.src = youtubeUrl;
  }

  playNormalVideo(url: string) {
    const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;
  videoPlayer.src = this.videoUrl;
  videoPlayer.load();
  videoPlayer.play();
  }


  selectAnotherfile(){
    this.browseButton = true;
    this.video = false;
    this.selectButton = false;
    this.namedFile = false;
    
  }



  onVideoFileSelected(event: any) {
    const files = event.target.files;
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
  
    if (allowedTypes.includes(files[0].type)) {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'file uploaded successfully'});
      const reader = new FileReader();
      reader.onload = () => {
        const url = URL.createObjectURL(files[0]);
        this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(url);
      };
      reader.readAsDataURL(files[0]);
  
      this.fileName = files[0].name;
      const fileSize = files[0].size;
      this.formattedFileSize = this.formatFileSize(fileSize);
     // console.log('File size:', this.formattedFileSize);
    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid file type. Only audio files are allowed !!!!.'});
      return;
    }
    
    // this.video = true
    this.selectButton = true
    this.browseButton = false
    this.namedFile = true
  }

  formatFileSize(fileSize: number): string {
    if (fileSize < 1024) {
      return fileSize + ' bytes';
    } else if (fileSize < 1024 * 1024) {
      return (fileSize / 1024).toFixed(2) + ' KB';
    } else if (fileSize < 1024 * 1024 * 1024) {
      return (fileSize / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }



  onFileDroppedNew(event: any) {
    const files = event.dataTransfer.files;
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
  
    if (allowedTypes.includes(files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = URL.createObjectURL(files[0]);
        this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(url);
      };
      reader.readAsDataURL(files[0]);
  
      this.fileName = files[0].name;
    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid file type. Only audio files are allowed !!!!.'});
      return;
    }
  }



  onDeleteFile() {
    this.fileName = '';
    this.audioSrc = '';
    this.video = false
    this.playVideoFileButton = false;
    this.selectButton = false;
    this.browseButton = true;
    this.namedFile = false;
  }

  playVideoFile() {
    this.video = true;
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
 * Convert Files list to normal array list
 * @param files (Files List)
 */
prepareFilesList(files: Array<any>) {
  for (const item of files) {
    item.progress = 0;
    this.files.push(item);
  }
  // this.uploadFilesSimulator(0);
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


  // if (this.isValidUrl(this.videoUrl)) {
    //   this.showError = false;
    //   if (this.isYouTubeVideo(this.videoUrl)) {
    //     this.iframeVideoUrlTag = true;
    //     this.youtubeUrl = this.getEmbedUrl(this.videoUrl);
    //     this.playYouTubeVideo();
    //   } else {
    //     this.iframeVideoUrlTag = true;
    //     this.playNormalVideo();
    //   }
    // } else {
    //   this.showError = true;

    // }








/**
 * format bytes
 * @param bytes (File size in bytes)
 * @param decimals (Decimals point)
 */
// formatBytes(bytes: number,decimals: number) {
//   if (bytes === 0) {
//     return '0 Bytes';
//   }
//   const k = 1024;
//   const dm = decimals <= 0 ? 0 : decimals || 2;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// }

/**
 * Delete file from files list
 * @param index (File index)
 */


// deleteFile(index: number) {
//   this.files.splice(index, 1);
// }
/**
 * Simulate the upload process
 */
// uploadFilesSimulator(index: number) {
//   setTimeout(() => {
//     if (index === this.files.length) {
//       return;
//     } else {
//       const progressInterval = setInterval(() => {
//         if (this.files[index].progress === 100) {
//           clearInterval(progressInterval);
//           this.uploadFilesSimulator(index + 1);
//         } else {
//           this.files[index].progress += 5;
//         }
//       }, 200);
//     }
//   }, 1000);
// }


}
