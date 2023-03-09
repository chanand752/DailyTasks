import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
interface File {
  type: string;
  name: string;
  size: number;
  extension?: string;
}
@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']

})
export class AudioplayerComponent implements OnInit {
  audio :boolean = false;
  selectButton : boolean = false;
  browseButton : boolean = true;
  playAudioButton:boolean = false;
  playAudiioFileButton : boolean = false;
  deleteIocn : boolean = false;

  files: any[] = [];

  audioUrl: string = '';
  audioUrlTag : boolean = false;

  audioSrc!: SafeUrl;
  videoSrc!: SafeUrl;
  ext: string = '';
fileSizeInBytes: any;
  uploadedFiles: File[] = [];
  dragOver = false;
fileName: any;
formattedFileSize :any;
namedFile:boolean = false;


 
  constructor(private sanitizer: DomSanitizer, private messageService: MessageService,
     private primengConfig: PrimeNGConfig) {}
 
    

  ngOnInit() {
    this.primengConfig.ripple = true;
  }


  selectAnotherfile(){
    this.browseButton = true;
    this.audio = false;
    this.selectButton = false;
    this.namedFile = false;
    
  }

  onAudioUrlChange(event: any) {
    this.audioUrl = event.target.value;
    if(this.audioUrl === '') {
      this.playAudioButton = false;
      this.audioUrlTag = false;
      
    }

    this.playAudioButton = true
   
   
  }

  

  playAudio() {
    const isValid = this.isValidAudioUrl(this.audioUrl);
    if (isValid) {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Valid URL Click on Play to listen audio !!!'});
      // alert("valid url play audio")
      this.audioUrlTag = true;
    } else {
      this.audioUrlTag = false;
      this.playAudioButton = false

      this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid URL. Only audio URL are allowed !!!!.'});
      
    }

   
  }



  isValidAudioUrl(audioUrl: string): boolean {
    const audioExtensions = ['mp3', 'wav', 'ogg']; // Add more extensions if needed
    const extension = audioUrl.split('.').pop();
    if (audioExtensions.includes(extension!.toLowerCase())) {
      return true;
    } else {
      
      return false;
    }
  }



// file select method calling

  onAudioFileSelected(event: any) {
    const files = event.target.files;
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  
    if (allowedTypes.includes(files[0].type)) {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'file uploaded successfully'});
      const reader = new FileReader();
      reader.onload = () => {
        const url = URL.createObjectURL(files[0]);
        this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(url);
      };
      reader.readAsDataURL(files[0]);
  
      this.fileName = files[0].name;
      const fileSize = files[0].size;
     this.formattedFileSize = this.formatFileSize(fileSize);
    // console.log('File size:', this.formattedFileSize);
    } else {
      this.audioSrc = '';
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid file type. Only audio files are allowed !!!!.'});
      return;
    }
      // this.audio = true;
      this.selectButton = true;
      this.namedFile = true
      this.browseButton = false;
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

  playAudioFile(){
   this.audio = true
  }


onFilesSelected(event: any) {
  const files = event.target.files;
  console.log(event)
  this.handleFiles(files);
}

// onFileDroppedNew(event: any) {
//   const files = event.dataTransfer.files;
//   console.log(event)
//   this.handleFiles(files);

// }

onFileDroppedNew(event: any) {
  const files = event.dataTransfer.files;
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  if (allowedTypes.includes(files[0].type)) {
    const reader = new FileReader();
    reader.onload = () => {
      const url = URL.createObjectURL(files[0]);
      this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(url);
    };
    reader.readAsDataURL(files[0]);

    this.fileName = files[0].name;
  } else {
    this.audioSrc = '';
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid file type. Only audio files are allowed !!!!.'});
    return;
  }
}



handleFiles(files: FileList) {
  
  const fileList = Array.from(files); // Convert FileList to an array
  for (const file of fileList) {
    if (!this.validateFile(file)) {
      alert('Invalid file type. Only image files are allowed.');
      return;
    }
    this.uploadedFiles.push(file);
  }
}

onDelete(file: File) {
  const index = this.uploadedFiles.indexOf(file);
  if (index !== -1) {
    this.uploadedFiles.splice(index, 1);
  }
}

onDeleteFile() {
  this.fileName = '';
  this.audioSrc = '';
  this.audio = false
  this.playAudiioFileButton = false;
  this.selectButton = false;
  this.browseButton = true;
  this.namedFile = false;
}

private validateFile(file: File): boolean {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  return true;
  
}

onDragOver(event: any) {
  event.preventDefault();
  this.dragOver = true;
}

onDragLeave(event: any) {
  event.preventDefault();
  this.dragOver = false;
}

onDrop(event: any) {
  event.preventDefault();
  this.dragOver = false;
  const files = event.dataTransfer.files;
  this.handleFiles(files);

  // Show file name and size
  for (const file of files) {
    console.log(`File name: ${file.name}, File size: ${file.size} bytes`);
  }
}



}
