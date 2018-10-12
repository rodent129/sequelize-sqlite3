import { Injectable } from '@angular/core';
import { IpcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    private readonly ipcRenderer: IpcRenderer | undefined;

    constructor() {
        if ((<any>window).require) {
            try {
                this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            console.log('Electron ipc was not loaded');
        }
    }

    getAllCallLog() {
        if (!this.ipcRenderer) {
            return;
        }

        this.ipcRenderer.send('call-log:get-all', '1');

    }
}
