import { BrowserWindow } from "electron";
import { Client, ClientChannel, ConnectConfig, SFTPWrapper } from "ssh2"
export interface sshUser extends ConnectConfig {
    host: string;
    username: string;
    password: string;
    port: number;
}
export interface folder {
    folderName: string;
    attrs: {
        size: number;
        mode: number;
        mtime: number;
    }
    childen: folder[]
}
export interface SoftLink {
    fileName: string
    uid: number | string
    lastUpdateTime: string[]
    holder: string
    grouping: string
}
export class CreateSSH {
    public conn: Client
    constructor() {
        this.conn = new Client();
    }
    async connect(user: sshUser) {
        return new Promise((resolve, reject) => {
            this.conn.on('ready', () => {
                resolve(true)
            }).connect(user);
        })

    }
    getSystemAllSoftLink(): Promise<SoftLink[]> {
        return new Promise(async (resolve, reject) => {
            this.conn.exec('ls -il /usr/bin', (err, stream) => {
                if (err) { reject(err); return }
                const List: SoftLink[] = []
                stream.on('close', (code: string, signal: string) => {
                    resolve(List)
                    this.conn.end();
                }).on('data', (result: string) => {
                    const reg = /(\d{6})\s(.{10,11})\s(\d)\s(.{4})\s(.{4})\s*(\d*)\s([A-Za-z]{3,4})\s*(\d*)\s*(\d{4})\s(.*)/gim;
                    const onceReg = /(\d{6})\s(.{10,11})\s(\d)\s(.{4})\s(.{4})\s*(\d*)\s([A-Za-z]{3,4})\s*(\d*)\s*(\d{4})\s(.*)/im;
                    const data = result.toString().match(reg)
                    console.log(result.toString())
                    if (data) {
                        data.forEach(item => {
                            const onceStr = item.match(reg)
                            if (onceStr) {
                                const info = onceStr[0].match(onceReg)
                                if (info) {
                                    List.push({
                                        fileName: info[info.length - 1],
                                        uid: info[1],
                                        lastUpdateTime: [info[info.length - 2], info[info.length - 4], info[info.length - 3]],
                                        holder: info[3],
                                        grouping: info[4]
                                    })
                                }
                            }
                        })

                    }

                    // win.webContents.send("desktopReady", JSON.stringify({ flag: true }))

                })
                // .stderr.on('data', (data) => {
                //     console.log('B: ' + data);
                // });
            });




        })

    }
    getSystemInstallTime(): Promise<Date> {
        return new Promise((resolve, reject) => {
            this.conn.exec('passwd -S root', (err, stream) => {
                if (err) { reject(err); return }
                stream.on('data', (data: Buffer) => {
                    const Time = data.toString().match(/(\d{4})-(\d{2})-(\d{2})/)
                    if (Time) resolve(new Date(Time[0]))
                })
            });


        })
    }
    getSystemFileTree(path: string = "/"): Promise<folder[]> {
        return new Promise((resolve, reject) => {
            this.conn.sftp((err: Error | undefined, sftp: SFTPWrapper) => {
                if (err) { reject(err); return }
                sftp.readdir(path, (err, list) => {
                    if (err) { reject(err); return }
                    this.conn.end();

                    resolve(list.map(e => {
                        const obj: folder = {
                            folderName: e.filename,
                            attrs: {
                                size: e.attrs.size,
                                mode: e.attrs.mode,
                                mtime: e.attrs.mtime,
                            },
                            childen: []
                        }
                        return obj
                    }))
                });
            })
        })

    }
}
