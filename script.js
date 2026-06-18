(function (){
    const fileSystem = {
        root : [
            { name:"Documents", type:"folder", target: "documents"},
            { name: "Pictures", type:"folder", target: "pictures"},
            { name: "Music", type: "folder", target: "music"}
        ],
        documents: [
            { name: "Notes.txt", type:"file", content:"Notepad text data"},
            { name: "ProjectInfo.txt", type:"file", content: "90's Era Web OS configuration file."}
        ],
        pictures: [
            { name: "DesktopBackground.jpg", type: "image"},
            { name: "Wallpaper.jpg", type: "image"}
        ],
        music: [
            {name: "Waka Waka.mp3", type: "audio"}
        ]
    };
    
})